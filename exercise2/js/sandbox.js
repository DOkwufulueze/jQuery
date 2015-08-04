'use strict'

class Traversal {

  //Selector constructor
  constructor() {
    this._$image = $('img');
    this._$searchBox = $('input[name="q"]');
    this._$currentListItem = $('#myList .current');
    this._$specialsSelect = $('#specials select');
    this._$slideshowFirstList = $('#slideshow li:first');
    this._init();
  }

  _init() {
    this._logAltAttribute(this._$image);
    this._traverseToFormFrom(this._$searchBox);
    this._removeCurrentClass(this._$currentListItem);
    this._traverseToButtonFrom(this._$specialsSelect);
    this._useSlideshowFirstList(this._$slideshowFirstList);
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

