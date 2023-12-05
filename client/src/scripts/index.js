/* eslint-disable require-jsdoc */
import 'flowbite';
import $ from 'jquery';
import { fileUpload } from './home.js';
const url = localStorage.getItem('url');

class User {
  constructor(name, imageURL, remainingPages, resetDate, userType = 'student') {
    this.name = name;
    this.avatar = imageURL;
    this.remainingPages = remainingPages;
    this.resetDate = resetDate;
    this.userType = userType;
  }
}

let authToken;

if (localStorage.getItem('userToken')) {
  authToken = 'Bearer ' + localStorage.getItem('userToken');
}

$.ajaxSetup({
  headers: {
    Authorization: authToken,
  },
  contentType: 'application/json',
});

/* load user info on page load */
$(() => {
  if (!localStorage.getItem('userToken')) {
    window.location.href = './login.html';
    throw new Error('Not logged in!');
  }
  $.get(url + '/account/self')
    .done(function (data) {
      const user = new User(
        data.name,
        data.profile_image,
        data.credit,
        '01-01-2024',
        data.role,
        data.token,
      );
      localStorage.setItem('userInfo', JSON.stringify(user));
      if (data.role == 'student') {
        // $('a[href^="manage"]').addClass('hidden');
        const item1 = document.querySelector('a[href*="manage"]');
        const item2 = document.querySelector('a[href*="report"]');
        item1.classList.add('hidden');
        item2.classList.add('hidden');
      }
      // console.log(data);
      $('[id=user-name]')
        .text(user.name)
        .removeClass(
          'h-4 w-[75%] animate-pulse rounded-full bg-gray-300 dark:bg-gray-700',
        );
      $('[id=user-avatar]')
        .html(
          '<img class="h-14 w-14 aspect-square" src="' + user.avatar + '" />',
        )
        .removeClass('animate-pulse bg-gray-300');
      $('[id=user-remaining-pages]')
        .text(user.remainingPages + ' trang còn lại')
        .removeClass(
          'h-3 w-[60%] animate-pulse rounded-full bg-gray-300 dark:bg-gray-700',
        );
      $('[id=user-remaining-pages-mobile]')
        .text(user.remainingPages)
        .removeClass('animate-pulse');
      $('[id=user-reset-date]').text('Đặt lại vào ' + user.resetDate);
      if (user.userType == 'spso') {
        const userTypeDiv =
          `
        <div
          id="user-type"
          class="rounded-lg bg-button-primary dark:bg-button-primary-dark p-1 text-xs text-white"
        >
          ` +
          user.userType +
          `
        </div>`;
        $('[id=user-info]').append(userTypeDiv);
      }
      if (user.userType == 'staff') {
        const userTypeDiv =
          `
        <div
          id="user-type"
          class="rounded-lg bg-blue-secondary p-1 text-xs text-white"
        >
          ` +
          user.userType +
          `
        </div>`;
        $('[id=user-info]').append(userTypeDiv);
      }
    })
    .fail(function (xhr, status, error) {
      console.log(xhr);
      console.log(status);
      const errorCode = xhr.status;
      const errorMessage = xhr.responseJSON.error.message;
      window.location.href =
        './error.html?num=' + errorCode + '&msg=' + errorMessage;
      $('#error-code').html(errorCode);
      $('#error-description').html(errorMessage);
    });
});

const isDarkMode = localStorage.getItem('darkMode');
if (isDarkMode == 'true') {
  darkMode();
} else {
  lightMode();
}

function lightMode() {
  $('html').removeClass('dark');
  $('#dark-mode').addClass('hidden');
  $('#light-mode').removeClass('hidden');
  $('#ssps-logo').attr('src', '../../assets/ssps.png');
  localStorage.setItem('darkMode', 'false');
}

function darkMode() {
  $('html').addClass('dark');
  $('#light-mode').addClass('hidden');
  $('#dark-mode').removeClass('hidden');
  $('#ssps-logo').attr('src', '../../assets/ssps-dark.png');
  localStorage.setItem('darkMode', 'true');
}

/* Open detailed user card */
$('#user-card').on('click', function () {
  $('#user-card-expanded')
    .removeClass(
      'duration-[150ms] ease-m3-standard-accelerate invisible opacity-0 rounded-lg scale-y-90',
    )
    .addClass(
      'duration-[250ms] ease-m3-standard-decelerate translate-y-10 opacity-100 rounded-3xl pb-6 pt-2',
    );
});

/* Close detailed user card */
$('#user-card-expanded-close').on('click', function () {
  $('#user-card-expanded')
    .removeClass(
      'duration-[250ms] ease-m3-standard-decelerate translate-y-10 opacity-100 rounded-3xl pb-6 pt-2',
    )
    .addClass(
      'duration-[150ms] ease-m3-standard-accelerate invisible opacity-0 rounded-lg scale-y-90',
    );
});

/* enable dark mode */
$('#light-mode').on('click', function () {
  darkMode();
});

/* enable light mode */
$('#dark-mode').on('click', function () {
  lightMode();
});

/* buy more pages */
$('#add-pages').on('click', function () {
  window.location.href = './buy.html';
});

/* handle upload button event */
$('[id=uploadButton]').on('click', () => {
  $('#fileInput').trigger('click');
});

$('#fileInput').on('change', async function () {
  /* eslint-disable no-invalid-this */
  fileUpload(this.files[0]);
});

/* log out of the service */
$('#logout').on('click', function () {
  // logOut();
  localStorage.clear();
  window.location.href = './login.html';
});
