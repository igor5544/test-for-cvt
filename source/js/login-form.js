/* requires:
popup-utils.js
*/

'use strict';

{
  const POPUP_REMOVE_DELAY_IN_MS = 300;
  const BTN_TEXT_LOGOUT = 'Выйти';

  let loginFormElement = document.querySelector('.login-form');
  let loginFieldElement = loginFormElement.querySelector('#login');
  let rememberFieldElement = loginFormElement.querySelector('#remember');
  let passwordFieldElement = loginFormElement.querySelector('#password');
  let userNameElement = document.querySelector('.header__user');
  let loginBtnElement = document.querySelector('.header__btn');

  let isStorageSupport = true;
  let storageLogin;
  let storageRemember;

  let popupSettings = {
    type: 'inline',
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: POPUP_REMOVE_DELAY_IN_MS,
    mainClass: 'popup-login--zoom',
    callbacks: {
      beforeOpen: function () {
        window.popupUtiils.scrollIndent();
      },
      open: function () {
        window.popupUtiils.hideScroll();
        focusField();
      },
      close: function () {
        window.popupUtiils.showScroll();
      }
    }
  }

  $('a[href="#popup-login"').magnificPopup(popupSettings);
  refreshStorageInfo();

  function refreshStorageInfo() {
    try {
      storageLogin = localStorage.getItem('login');
    } catch (err) {
      isStorageSupport = false;
    }

    try {
      storageRemember = localStorage.getItem('remember');
    } catch (err) {
      isStorageSupport = false;
    }

    if (storageLogin) {
      loginFieldElement.value = storageLogin;
    }

    if (storageRemember == 'true' && storageLogin) {
      userLiogIn();
    }
  }

  function focusField() {
    setTimeout(function () {
      if (storageLogin) {
        passwordFieldElement.focus();
      } else {
        loginFieldElement.focus();
      }
    }, POPUP_REMOVE_DELAY_IN_MS);
  }

  loginFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (isStorageSupport) {
      localStorage.setItem('login', loginFieldElement.value);
      localStorage.setItem('remember', rememberFieldElement.checked);
    }

    $.magnificPopup.close();
    passwordFieldElement.value = '';
    userLiogIn();
  });

  function userLiogIn() {
    userNameElement.textContent = localStorage.getItem('login');
    userNameElement.addEventListener('click', swapOnTextField);

    swapBtn();
  }

  function swapBtn() {
    let newBtnElement = loginBtnElement.cloneNode(true);

    newBtnElement.classList.add('header__btn--logout');
    newBtnElement.textContent = BTN_TEXT_LOGOUT;
    newBtnElement.setAttribute('href', '');
    newBtnElement.addEventListener('click', userLogout);

    loginBtnElement.replaceWith(newBtnElement);

    function userLogout(evt) {
      evt.preventDefault();
      userNameElement.textContent = '';

      localStorage.setItem('remember', 'false');

      newBtnElement.replaceWith(loginBtnElement);
    }
  }

  function swapOnTextField() {
    let textContent = userNameElement.textContent;

    let inputTextElement = document.createElement('input');
    inputTextElement.setAttribute('maxlength', '20');
    inputTextElement.setAttribute('type', 'text');
    inputTextElement.classList.add('header__user');
    inputTextElement.classList.add('header__user--edit');
    inputTextElement.value = textContent;

    userNameElement.replaceWith(inputTextElement);
    inputTextElement.focus();

    inputTextElement.addEventListener('keydown', function (evt) {
      if (evt.key == 'Enter') {
        inputTextElement.blur();
      }
    });

    inputTextElement.addEventListener('blur', function () {
      endEdit();
    });

    function endEdit() {
      if (inputTextElement.value > 0) {
        userNameElement.textContent = inputTextElement.value;
      }

      if (isStorageSupport) {
        localStorage.setItem('login', inputTextElement.value);
      }

      refreshStorageInfo();

      inputTextElement.replaceWith(userNameElement);
    }
  }
}
