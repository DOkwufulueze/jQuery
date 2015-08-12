'use strict'

class Special {

  //Special constructor
  constructor($specials, $targetDiv) {
    this._$specials = $specials;
    this._$targetDiv = $targetDiv;
    this.selectItems = this._$specials.find('select');
    this._$cachedReturnedObject = null;
    this._init();
  }

  _init() {
    this._appendTargetDiv();
    this._bindChangeEvent();
    this._removeSubmitButton();
  }

  _removeSubmitButton() {
    this._$specials.find('li.buttons').remove();
  }

  _appendTargetDiv() {
    this._$specials.append(this._$targetDiv);
  }

  _bindChangeEvent() {
    this.selectItems.on('change', () => {
      const value = this.selectItems.val();
      if(value === ''){
        this._$targetDiv.empty();
      } else {
        this._checkIfJSONObjectIsCached(value);
      }
    });
  }

  _checkIfJSONObjectIsCached(value) {
    if (this._$cachedReturnedObject !== null) {
      this._generateHTMLForSpecial(this._$cachedReturnedObject, value)
    } else {
      this._loadAjax(value);
    }
  }

  _loadAjax(value) {
    $.ajax({
      type: 'get',
      dataType: 'json',
      url: 'data/specials.json',
      success: (returnedObject) => {
        this._$cachedReturnedObject = returnedObject;
        this._generateHTMLForSpecial(returnedObject, value);
      }
    });
  }

  _generateHTMLForSpecial(returnedObject, value) {
    if (returnedObject[value]) {
      const returnedObjectData = returnedObject[value];
      this._doGenerateHTMLForSpecial(returnedObjectData, value);
    } else {
      alert(`:::No Specials for ${value}`);
    }
  }

  _doGenerateHTMLForSpecial(returnedObjectData, value) {
    let targetDiv = this._$targetDiv;
    targetDiv.html('');
    targetDiv.append($('<h3 />', {
      'style': `color:${returnedObjectData.color}`,
      'text': returnedObjectData.title,
    }));
    targetDiv.append($('<p />', { 'text': returnedObjectData.text, }));
    const image = this._prepareImageString(returnedObjectData.image);
    targetDiv.append($('<img />', { 'src': image, }));
  }

  _prepareImageString(image) {
    if (image.charAt('0') === '/') {
      image = image.substring(1);
    }
    return image;
  }
}

$(() => {
  const $specials = $('div#specials');
  const $targetDiv = $('<div />');
  new Special($specials, $targetDiv);
}); 

