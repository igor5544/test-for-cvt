
'use strict';

{
  let chanelListElement = document.querySelector('.channel-list');

  chanelListElement.classList.add('channel-list--js');

  $('.channel-list').mCustomScrollbar({
    normalizeDelta: true,
    theme: "inset-dark",
  });
}
