$(function() {


  $('.simplified-assistant-option').on('click', function () {
    // Update UI to show this assistant is selected
    $('.simplified-assistant-option').removeClass('orange lighten-2');
    $(this).addClass('orange lighten-2');

    // Update actual data source fields
    $('#autoscribe-architecture').val($(this).data('architecture')).formSelect();
  });
});