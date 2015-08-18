'use strict'

class DisplayManager {

  //DisplayManager constructor
  constructor($blog) {
    this._$blog = $blog;
    this._init();
  }

  _init() {
    this._addEventListenerToBlog();
  }

  _addEventListenerToBlog() {
    this._$blog.on('click', (eventObject) => {
      eventObject.preventDefault();
      const $target = $(eventObject.target);
      if (this._isHeadlineClicked($target)) {
        this._toggleExcerpt($target);
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

  _toggleExcerpt(target) {
    const $targetExcerpt = target.parents('h3').siblings('p.excerpt');
    this._slideUpExcerpts(target);
    this._slideDownExcerpt($targetExcerpt);
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
  const $blog = $('#blog');
  new DisplayManager($blog);
});

