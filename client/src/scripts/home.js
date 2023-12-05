/* eslint-disable require-jsdoc */
import * as pdfjsLib from 'pdfjs-dist/webpack.mjs';
import $ from 'jquery';
// import printJS from 'print-js';
const url = localStorage.getItem('url');

let dropZone;

export function fileUpload(file) {
  if (window.location.href.indexOf('home') === -1) {
    window.location.href = './home.html';
  }
  dropZone = $('#drop-zone').clone();
  // let printers = [];
  // get printers
  $.get(url + '/spso/printer/')
    .done(function (data) {
      // console.log(data);
      if (data.data.length == 0) {
        $('#print').attr(
          'class',
          'items inline-flex gap-x-1 rounded-full bg-[#4d69b2] px-5 py-2.5 text-center text-white shadow-1 transition ease-out dark:bg-button-primary-dark cursor-not-allowed',
        );
        const errorDiv = `
        <div class="px-3 py-2 bg-red-200 dark:bg-red-900 mix-blend-multiply dark:mix-blend-lighten rounded-full flex flex-row space-x-5 items-center">
          <svg class="self-center" xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32">
            <path fill="#B3261E" d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path>
          </svg>
          <p>Không tìm thấy máy in nào</p>
        </div>
        `;
        $('#drop-zone').append(errorDiv);
      } else {
        const printerList = data.data;
        printerList.forEach((element) => {
          if (element.printerStatus) {
            const printerDiv =
              `
              <div class="flex flex-row items-center space-x-2">
                <input
                  id="` +
              element.location +
              `"
                  type="radio"
                  value="` +
              element._id +
              `"
                  name="printer-select"
                  class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label for="` +
              element.location +
              `">` +
              element.location +
              `</label>
              </div>
            `;
            $('#printer-list').append(printerDiv);
          }
        });
      }
    })
    .fail(function (xhr, status, error) {
      // console.log(xhr);
      const errorCode = xhr.status;
      const errorMessage = xhr.responseJSON.error.message;
      window.location.href =
        './error.html?num=' + errorCode + '&msg=' + errorMessage;
      $('#error-code').html(errorCode);
      $('#error-description').html(errorMessage);
    });

  const uploaded = `
  <div
    id="drop-zone"
    class="flex-col space-y-5 rounded-3xl bg-card-background p-6 text-left transition-transform dark:bg-card-background-dark sm:p-8"
  >
    <div class="flex flex-row items-center space-x-5">
      <p class="text-2xl font-bold">PDF</p>
      <div class="flex flex-col" id="upload-document-properties">
        <div
          class="mb-2 h-5 w-60 animate-pulse rounded-full bg-gray-300"
        ></div>
        <div
          class="h-4 w-36 animate-pulse rounded-full bg-gray-300"
        ></div>
      </div>
    </div>
    <form class="flex flex-col space-y-3">
      <p>Chọn địa điểm</p>
      <div class="flex flex-col space-y-3" id="printer-list">
      </div>
    </form>
    <div
      class="flex flex-col rounded-xl p-3 shadow-1 transition hover:shadow-3"
    >
      <div
        class="flex cursor-pointer flex-col"
        id="expand-print-options"
      >
        <div class="flex flex-row items-center justify-between">
          <p>Tùy chọn in</p>
          <button
            class="rotate-180 items-center transition-transform"
            id="expand-print-options-arrow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              class="dark:fill-dark-surface"
            >
              <path
                d="m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <form
        class="invisible grid max-h-0 grid-cols-1 items-center space-y-2 rounded-xl bg-card-background align-middle opacity-0 transition-all duration-300 ease-in-out dark:bg-card-background-dark sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-3"
        id="print-options"
      >
        <hr class="col-span-full mt-2" />
        <label
          for="print-options-orientation"
          class="my-2 block text-sm"
        >
          Hướng</label
        >
        <select
          id="print-options-orientation"
          class="block w-full rounded-lg border-0 bg-gray-100 p-2.5 text-sm text-gray-900 mix-blend-multiply focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-dark-surface dark:mix-blend-screen"
        >
          <option selected value="portrait">Dọc</option>
          <option value="landscape">Ngang</option>
        </select>
        <label for="print-options-copies" class="mb-2 block text-sm">
          Bản sao</label
        >
        <select
          id="print-options-copies"
          class="block w-full rounded-lg border-0 bg-gray-100 p-2.5 text-sm text-gray-900 mix-blend-multiply focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-dark-surface dark:mix-blend-screen"
        >
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <label for="print-options-size" class="mb-2 block text-sm">
          Khổ giấy</label
        >
        <select
          id="print-options-size"
          class="block w-full rounded-lg border-0 bg-gray-100 p-2.5 text-sm text-gray-900 mix-blend-multiply focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-dark-surface dark:mix-blend-screen"
        >
          <option value="A0">A0</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="A3">A3</option>
          <option selected value="A4">A4</option>
          <option value="A5">A5</option>
          <option value="A6">A6</option>
          <option value="A7">A7</option>
        </select>
        <label
          for="print-options-pages-per-side"
          class="mb-2 block text-sm"
        >
          Số tờ mỗi mặt</label
        >
        <select
          id="print-options-pages-per-side"
          class="block w-full rounded-lg border-0 bg-gray-100 p-2.5 text-sm text-gray-900 mix-blend-multiply focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-dark-surface dark:mix-blend-screen"
        >
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="6">6</option>
        </select>
        <hr class="col-span-full mt-2" />
        <div class="flex flex-row space-x-3 items-center py-1">
          <input id="print-options-sided" type="checkbox" value="" class="w-4 h-4 text-blue-primary bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" >
          <label for="print-options-sided" class="ms-2 text-sm">In hai mặt</label>
        </div>
      </form>
    </div>
    <div class="flex w-full flex-row items-center justify-between">
      <button
        type="button"
        class="items inline-flex gap-x-3 rounded-full px-6 py-2.5 text-center text-black shadow-1 transition ease-out hover:bg-button-hover hover:shadow-3 active:bg-button-active dark:bg-button-dark dark:text-dark-surface dark:hover:bg-button-hover-dark dark:active:bg-button-active-dark"
        id="cancel-print"
      >
        Hủy
      </button>
      <button
        type="button"
        class="items inline-flex gap-x-1 rounded-full bg-button-primary px-5 py-2.5 text-center text-white shadow-1 transition ease-out hover:bg-button-primary-hover hover:shadow-3 active:bg-button-primary-active dark:bg-button-primary-dark dark:hover:bg-button-primary-hover-dark dark:active:bg-button-primary-active-dark"
        id="print"
        >
        Tiến hành in
      </button>
    </div>
  </div>
        `;
  $('#drop-zone').replaceWith(uploaded);

  // event handlers
  $('#cancel-print').on('click', () => {
    $('#drop-zone').replaceWith(dropZone.clone());
  });
  $('#print').on('click', () => {
    $('#drop-zone').replaceWith(dropZone.clone());
  });
  $('#expand-print-options').on('click', () => {
    if ($('#print-options').hasClass('invisible')) {
      $('#print-options')
        .removeClass('invisible max-h-0 opacity-0')
        .addClass('max-h-[1000px] opacity-100');
      $('#expand-print-options-arrow').removeClass('rotate-180');
      $('#expand-print-options-arrow').addClass('rotate-0');
    } else {
      $('#print-options')
        .addClass('invisible max-h-0 opacity-0')
        .removeClass('max-h-[1000px] opacity-100');
      $('#expand-print-options-arrow').removeClass('rotate-0');
      $('#expand-print-options-arrow').addClass('rotate-180');
    }
  });
  const fileURL = URL.createObjectURL(file);
  const pageSizes = {
    A0: { width: 841, height: 1190 },
    A1: { width: 594, height: 841 },
    A2: { width: 420, height: 594 },
    A3: { width: 297, height: 420 },
    A4: { width: 210, height: 297 },
    A5: { width: 148, height: 210 },
    A6: { width: 105, height: 148 },
    A7: { width: 74, height: 105 },
  };

  /* add file properties & verify file extensions */
  let filePages;
  const fname = file.name;
  const re = /(\.pdf|\.pdf)$/i;
  if (!re.exec(fname)) {
    throw new Error(
      'File type not supported! Please consult the help articles for more information.',
    );
  }
  pdfjsLib.getDocument(fileURL).promise.then((document) => {
    filePages = document.numPages;
    let oldSize = $('#print-options-size').val();
    let oldPerSheet = $('#print-options-pages-per-side').val();
    let data = {
      printer: '',
      note: 'some note',
      fileName: file.name,
      printProperties: {
        paperSize: $('#print-options-size').val(),
        numberOfPages: String(Math.ceil(filePages)),
        sided: String($('#print-options-sided').prop('checked')),
        copies: $('#print-options-copies').val(),
      },
    };
    $('#print-options').trigger('reset');
    $('#print-options-pages-per-side').on('change', function () {
      // Get the value of the selected radio button
      const selectedValue = $('#print-options-pages-per-side').val();
      filePages = (filePages * oldPerSheet) / selectedValue;
      $('#upload-document-properties').html(
        '<p>' +
        file.name +
        '</p><p>' +
        formatBytes(file.size, 2) +
        ' • ' +
        Math.ceil(filePages) +
        ' trang</p>',
      );
      oldPerSheet = selectedValue;
      data.printProperties.numberOfPages = String(Math.ceil(filePages));
    });
    $('input[name="printer-select"]').on('change', function () {
      data.printer = $('input[name="printer-select"]:checked').val();
    });

    $('#print-options-size').on('change', function () {
      const selectedValue = $('#print-options-size').val();
      filePages =
        (filePages * pageSizes[oldSize].width * pageSizes[oldSize].height) /
        (pageSizes[selectedValue].width * pageSizes[selectedValue].height);
      $('#upload-document-properties').html(
        '<p>' +
        file.name +
        '</p><p>' +
        formatBytes(file.size, 2) +
        ' • ' +
        Math.ceil(filePages) +
        ' trang</p>',
      );
      oldSize = selectedValue;
      data.printProperties.paperSize = oldSize;
      data.printProperties.numberOfPages = String(Math.ceil(filePages));
    });
    $('#print-options-copies').on('change', function () {
      data.copies = $('#print-options-copies').val();
    });
    $('#print-options-sided').on('change', function () {
      const checkboxValue = $('#print-options-sided').prop('checked');
      if (checkboxValue) {
        filePages = filePages / 2;
        $('#upload-document-properties').html(
          '<p>' +
          file.name +
          '</p><p>' +
          formatBytes(file.size, 2) +
          ' • ' +
          Math.ceil(filePages) +
          ' trang</p>',
        );
      } else {
        filePages = filePages * 2;
        $('#upload-document-properties').html(
          '<p>' +
          file.name +
          '</p><p>' +
          formatBytes(file.size, 2) +
          ' • ' +
          Math.ceil(filePages) +
          ' trang</p>',
        );
      }
      data.printProperties.sided = String(
        $('#print-options-sided').prop('checked'),
      );
    });

    // console.log(filePages);
    $('#upload-document-properties').html(
      '<p>' +
      file.name +
      '</p><p>' +
      formatBytes(file.size, 2) +
      ' • ' +
      filePages +
      ' trang</p>',
    );
    uploadFile(file, data);
  });
  $('html, body').animate({ scrollTop: 0 }, 'fast');
}

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KiB',
    'MiB',
    'GiB',
    'TiB',
    'PiB',
    'EiB',
    'ZiB',
    'YiB',
  ];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function loadQueue() {
  $.get(url + '/account/printorders')
    .done(function (data) {
      $('#queue-content').html('');
      if (data.length == 0) {
        $('#queue-content').html('Bạn không có mục nào trong hàng đợi.');
      }
      if (window.location.href.indexOf('home') !== -1) {
        //console.log(data);
        let count = 0;
        data.forEach((element) => {
          if (count < 4) {
            if (!element.status) {
              count++;
              $.get(url + '/spso/printer/' + element.printer).done(
                function (data) {
                  const fileName = element.fileName;
                  const queueLocation = data.data.location;
                  const queueStatus =
                    element.status === 'true' ? 'Đã in' : 'Đang xử lý';
                  let queueETA =
                    Date.parse(element.estimatedEndTime) - Date.now();
                  if (queueETA < 0) queueETA = 0;
                  const queueItem =
                    `
                      <div
                        class="flex w-full items-center py-1 max-md:flex-wrap max-md:justify-between md:flex-row md:space-x-2"
                      >
                        <p class="w-3/4 min-w-0 truncate md:w-full">` +
                    fileName +
                    `</p>
                        <a
                          href=""
                          class="my-auto w-14 shrink-0 justify-end text-right md:order-5 xl:w-16 2xl:w-20"
                          >Hủy</a
                        >
                        <div
                          class="flex w-full flex-row space-x-2 max-md:text-sm md:max-w-max"
                        >
                          <p class="shrink-0 truncate md:w-24 xl:w-28 2xl:w-32">` +
                    queueLocation +
                    `</p>
                          <div class="md:hidden">•</div>
                          <p class="w-28 shrink-0 truncate xl:w-32 2xl:w-36">` +
                    queueStatus +
                    `</p>
                          <p class="w-24 shrink-0 truncate max-md:hidden xl:w-28 2xl:w-32">
                            ` +
                    queueETA +
                    `
                          </p>
                        </div>
                      </div>
                    `;
                  $('#queue-content').append(queueItem);
                  // console.log(queueItem);
                },
              );
            }
          }

        });
      } else {
        data.forEach((element) => {
          if (!element.status) {
            $.get(url + '/spso/printer/' + element.printer).done(
              function (data) {
                const fileName = element.fileName;
                const queueLocation = data.data.location;
                const queueStatus =
                  element.status === 'true' ? 'Đã in' : 'Đang xử lý';
                let queueETA =
                  Date.parse(element.estimatedEndTime) - Date.now();
                if (queueETA < 0) queueETA = 0;
                const queueItem =
                  `
                  <div
                    class="flex w-full items-center py-1 max-md:flex-wrap max-md:justify-between md:flex-row md:space-x-2"
                  >
                    <p class="w-3/4 min-w-0 truncate md:w-full">` +
                  fileName +
                  `</p>
                    <a
                      href=""
                      class="my-auto w-14 shrink-0 justify-end text-right md:order-5 xl:w-16 2xl:w-20"
                      >Hủy</a
                    >
                    <div
                      class="flex w-full flex-row space-x-2 max-md:text-sm md:max-w-max"
                    >
                      <p class="shrink-0 truncate md:w-24 xl:w-28 2xl:w-32">` +
                  queueLocation +
                  `</p>
                      <div class="md:hidden">•</div>
                      <p class="w-28 shrink-0 truncate xl:w-32 2xl:w-36">` +
                  queueStatus +
                  `</p>
                      <p class="w-24 shrink-0 truncate max-md:hidden xl:w-28 2xl:w-32">
                        ` +
                  queueETA +
                  `
                      </p>
                    </div>
                  </div>
                `;
                $('#queue-content').append(queueItem);
                // console.log(queueItem);
              },
            );
          }
        });
      }
    })
    .fail(() => {
      const errorDiv = `
      <div class="px-3 py-2 bg-red-200 dark:bg-red-900 mix-blend-multiply dark:mix-blend-lighten rounded-full flex flex-row space-x-5 items-center" id="error-div">
        <svg class="self-center" xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32">
          <path fill="#B3261E" d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path>
        </svg>
        <p>Đã xảy ra lỗi khi tải hàng đợi. Vui lòng thử lại sau hoặc liên hệ bộ phận hỗ trợ.</p>
      </div>
    `;
      $('#queue').append(errorDiv);
    });
}

export function loadHistory() {
  $.get(url + '/account/printorders')
    .done(function (data) {
      $('#history-content').html('');
      if (data.length == 0) {
        $('#history-content').html('Bạn không có mục nào trong lịch sử.');
      }
      if (window.location.href.indexOf('home') !== -1) {
        let str = '';
        let check = false;
        let count = 0;
        for (let i = data.length - 1; i >= 0; i--) {
          if (data[i].status === true) {
            if (count < 4) {
              let element = data[i];
              check = true;
              count++;

              $.get(url + '/spso/printer/' + element.printer).done(
                function (data) {
                  const fileName = element.fileName;
                  const historyLocation = data.data.location;
                  const historyPages = element.printProperties.numberOfPages;
                  const historyTime = new Date(element.beginTime);
                  const historyTimeString = historyTime.toDateString();
                  // const queueETA = element.beginTime;
                  const historyItem =
                    `
                  <div
                  class="flex w-full items-center py-1 max-md:flex-wrap max-md:justify-between md:flex-row md:space-x-2"
                >
                  <p class="grow min-w-0 truncate md:w-full">
                    ` +
                    fileName +
                    `
                  </p>
                  <div class="w-2 shrink-0 md:hidden"></div>
                  <p
                    class="w-40 shrink-0 truncate max-md:text-right md:order-3 xl:w-44 2xl:w-48"
                  >
                  ` +
                    historyTimeString +
                    `
                  </p>
                  <div
                    class="flex w-full flex-row space-x-2 max-md:text-sm md:max-w-max"
                  >
                    <p class="shrink-0 truncate md:w-24 xl:w-28 2xl:w-32">` +
                    historyLocation +
                    `</p>
                    <div class="md:hidden">•</div>
                    <p class="w-28 shrink-0 truncate xl:w-32 2xl:w-36">` +
                    historyPages +
                    ` trang</p>
                  </div>
                </div>`;
                  // const historyItem =
                  //   `
                  //     <div
                  //       class="flex w-full items-center py-1 max-md:flex-wrap max-md:justify-between md:flex-row md:space-x-2"
                  //     >
                  //       <p class="w-3/4 min-w-0 truncate md:w-full">` +
                  //   fileName +
                  //   `</p>
                  //       <a
                  //         href=""
                  //         class="my-auto w-14 shrink-0 justify-end text-right md:order-5 xl:w-16 2xl:w-20"
                  //         >Hủy</a
                  //       >
                  //       <div
                  //         class="flex w-full flex-row space-x-2 max-md:text-sm md:max-w-max"
                  //       >
                  //         <p class="shrink-0 truncate md:w-24 xl:w-28 2xl:w-32">` +
                  //   historyLocation +
                  //   `</p>
                  //         <div class="md:hidden">•</div>
                  //         <p class="w-28 shrink-0 truncate xl:w-32 2xl:w-36">` +
                  //   historyStatus +
                  //   `</p>
                  //         <p class="w-24 shrink-0 truncate max-md:hidden xl:w-28 2xl:w-32">
                  //         ${new Date(element.beginTime).getDate()}/${
                  //           new Date(element.beginTime).getMonth() + 1
                  //         }/${new Date(element.beginTime).getFullYear()}
                  //         </p>
                  //       </div>
                  //     </div>
                  //   `;
                  str = historyItem + str;

                  // console.log(queueItem)
                },
              );
            }
          }
        }
        if (check == false) {
          $('#history-content').append('Bạn không có mục nào trong lịch sử.');
        } else {
          $('#history-content').append(str);
        }
      } else {
        let check = false;
        data.forEach((element) => {
          if (element.status === true) {
            check = true;
            $.get(url + '/spso/printer/' + element.printer).done(
              function (data) {
                const fileName = element.fileName;
                const historyLocation = data.data.location;
                const historyPages = element.printProperties.numberOfPages;
                const historyTime = new Date(element.beginTime);
                const historyTimeString = historyTime.toDateString();
                // const queueETA = element.beginTime;
                const historyItem =
                  `
                <div
                class="flex w-full items-center py-1 max-md:flex-wrap max-md:justify-between md:flex-row md:space-x-2"
              >
                <p class="grow min-w-0 truncate md:w-full">
                  ` +
                  fileName +
                  `
                </p>
                <div class="w-2 shrink-0 md:hidden"></div>
                <p
                  class="w-40 shrink-0 truncate max-md:text-right md:order-3 xl:w-44 2xl:w-48"
                >
                ` +
                  historyTimeString +
                  `
                </p>
                <div
                  class="flex w-full flex-row space-x-2 max-md:text-sm md:max-w-max"
                >
                  <p class="shrink-0 truncate md:w-24 xl:w-28 2xl:w-32">` +
                  historyLocation +
                  `</p>
                  <div class="md:hidden">•</div>
                  <p class="w-28 shrink-0 truncate xl:w-32 2xl:w-36">` +
                  historyPages +
                  ` trang</p>
                </div>
              </div>`;
                // const historyItem =
                //   `
                //     <div
                //       class="flex w-full items-center py-1 max-md:flex-wrap max-md:justify-between md:flex-row md:space-x-2"
                //     >
                //       <p class="w-3/4 min-w-0 truncate md:w-full">` +
                //   fileName +
                //   `</p>
                //       <a
                //         href=""
                //         class="my-auto w-14 shrink-0 justify-end text-right md:order-5 xl:w-16 2xl:w-20"
                //         >Hủy</a
                //       >
                //       <div
                //         class="flex w-full flex-row space-x-2 max-md:text-sm md:max-w-max"
                //       >
                //         <p class="shrink-0 truncate md:w-24 xl:w-28 2xl:w-32">` +
                //   historyLocation +
                //   `</p>
                //         <div class="md:hidden">•</div>
                //         <p class="w-28 shrink-0 truncate xl:w-32 2xl:w-36">` +
                //   historyStatus +
                //   `</p>
                //         <p class="w-24 shrink-0 truncate max-md:hidden xl:w-28 2xl:w-32">
                //         ${new Date(element.beginTime).getDate()}/${
                //           new Date(element.beginTime).getMonth() + 1
                //         }/${new Date(element.beginTime).getFullYear()}
                //         </p>
                //       </div>
                //     </div>
                //   `;
                $('#history-content').append(historyItem);
                // console.log(queueItem);
              },
            );
          }
        });
        if (check === false) {
          $('#history-content').append('Bạn không có mục nào trong lịch sử.');
        }
      }
      // console.log(data);
    })
    .fail(function (xhr, status, error) {
      // const errorCode = xhr.status;
      // const errorMessage = xhr.responseJSON.error.message;
      // window.location.href =
      //   './error.html?num=' + errorCode + '&msg=' + errorMessage;
      // $('#error-code').html(errorCode);
      // $('#error-description').html(errorMessage);
      const errorDiv = `
      <div class="px-3 py-2 bg-red-200 dark:bg-red-900 mix-blend-multiply dark:mix-blend-lighten rounded-full flex flex-row space-x-5 items-center" id="error-div">
        <svg class="self-center" xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32">
          <path fill="#B3261E" d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path>
        </svg>
        <p>Đã xảy ra lỗi khi tải lịch sử. Vui lòng thử lại sau hoặc liên hệ bộ phận hỗ trợ.</p>
      </div>
    `;
      $('#history').append(errorDiv);
    });
}

// load queue and history on page load
$(() => {
  loadQueue();
  loadHistory();
});

function uploadFile(file, data) {
  $('#print').on('click', (e) => {
    e.preventDefault();
    let id;

    $.post(url + '/printorder/', JSON.stringify(data))
      .done(function (data) {
        id = data.newOrderData.data.orderID;
      })
      .then(() => {
        var formData = new FormData();
        formData.append('printFile', file);
        $.ajax({
          type: 'POST',
          url: url + '/printorder/upload/' + id,
          data: formData,
          processData: false,
          contentType: false,
        })
          .done(function (uploadData) {
            window.location.reload();
          })
          .fail(function (xhr, status, error) {
            console.error(status, error);
          });
      })
      .fail(function (xhr, status, error) {
        console.error(status, error);
      });
  });
}
