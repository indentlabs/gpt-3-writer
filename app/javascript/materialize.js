$(document).ready(function () {
  $(".dropdown-trigger").dropdown({
    coverTrigger: false,
    closeOnClick: false
  });

  $('.modal').modal();
  $('select').formSelect();
});