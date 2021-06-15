$(function () {
  $(".dropdown-trigger").dropdown({
    coverTrigger: false,
    closeOnClick: false
  });

  $('.tabs').tabs();
  $('.modal').modal();
  $('select').formSelect();
  $('.fixed-action-btn').floatingActionButton();
  $('.tooltipped').tooltip();
});
