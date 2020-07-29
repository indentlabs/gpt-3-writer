$(document).ready(function () {
  $('#suggestions').hide();
  $('#progress-bar').hide();

  $('#continue-writing').click(function () {
    // Get the most-recent 1000 words
    var words_to_include = 1000;
    var full_prompt      = $('#editor').first().html()
                            .split("</p><p>").join("\n\n")
                            .split("<p>").join("")
                            .split("</p>").join("")
                            .trim();
    var word_count       = full_prompt.split(' ').length;
    var truncated_prompt = full_prompt.split(' ').slice(Math.max(word_count - words_to_include, 0)).join(' ');

    $('#continue-writing').attr('disabled', 'disabled');
    $('#progress-bar').show();
    $('.helper-text').hide();

    $.post("/api/autocomplete", {
      prompt: truncated_prompt
    }).done(function(suggestions) {
      $('.suggestions').show();
      $('#progress-bar').hide();

      console.log("Suggestions: ");
      console.log(suggestions);

      var suggestion_containers = $('.suggestion');
      suggestions.forEach(function (suggestion, index) {
        var reformatted_suggestion = suggestion.trim()
          .split("\n\n").join("</p><p>")
          .split("\n").join("<br />")
          .split("”“").join("\"<br />\"");
        $(suggestion_containers[index]).html("<p>" + reformatted_suggestion + "</p>");
      });

      $([document.documentElement, document.body]).animate({
        scrollTop: $(".suggestions").offset().top
      }, 2000);

      $('#continue-writing').removeAttr('disabled');
      $('#continue-writing').hide();
    });
  });

  $('.use-suggestion').click(function () {
    // Add this suggestion to the editor, wrapped in a <p> tag
    var suggestion = $(this).closest('.suggestion-card').find('.suggestion').html().trim()
    
    $('#editor').append(suggestion);

    // Clear out existing suggestions
    $('.suggestion').text('');
    $('.suggestions').hide();
    $('#continue-writing').show();
    return false;
  });
});
