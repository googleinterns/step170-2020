document.addEventListener("DOMContentLoaded", function(){
  init();
});

function init() {
  initializeDatePickers();
}

function initializeDatePickers() {
  let elems = document.querySelectorAll('.datepicker');
  M.Datepicker.init(elems, {});
}