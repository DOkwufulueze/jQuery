'use strict'

class Manipulator {

  //Manipulator constructor
  constructor() {
    this._$myList = $('#myList');
    this._$lastModule = $('.module').last();
    this._$daySelect = $('select[name="day"');
    this._$existingImages = $('img');
    this._init();
  }

  _init() {
    this._addFiveListItemsTo(this._$myList);
    this._removeOddListItems();
    this._manipulateLastModuleDiv(this._$lastModule);
    this._addAnotherDayOptionTo(this._$daySelect);
    this._addAnotherModuleDivWithImageCopy(this._$lastModule, this._$existingImages);
  }

  _addFiveListItemsTo(myList) {
    for (let list = 0; list < 5; list++) {
      myList.append('<li> </li>');
    }
  }

  _removeOddListItems(oddListItems) {
    const $oddListItems = $('#myList li:even');
    $oddListItems.remove();
  }

  _manipulateLastModuleDiv(lastModule) {
    lastModule
      .append('<h2> </h2>')
      .append('<p> </p>');
  }

  _addAnotherDayOptionTo(daySelect) {
    daySelect.append('<option value="Wednesday">Wednesday');
  }

  _addAnotherModuleDivWithImageCopy(lastModule, existingImages) {
    const $newModuleDiv = $('<div class="module"> </div>');
    $newModuleDiv.append(existingImages.clone(true).get(0));
    $newModuleDiv.insertAfter(lastModule);
  }
}

$(() => {
  new Manipulator();
});

