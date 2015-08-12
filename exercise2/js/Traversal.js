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
    this._logAltAttribute();
    this._traverseToFormFrom();
    this._removeCurrentClass();
    this._traverseToButtonFrom();
    this._useSlideshowFirstList();
  }

  _logAltAttribute() {
    this._$image.each((index, image) => {
      console.log(`1. Image${index} alt attribute: ${image.alt}`);
    });
  }

  _traverseToFormFrom() {
    const $closestForm = this._$searchBox
      .closest('form')
      .attr('class', 'searchForm');
    console.log(`2. The Closest Form: class = '${$closestForm.attr('class')}'`);
  }

  _removeCurrentClass() {
    this._$currentListItem
      .removeClass('current')
      .next()
      .addClass('current');
  }

  _traverseToButtonFrom() {
    const $submitButton = this._$specialsSelect
      .parent()
      .next()
      .children('input[type="submit"]');
    console.log(`4. Submit button: class = '${$submitButton.attr('class')}'`);
  }

  _useSlideshowFirstList() {
    this._$slideshowFirstList
      .addClass('current')
      .siblings()
      .addClass('disabled');
  }
}

$(() => {
  new Traversal();
});

