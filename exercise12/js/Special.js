'use strict'

class Special {

  //Special constructor
  constructor() {
    this._$specials = $('div#specials');
    this._$targetDiv = $('<div />');
    this._$cachedReturnedObject = null;
    this._init();
  }

  _init() {
    this._appendTargetDiv(this._$specials);
    this._bindChangeEvent(this._$specials.find('select'));
    this._removeSubmitButton(this._$specials.find('li.buttons'));
  }

  _removeSubmitButton(buttonListItem) {
    buttonListItem.remove();
  }

  _appendTargetDiv(specials) {
    specials.append(this._$targetDiv);
  }

  _bindChangeEvent(element) {
    element.bind('change', () => {
      const value = element.val();
      if(value === ''){
        this._$targetDiv.empty();
      }

      this._checkIfJSONObjectIsCached(value);
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
    targetDiv.append(`<h3 style='color:${returnedObjectData.color}'>${returnedObjectData.title}</h3>`);
    targetDiv.append(`<p>${returnedObjectData.text}</p>`);
    const image = this._prepareImageString(returnedObjectData.image);
    targetDiv.append(`<img src='${image}' />`);
  }

  _prepareImageString(image) {
    if (image.charAt('0') === '/') {
      image = image.substring(1);
    }
    return image;
  }
}

$(() => {
  new Special();
}); 

