'use strict'

class Loader {

  //Loader constructor
  constructor() {
    this._$headLines = $('div#blog h3');
    this._init();
  }

  _init() {
    this._createTargetDivs(this._$headLines);
  }

  _createTargetDivs(headLines) {
    headLines.each((index, element) => {
      let $targetDiv = $(`<div id=targetDiv${index}> </div>`);
      $(element).data('targetDiv', $targetDiv);
      this._moveTargetDivToAppropriatePosition($targetDiv, $(element));
    });
  }

  _moveTargetDivToAppropriatePosition(targetDiv, element) {
    targetDiv.insertAfter(element);
    this._addEventListenerToHeadLine(element);
  }

  _addEventListenerToHeadLine(element) {
    element.bind('click', (eventObject) => {
      eventObject.preventDefault();
      const url = element.find('a').attr('href');
      const id = `#${url.split('#')[1]}`;
      element.data('targetDiv').load(`data/blog.html ${id}`);
    });
  }
}

$(() => {
  new Loader();
}); 

