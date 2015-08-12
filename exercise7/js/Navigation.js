'use strict'

class Navigation {

  //Navigation constructor
  constructor($dropDown) {
    this._$dropDown = $dropDown;
    this._init();
  }

  _init() {
    this._manipulateDropDownMenu();
  }

  _manipulateDropDownMenu() {
    this._$dropDown
      .parent('li')
      .hover(() => {
        this._$dropDown.toggleClass('hover');
      });
  }
}

$(() => {
  const $dropDown = $('ul#nav li ul');
  new Navigation($dropDown);
});

