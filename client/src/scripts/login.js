/* eslint-disable require-jsdoc, no-unused-vars */
import $ from 'jquery';
const url = 'http://127.0.0.1:3000';

const isEmpty = (str) => !str.trim().length;

$(() => {
  if (localStorage.getItem('userInfo')) {
    window.location.href = './home.html';
    return;
  }
});

$('[name=submitButton]').on('click', function (e) {
  e.preventDefault();
  // console.log('hehe');
  // const user = new User(
  //   'Lê Nguyên Chương',
  //   '../../assets/avatar.png',
  //   '25',
  //   '01-01-2024',
  //   'User',
  // );
  const username = $('#username').val();
  const password = $('#password').val();
  if (isEmpty(username) || isEmpty(password)) {
    $('[id=msg]').remove();
    const errorDiv = `
    <div
    id='msg'
    class='errors'
    style="background-color: rgb(255, 238, 221);"
    >
    Please fill in all of the required fields!
    </div>
    `;
    $('#fm1').prepend(errorDiv);
    // throw new Error('');
    return;
  }
  const body = {
    email: username,
    password: password,
  };
  $.post(url + '/account/login', body)
    .done(function (data) {
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('url', url);
      window.location.href = './home.html';
    })
    .fail(() => {
      $('[id=msg]').remove();
      const errorDiv = `
    <div
    id='msg'
    class='errors'
    style="background-color: rgb(255, 238, 221);"
    >
    The credentials you provided cannot be determined to be authentic.
    </div>
    `;
      $('#fm1').prepend(errorDiv);
      // throw new Error(
      //   'Failed to authorize login information. Wrong username or password?',
      // );
      return;
    });
});
