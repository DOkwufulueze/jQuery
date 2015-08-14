'use strict'

class DivStack {

  //DivStack constructor
  constructor($body, $button, $emptyContainer) {
    this._$body = $body;
    this._$button = $button;
    this._$emptyContainer = $emptyContainer;
    this._init();
  }

  //Entry Point
  _init() {
    this._beginInitialAppending();
    this._addEventListener();
  }

  _beginInitialAppending() {
    this._$emptyContainer.append(this._$button);
    this._$body.append(this._$emptyContainer);
  }

  _addEventListener() {
    this._$emptyContainer.on('click', (eventObjet) => {
      const $target = $(eventObjet.target);
      this._checkTargetTagType($target);
    });
  }

  _checkTargetTagType(target) {
    if (target.not('.emptyContainer').is('div')) {
      this._manipulateDiv(target);
    } else if (target.is('input')) {
      this._$emptyContainer.append($('<div />', {'class': 'newDiv','html': `DIV NUMBER ${counter}`}));
      counter += 1;
    }
  }

  _manipulateDiv(target) {
    target.is(this._$emptyContainer.children('div').last()) ? this._removeDiv(target) : target.addClass('highlightedDiv');
  }

  _removeDiv(target) {
    target.remove();
    counter -= 1;
  }
}


let counter = 1;
$(() => {
  const $body = $('body');
  const $button = $('<input />', {
    'type': 'button',
    'value': 'Add Item',
    'class': 'addButton',
  });

  const $emptyContainer = $('<div />', {'class': 'emptyContainer', });
  new DivStack($body, $button, $emptyContainer);
}); 

