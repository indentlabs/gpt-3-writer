// EventEmitter.js
// From: https://medium.com/@lolahef/react-event-emitter-9a3bb0c719
const EventEmitter = {
  events: {},
  dispatch: function (event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  }, 
  subscribe: function (event, callback) {
    if (!this.events[event]) this.events[event] = []; 
    this.events[event].push(callback);
  }
};

module.exports = { EventEmitter };