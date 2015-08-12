'use strict'

class Manipulator {

  //Manipulator constructor
  constructor($myList, $lastModule, $daySelect, $existingImages) {
    this._$myList = $myList;
    this._$lastModule = $lastModule;
    this._$daySelect = $daySelect;
    this._$existingImages = $existingImages;
    this._init();
  }

  _init() {
    this._addFiveListItemsToMyList();
    this._removeOddListItems();
    this._manipulateLastModuleDiv();
    this._addAnotherDayOptionTo();
    this._addAnotherModuleDivWithImageCopy();
  }

  _addFiveListItemsToMyList() {
    for (let list = 0; list < 5; list++) {
      this._$myList.append($('<li />'));
    }
  }

  _removeOddListItems() {
    const $oddListItems = $('#myList li:even');
    $oddListItems.remove();
  }

  _manipulateLastModuleDiv() {
    this._$lastModule
      .append($('<h2 />'))
      .append($('<p />'));
  }

  _addAnotherDayOptionTo() {
    this._$daySelect.append($('<option />', {
      'value': 'Wednesday',
      'text': 'Wednesday',
    }));
  }

  _addAnotherModuleDivWithImageCopy() {
    const $newModuleDiv = $('<div />', {'class': 'module'});
    $newModuleDiv.append(this._$existingImages.clone(true).get(0));
    $newModuleDiv.insertAfter(this._$lastModule);
  }
}

$(() => {
  const $myList = $('#myList');
  const $lastModule = $('.module').last();
  const $daySelect = $('select[name="day"');
  const $existingImages = $('img');
  new Manipulator($myList, $lastModule, $daySelect, $existingImages);
});

