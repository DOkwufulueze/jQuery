'use strict'

class Product {

  //Product constructor
  constructor($body, $navigations, $navigation, $colorNavigation, $availableNavigation, $productTable, $emptyReporter, $availableProductsLabel, $availableProducts) {
    this._$body = $body;
    this._$navigations = $navigations;
    this._$navigation = $navigation;
    this._$colorNavigation = $colorNavigation;
    this._$availableNavigation = $availableNavigation;
    this._$productTable = $productTable;
    this._$emptyReporter = $emptyReporter;    
    this._$availableProductsLabel = $availableProductsLabel;
    this._$availableProducts = $availableProducts;
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
    this._$body.append(this._$navigations);
    this._$navigations.append(this._$navigation);
    this._$navigations.append(this._$colorNavigation);
    this._$availableNavigation.append(this._$availableProductsLabel);
    this._$availableNavigation.append(this._$availableProducts);
    this._$navigations.append(this._$availableNavigation);
    this._$body.append(this._$productTable);
    this._loadProducts();
    this._addEventListenerToBody();
  }

  _loadProducts() {
    $.ajax({
      type: 'get',
      dataType: 'json',
      url: 'product.json',
      success: (returnedObject) => {
        this._doLoadProducts(returnedObject);
      }
    });
  }

  _addEventListenerToBody() {
    this._$body.bind('click', (eventObject) => {
      const $target = $(eventObject.target);
      if ($target.is('input')) {
        this._useTarget($target);
      }
    });
  }

  _useTarget(target) {
    const id = target.val().replace('_', ' ');
    if (target.get(0).checked) {
      this._pushAppropriateDataToRelevantArrays(id);
    } else {
      this._removeAppropriateDataFromRelevantArrays(id);
    }

    this._displayProducts();
  }

  _pushAppropriateDataToRelevantArrays(id) {
    if ($.inArray(id, this._navigationArray) >= 0){
      this._checkedNavigationArray.push(id);
    }

    if ($.inArray(id, this._colorArray) >= 0){
      this._checkedColorArray.push(id);
    }
  }

  _removeAppropriateDataFromRelevantArrays(id) {
    if ($.inArray(id, this._navigationArray) >= 0){
      this._checkedNavigationArray.splice(this._checkedNavigationArray.indexOf(id), 1);
    }

    if ($.inArray(id, this._colorArray) >= 0){
      this._checkedColorArray.splice(this._checkedColorArray.indexOf(id), 1);
    }
  }

  _hideAllRows() {
    this._$productTable
      .children('div')
      .css('display', 'none');
  }

  _displayProducts() {
    const checked = $('input:checked');
    this._showAllIfNoneSelected(checked);
  }

  _showAllIfNoneSelected(checked) {
    if (checked.length === 0) {
      this._$productTable
      .children('div')
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
      colorId = colorId.replace(' ', '_');
      $(`div.${colorId}.${available}`)
        .css('display', 'block');
      i += this._isSelectionExist($(`div.${colorId}.${available}`)) ? 1 : 0;
    });

    this._informOnHowMany(i);
  }

  _showAvailableProductsByBrandAndColor(available) {
    let i = 0;
    this._checkedNavigationArray.forEach((id) => {
      this._checkedColorArray.forEach((colorId) => {
        id = id.replace(' ', '_');
        colorId = colorId.replace(' ', '_');
        $(`div.${id}.${colorId}.${available}`)
          .css('display', 'block');
        i += this._isSelectionExist($(`div.${id}.${colorId}.${available}`)) ? 1 : 0;
      });
    });

    this._informOnHowMany(i);
  }

  _showAvailableProductsByBrandOnly(available) {
    let i = 0;
    this._checkedNavigationArray.forEach((id) => {
      id = id.replace(' ', '_');
      $(`div.${id}.${available}`)
        .css('display', 'block');
      i += this._isSelectionExist($(`div.${id}.${available}`)) ? 1 : 0;
    });

    this._informOnHowMany(i);
  }

  _showAvailableProducts(available) {
    let i = 0;
    $(`div.${available}`)
      .css('display', 'block');
    i += this._isSelectionExist($(`div.${available}`)) ? 1 : 0;
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
      colorId = colorId.replace(' ', '_');
      $(`div.${colorId}`)
        .css('display', 'block');
      i += this._isSelectionExist($(`div.${colorId}`)) ? 1 : 0;
    });

    this._informOnHowMany(i);
  }

  _showProductsByBrandAndColorRegardlessOfAvailableStatus() {
    let i = 0;
    this._checkedNavigationArray.forEach((id) => {
      this._checkedColorArray.forEach((colorId) => {
        id = id.replace(' ', '_');
        colorId = colorId.replace(' ', '_');
        $(`div.${id}.${colorId}`)
          .css('display', 'block');
        i += this._isSelectionExist($(`div.${id}.${colorId}`)) ? 1 : 0;
      });
    });

    this._informOnHowMany(i);
  }

  _showProductsByBrandOnlyRegardlessOfAvailableStatus() {
    let i = 0;
    this._checkedNavigationArray.forEach((id) => {
      id = id.replace(' ', '_');
      $(`div.${id}`)
        .css('display', 'block');
      i += this._isSelectionExist($(`div.${id}`)) ? 1 : 0;
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
    const modifiedBrand = brand.replace(' ', '_');
    const color = theObject.color;
    const modifiedColor = color.replace(' ', '_');
    if ($.inArray(brand, this._navigationArray) < 0) {
      this._navigationArray.push(brand);
      this._$navigation.append(this._getNavigationItem(brand, modifiedBrand));
    }

    if ($.inArray(color, this._colorArray) < 0) {
      this._colorArray.push(color);
      this._$colorNavigation.append(this._getNavigationItem(color, modifiedColor));
    }

    this._addObjectToGrid(theObject);
  }

  _getNavigationItem(item, modifiedItemText) {
    return $('<div />')
      .append($('<label />', {
        'for': modifiedItemText,
        'class': 'gridLabel',
        'text': item,
      }))
      .append($('<input />', {
        'for': modifiedItemText,
        'class': 'gridInput',
        'type': 'checkbox',
        'name': modifiedItemText,
        'id': modifiedItemText,
        'value': modifiedItemText,
      }));
  }

  _addObjectToGrid(theObject) {
    const color = theObject.color;
    const available = theObject.sold_out === '1' ? 'NO' : 'YES';
    const image = $('<img />', {
      'src': `images/${theObject.url}`,
    });

    const $objectDiv = $('<div />', { 'class': 'grid', });
    $objectDiv.addClass(theObject.brand.replace(' ', '_'));
    $objectDiv.addClass(theObject.color);
    $objectDiv.addClass(`product${theObject.sold_out}`);
    $objectDiv.html(image);
    this._$productTable.append($objectDiv);
  }

  _appendRow(row) {
    this._$productTable.append(row);
  }
}

$(() => {
  const $body = $('body');
  const $navigations = $('<div />', { 'id': 'navigations', });
  const $navigation = $('<div />', { 'id': 'navigation', });
  const $colorNavigation = $('<div />', { 'id': 'colorNavigation', });
  const $availableNavigation = $('<div />', { 'id': 'availableNavigation', });
  const $productTable = $('<div />', { 'id': 'product', });
  const $emptyReporter = $('<div />', {
    'id': 'emptyReporter',
    'text': ':::No Product to Show for your selected Combination.',
  });
  
  const $availableProductsLabel = $('<label />', {
    'for': 'availableProducts',
    'text': 'Available Products',
  });

  const $availableProducts = $('<input />', {
    'type': 'checkbox',
    'id': 'availableProducts',
    'value': 'product1',
  });

  new Product($body, $navigations, $navigation, $colorNavigation, $availableNavigation, $productTable, $emptyReporter, $availableProductsLabel, $availableProducts);
}); 

