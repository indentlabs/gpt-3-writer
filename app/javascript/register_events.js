import { EventEmitter }     from "./lib/event_emitter";

$(document).ready(function () {
  document.getElementById("editor").addEventListener("input", function() {
    EventEmitter.dispatch('textChanged', { });
  }, false);
});
