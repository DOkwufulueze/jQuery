'use strict'

class InputHint {

  //InputHint Constructor
  constructor() {
    this._$label = $('label[for="q"]');
    this._$input = $('input[name="q"]');
    this._init();
  }

  //Entry Point
  _init() {
    this._implementInputHint(this._$input, this._$label);
  }

  _implementInputHint(input, label) {
    this._searchInputValueToLabelText(input, label);
  }

  _searchInputValueToLabelText(input, label) {
    input
      .val(label.text())
      .addClass('hint')
      .bind({
        'focus': () => {this._removeHintText(input, label);},
        'blur': () => {this._restoreHintText(input, label);},
      })
      .prev('label').remove();
  }

  _removeHintText(input, label) {
    if (this._isInputHintString(input, label)) {
      this._performRemovalofHint(input, label);
    }
  }

  _restoreHintText(input, label) {
    if (this._isInputEmptyString(input)) {
      this._performRestoreOfHint(input, label);
    }
  }

  _performRemovalofHint(input, label) {
    input
      .val('')
      .removeClass('hint');
  }

  _performRestoreOfHint(input, label) {
    input
      .val(label.text())
      .addClass('hint');
  }

  _isInputHintString(input, label) {
    if (input.val() === label.text()) {
      return true;
    } else {
      return false;
    }
  }

  _isInputEmptyString(input) {
    if (input.val() === '') {
      return true;
    } else {
      return false;
    }
  }
}

$(() => {
  new InputHint();
});

