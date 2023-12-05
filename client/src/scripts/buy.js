import $ from 'jquery';
const url = localStorage.getItem('url');
const formattingOptions = {
  style: 'currency',
  currency: 'VND',
};
const pricePerPage = 200;
const data = [
  {
    page: 5,
    cost: 5 * pricePerPage,
  },
  {
    page: 10,
    cost: 10 * pricePerPage,
  },
  {
    page: 20,
    cost: 20 * pricePerPage,
  },
  {
    page: 50,
    cost: 50 * pricePerPage,
  },
  {
    page: 100,
    cost: 100 * pricePerPage,
  },
];

let authToken;

if (localStorage.getItem('userToken')) {
  authToken = 'Bearer ' + localStorage.getItem('userToken');
}

$.ajaxSetup({
  headers: {
    Authorization: authToken,
  },
});

$(() => {
  data.forEach((element) => {
    const buyDiv =
      `
    <div class="flex flex-row justify-between" id="buy-item">
    <div class="flex flex-row items-center space-x-2">
    <input
    id="` +
      element.page +
      `"
    type="radio"
    value="` +
      element.page +
      `"
    name="buy-select"
    class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
    />
    <label for="` +
      element.page +
      `">` +
      element.page +
      ` trang</label>
    </div>
    <div class="flex flex-row items-center space-x-2">
    <p>` +
      element.cost.toLocaleString('vi-VN', formattingOptions) +
      `</p>
      </div>
      </div>`;
    $('#buy-item-area').append(buyDiv);
  });
});

$('#buy-continue').on('click', () => {
  const selectedValue = $('input[name="buy-select"]:checked').val();
  const selectedPrice = (selectedValue * pricePerPage).toLocaleString(
    'vi-VN',
    formattingOptions,
  );
  if (selectedValue) {
    const newDiv =
      `
      <p class="text-xl font-bold">Mua thêm trang</p>
      <p>Chọn số trang cần mua</p>
      <div class="flex flex-row justify-between" id="buy-item">
        <div class="flex flex-row items-center space-x-2">
          <input
            disabled
            checked
            id="disabled-radio-1"
            type="radio"
            value=""
            name="disabled-radio"
            class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <p>` +
      selectedValue +
      ` trang</p>
        </div>
        <div class="flex flex-row items-center space-x-2">
          <p>` +
      selectedPrice +
      ` </p>
        </div>
      </div>
      <p>Chọn phương thức thanh toán</p>
      <div class="flex flex-row justify-between" id="buy-item">
        <div class="flex flex-row items-center space-x-2">
          <input
            id="momo"
            type="radio"
            value="momo"
            name="payment-method"
            class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label for="momo">MoMo</label>
        </div>
        <img src="../../assets/momo.png" />
      </div>
      <div class="flex flex-row justify-between" id="buy-item">
        <div class="flex flex-row items-center space-x-2">
          <input
            id="napas"
            type="radio"
            value="napas"
            name="payment-method"
            class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label for="napas">Thẻ nội địa (NAPAS)</label>
        </div>
        <img src="../../assets/napas.png" />
      </div>
      <div class="flex flex-row justify-between" id="buy-item">
        <div class="flex flex-row items-center space-x-2">
          <input
            id="bkpay"
            type="radio"
            value="bkpay"
            name="payment-method"
            class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label for="bkpay">BKPay</label>
        </div>
        <img src="../../assets/hcmut.png" />
      </div>
      <div class="flex w-full flex-row items-center justify-between pb-2">
        <button
          type="button"
          id="buy-goback"
          class="items inline-flex gap-x-3 rounded-full px-6 py-2.5 text-center text-black shadow-1 transition ease-out hover:bg-button-hover hover:shadow-3 active:bg-button-active dark:bg-button-dark dark:text-dark-surface dark:hover:bg-button-hover-dark dark:active:bg-button-active-dark"
        >
          Quay lại
        </button>
        <button
          type="button"
          id="checkout"
          class="items inline-flex gap-x-3 rounded-full bg-button-primary px-6 py-2.5 text-center text-white shadow-1 transition ease-out hover:bg-button-primary-hover hover:shadow-3 active:bg-button-primary-active dark:bg-button-primary-dark dark:hover:bg-button-primary-hover-dark dark:active:bg-button-primary-active-dark"
        >
          Thanh toán
        </button>
      </div>
      <p class="text-xs italic">
        Bạn sẽ được chuyển hướng sang trang web của đơn vị thanh toán để
        tiếp tục. Sau khi thanh toán thành công, bạn sẽ quay trở về SSPS với
        xác nhận đơn hàng của mình.
      </p>
    `;
    $('#buy-pages').html(newDiv);
    $('#buy-goback').on('click', () => {
      window.location.reload();
    });
    $('#checkout').on('click', () => {
      const data = { increment: selectedValue };
      $.post(url + '/account/buy-credit', JSON.stringify(data))
        .done(() => {
          const checkoutDiv =
            `
      <p class="text-xl font-bold">Mua thêm trang</p>
      <p>Đơn hàng SSPS` +
            Date.now() +
            ` của bạn đã được xử lí thành công.</p>
      <div class="flex flex-col space-y-2">
        <p class="text-sm font-bold text-gray-600">Chi tiết</p>
        <hr class="w-full border" />
        <div class="flex flex-row justify-between">
          <p>Số trang</p>
          <p>` +
            selectedValue +
            `</p>
        </div>
        <div class="flex flex-row justify-between">
          <p>Ngày đặt đơn</p>
          <p>` +
            new Date().toLocaleString() +
            `</p>
        </div>
        <div class="flex flex-row justify-between">
          <p>Tổng tiền</p>
          <p>` +
            selectedPrice +
            `</p>
        </div>
      </div>
      <div class="flex w-full flex-row justify-end pb-1">
        <button
          type="button"
          id="finish-checkout"
          class="items inline-flex gap-x-3 rounded-full bg-button-primary px-6 py-2.5 text-center text-white shadow-1 transition ease-out hover:bg-button-primary-hover hover:shadow-3 active:bg-button-primary-active dark:bg-button-primary-dark dark:hover:bg-button-primary-hover-dark dark:active:bg-button-primary-active-dark"
        >
          Hoàn tất
        </button>
      </div>`;
          $('#buy-pages').html(checkoutDiv);
          $('#finish-checkout').on('click', () => {
            window.location.href = 'home.html';
          });
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
    });
  } else {
    $('#buy-continue').attr(
      'class',
      'items inline-flex gap-x-1 rounded-full bg-[#4d69b2] px-5 py-2.5 text-center text-white shadow-1 transition ease-out dark:bg-button-primary-dark cursor-not-allowed',
    );
    $('#buy-continue').attr('disabled', 'disabled');
    const errorDiv = `
    <div class="px-3 py-2 bg-red-200 dark:bg-red-900 mix-blend-multiply dark:mix-blend-lighten rounded-full flex flex-row space-x-5 items-center" id="error-div">
      <svg class="self-center" xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32">
        <path fill="#B3261E" d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path>
      </svg>
      <p>Vui lòng chọn số trang cần mua</p>
    </div>
    `;
    $('#buy-pages').append(errorDiv);
  }
  $('input[type=radio][name=buy-select]').on('change', () => {
    $('#buy-continue').attr(
      'class',
      'items inline-flex gap-x-3 rounded-full bg-button-primary px-6 py-2.5 text-center text-white shadow-1 transition ease-out hover:bg-button-primary-hover hover:shadow-3 active:bg-button-primary-active dark:bg-button-primary-dark dark:hover:bg-button-primary-hover-dark dark:active:bg-button-primary-active-dark',
    );
    $('#buy-continue').removeAttr('disabled');
    $('#error-div').remove();
  });
});

$('#buy-cancel').on('click', () => {
  window.location.href = 'home.html';
});
