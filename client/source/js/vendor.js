// Datepicker support for IE and Safari
const dateInput = $('.form__input--date-expire');

if (dateInput.type != "date") { //if browser doesn't support input type="date", load files for jQuery UI Date Picker
  document.write('<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/base/jquery-ui.css" rel="stylesheet" type="text/css" />\n')
  document.write('<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"><\/script>\n')
}
if (dateInput.type != "date") { //if browser doesn't support input type="date", initialize date picker widget:
  // $(document).ready(function () {
  //   $('#date_expire').datepicker();
  // });
}

//Multiselect
// $(document).ready(function () {
//   $('.form__select--countries').select2();
// });