class TabbedNavigation {
  
  //TabbedNavigation constructor
  constructor($module, $unorderedList) {
    this._$module = $module;
    this._$unorderedList = $unorderedList;
    this._init();
  }

  //Entry Point
  _init() {
    this._doTabbedNavigation();
  }

  _doTabbedNavigation() {
    this._insertUnorderedListBefore();
    this._manipulateUnorderedList();
    this._prepareToShowFirstTabAndRelatedModule();
  }

  //Preparing to show the first tab
  _prepareToShowFirstTabAndRelatedModule() {
    const $firstListItem = this._$unorderedList.children().first();
    const $relatedModule = this._getRelatedModule($firstListItem);
    this._showFirstTab($firstListItem);
    this._showRelatedModuleAndHideOtherModules($relatedModule);
  }

  //Showing the first tab
  _showFirstTab(firstListItem) {
    firstListItem.addClass('current');
  }

  //getting related .modulediv using the li's text
  _getRelatedModule(listItem) {
    return $(`h2:contains(${listItem.text()})`)
      .closest('div');
  }

  //Inserting the ul before the first .module div
  _insertUnorderedListBefore() {
    this._$unorderedList.insertBefore(this._$module.first());
  }

  //Manipulating the newly created ul
  _manipulateUnorderedList() {
    this._$module.each((index, moduleObject) => {

      //Appending list items iteratively to the ul
      this._appendListItem($(moduleObject));
    });
  }

  //Appending list item to the ul
  _appendListItem(specificModuleObject) {
    const h2Content = this._relatedModuleSpecs(specificModuleObject).text;
    const relatedModule = this._relatedModuleSpecs(specificModuleObject).relatedModule;
    const listItem = $('<li />', { 'text': h2Content, });
    this._bindEvent(listItem, relatedModule);
    this._$unorderedList.append(listItem);
  }

  //Binding a click event to the li
  _bindEvent(listItem, relatedModule) {
    listItem.on('click', () => {
      this._showRelatedModuleAndHideOtherModules(relatedModule);
      listItem.addClass('current');
      listItem.siblings('li').removeClass('current');
    });
  }

  //Showing the module div related to the li under consideration
  _showRelatedModuleAndHideOtherModules(relatedModule) {
    this._$module.css('display', 'none');
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
}

$(() => {
  const $module = $('div.module');
  const $unorderedList = $('<ul />');
  new TabbedNavigation($module, $unorderedList);
});

