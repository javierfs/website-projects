---
title: 'Analyzing Playlists: Dimensionality Reduction & Unsupervised Machine Learning'
author: Javier Fernandez
date: '2021-08-04'
slug: []
categories: []
tags: []
subtitle: ''
lastmod: '2021-08-04T12:17:45+02:00'
authors: []
description: ''
series: []
hiddenFromHomePage: no
hiddenFromSearch: no
featuredImage: 'featured-clustering.jpg'
featuredImagePreview: 'featured-clustering.jpg'
toc:
  enable: yes
math:
  enable: yes
lightgallery: yes
license: ''
---

<!--more-->

{{< admonition type=quote title="T— JEREMIAH P. OSTRIKER" open=true >}}
_If you take a galaxy and try to make it bigger, it becomes a cluster of galaxies, not a galaxy. If you try to make it smaller than that, it seems to blow itself apart._
{{< /admonition >}}

As shown in the previous post, there is not just a single feature/variable or characteristic that affect increasing the number of streams in a playlists and thus, making it more successful. In this post, I will show how I applied first feature extraction techniques to help clustering methods by discriminating or representing data information in a better way, and therefore getting useful insights on how to make successful playlists. 

## Feature extraction

The aim of this project is showing which features or variables patterns relates to making more successful playlists. Originally in this dataset we have the following features: 

{{< admonition type=abstract title="Groups of features" open=true >}}
+ **User engagement within the playlist**: streams, stream30s, monthly_stream30s, monthly_owner_stream30s
+ **User engagement on the platform and sometimes within the playlist**: dau, wau, mau, mau_previous_months, mau_both_months, users, skippers
+ **Quantitative descriptions of the playlists**: tracks, n_local_tracks, n_artists, n_albums
+ **Qualitative descriptions of the playlists**: moods, genres, tokens
{{< /admonition >}}

Along the previous descriptive analysis, I tweaked and created new variables such as the number of moods and genres, the number of tokens, the polarity score, the monthly engagement etc. 

In the previous post, I showed that it was quite unclear which variable affects individually increasing our successful metric: number of monthly streams from the playlist follower. As such, I wanted to have a look at multi-variable patterns. Due to the high number of variables (dimensions), and the importance of each (when it comes to information), it is very difficult for a human to interpret which combination of values of the high number of features segment and cluster better the data. 

Feature extraction techniques deals with this problems. This techniques reduces the number of features (or dimensions) in a dataset by creating new ones from the existing features. This new reduced combination of features summarizes most of the information contained in the original set of features.  

![](https://miro.medium.com/max/1234/1*dn6881AU9C06if2SZJZRag.gif "Segmentation of a dataset points by reducing dimensionality to its three first components")


### Uniform Manifold Approximation and Projection (UMAP)

UMAP is a widely used non-linear dimensionality reduction algorithm. The main purpose of this techniques is to provide a compressed representation of the input data, while preserving most of the information. UMAP constructs a high dimensional graph representation of the data then optimizes a low-dimensional graph to be as structurally similar as possible.

UMAP can deal with large and complex datasets in a more quickly fashion as compared to other techniques. Furthermore, the algorithm preserves the underlying local structure present in the data, and it can also represent the global structure of the data more accurately. In other words, preserving local structure means that the playlists that belongs to the same user will be placed next to each other. Similarly, preserving global structure would place playlists with same number of genres, or same number of streams close to each other, and that is our target: Segment the most successful playlists close to each other. 

The most important parameters that UMAP uses are the following:

- _Number of neighbors_: it controls how UMAP balances local VS global structure
  - Low values: focus on more local structure (constraining the number of neighboring points when analising data ion high dimensions)
  - High values: focus on more global structure (losing fine detail)
- _Minimum distance_ :  this parameter controls how tightly UMAP places points together. Low values leads to more packed embeddings.
- _Distance metric_: the metric used to compute the distance between  data points to its nearest neighbors (For ex., Euclidean, Cosine, Hamming )

The choice of the values for this hyperparameters is non-trivial and it impacts severely to the final projections. The reason of this is due to the nature of UMAP, it is an unsupervised learning algorithm and there is no baseline to evaluate its performance. Fortunately, UAMP is quite fast and scalable and I could run the algorithm with different hyperparameter settings. 

The grid of values that I used for this is shown below: 

|  Hyperparameter  |               Grid              |
|:----------------:|:-------------------------------:|
| Number of Neighbours   |        [15,30,50,100,150] |
| Minimum Distance | [0.001, 0.003, 0.009,0.03,0.09] |
| Distance Metric |    Euclidean, Cosine, Hamming    |

In the next graphs you will see the 2-dimensional representation of the resulting UMAP algorithm. The graphs are also labelled with the 10 top playlists when it comes to number of monthly streams, monthly active users and monthly engagement within monthly active users. 

The format shown is $ s_xm_ye_z $ where $ x $ refers to the position of the playlist in the top 10 streams, $ y $ refers to the position of the top 10 monthly active users and $ z $ refers to the position of the 10 top engagement rate in the monthly active users. For example the label $ s_2m_4e_5 $ refers to the playlists that has the $ 2^{nd} $ top number of streams, the $ 4^{th} $ top number of monthly active users, and the $ 5^{th} $ top engagement rate of the top monthly active users. There is two colors: green, that refers to the playlists created by spotify; and orange, that refers to playlists created by independent users. Therefore, there might be two playlists with the same numbers in the labels. For instance, $ s3 $ in green ($ 3^{rd} $ most streamed playlists created by spotify) and $ s3 $  in orange ($ 3^{rd} $ most streamed playlists created by independent users). 

Sometimes some of the labels does not contain $ s, m$ or $ e $. The reason why this is happening is due to a playlist present in the top streams might not be included within the 10 top monthly active users playlists. For example: in Figure 1 (Euclidean distance) with a setting of 50 neighbors and minimum distance of 0.001 you can observe the label $ s3 $ in orange placed to the left of the subplot. This playlist is the $ 3^{rd} $ top playlist when it comes to number of streams, but at the same time, it is not included in the 10 top playlists of monthly active users (and therefore not included in the top engagement rate playlists). On the other hand, you could see the label $ m_{10}e_{10} $ in a green color, which means that that particular playlist is the $ 10^{th} $ playlist with more monthly active users and the $ 10^{th} $ with more engagement rate. However, that playlist is not included in the top 10 most streamed playlists.

![](euclidean_h_35_w_35_label.png "Fig 1. Main components/dimensions of the resulting UMAP algorithm. The algorithm used the Euclidean distance and the grid of values shown previously. The columns refers to different number of neighbours and the rows relates to different minimum distance values. The graphs are labelled with the top playlists regarding number of streams, monthly active users and monthly engagement; coloured by type of creators.")

In the previous Fig.1, you could observe the playlists (each data point) projected in a lower 2-Dimensional space. Each subplot shows the two first main components resulting of the UMAP algorithm using the Euclidean distance metric and different number of neighbors and minim distance. As commented previously choosing a lower number of neighbors preserves better local structure and higher number focus more on the global structure. The miminum distance also shows that the more tighten the points are the lower values has been choosen. Our aim using UMAP is to come up with a representation that trades-off local and global structure and that segments better different clusters or agglomerates of data points. 

Some notes worth mentioned related to the resulting projections are: 
- The size of clusters relative to each other is essentially meaningless. This is because UMAP uses local notions of distance to construct its high-dimensional graph representation. 
- The distances between clusters is likely to be meaningless. While it's true that the global positions of clusters are better preserved in UMAP, the distances between them are not meaningful. Again, this is due to using local distances when constructing the graph.  

In this plots, we can observe that the top spotify-created playlists are placed in the same cluster, as well as few of the top playlists created by independent users. The playlists created by independent users are generally more spread in each hyper-parameter setting; however a lower number of neighbors places these playlists more close to each other. 

![](cosine_h_35_w_35_label.png "Fig 2. Main components/dimensions of the resulting UMAP algorithm. The algorithm used the cosine distance and the grid of values shown previously. The columns refers to different number of neighbours and the rows relates to different minimum distance values. The graphs are labelled with the top playlists regarding number of streams, monthly active users and monthly engagement; coloured by type of creators.")

Regarding the resulting projections using the Cosine distance (See Figure 2) seems to have a more rounded-shape visualization placing more top independent user-created playlists along with the Spotify playlists as well as creating more clear clusters than using the previous Euclidean distance metric. 


![](hamming_h_35_w_35_label.png "Fig 3. Main components/dimensions of the resulting UMAP algorithm. The algorithm used the Hamming distance and the grid of values shown previously. The columns refers to different number of neighbours and the rows relates to different minimum distance values. The graphs are labelled with the top playlists regarding number of streams, monthly active users and monthly engagement; coloured by type of creators.")

Lastly, using the Hamming distance (see Figure 3) seems to not providing any useful insights as the data points are more spread, the top labeled playlists very sparse and far from each other even the spotify created playlists.

The hyper-parameter setting that I will use for the future clustering unsupervised learning algorithm is shown in Figure 4. This setting shows a trade-off between local and global structure preservation as well as a more clear clusters of data points.

![](cosine_label_final_UMAP_15_15.png "Fig 4. Main components/dimensions of the resulting UMAP algorithm. The algorithm used the Hamming distance with 50 number of neighbors and 0.09 as the minimum distance value. The graphs are labelled with the top playlists regarding number of streams, monthly active users and monthly engagement; coloured by type of creators.")
