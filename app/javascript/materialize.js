$(function () {
  $(".dropdown-trigger").dropdown({
    coverTrigger: false,
    closeOnClick: false
  });

  $('.modal').modal();
  $('select').formSelect();
  $('.fixed-action-btn').floatingActionButton();
  $('.tooltipped').tooltip();
});
