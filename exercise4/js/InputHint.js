'use strict'

class InputHint {

  //InputHint Constructor
  constructor($label, $input) {
    this._$label = $label;
    this._$input = $input;
    this._init();
  }

  //Entry Point
  _init() {
    this._makeInputValueShowLabelText();
  }

  _makeInputValueShowLabelText() {
    this._$input
      .val(this._$label.text())
      .addClass('hint')
      .on({
        'focus': () => {this._removeHintText();},
        'blur': () => {this._restoreHintText();},
      })
      .prev('label').remove();
  }

  _removeHintText() {
    if (this._isInputHintString()) {
      this._$input
      .val('')
      .removeClass('hint');
    }
  }

  _restoreHintText() {
    if (this._isInputEmptyString()) {
      this._$input
        .val(this._$label.text())
        .addClass('hint');
    }
  }

  _isInputHintString() {
    return this._$input.val().trim() === this._$label.text();
  }

  _isInputEmptyString() {
    return this._$input.val().trim() === '';
  }
}

$(() => {
  const $label = $('label[for="q"]');
  const $input = $('input[name="q"]');
  new InputHint($label, $input);
});

