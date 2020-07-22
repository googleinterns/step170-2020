document.addEventListener("DOMContentLoaded", function(){
  init();
});

function init() {
  initializeDatePickers();
  initializeTimePickers();
}

function initializeDatePickers() {
  let elems = document.querySelectorAll('.datepicker');
  M.Datepicker.init(elems, {});
}

function initializeTimePickers() {
  let elems = document.querySelectorAll('.timepicker');
  M.Timepicker.init(elems, {});
}