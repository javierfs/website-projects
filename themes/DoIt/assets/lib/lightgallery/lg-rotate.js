/**
 * lightgallery | 2.2.0-beta.0 | June 15th 2021
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.lgRotate=e()}(this,function(){"use strict";var i=function(){return(i=Object.assign||function(t){for(var e,i=1,o=arguments.length;i<o;i++)for(var r in e=arguments[i])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},t="lgAfterAppendSlide",o="lgBeforeSlide",r={rotate:!0,rotateLeft:!0,rotateRight:!0,flipHorizontal:!0,flipVertical:!0};function e(t,e){return this.core=t,this.$LG=e,this.settings=i(i({},r),this.core.settings),this}return e.prototype.buildTemplates=function(){var t="";this.settings.flipVertical&&(t+='<button type="button" id="lg-flip-ver" aria-label="flip vertical" class="lg-flip-ver lg-icon"></button>'),this.settings.flipHorizontal&&(t+='<button type="button" id="lg-flip-hor" aria-label="Flip horizontal" class="lg-flip-hor lg-icon"></button>'),this.settings.rotateLeft&&(t+='<button type="button" id="lg-rotate-left" aria-label="Rotate left" class="lg-rotate-left lg-icon"></button>'),this.settings.rotateRight&&(t+='<button type="button" id="lg-rotate-right" aria-label="Rotate right" class="lg-rotate-right lg-icon"></button>'),this.core.$toolbar.append(t)},e.prototype.init=function(){var e=this;this.settings.rotate&&(this.buildTemplates(),this.rotateValuesList={},this.core.LGel.on(t+".rotate",function(t){t=t.detail.index;e.core.getSlideItem(t).find(".lg-img-wrap").first().wrap("lg-img-rotate")}),this.core.outer.find("#lg-rotate-left").first().on("click.lg",this.rotateLeft.bind(this)),this.core.outer.find("#lg-rotate-right").first().on("click.lg",this.rotateRight.bind(this)),this.core.outer.find("#lg-flip-hor").first().on("click.lg",this.flipHorizontal.bind(this)),this.core.outer.find("#lg-flip-ver").first().on("click.lg",this.flipVertical.bind(this)),this.core.LGel.on(o+".rotate",function(t){e.rotateValuesList[t.detail.index]||(e.rotateValuesList[t.detail.index]={rotate:0,flipHorizontal:1,flipVertical:1})}))},e.prototype.applyStyles=function(){this.core.getSlideItem(this.core.index).find(".lg-img-rotate").first().css("transform","rotate("+this.rotateValuesList[this.core.index].rotate+"deg) scale3d("+this.rotateValuesList[this.core.index].flipHorizontal+", "+this.rotateValuesList[this.core.index].flipVertical+", 1)")},e.prototype.rotateLeft=function(){this.rotateValuesList[this.core.index].rotate-=90,this.applyStyles()},e.prototype.rotateRight=function(){this.rotateValuesList[this.core.index].rotate+=90,this.applyStyles()},e.prototype.getCurrentRotation=function(t){if(!t)return 0;t=this.$LG(t).style(),t=t.getPropertyValue("-webkit-transform")||t.getPropertyValue("-moz-transform")||t.getPropertyValue("-ms-transform")||t.getPropertyValue("-o-transform")||t.getPropertyValue("transform")||"none";if("none"!==t){t=t.split("(")[1].split(")")[0].split(",");if(t){t=Math.round(Math.atan2(t[1],t[0])*(180/Math.PI));return t<0?t+360:t}}return 0},e.prototype.flipHorizontal=function(){var t=this.core.getSlideItem(this.core.index).find(".lg-img-rotate").first().get(),t=this.getCurrentRotation(t),t=90!==t&&270!==t?"flipHorizontal":"flipVertical";this.rotateValuesList[this.core.index][t]*=-1,this.applyStyles()},e.prototype.flipVertical=function(){var t=this.core.getSlideItem(this.core.index).find(".lg-img-rotate").first().get(),t=this.getCurrentRotation(t),t=90!==t&&270!==t?"flipVertical":"flipHorizontal";this.rotateValuesList[this.core.index][t]*=-1,this.applyStyles()},e.prototype.isImageOrientationChanged=function(){var t=this.rotateValuesList[this.core.index],e=Math.abs(t.rotate)%360!=0,i=t.flipHorizontal<0,t=t.flipVertical<0;return e||i||t},e.prototype.closeGallery=function(){this.isImageOrientationChanged()&&this.core.getSlideItem(this.core.index).css("opacity",0),this.rotateValuesList={}},e.prototype.destroy=function(){this.core.LGel.off(".lg.rotate"),this.core.LGel.off(".rotate")},e});