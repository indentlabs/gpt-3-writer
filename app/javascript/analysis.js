$(document).ready(function () {
  $('.document-analytics-sidenav').sidenav({
    edge: 'right',
    preventScrolling: false,
    onOpenStart: function () { // onOpenEnd might be better UI if we start feeling sluggish, since onOpenStart fires before drawer enters
      console.log('computing analytics');
    },
  });
  $('.collapsible').collapsible({
    onOpenStart: function () {
      console.log('loading collapsible analytics section');
    }
  });
});