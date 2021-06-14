const OpenAI = require('openai-api');

$(function() {
  function initialize() {
    $('#suggestions').hide();
    $('#progress-bar').hide();

    // TODO: show onboarding/setup modal
  }

  function autoscribe_settings() {
    let settings = {
      architecture:       $('#autoscribe-architecture').val(),
      model:              $('#autoscribe-model').val(),
      provider:           $('#autoscribe-provider').val(),
      api_key:            $('#autoscribe-api-key').val(),
      context_window:     Number($('#autoscribe-context-window').val()),
      suggestion_count:   Number($('#autoscribe-suggestion-n').val()),
      suggestion_length:  Number($('#autoscribe-suggestion-length').val()),
      suggestion_best_of: Number($('#autoscribe-suggestion-best-of').val()),
      temperature:        Number($('#autoscribe-temperature').val()),
      top_p:              Number($('#autoscribe-top-p').val()),
      frequency_penalty:  Number($('#autoscribe-frequency-penalty').val()),
      presence_penalty:   Number($('#autoscribe-presence-penalty').val())
    };

    // Increase bestOf to at least match suggestion count (n)
    if (settings.suggestion_count > settings.suggestion_best_of) {
      settings.suggestion_best_of = settings.suggestion_count;
    }

    return settings;
  }
  console.log(autoscribe_settings());

  function wrap_context_window_with_prompt_formatting(context_window) {
    var story_title = $('#title').text().trim();

    return '"' + story_title + '"' + "\nby an anonymous author\n\n" + context_window;
  }

  function generate_autoscribe_suggestions() {
    generate_autoscribe_suggestions_with_gpt3();
  }

  function generate_autoscribe_suggestions_with_gpt3() {
    const settings       = autoscribe_settings();
    const OPENAI_API_KEY = settings.api_key;
    const openai         = new OpenAI(OPENAI_API_KEY);

    // Get the most-recent 1000 words
    var words_to_include = settings.context_window;
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

    (async () => {
      const gptResponse = await openai.complete({
        engine: 'ada',
        prompt: wrap_context_window_with_prompt_formatting(truncated_prompt),
        maxTokens:        settings.suggestion_length,
        temperature:      settings.temperature,
        topP:             settings.top_p,
        presencePenalty:  settings.presence_penalty,
        frequencyPenalty: settings.frequency_penalty,
        bestOf:           settings.suggestion_best_of,
        n:                settings.suggestion_count, 
        stream:           false,
      });

      console.log(gptResponse.data);
      const suggestions = gptResponse.data.choices.map(choice => choice.text);

      $('.suggestions').show();
      $('#progress-bar').hide();

      console.log("Suggestions: ");
      console.log(suggestions);

      var suggestion_containers = $('.suggestion');
      suggestions.forEach(function (suggestion, index) {
        var reformatted_suggestion = suggestion//.trim()
          .split("\n\n").join("</p><p>")
          .split("\n").join("</p></p>")
          .split("”“").join("\"<br />\"");
        $(suggestion_containers[index]).html("<p>" + reformatted_suggestion + "</p>");

      });

      $([document.documentElement, document.body]).animate({
        scrollTop: $(".suggestions").offset().top
      }, 2000);

      $('#continue-writing').removeAttr('disabled');
    })();

    return false;
  }

  function use_suggestion() {
    // Instead of just directly concatenating the suggestion HTML onto $('#editor'), we
    // want to instead take a two-step approach to ensure we can continue on mid-sentence:

    // 1. Append the first <p> text in the suggestion to the last <p> in the editor
    var leading_text = $(this).closest('.suggestion-card')
                              .find('.suggestion')
                              .find('p')
                              .first()
                              .html();
    var final_p = $('#editor').find('p:last');
    final_p.html(final_p.html() + leading_text);

    // 2. Append the rest of the suggestion with new <p> tags in the editor
    var following_ps = $(this).closest('.suggestion-card')
                                .find('.suggestion')
                                .find('p:not(:first)');
    $('#editor').append(following_ps);

    // Clear out existing suggestions
    $('.suggestion').text('');
    $('.suggestions').hide();
    return false;
  }

  initialize();

  $('#continue-writing').on('click', generate_autoscribe_suggestions);
  $('.use-suggestion').on('click',   use_suggestion);
});
