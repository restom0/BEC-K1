/* eslint-disable require-jsdoc */
import $ from 'jquery';
const data = [
  {
    'title': 'Chapter_5_V7.01_Accessible.pdf',
    'location': 'H1-203',
    'page': 23,
    'date': "T2, 30/10"
  }, {
    'title': 'Chapter_6_V7.01_Accessible.pdf',
    'location': 'H2-201',
    'page': 27,
    'date': "T7, 27/10"
  }, {
    'title': '05-2022-ĐỀ CƯƠNG MỚI-TƯ TƯỞNG HỒ CHÍ MINH-SP1037.pdf',
    'location': "H2-201",
    'page': 3,
    'date': "T4, 25/10"
  }, {
    'title': '6_SQL.pdf',
    'location': 'H3-402',
    'page': 45,
    'date': "T4, 25/10"
  }];
setTimeout(function () {
  let str = `<div class="flex w-full flex-row items-center justify-between pb-2">
    <p class="text-xl font-bold">Lịch sử</p>
  </div>
  <div class="flex flex-row">
    <p class="grow text-sm font-bold text-gray-600">Tiêu đề</p>
    <p class="basis-24 text-sm font-bold text-gray-600">Địa điểm</p>
    <p class="basis-28 text-sm font-bold text-gray-600">Số trang</p>
    <p class="basis-24 text-sm font-bold text-gray-600">Ngày</p>
  </div>
  <hr class="w-full border" />`;
  data.forEach((el, index) => {
    str +=
      `<div class="flex flex-row py-1">
        <p class="grow truncate text-left">
          ` +
      el['title'] +
      `
        </p>
        <p class="shrink-0 basis-24">` +
      el['location'] +
      `</p>
        <p class="shrink-0 basis-28">` +
      el['page'] +
      ` trang</p>
        <p class="shrink-0 basis-24">` +
      el['date'] +
      `</p>
      </div>`;
  });
  $('#history').html(str);
}, 2000);
