---
title: 'Analyzing Playlists. Part I: Introduction'
author: Javier Fernandez
date: '2021-07-07'
slug: []
categories: []
tags: []
subtitle: ''
lastmod: '2021-07-07T15:35:35+02:00'
authors: []
description: ''
series: []
hiddenFromHomePage: no
hiddenFromSearch: no
featuredImage: 'featured-frontpage.jpg'
featuredImagePreview: ''
toc:
  enable: yes
math: true
lightgallery: no
license: ''
---

<!--more-->

Everyone would agree on how streaming music platforms have changed our ways to consume music. Nowadays, listen to any kind of music has become very easy. Nearly any album you can think of, it is available only one click away. 

The behavior of the music users has also changed and today's listeners do not want to play song by song, album by album and artist by artist to find their next musical obsession. Many listeners would like to discover music that's been selected exclusively for their taste and in a format that's easily accessible. That is achieved by the use of playlists. Their importance has never been greater for both music distributors and audiences they are trying to reach. Playlists are a fundamental tool to discover, consume or market music.

Being included in the right playlists can boost the streaming numbers and maximize the exposure to a truly global audience. 

The large number of users and content of the music streaming platforms provides a vast amount of information that holds interesting patterns that could impact in business decision-making. 

# What makes a playlist succesful?

In this project, I analyze a dataset including playlists with related characteristics from Spotify in order to determine which ones are the most successful. 

The roadmap that I will follow is depicted below :(far fa-hand-point-down):



<center><img src="01-roadmap.png" alt="first-eda" width="1024"/></center>

# Defining Success 

## What is important to the platform?

In the ecosystem there is two actors that come into play: Listeners and creators. 

+ Listeners: their ***desire*** is to listen to their favorite music and discover new one (potentially via playlists).
+ Creators: their ***desire*** is to maximize the exposure of their creations by reaching as many listeners as possible and getting as many plays (streams) as possible (potentially via playlists). 

{{< admonition type=success title="The overall goal" open=true >}}
Maximizing the use of a playlist (the more listeners and the more streams, the more successful)
{{< /admonition >}}


## Dataset description ##

The dataset includes 403,366 playlists with the following features: 

| Column Name             	| Description                                                                                          	|
|-------------------------	|------------------------------------------------------------------------------------------------------	|
| playlist_uri            	| The key, Spotify uri of the playlist                                                                 	|
| owner                   	| Playlist owner, Spotify username                                                                     	|
| streams                 	| Number of streams from playlist today                                                                	|
| stream30s               	| Number of streams over 30 seconds from playlist today                                                	|
| dau                     	| Number of Daily Active Users, i.e. users with a stream over 30 seconds from playlist today           	|
| wau                     	| Number of Weekly Active Users, i.e. users with a stream over 30 seconds from playlist in past week   	|
| mau                     	| Number of Monthly Active Users, i.e. users with a stream over 30 seconds from playlist in past month 	|
| mau_previous_months     	| Number of Monthly Active Users in the month prior to this one                                        	|
| mau_both_months         	| Number of users that were active on the playlist both this and the previous month                    	|
| users                   	| Number of users streaming (all streams) from this playlist this month                                	|
| skippers                	| Number of users who skipped more than 90 percent of their streams today                              	|
| owner_country           	| Country of the playlist owner                                                                        	|
| n_tracks                	| Number of tracks in playlist                                                                         	|
| n_local_tracks          	| Change in number of tracks on playlist since yesterday                                               	|
| n_artists               	| Number of unique artists in playlist                                                                 	|
| n_albums                	| Number of unique albums in playlist                                                                  	|
| monthly_stream30s       	| Number of streams over 30 seconds this month                                                         	|
| monthly_owner_stream30s 	| Number of streams over 30 seconds by playlist owner this month                                       	|
| tokens                  	| List of playlist title tokens, stopwords and punctuation removed                                     	|
| genre_1                 	| No. 1 Genre by weight of playlist tracks                                                             	|
| genre_2                 	| No. 2 Genre by weight of playlist tracks                                                             	|
| genre_3                 	| No. 3 Genre by weight of playlist tracks                                                             	|
| mood_1                  	| No. 1 Mood by weight of playlist tracks                                                              	|
| mood_2                  	| No. 2 Mood by weight of playlist tracks                                                              	|
| mood_3                  	| No. 3 Mood by weight of playlist tracks      |


{{< admonition type=abstract title="Groups of features" open=true >}}
+ **User engagement within the playlist**: streams, stream30s, monthly_stream30s, monthly_owner_stream30s
+ **User engagement on the platform and sometimes within the playlist**: dau, wau, mau, mau_previous_months, mau_both_months, users, skippers
+ **Quantitative descriptions of the playlists**: tracks, n_local_tracks, n_artists, n_albums
+ **Qualitative descriptions of the playlists**: moods, genres, tokens

{{< /admonition >}}



## Potential success metrics

Considering the dataset given, the metrics that I think are related to successful playlist are shown below:

{{< admonition type=question title="What are the possible success metrics?" open=true >}}
+ **Playlist virality**: How many users are using the playlists?
    - [x] Metrics:  dau, wau, mau   
+ **User engagement with a playlist (long-term)**: Is the playlist still attractive to the same users?
    - [x] Metrics: mau, mau_previous_months/mau_both_months
+ **Number of consumptions or streams**: How many streams produce a playlist?
    - [x] Metrics: streams, stream30s, monthly_stream30s, monthly_owner_stream30s
+ **Low skip rate**: The less a user skips songs, the more he/she stays listening the playlists
    - [x] Metrics: skippers
{{< /admonition >}}

## Scope

In the dataset there is two types of streams depending on the source (from creators and from listeners). In this project, I focus specially on the listener's behaviors, in other words, streams from the followers of the playlists. 

Furthermore, I am going to focus on the long-term success (over a month). The playlists that are short-term successful might be due to seasonal or market reasons and not because of the playlist features. 

## What is the actual success metric?

As written above, I define successful playlists as those ones that are more used by listeners and therefore the most relevant success metric will be (considering the scope): 

{{< admonition type=success title="The sucess metric" open=true >}}
Monthly streams > 30seconds (excl. Owner streams)
{{< /admonition >}}


# Exploratory Data Analysis

In this stage, I will focus on particular features. I will discuss relationships of variables and how it could affect to our success metrics and how it verifies some of the assumptions I made on the first place. 

## Quantitative description of the dataset 

In this first section of the exploratory analysis, I will focus on describing the distribution of one of the sucess metrics. Particularly, I will show how the playlists are distributed by monthly streams from the listeners perspective:

<center>
  <img src="monthly_streams_creators.png" alt="pos-sent" width="1024"/>
  <figcaption> 
    <h4>Fig 1. Stripplot showing the distribution of the monthly streams (>30s) from listeners and the type of <i>creator</i>. Each green data point corresponds to a single playlist. There is 399 Spotify playlists while the rest were created by independent users.</h4>  
  </figcaption></h4>  
</center>

As mentioned, the playlists has two types of owners: Spotify (the own music platform) and independent users. According to the distribution of the data, the vast majority of the playlists are concentrated in a range below 250.000 monthly streams. From this chart, you can see that playlists from Spotify reaches higher number of streams and particularly there is two _Superstar_ playlists that has >40M streams! Looking at its characteristics, we can figure out that those playlists are two of the current 50 and 100 top hits songs. Probably these are heavily curated and I will consider them as outliers in the future stages of this analysis. 

As a first hint on where are the playlists concentrated when it comes to monthly streams, I want to investigate a bit further and show the proportion of playlists across different monthly stream ranges to identify those playlists with very few engagement. Furthermore, I will analyze the monthly active users of the playlists.

<center>
  <img src="first_eda_numbers.png" alt="first-eda" width="1024"/>
  <figcaption> 
    <h4>Fig 2. Barcharts showing the percentage of playlists over monthly streams (>30s) from listeners ranges (top) and monthly active users (MAU) ranges (middle). The bottom barchart shows the number of MAU of the top 15 most streamed playlists.</h4>  
  </figcaption></h4>  
</center>

As shown above, there is more than 30% of the playlists in the dataset with less than 10 monthly streams. Besides, there is more than 60% of the playlisyt with less than 3 monthly active users. If we compare these numbers, we observe that the top most streamed playlists have 100,000x the size of more than 60% of the playlists. These are massive ranges, and as we are interested in the most successful playlists, I will discard playlists with:
- Less than 3 monthly active users.
- Top 2 most streamed playlists (>40M monthly streams) as they are extreme super successful playlists that could possibly distort this analysis. 

This will leave the analysis with 102,891 playlists in total.

### Are the number of tracks, artists and albums a good predictor for high number of monthly streams?

In the following section I will discuss the linear relationship between the number of tracks, artists, albums and tokens with the number of monthly streams from the listeners. As these numbers are huge, both axis will be displayed in logarithmic scale. 

I will start analyzing the relationship of the number of tracks and the streams:

<center>
  <img src="scatter_tracks_monthly_listeners_robust.png" alt="tracks_streams" width="700" align=center/>
  <figcaption> 
    <h4>Fig 3. Scatterplot along with the curve resulted of fitting a linear regression between the monthly streams (>30s) from listeners and the number of <i>tracks</i>. Each green data point corresponds to a single playlist. The data is shown in a log-scaled due to the skewness of the distribution towards very high values. The results of the statistical tests are shown on the top of the plot.</h4>  
  </figcaption>
</center>

{{< admonition type=info title="Statistical Concepts" open=true >}}
- **Hypothesis testing**: Determine whether there is enough statistical evidence in favor of a certain belief, or hypothesis, about a parameter. It is common to test two hypothesis:
  - Null Hypothesis ($H_0$): Assumes that any kind of difference between the chosen characteristics that you see in a set of data is due to chance.
  - Alternative Hypothesis ($H_1$): A statement that contradicts the null hypothesis.
- **Statistical significance**: Probability that the observed difference between two groups is due to chance. This is quantified by using the $ p $-value. If this value is larger than the significance $ \alpha $ level chosen (eg, $ .05 $, assuming $ 95\\% $ of confidence level $ CI_{95\\%} $ ), any observed difference is assumed to be explained by sampling variability and therefore not considered significant
- **Effect size**: Magnitude of the difference between groups.
{{< /admonition >}}

{{< admonition type=info title="Classical Inferential Statistics" open=true >}}
Hypothesis testing uses statistical tests to determine whether a predictor variable has a statistically significant relationship with an outcome variable or to estimate the difference between two or more groups. Depending on how many groups one wants to compare there exists different statistical test: 
- **Compare two variables or groups: $ t $-tests**: This statistical test estimates the true difference between two group means using the ratio of the difference in group means over the pooled standard error of both groups. A larger $ t $-value shows that the difference between group means is greater than the pooled standard error, indicating a more significant difference between the groups. After the $ t $-value is found, one can calculate the $ p $-value compared to the critical value. As mentioned before, is often consider a $ p $-value $ < 0.05 $  enough to reject the null hypothesis and therefore determining there is a statistical difference between groups.
- **Comparing more than two groups: Analysis of the Variance (ANOVA)**: ANOVA uses the $ Fisher $ or $ F $-test for statistical significance: it compares the variance in each group mean from the overall group variance. If the variance within groups is smaller than the variance between groups, the $ F $-test will find a higher $ F $-value, and therefore a higher likelihood that the difference observed is real and not due to chance. This allows for comparison of multiple means at once, because the error is calculated for the whole set of comparisons rather than for each individual two-way comparison (which would happen with a $ t $-test).

{{< /admonition >}}

{{< admonition type=info title="Robust Inferential Statistics" open=true >}}

Classic inferential methods like the ANOVA $ F $-test or the $ t $-test assume normality and homoscedasticity (equal variances). If the data does not follow this, the tests can yield to inaccurate confidence intervals and poorly characterization of the extent of groups difference. Also, the presence of heavy outliers can alter the characteristics of the variables analyzed. Robust statistical methods deals with all these concerns. 
- **Robust Location Measures**:
  - Trimmed means: this robust alternative to the arithmetic mean contains the sample median as a special case. A trimmed mean discards a certain percentage at both ends of the distribution. For instance, a $ 10\\% $ trimmed mean cuts off $ 10\\%$  at the lower end and $ 10\\% $ the higher end of the distribution
  - Winsorized mean: Rather than discarding the lowest $ 10\\% $ of the values, as done by the $ 10\\% $ trimmed mean, they are set equal to the smallest value not trimmed. In a similar manner, the largest $ 10\\% $ are set equal to the largest value not trimmed. This process is called Winsorizing, which in effect transforms the tails of the distribution
- **Robust Correlation Coefficient**: $ Pearson’s $ correlation is not robust. Outliers can mask a strong association among the bulk of the data and even a slight departure from normality can render it meaningles.
  - Winsorized correlation $ \rho_w $: it uses Person’s correlation formula applied on the Winsorized data

{{< /admonition >}}



The Winsorised Pearson’s correlation test revealed that, across 102,891 playlists, a measure of number of tracks was positively correlated with monthly listeners streams >30s, and this effect was statistically significant ($p<0.05$). The effect size ($ \hat{r}_{Winsorized} =0.17 $) is small as per Funder & Ozer (2019) conventions.

Regarding the number of artists and albums, you can also observe there is a statistically significant positive correlation with monthly streams: 

<center>
  <img src="scatter_artists_monthly_listeners_robust.png" alt="tracks_streams" width="700"/>
  <figcaption> 
    <h4>Fig 4. Scatterplot along with the curve resulted of fitting a linear regression between the monthly streams (>30s) from listeners and the number of <i>artists</i>. Each green data point corresponds to a single playlist. The data is shown in a log-scaled due to the skewness of the distribution towards very high values. The results of the statistical tests are shown on the top of the plot.</h4>  
  </figcaption>
</center>

As before, the effect size is small $ \hat{r}_{Winsorized} =0.11 $

<center>
  <img src="scatter_albums_monthly_listeners_robust.png" alt="tracks_streams" width="700"/>
  <figcaption>
    <h4>Fig 5. Scatterplot along with the curve resulted of fitting a linear regression between the monthly streams (>30s) from listeners and the number of <i>albums</i>. Each green data point corresponds to a single playlist. The data is shown in a log-scaled due to the skewness of the distribution towards very high values. The results of the statistical tests are shown on the top of the plot.
    </h4>  
  </figcaption>
</center>

The same happens with the number of albums: $ \hat{r}_{Winsorized} =0.12 $, having a small size effect.
## Qualitative description of the dataset 

In this second part of the data exploration I will visualize the data related to qualitative features of the playlists. 

### Sentiment Analyis: Polarity score
Let's start by unpacking the feature _tokens_. This feature contains a list of tokens that the user has set when creating the playlist. One of the hypothesis is whether the number of tokens (user puts more effort in creating a _supercool_ playlist) is related to how how successful is this one for the listeners and specially for the creator. Another one is whether the positivity or negativity of the tokens are related to the streams.

To verify this, I will apply a sentiment analysis. This method is used to determine what feelings a writer is expressing in text. This algorithm gives an average polarity score on each list of words (positive or negative). 

<center>
  <img src="positive_sentiment.png" alt="pos-sent" width="800"/>
  <figcaption>
    <h4>Table 1. Playlists with the 10 most positive list of tokens.
    </h4>  
  </figcaption>
</center>

<center>
  <img src="neg_sentiment.png" alt="neg-sent" width="750"/>
  <figcaption>
    <h4>Table 2. Playlists with the 10 most negative list of tokens.
    </h4>  
  </figcaption>
</center>

As you see, the most positive scores refers to words related to music, children, classical while the most negative refers to bad words. This algorithm uses an augmented dictionary lookup, emphasizing valence shifters (i.e., negators, amplifiers (intensifiers), de-amplifiers (downtoners), and adversative conjunctions).

### Is the sentiment polarity score a good indicator on predicting the monthly streams? 

In this section I apply another linear regression to discuss the relationship between two variables. Is having more positives words related to achieving more streams? is it the other way around? or describing the playlists with positive or negative words is useless at all?

<center>
  <img src="scatter_polarity_monthly_listeners_robust.png" alt="sentiment_monthly_streams" width="800"/>
  <figcaption>
    <h4>Fig 6. Scatterplot along with the curve resulted of fitting a linear regression between the monthly streams (>30s) from listeners and the <i>polarity score</i>. Each green data point corresponds to a single playlist. The data is shown in a log-scaled due to the skewness of the distribution towards very high values. The results of the statistical tests are shown on the top of the plot.
    </h4>  
  </figcaption>
</center>

In the graph you can see a slightly positive correlation between the polarity or sentiment score and the monthly streams. This is statistically significant ($p<0.05$) but the effect size ($ \hat{r}_{Winsorized} =0.01 $) is small.

Even though the effect size of the correlation of these two variables is very small, the other statistical tests shows that the polarity score could be an important factor in the playlist discovery experience for the user and therefore I will keep this feature for the next analysis.

### Is the number of tokens a good indicator on predicting the monthly streams?

One may think also that there is an effect of putting more effort on describing the playlists i.e., adding a higher number of tokens. To test this hypothesis I will also study the relationship of these variables:

<center>
  <img src="scatter_tokens_monthly_listeners_robust.png" alt="tokens_streams" width="750"/>
  <figcaption>
    <h4>Fig 7. Scatterplot along with the curve resulted of fitting a linear regression between the monthly streams (>30s) from listeners and the number of <i>tokens</i>. Each green data point corresponds to a single playlist. The data is shown in a log-scaled due to the skewness of the distribution towards very high values. The results of the statistical tests are shown on the top of the plot.
    </h4>  
  </figcaption>
</center>

The chart suggest there is a slightly positive correlation between the number of tokens and the monthly listeners, but again there is a small effect size  ($ \hat{r}_{Winsorized} =0.04 $) of this statistical evidence. 

This may suggest that the more effort you put on describing the playlists (by adding more tokens) the more listeners the playlists reach, nonetheless in a low extent. 

### Lead genre and mood

These two variables: genres and moods, contains three levels by weights of playlist tracks. Sometimes, there is no gender and no mood in a playlist (defined with a _-_ symbol as a category) 

The percentage of the playlists across different lead gender and mood is displayed below:

<center>
  <img src="ratio_genre_mood.png" alt="lead_genre_mood" width="750"/>
<figcaption>
    <h4>Fig 8. Lollipop plots showing the percentage of playlists across lead mood categories (left) and lead genre categories (right).
    </h4>  
  </figcaption>
</center>

The top three most frequent lead moods of the playlists are Defiant, Excited and Yearning, whereas the top lead genders are Indi-Rock, Rap and Pop. 

### Is there any statistical difference on achieving more streams across lead genre and mood?

In the following charts, I show the distribution of the playlists by monthly streams across different lead genre and mood:

<center>
  <img src="lead_genre_monthlystreams_listenters_log_scale_vertical10_12_robust.png" alt="lead_genre_mood" width="1024"/>
  <figcaption>
    <h4>Fig 9. Violinplot with Boxplot showing the distribution of the monthly streams (>30s) from listeners across lead <i>genre</i> categories. Each data point corresponds to a single playlist. The data is shown in a log-scaled due to the skewness of the distribution towards very high values. The results of the statistical tests are shown on the top of the plot. The trimmed mean shown in the graph is the result of applying $ log_{10}(\mu_{trimmed}) = \hat{\mu}_{trimmed}  $ to its correspondent value. The $ x-axis $ is shown as a $ 10^x $ format.
    </h4>  
  </figcaption>
</center>

{{< admonition type=info title="Explanatory Measure of The Effect Size: $ \hat{\xi} $" open=true >}}
- **Effect sizes interpretation according to Wilcox et.al (2012)**: 
  - Small: $ \hat{\xi} = 0.10$  
  - Medium: $ \hat{\xi} = 0.30$ 
  - Large: $ \hat{\xi} = 0.50$ 
{{< /admonition >}}


The $ F $ - test applied to trimmed data evaluated that there is statistical differences ($p<0.05$) in playlists among different categories of lead genre.
The effect size $ \hat{\xi}=0.19 $ is somewhere between small and medium. In the graph, you can observe that the categories of the playlists with the highest means of monthly streams are _Latin_, _Children_ and _Traditional_.


What about the mood? In the chart shown below you can see a similar visualization containing the distribution of the monthly streams, this time across lead moods:
<center>
  <img src="lead_mood_monthlystreams_listenters_log_scale_vertical8_10_robust.png" alt="lead_genre_mood" width="1024"/>
  <figcaption>
    <h4>Fig 10. Violinplot with Boxplot showing the distribution of the monthly streams (>30s) from listeners across lead <i>mood</i> categories. Each data point corresponds to a single playlist. The data is shown in a log-scaled due to the skewness of the distribution towards very high values. The results of the statistical tests are shown on the top of the plot. The trimmed mean shown in the graph is the result of applying $ log_{10}(\mu_{trimmed}) = \hat{\mu}_{trimmed}  $ to its correspondent value. The $ x-axis $ is shown as a $ 10^x $ format.
    </h4>  
  </figcaption>
  </center>

The robust one-way ANOVA also shows a strong significant evidence ($p<0.05$) that the mean monthly streams across lead mood are different. The top moods are _Tender_, _Lively_ and _Other_. The effect size ($ \hat{\xi}=0.13 $) is small. Again, it might be interesting considering these three moods as related to achieving more streams. 

### Are the number of genres and moods a good predictor for high number of monthly streams?

A thought prior this analysis was related to how variety affects the number of monthly streams.

In the following chart, I show the distribution of the playlists by monthly streams across different number of genres and moods:

<center>
  <img src="nmr_moods_genres_monthlystreams_robust.png" alt="moods_genres" width="1024"/>
  <figcaption>
    <h4>Fig 11. Violinplot with Boxplot showing the distribution of the monthly streams (>30s) from listeners over number of lead <i>genre</i> categories (left) and number of lead <i>mood</i> categories (right). Each data point corresponds to a single playlist. The data is shown in a log-scaled due to the skewness of the distribution towards very high values. The results of the statistical tests are shown on the top of the plot. The trimmed mean shown in the graph is the result of applying $ log_{10}(\mu_{trimmed}) = \hat{\mu}_{trimmed}  $ to its correspondent value. The $ y-axis $ is shown as a $ 10^x $ format. The most significant comparison across number of genre and mood categories are also displayed ($p_{Holm-corrected}$)
    </h4>  
  </figcaption>
</center>

As you can observe, the vast majority of the monthly streams falls in a very low number of monthly streams. However, if you look at the mean of each of the groups you can see that the highest number of monthly streams is connected to the highest number of moods and genres. In other words, variety strengthens the user discovery process. 

Even though the means among groups (0, 1 ,2 and 3 number of genres/moods) may suggest there is a difference in the means, as mentioned before, sometimes the distribution of the observations does not show such evidence. 

Again, I applied the Fisher’s one-way ANOVA test on trimmed data:

- Number of Genres: There is a significant evidence ($p<0.05$) that the mean monthly streams across number of genres are different. The effect size ($ \hat{\xi}=0.13 $) , in other words, how large is the effect of this significant difference, is small.
- Number of Moods: There is a significant evidence ($p<0.05$) that the mean monthly streams across number of genres are different. The effect size ($ \hat{\xi}=0.13 $) is medium.

Also, there is relevant statistical significance between 1-2 and 1-3 number of genres and 0-2, 2-3 number of moods. This may suggest also that having more variety in genre and mood helps reaching more listeners.


## Conclusion

In this article I discussed the first two stages shown in the roadmap: 

The main goal is to describe what characteristics have successful playlists. I used a dataset that contains 400K playlists along with different features. In order to approach the problem I defined successful playlists are those that are capable of reaching high number of listeners, focusing on the long-term successes and monthly streams (>30s) as the major metric. 

After that, I performed a careful exploratory analysis showing the characteristics of the playlists. These are created by either the music platform or independent users. More than 30% of the playlists has less than 10 monthly streams and more than 60% of the playlists contains less than 3 monthly users. Also, the top most streamed playlists has more than 200K monthly active users which is 100.000x the size of those 60% mentioned playlists. This means there is a high proportion of playlists with very low streams and very low engagement and therefore I discarded those as they could be considered as non-successful.

Thereafter I compared the relationships between quantitative data with the success metrics. I formulated hypothesis and statistically tested the relationships. I found statistically significant positive weak correlations between the monthly streams and the number of artists, tracks and albums. However, the effect size was small in all comparisons. 

After that, I discussed the influence of qualitative data on reaching high number of monthly streams. First, I applied sentiment analysis on the tokens feature and I also analyzed the _effort proxy_ i.e., number of tokens and its influence on monthly streams. The tests showed again statistically significant weak positive linear correlations between monthly streams and positive-scored playlists and monthly streams and number of tokens with a small size effect.

Next, I focused on lead genre and mood. The most frequent genres are Indi-Rock, Rap and Pop whereas Defiant, Excited and Yearning are the most frequent moods. I also tested if any genre and mood category influence the most on achieving higher number of monthly streams. I found statistically significant differences across genre categories: Latin, Children and Traditional are the lead genres that gets higher monthly streams, again with a small-medium size effect. On the other hand Tender, Lively and Other are the lead mood categories on achieving more monthly streams, this time with a small size effect. Going on the genre and mood study, I analysed the number of genres and moods ( _variety proxy_ ). Here I also found statistical differences on higher number of genre and moods and achieving more streams, having a bigger size effect on the number of moods. 

To conclude, despite of finding statistical differences on different hypothesis the size effect of the statistical tests was either small or medium. Therefore there is no conclusive insights to clearly state what characteristics successful playlists have. 

	
	


