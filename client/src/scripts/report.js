// nothing in here yet
/* eslint-disable require-jsdoc */
import $, { ajax } from 'jquery';
import jQuery from 'jquery';
$(() => {
  // login()
  // setTimeout(() => {
  // deletePrinter();
  // }, 1000)
  // changeStatusPrinter();
  // addPrinter();
  // loadPrinter();
  // getPrinter();
  // getStudent();
  // changePassword();
  // buyCredit();
  // setDefault();
  // getStaff();
  // loadData();
  // getPrintOrder();
  // getQueue();
  // printNextFile();
  //uploadFile();
});
jQuery.each(['put', 'delete', 'patch'], function (i, method) {
  jQuery[method] = function (url, data, callback, type) {
    if (jQuery.isFunction(data)) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return jQuery.ajax({
      url: url,
      type: method,
      dataType: type,
      data: data,
      success: callback,
    });
  };
});
function loadPrinter() {
  $.get('http://localhost:3000/spso/printer')
    .done(function (data) {
      console.log(data.data);
      const printers = data.data;
      printers.forEach((el) => {
        el._id;
        el.brand;
        el.model;
        el.permittedFileType;
        el.printerStatus;
        el.shortDescription;
      });
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.status);
      console.log(xhr.responseJSON.error.message);
    });
}
function addPrinter() {
  let data = {
    brand: 'Cannon',
    model: 'unknown',
    shortDescription: 'Running just fine',
    location: 'H6-609',
    printerStatus: 'true',
  };
  $.post('http://localhost:3000/spso/printer', data)
    .done(function (data) {
      console.log(data.data);
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.status);
      console.log(xhr.responseJSON.error.message);
    });
}

function changeStatusPrinter() {
  const id = '6569b65332e4f48b9382cebd';
  const data = { status: false };
  $.patch('http://localhost:3000/spso/printer/' + id, data)
    .done(function (data) {
      console.log(data.data.message);
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.status);
      console.log(xhr.responseJSON.error.message);
    });
}
function deletePrinter() {
  const id = '656a13c7fef78db80c56a942';
  $.delete('http://localhost:3000/spso/printer/' + id)
    .done(function (data) {
      console.log(data.message);
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.status);
      console.log(xhr.responseJSON.error.message);
    });
}
function getPrinter() {
  const id = '6569b65332e4f48b9382cebd';
  $.get('http://localhost:3000/spso/printer/' + id)
    .done(function (data) {
      console.log(data.data);
      const printer = data.data;
      printer._id;
      printer.brand;
      printer.model;
      printer.permittedFileType;
      printer.printerStatus;
      printer.shortDescription;
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.status);
      console.log(xhr.responseJSON.error.message);
    });
}
function getStudent() {
  const id = '2113773';
  $.get('http://localhost:3000/spso/student/' + id)
    .done(function (data) {
      console.log(data.data);
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.status);
      console.log(xhr.responseJSON.error.message);
    });
}
function changePassword() {
  let data = {
    oldPassword: 'khoadeptrai',
    newPassword: 'khoadeptrai',
  };
  $.post('http://localhost:3000/account/change-password', data)
    .done(function (data) {
      console.log(data.acknowledged);
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.status);
      console.log(xhr.responseJSON.error.message);
    });
}
function buyCredit() {
  let data = {
    increment: 5,
  };
  $.post('http://localhost:3000/account/buy-credit', data)
    .done(function (data) {
      console.log(data.message);
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.status);
      console.log(xhr.responseJSON.error.message);
    });
}
function setDefault() {
  let data = {
    amount: 5,
  };
  $.post('http://localhost:3000/spso/set-default-pages', data)
    .done(function (data) {
      console.log(data.data.acknowledged);
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.status);
      console.log(xhr.responseJSON.error.message);
    });
}
function getStaff() {
  const id = '2222222';
  $.get('http://localhost:3000/spso/staff/' + id)
    .done(function (data) {
      console.log(data.data);
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.status);
      console.log(xhr.responseJSON.error.message);
    });
}
function loadData() {
  $.get('http://localhost:3000/spso/all-orders')
    .done(function (data) {
      console.log(data);
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.status);
      console.log(xhr.responseJSON.error.message);
    });
}
function getPrintOrder() {
  const id = '655f1261056a63b60bafa897';
  $.get('http://localhost:3000/spso/printorders/' + id)
    .done(function (data) {
      console.log(data);
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.status);
      console.log(xhr.responseJSON.error.message);
    });
}
function getQueue() {
  const data = {
    printer_id: '6569b65332e4f48b9382cebd',
  };
  $.get('http://localhost:3000/queue/all', {
    printer_id: '6569b65332e4f48b9382cebd',
  })
    .done(function (data) {
      console.log(data);
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.status);
      console.log(xhr.responseJSON.error.message);
    });
}
function printNextFile() {
  const data = {
    printer_id: '6569b65332e4f48b9382cebd',
  };
  $.post('http://localhost:3000/queue/next', data)
    .done(function (data) {
      console.log(data);
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.status);
      console.log(xhr.responseJSON.error.message);
    });
}
function uploadFile() {
  var data = {
    printer: '6560174d32c3b94c3911986f',
    note: 'some note',
    fileName: 'khoa.pdf',
    printProperties: {
      paperSize: 'a4',
      numberOfPages: '4',
      sided: 'true',
      copies: '2',
    },
  };
  $.post('http://localhost:3000/printorder/', data)
    .done(function (data) {
      console.log(data);
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.status);
      console.log(xhr.responseJSON.error.message);
    });
  const id = '65605142b7c29a6c8eb456a3';
  data = [];
  $.post('localhost:3000/printorder/upload/' + id, data)
    .done(function (data) {
      console.log(data);
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.status);
      console.log(xhr.responseJSON.error.message);
    });
}
var arr = [0, 0, 0, 0, 0, 0, 0];
var count = 0;
var time;
$.ajax({
  type: 'get',
  url: 'http://localhost:3000/spso/all-orders',
  headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
  dataType: 'JSON',
  success: function (res) {
    if (!res.error) {
      time = Number(Date.now() - Date.parse(res[0].beginTime));
      console.log(time);
      for (let i = 0; i < res.length; i++) {
        arr[Number(res[i].printProperties.paperSize.replace(/\D/g, ''))] +=
          res[i].printProperties.numberOfPages;
        count++;
      }
      let day = Math.floor(time / (3600 * 24 * 1000));
      let hour = Math.floor((time - day * (3600 * 24 * 1000)) / (1000 * 3600));
      $('#numTime').html(day + ' ngày ' + hour + ' giờ ');
      $('#numPage').html(
        arr[0] + arr[1] + arr[2] + arr[3] + arr[4] + arr[5] + arr[6],
      );
      $('#numUse').html(count);
      $('#mostPage').html(
        'A' +
        arr.indexOf(
          Math.max(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]),
        ),
      );
    } else {
      console.log(res.error.msg);
    }
  },
});
