'use strict'

class Traversal {

  //Selector constructor
  constructor() {
    this._image = $('img');
    this._searchBox = $('input[name="q"]');
    this._currentListItem = $('#myList .current');
    this._specialsSelect = $('#specials select');
    this._slideshowFirstList = $('#slideshow li:first');
    this._init();
  }

  _init() {
    this._logAltAttribute(this._image);
    this._traverseToFormFrom(this._searchBox);
    this._removeCurrentClass(this._currentListItem);
    this._traverseToButtonFrom(this._specialsSelect);
    this._useSlideshowFirstList(this._slideshowFirstList);
  }

  _logAltAttribute(images) {
    images.each((index, image) => {
      console.log(`1. Image${index} alt attribute: ${image.alt}`);
    });
  }

  _traverseToFormFrom(element) {
    const $closestForm = element
                          .closest('form')
                          .attr('class', 'searchForm');
    console.log(`2. The Closest Form: class = '${$closestForm.attr('class')}'`);
  }

  _removeCurrentClass(listItem) {
    listItem
      .removeClass('current')
      .next()
      .addClass('current');
  }

  _traverseToButtonFrom(select) {
    const $submitButton = select
                            .parent()
                            .next()
                            .children('input[type="submit"]');
    console.log(`4. Submit button: class = '${$submitButton.attr('class')}'`);
  }

  _useSlideshowFirstList(listItem) {
    listItem
      .addClass('current')
      .siblings()
      .addClass('disabled');
  }
}

$(() => {
  new Traversal();
});

