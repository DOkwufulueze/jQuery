'use strict'

class DivStack {

  //DivStack constructor
  constructor($body, $button, $emptyContainer) {
    this._$body = $body;
    this._$button = $button;
    this._$emptyContainer = $emptyContainer;
    this._init();
  }

  _init() {
    this._beginAppending();
    this._addEventListener();
  }

  _beginAppending() {
    this._$emptyContainer.append(this._$button);
    this._$body.append(this._$emptyContainer);
  }

  _addEventListener() {
    this._$emptyContainer.on('click', (eventObjet) => {
      const $target = $(eventObjet.target);
      this._useTarget($target);
    });
  }

  _useTarget(target) {
    this._checkTargetTagType(target);
  }

  _checkTargetTagType(target) {
    if (target.not('.emptyContainer').is('div')) {
      this._ManipulateDiv(target);
    } else if (target.is('input')) {
      this._$emptyContainer.append($('<div />', {'class': 'newDiv','html': `DIV NUMBER ${counter}`}));
      counter += 1;
    }
  }

  _ManipulateDiv(target) {
    if (this._isLastDiv(target)) {
      this._removeDiv(target);
    } else {
      this._highlightDiv(target);
    }
  }

  _isLastDiv(target) {
    return target.is(this._$emptyContainer.children('div').last()) ? true : false;
  }

  _removeDiv(target) {
    target.remove();
    counter -= 1;
  }

  _highlightDiv(target) {
    target.addClass('highlightedDiv');
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

