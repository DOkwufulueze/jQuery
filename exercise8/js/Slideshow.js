'use strict'

class Slideshow {

  //Slideshow constructor
  constructor() {
    this._$slideshow = $('ul#slideshow');
    this._$slideshowDiv = $('<div id="slideshowDiv"> </div>');
    this._$allButTheFirstListItem = $('ul#slideshow li:gt(0)');
    this._$navigation = $('<div class="navigation"> </div>');
    this._init();
  }

  _init() {
    this._moveSlideshowToTop(this._$slideshowDiv);
  }

  _moveSlideshowToTop(slideshowDiv) {
    slideshowDiv
      .css({
        height: '400px',
        overflow: 'hidden',
        width: '100%',
      })
      .append(this._$slideshow)
      .prependTo('body');
    this._beginSlideshow(this._$slideshow.children('li'));
    this._addNavigationArea(this._$navigation, this._$slideshow);
  }

  _addNavigationArea(navigation, slideshow) {
    navigation
    .css({
      background: '#bababa',
      width: '100%',
      marginBottom: '30px',
    })
    .insertAfter(slideshow.parent('div'));
    this._showSizeInNavigation(navigation, this._getSize(slideshow.children('li')));
    this._showImageViewed(this._$navigation, this._$slideshow.children('li').first());
  }

  _showSizeInNavigation(navigation, size) {
    navigation
    .html(`Total Number of Images: <b>${size}</b>.    Image Viewed: <span style='font-weight:bold;' class='image'> </span>`);
  }

  _beginSlideshow(listItems) {
    this._hideOtherListItems(this._$allButTheFirstListItem);
    setInterval(() => {
      this._showNext(listItems);
    }, 3000);
  }

  _hideOtherListItems(allButTheFirstListItem) {
    allButTheFirstListItem.css('display', 'none');
  }

  _showNext(listItems) {
    itemIndex = this._reset(itemIndex, this._getSize(listItems));
    const $currentItem = itemIndex > 0 ? $(listItems.get(itemIndex-1)) : $(listItems.get(itemIndex));
    const $nextItem = $(listItems.get(itemIndex));
    this._testItemAndShow($currentItem, $nextItem);
    itemIndex++;
  }

  _reset(itemIndex, size) {
    if (itemIndex === size ) {
      this._hideItem($('ul#slideshow li').last(), 5);
      itemIndex = 0;
    }
    return itemIndex;
  }

  _getSize(listItems) {
   return listItems.length;
  }

  _hideItem(listItem, duration) {
   listItem.fadeOut(duration);
  }

  _showItem(listItem, duration) {
   listItem.fadeIn(duration);
  }

  _testItemAndShow (currentItem, nextItem) {
    if (currentItem !== nextItem) {
      this._hideItem(currentItem, 2);
      this._showItem(nextItem, 1500);
    } else {
      this._showItem(nextItem, 1500);
    }

    this._showImageViewed(this._$navigation, nextItem);
  }

  _showImageViewed(navigation, item) {
    navigation
    .children('span.image')
    .html(item
      .children('img')
      .attr('alt')
    );
  }
}

let itemIndex = 1;
$(() => {
  new Slideshow();
});

