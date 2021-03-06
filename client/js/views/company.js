var View = require('ampersand-view');
var templates = require('client/js/templates');

module.exports = View.extend({
  template: templates.cards.company,
  bindings: {
    'model.name': '[data-hook~=name]',
    'model.unread': {
      hook: 'unread',
      type: 'toggle'
    },
    'model.img': {
      type: 'attribute',
      hook: 'img',
      name: 'src'
    },
    'model.background': {
      type: 'attribute',
      hook: 'background',
      name: 'style'
    },
    'model.viewUrl': {
      type: 'attribute',
      hook: 'name',
      name: 'href'
    }
  }
});
