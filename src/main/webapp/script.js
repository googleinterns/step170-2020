document.addEventListener("DOMContentLoaded", function(){
  init();
});

function init() {
  initializeDatePickers();
  initializeTimePickers();
  initializeDropdowns();
  initializeGuestTab();
}

function initializeDatePickers() {
  let elems = document.querySelectorAll('.datepicker');
  M.Datepicker.init(elems, {});
}

function initializeTimePickers() {
  let elems = document.querySelectorAll('.timepicker');
  M.Timepicker.init(elems, {});
}

function initializeDropdowns() {
  let elems = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(elems, {});
}

function initializeGuestTab() {
  let elem = document.querySelector('.tabs');
  M.Tabs.init(elem, {})
}

function getUrl() {
  fetch('/getUrl').then(response => response.json()).then( (logUrl) => {
    document.getElementById('login').href = logUrl;
  });
}
