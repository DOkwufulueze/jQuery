'use strict'

class DivStack {

  //DivStack constructor
  constructor() {
    this._$body = $('body');
    this._$button = $('<input type="button" value="Add Item" style="float:right;" />');
    this._$emptyContainer = $('<div class="emptyContainer" style="width:100%;" />');
    this._init();
  }

  _init() {
    this._appendTo(this._$emptyContainer, this._$button);
    this._appendTo(this._$body, this._$emptyContainer);
    this._addEventListener(this._$emptyContainer);
  }

  _appendTo(container, content) {
    content.appendTo(container);
  }

  _addEventListener(emptyContainer) {
    emptyContainer.on('click', (eventObjet) => {
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
      this._appendTo(this._$emptyContainer, $(`<div style='width:100%;height:20px;margin-bottom:5px;cursor:pointer;'> DIV NUMBER ${counter} </div>`));
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
    target.css({
      background: '#eeee55',
      fontWeight: 'bold',
    });
  }
}


let counter = 1;
$(() => {
  new DivStack();
}); 

