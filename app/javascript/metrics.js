window.metrics = {
  'word_count': function (text) {
    // TODO collapse multi-space spaces?
    return text.split(' ').length;
  },

  'page_count': function (text) {
    return 42;
  },

  'paragraph_count': function (text) {
    return 13;
  },

  'sentence_count': function (text) {
    return text.split(/\.\?!/).length;
  },

  'letter_count': function (text) {
    return text.length;
  }
};
