class TabbedNavigation {
  
  //TabbedNavigation constructor
  constructor() {
    this._$module = $('div.module');
    this._init();
  }

  //Entry Point
  _init() {
    this._doTabbedNavigation(this._$module);
  }

  _doTabbedNavigation(moduleObjects) {
    const $unorderedList = this._createUnorderedList();
    this._insertUnorderedListBefore($unorderedList, moduleObjects.first());
    this._manipulateUnorderedList($unorderedList, moduleObjects);
    this._prepareToShowFirstTab($unorderedList);
  }

  //Preparing to show the first tab
  _prepareToShowFirstTab(unorderedList) {
    const $firstListItem = unorderedList.children().first();
    const $relatedModule = this._getRelatedModule($firstListItem);
    this._showFirstTab($firstListItem, $relatedModule);
  }

  //Showing the first tab
  _showFirstTab(firstListItem, relatedModule) {
    this._addClassToListItem(firstListItem, 'current');
    this._showRelatedModuleAndHideOtherModules(relatedModule);
  }

  //getting related .modulediv using the li's text
  _getRelatedModule(listItem) {
    return $(`h2:contains(${listItem.text()})`)
            .closest('div');
  }

  //Hiding all .module div's
  _hideAllModules(moduleObjects) {
    moduleObjects.css('display', 'none');
  }

  //Creating a ul
  _createUnorderedList() {
    return $('<ul> </ul>');
  }

  //Inserting the ul before the first .module div
  _insertUnorderedListBefore(unorderedList, firstModulesObject) {
    unorderedList.insertBefore(firstModulesObject);
  }

  //Manipulating the newly created ul
  _manipulateUnorderedList(unorderedList, moduleObjects) {
    moduleObjects.each((index, moduleObject) => {

      //Appending list items iteratively to the ul
      this._appendListItem(unorderedList, $(moduleObject));
    });
  }

  //Appending list item to the ul
  _appendListItem(unorderedList, specificModuleObject) {
    const h2Content = this._relatedModuleSpecs(specificModuleObject).text;
    const relatedModule = this._relatedModuleSpecs(specificModuleObject).relatedModule;
    const listItem = this._filledListItem(h2Content);
    this._bindEvent(listItem, relatedModule);
    unorderedList.append(listItem);
  }

  //Binding a click event to the li
  _bindEvent(listItem, relatedModule) {
    listItem.bind('click', () => {
      this._showRelatedModuleAndHideOtherModules(relatedModule);
      this._addClassToListItem(listItem, 'current');
      this._removeClassFromListItem(this._getOtherListSiblingsOf(listItem), 'current');
    });
  }

  //Other li siblings of the li under consideration
  _getOtherListSiblingsOf(listItem) {
    return listItem.siblings('li');
  }

  //Removing the class name 'current' from an li
  _removeClassFromListItem(listItem, className) {
    listItem.removeClass(className);
  }

  //Adding the class name 'current' to an li
  _addClassToListItem(listItem, className) {
    listItem.addClass(className);
  }

  //Showing the module div related to the li under consideration
  _showRelatedModuleAndHideOtherModules(relatedModule) {
      this._hideAllModules(this._$module);
      relatedModule.css('display','block');
  }

  //Getting the specs(related module div and text) of the module div
  _relatedModuleSpecs(specificModuleObject) {
    return {relatedModule: specificModuleObject,
            text: specificModuleObject
            .children('h2')
            .first()
            .text(),
          };
  }

  //Setting the text of the li
  _filledListItem(h2Content) {
    return $(`<li>${h2Content}</li>`);
  }

}

$(() => {
  new TabbedNavigation();
});