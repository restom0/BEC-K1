import $ from 'jquery';
// status: -1:Chưa in, 0:Đang in  1: Đã in
setTimeout(function () {
  const Queue = [{
    'title': "Lab4_RelationalAlgebra.pdf",
    'location': "H1-203",
    'time': 0,
    'status': 1
  }, {
    'title': "06_Ch6 System Modeling_2023.pdf",
    'location': "H1-203",
    'time': 2,
    'status': 0
  }, {
    'title': "Lab4_RelationalAlgebra.pdf",
    'location': "H1-203",
    'time': 6,
    'status': 0
  }]
  let str = ''
  Queue.forEach((el, index) => {
    str += `
    <div
                class="flex w-full items-center py-1 max-md:flex-wrap max-md:justify-between md:flex-row md:space-x-2"
              >
                <p class="w-3/4 min-w-0 truncate rounded-full md:w-full">
                  `+ el['title'] + `
                </p>
                <a
                  href=""
                  class="my-auto w-14 shrink-0 justify-end rounded-full text-right md:order-5 xl:w-16 2xl:w-20"
                  >Hủy</a
                >
                <div
                  class="flex w-full flex-row space-x-2 max-md:text-sm md:max-w-max"
                >
                  <p class="shrink-0 rounded-full md:w-24 xl:w-28 2xl:w-32">
                  `+ el['location'] + `
                  </p>
                  <div class="md:hidden">•</div>

                  <p class="w-28 shrink-0 rounded-full xl:w-32 2xl:w-36">
                  `
    if (el['status'] == -1) {
      str += 'Chưa in';
    }
    if (el['status'] == 0) {
      str += 'Đang in';
    }
    if (el['status'] == 1) {
      str += 'Đã in';
    }
    str += `
                  </p>
                  <p
                    class="w-24 shrink-0 rounded-full max-md:hidden xl:w-28 2xl:w-32"
                  >
                  `+ el['time'] + ` phút
                  </p>
                </div>
              </div>`});
  $('#queue-content').html(str);
}, 2000)

