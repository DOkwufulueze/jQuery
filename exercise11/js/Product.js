'use strict'

class Product {

  //Product constructor
  constructor() {
    this._$body = $('body');
    this._$navigations = $('<div id="navigations" style="float:left;clear:none;width:150px;" />');
    this._$navigation = $('<div id="navigation" style="float:left;clear:both;width:150px;margin-bottom:30px;" />');
    this._$colorNavigation = $('<div id="colorNavigation" style="float:left;clear:none;width:150px;margin-bottom:30px;" />');
    this._$availableNavigation = $('<div id="availableNavigation" style="float:left;clear:none;width:150px;margin-bottom:30px;" />');
    this._$availableProductsLabel = $('<label for="availableProducts" > Available Products </label>');
    this._$availableProducts = $('<input type="checkbox" id="availableProducts" value="product1" />');
    this._$productTable = $('<div id="product" style="float:left;clear:none;width:700px;" />');
    this._$emptyReporter = $('<div style="display:none;float:left;clear:none;width:100%;background:#bababa;color:#5a1111;">:::No Product to Show for your selected Combination.</div>');
    this._$heading = {
      "name":"S/N",
      "url":"PRODUCT IMAGE",
      "color":"COLOUR",
      "brand":"BRAND",
      "sold_out":"AVAILABLE",
    };
    this._navigationArray = [];
    this._checkedNavigationArray = [];
    this._colorArray = [];
    this._checkedColorArray = [];
    this._availableArray = [];
    this._checkedAvailableArray = [];
    this._init();
  }

  _init() {
    this._beginProductManipulation();
  }

  _beginProductManipulation() {
    this._appendRow(this._fillRowWithColumns(this._$heading, '40px'));
    this._addTo(this._$body, this._$navigations);
    this._addTo(this._$navigations, this._$navigation);
    this._addTo(this._$navigations, this._$colorNavigation);
    this._addTo(this._$availableNavigation, this._$availableProductsLabel);
    this._addTo(this._$availableNavigation, this._$availableProducts);
    this._addTo(this._$navigations, this._$availableNavigation);
    this._addTo(this._$body, this._$productTable);
    this._loadProducts(this._$productTable);
    this._addEventListener(this._$body);
  }

  _addTo(container, contained) {
    contained.appendTo(container);
  }

  _loadProducts(productTable) {
    $.ajax({
      type: 'get',
      dataType: 'json',
      url: 'product.json',
      success: (returnedObject) => {
        this._doLoadProducts(returnedObject);
      }
    });
  }

  _addEventListener(element) {
    element.bind('click', (eventObject) => {
      const $target = $(eventObject.target);
      if ($target.is('input')) {
        this._useTarget($target);
      }
    });
  }

  _useTarget(target) {
    const id = target.val();
    if (target.get(0).checked) {
      this._pushAppropriateDataToRelevantArrays(id);
    } else {
      this._removeAppropriateDataFromRelevantArrays(id);
    }
    this._displayProducts(id);
  }

  _pushAppropriateDataToRelevantArrays(id) {
    this._pushDataToArray(id.replace('_', ' '), this._checkedNavigationArray, this._navigationArray);
    this._pushDataToArray(id.replace('_', ' '), this._checkedColorArray, this._colorArray);
  }

  _removeAppropriateDataFromRelevantArrays(id) {
    this._removeDataFromArray(id.replace('_', ' '), this._checkedNavigationArray, this._navigationArray);
    this._removeDataFromArray(id.replace('_', ' '), this._checkedColorArray, this._colorArray);
  }

  _pushDataToArray(id, array, pivot) {
    if ($.inArray(id, pivot) >= 0){
      array.push(id);
    }
  }

  _removeDataFromArray(id, array, pivot) {
    const index = array.indexOf(id);
    if ($.inArray(id, pivot) >= 0){
      array.splice(index, 1);
    }
  }

  _hideAllRows() {
    this._$productTable
      .children('div:gt(0)')
      .css('display', 'none');
  }

  _displayProducts(id) {
    const checked = $('input:checked');
    this._showAllIfNoneSelected(checked);
  }

  _showAllIfNoneSelected(checked) {
    if (checked.length === 0) {
      this._$productTable
      .children('div:gt(0)')
      .css('display', 'block');
    } else{
      this._showCheckedDataOnly(checked);
    }
  }

  _showCheckedDataOnly(checked) {
    this._hideAllRows();
    const available = this._$availableProducts.get(0).checked ? 'product0' : '';
    if (available !== '') {
      this._showProductsThatAreAvailable(available);
    } else {
      this._showProductsRegardlessOfAvailableStatus();
    }
  }

  _showProductsThatAreAvailable(available) {
    if (this._checkedNavigationArray.length === 0 && this._checkedColorArray.length > 0) {
      this._showAvailableProductsByColorOnly(available);
    } else if (this._checkedNavigationArray.length > 0 && this._checkedColorArray.length > 0) {
      this._showAvailableProductsByBrandAndColor(available);
    } else if (this._checkedNavigationArray.length > 0 && this._checkedColorArray.length === 0) {
      this._showAvailableProductsByBrandOnly(available);
    } else if (this._checkedNavigationArray.length === 0 && this._checkedColorArray.length === 0) {
      this._showAvailableProducts(available);
    }
  }

  _showAvailableProductsByColorOnly(available) {
    let i = 0;
    this._checkedColorArray.forEach((colorId) => {
      $(`div.${colorId.replace(' ', '_')}.${available.replace(' ', '_')}`)
        .css('display', 'block');
      i += this._isSelectionExist($(`div.${colorId.replace(' ', '_')}.${available.replace(' ', '_')}`)) ? 1 : 0;
    });

    this._informOnHowMany(i);
  }

  _showAvailableProductsByBrandAndColor(available) {
    let i = 0;
    this._checkedNavigationArray.forEach((id) => {
      this._checkedColorArray.forEach((colorId) => {
        $(`div.${id.replace(' ', '_')}.${colorId.replace(' ', '_')}.${available.replace(' ', '_')}`)
          .css('display', 'block');
        i += this._isSelectionExist($(`div.${id.replace(' ', '_')}.${colorId.replace(' ', '_')}.${available.replace(' ', '_')}`)) ? 1 : 0;
      });
    });

    this._informOnHowMany(i);
  }

  _showAvailableProductsByBrandOnly(available) {
    let i = 0;
    this._checkedNavigationArray.forEach((id) => {
      $(`div.${id.replace(' ', '_')}.${available.replace(' ', '_')}`)
        .css('display', 'block');
      i += this._isSelectionExist($(`div.${id.replace(' ', '_')}.${available.replace(' ', '_')}`)) ? 1 : 0;
    });

    this._informOnHowMany(i);
  }

  _showAvailableProducts(available) {
    let i = 0;
    $(`div.${available.replace(' ', '_')}`)
      .css('display', 'block');
    i += this._isSelectionExist($(`div.${available.replace(' ', '_')}`)) ? 1 : 0;

    this._informOnHowMany(i);
  }

  _showProductsRegardlessOfAvailableStatus() {
    if (this._checkedNavigationArray.length === 0 && this._checkedColorArray.length > 0) {
      this._showProductsByColorOnlyRegardlessOfAvailableStatus();
    } else if (this._checkedNavigationArray.length > 0 && this._checkedColorArray.length > 0) {
      this._showProductsByBrandAndColorRegardlessOfAvailableStatus();
    } else if (this._checkedNavigationArray.length > 0 && this._checkedColorArray.length === 0) {
      this._showProductsByBrandOnlyRegardlessOfAvailableStatus();
    }
  }

  _showProductsByColorOnlyRegardlessOfAvailableStatus() {
    let i = 0;
    this._checkedColorArray.forEach((colorId) => {
      $(`div.${colorId.replace(' ', '_')}`)
        .css('display', 'block');
      i += this._isSelectionExist($(`div.${colorId.replace(' ', '_')}`)) ? 1 : 0;
    });

    this._informOnHowMany(i);
  }

  _showProductsByBrandAndColorRegardlessOfAvailableStatus() {
    let i = 0;
    this._checkedNavigationArray.forEach((id) => {
      this._checkedColorArray.forEach((colorId) => {
        $(`div.${id.replace(' ', '_')}.${colorId.replace(' ', '_')}`)
          .css('display', 'block');
        i += this._isSelectionExist($(`div.${id.replace(' ', '_')}.${colorId.replace(' ', '_')}`)) ? 1 : 0;
      });
    });

    this._informOnHowMany(i);
  }

  _showProductsByBrandOnlyRegardlessOfAvailableStatus() {
    let i = 0;
    this._checkedNavigationArray.forEach((id) => {
      $(`div.${id.replace(' ', '_')}`)
        .css('display', 'block');
      i += this._isSelectionExist($(`div.${id.replace(' ', '_')}`)) ? 1 : 0;
    });

    this._informOnHowMany(i);
  }

  _isSelectionExist(selection) {
    return selection.length > 0 ? true : false;
  }

  _informOnHowMany(selection) {
    if (selection === 0) {
      this._$emptyReporter
        .css('display', 'block')
        .appendTo(this._$productTable);
    } else {
      this._$emptyReporter.css('display', 'none');
    }
  }

  _doLoadProducts(returnedObject) {
    returnedObject.forEach((theObject, index) => {
      this._addObjectData(theObject);
    });
  }

  _addObjectData(theObject) {
    const brand = theObject.brand;
    const color = theObject.color;
    const available = theObject.sold_out;
    this._checkAndAddIfNotInArray(brand, this._navigationArray, brand.replace(' ', '_'), this._$navigation);
    this._checkAndAddIfNotInArray(color, this._colorArray, color.replace(' ', '_'), this._$colorNavigation);
    this._appendRow(this._fillRowWithColumns(theObject, '130px'));
  }

  _checkAndAddIfNotInArray(item, array, modifiedItemText, DOMElement) {
    if ($.inArray(item, array) < 0) {
      array.push(item);
      DOMElement.append(`<div style='clear:both;'><label for='${modifiedItemText}' style='clear:none;float:left;'>${item}</label><input style='clear:none;float:left;' type='checkbox' name='${modifiedItemText}' id='${modifiedItemText}' value='${modifiedItemText}' /></div>`);
    }
  }

  _fillRowWithColumns(theObject, height) {
    const $row = $(`<div style='height:${height};border-bottom:1px solid #bababa;' />`);
    this._appendColumnsToRow($row, theObject);
    $row.attr('class', theObject.brand.replace(' ', '_'));
    $row.addClass(theObject.color);
    $row.addClass(`product${theObject.sold_out}`);
    return $row;
  }

  _appendColumnsToRow(row, theObject) {
    Object.keys(theObject).forEach((key) => {
      let value = key === 'sold_out' ? (theObject[key] === 'AVAILABLE' ? "AVAILABLE" : (theObject[key] === '1' ? "NO" : "YES")) : (key === 'url' ? (theObject[key] === 'PRODUCT IMAGE' ? "PRODUCT IMAGE" : `<img src='images/${theObject[key]}' style='width:120px;height:120px;'`) : theObject[key]) ;
      row.append(`<div style='float:left;clear:none;width:130px;margin-right:5px;'>${value}</div>`);
    });
  }

  _appendRow(row) {
    this._$productTable.append(row);
  }
}

$(() => {
  new Product();
}); 

