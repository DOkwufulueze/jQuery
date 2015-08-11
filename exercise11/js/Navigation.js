'use strict'

class Navigation {

  //Navigation constructor
  constructor() {
    this._$dropDown = $('ul#nav li ul');
    this._init();
  }

  _init() {
    this._manipulateDropDownMenu(this._$dropDown);
  }

  _manipulateDropDownMenu(dropDown) {
    dropDown
      .parent('li')
      .hover(() => {
        dropDown.toggleClass('hover');
      });
  }
}

$(() => {
  new Navigation();
});

