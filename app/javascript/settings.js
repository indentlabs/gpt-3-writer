$(function() {
  function update_architecture_ui(architecture) {

  }
  function update_model_ui(model) {

  }
  function update_provider_ui(model) {

  }

  // Simplified architecture settings (sync to advanced)
  $('.simplified-assistant-option').on('click', function () {
    // Update UI to show this assistant is selected
    $('.simplified-assistant-option').removeClass('orange lighten-2');
    $(this).addClass('orange lighten-2');

    // Update actual data source fields
    $('#autoscribe-architecture').val($(this).data('architecture')).formSelect();
  });

  // Simplified model settings (sync to advanced)
  $('input[name=simplified-model]').on('change', function() {
    $('#autoscribe-model').val($(this).val()).formSelect();
  });

  // Advanced architecture change (sync to simplified)
  $('#autoscribe-architecture').on('change', function () {
    // Update UI to show this assistant is selected
    $('.simplified-assistant-option').removeClass('orange lighten-2');
    $('.simplified-assistant-option[data-architecture="' + $(this).val() + '"]').addClass('orange lighten-2');
  });

  // Advanced model change (sync to simplified)
  $('#autoscribe-model').on('change', function () {
    $('input[name=simplified-model][value="' + $(this).val() + '"]').prop('checked', true);
  });
});