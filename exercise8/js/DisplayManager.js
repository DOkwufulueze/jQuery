'use strict'

class DisplayManager {

  //DisplayManager constructor
  constructor() {
    this._$blog = $('#blog');
    this._$excerptParagraph = $('#blog p.excerpt');
    this._$headline = $('#blog h3');
    this._init();
  }

  _init() {
    this._addEventListenerToBlog(this._$blog);
  }

  _addEventListenerToBlog(blog) {
    blog.on('click', (eventObject) => {
      this._preventDefaultForATag(eventObject);
      const $target = $(eventObject.target);
      if (this._isHeadlineClicked($target)) {
        this._slideDownTargetExcerptAndSlideUpOthers($target);
      }
    });
  }

  _isHeadlineClicked(target) {
    if (target.is('a')) {
      return true;
    } else {
      return false;
    }
  }

  _preventDefaultForATag(eventObject) {
    eventObject.preventDefault();
  }

  _slideDownTargetExcerptAndSlideUpOthers(target) {
    const $targetExcerpt = this._getTargetExcerpt(target);
    this._slideUpExcerpts(target);
    this._slideDownExcerpt($targetExcerpt);
  }

  _getTargetExcerpt(target) {
    return target.parents('h3').siblings('p.excerpt');
  }

  _slideUpExcerpts(target) {
    target
      .closest('li')
      .siblings('li')
      .children('p.excerpt')
      .slideUp(1000);
  }

  _slideDownExcerpt(targetExcerpt) {
    targetExcerpt.slideDown(1000);
  }
}

$(() => {
  new DisplayManager();
});

