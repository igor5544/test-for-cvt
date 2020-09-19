'use strict';

{
  const ZERO_PADDING = 0;

  let htmlElement = document.querySelector('html');
  let bodyElement = document.body;

  function scrollbarWidth() {
    let documentWidth = parseInt(document.documentElement.clientWidth);
    let windowsWidth = parseInt(window.innerWidth);
    let scrollbarWidth = windowsWidth - documentWidth;
    return scrollbarWidth;
  }

  function scrollIndent() {
    bodyElement.style.marginRight = scrollbarWidth() + 'px';
  }

  function hideScroll() {
    htmlElement.setAttribute('style', '');
    htmlElement.classList.add('open-popup');
  }

  function showScroll() {
    bodyElement.style.marginRight = ZERO_PADDING;
    htmlElement.classList.remove('open-popup');
  }

  window.popupUtiils = {
    scrollIndent: scrollIndent,
    hideScroll: hideScroll,
    showScroll: showScroll,
  };
}
