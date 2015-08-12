'use strict'

class Loader {

  //Loader constructor
  constructor($headLines) {
    this._$headLines = $headLines;
    this._init();
  }

  _init() {
    this._createTargetDivs();
  }

  _createTargetDivs() {
    this._$headLines.each((index, element) => {
      let $targetDiv = $('<div />', { 'id': `targetDiv${index}`});
      $(element).data('targetDiv', $targetDiv);
      this._moveTargetDivToAppropriatePosition($targetDiv, $(element));
    });
  }

  _moveTargetDivToAppropriatePosition(targetDiv, element) {
    targetDiv.insertAfter(element);
    this._addEventListenerToHeadLine(element);
  }

  _addEventListenerToHeadLine(element) {
    element.on('click', (eventObject) => {
      eventObject.preventDefault();
      const url = element.find('a').attr('href');
      const id = `#${url.split('#')[1]}`;
      element.data('targetDiv').load(`data/blog.html ${id}`);
    });
  }
}

$(() => {
  const $headLines = $('div#blog h3');
  new Loader($headLines);
}); 

