/*global app, alert*/
var log = require('bows')('speakers');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');

module.exports = PageView.extend({
  pageTitle: 'View speaker',
  template: templates.pages.speakers.view,
  bindings: {
    'model.name': {
      hook: 'name'
    },
    'model.storedImg': {
      type: 'attribute',
      hook: 'img',
      name: 'src'
    },
    'model.title': {
      hook: 'title'
    },
    'model.descriptionHtml': {
      type: 'innerHTML',
      hook: 'description'
    },
    'model.access': {
      hook: 'access'
    },
  },
  initialize: function (spec) {
    var self = this;
    app.speakers.getOrFetch(spec.id, {all: true}, function (err, model) {
      if (err) {
        log.error('couldnt find a speaker with id: ' + spec.id);
      }
      self.model = model;
      log('Got speaker', model.name);
    });
  },
});