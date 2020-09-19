'use strict';

{
  const INACTIVE_TAB_INDEX = -1;

  let tabBtnsElements = document.querySelectorAll('.navigation__link');
  let tabBtnsList = Array.prototype.slice.call(tabBtnsElements);
  let tabElements = document.querySelectorAll('.tab-item');
  let tabList = Array.prototype.slice.call(tabElements);

  tabBtnsList.forEach(function (tab, i) {
    if (i === 0) {
      tab.classList.add('navigation__link--active');
      tab.tabIndex = INACTIVE_TAB_INDEX;
    }

    tab.addEventListener('click', function (evt) {
      let activeTabElement = document.querySelector('.navigation__link--active');
      evt.preventDefault();

      if (tab !== activeTabElement) {
        changeActiveTabLink(tab, activeTabElement);
        changeActiveArticle(i);
      }
    });
  });

  function changeActiveTabLink(newTab, previousTab) {
    previousTab.removeAttribute('tabIndex');
    newTab.tabIndex = INACTIVE_TAB_INDEX;

    previousTab.classList.remove('navigation__link--active');
    newTab.classList.add('navigation__link--active');
  }

  function changeActiveArticle(i) {
    let activeTabElement = document.querySelector('.tab-item--active');

    activeTabElement.classList.add('tab-item--inactive');
    activeTabElement.classList.remove('tab-item--active');

    tabList[i].classList.add('tab-item--active');
    tabList[i].classList.remove('tab-item--inactive');
  }

  tabList.forEach(function (tab, i) {
    if (i === 0) {
      tab.classList.add('tab-item--active');
    } else {
      tab.classList.add('tab-item--inactive');
    }
  });
}
