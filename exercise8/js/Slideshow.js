'use strict'

class Slideshow {

  //Slideshow constructor
  constructor($slideshowArea, $navigation) {
    this._$slideItems = $slideshowArea.find('li');
    this._$firstSlideItem = this._$slideItems.first();
    this._$allButTheFirstListItem = this._$slideItems.slice(1);
    this._slideShowSize = this._$slideItems.length;
    this._$slideshowArea = $slideshowArea;
    this._$navigation = $navigation;
    this._init();
  }

  _init() {
    this._moveSlideshowToTop();
    this._addNavigationArea();
    this._beginSlideshow();
  }

  _moveSlideshowToTop() {
    this._$slideshowArea.prependTo('body');
  }

  _addNavigationArea() {
    this._$navigation
    .css({
      background: '#bababa',
      width: '100%',
      marginBottom: '30px',
    })
    .insertAfter(this._$slideshowArea);
  }

  _showSlideShowSizeInNavigation() {
    this._$navigation
    .html(`${nextItem+1} of ${this._slideShowSize}... Image: ${this._showImageViewed()}`);
  }

  _beginSlideshow() {
    this._$allButTheFirstListItem.css('display', 'none');
    this._showSlideShowSizeInNavigation();
    this._$firstSlideItem
      .delay(3500)
      .fadeOut(500, () => {
        this._showNextSlideItem();
      });
  }

  _showNextSlideItem() {
    nextItem += 1;
    nextItem = this._resetNextItemIfOverflow();
    this._showSlideShowSizeInNavigation();
    this._revealSlideItem();
  }

  _revealSlideItem() {
    this._$slideItems.eq(nextItem)
      .fadeIn(500)
      .delay(3000)
      .fadeOut(500, () => {
        this._showNextSlideItem();
      });
  }

  _resetNextItemIfOverflow() {
    if (nextItem === this._slideShowSize) {
      nextItem = 0;
    }
    return nextItem;
  }

  _showImageViewed() {
    return this._$slideItems.eq(nextItem)
      .find('img')
      .attr('alt');
  }
}

let nextItem = 0;
$(() => {
  const $slideshowArea = $('ul#slideshow');
  $slideshowArea.css({ 'height': '400px', });
  const $navigation = $('<div />', {'class': 'navigation',});
  new Slideshow($slideshowArea, $navigation);
});

