/*global app, alert*/
var log = require('bows')('sessions');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var Calendar = require('ampersand-fullcalendar-view');
var Moment = require('moment');
var _ = require('underscore');
var options = require('options');

module.exports = PageView.extend({
  template: templates.pages.sessions.list,
  initialize: function () {
    var self = this;
    if (!this.collection.length) {
      return this.fetchCollection();
    }
  },
  fetchCollection: function () {
    var self = this;
    log('Fetching sessions');
    this.collection.fetch({success: function () {
      self.render();
    }});

    return false;
  },
  subviews: {
    calendar: {
      container: '[data-hook=sessions-list]',
      waitFor: 'collection.length',
      prepareView: function (el) {
        var events = this.collection.serialize().map(function(s) {
          s.title = s.name;
          s.start = new Date(s.date);
          s.duration = new Date(s.duration);
          s.end = new Date(s.start.getTime() + s.duration.getTime());
          s.url = '/sessions/' + s.id;
          s.color = _.find(options.kinds.sessions, function(o) {
            return s.kind === o.name;
          }).color;
          return s;
        });

        var defaultView = (window.innerWidth < 900) ? 'agendaDay' : 'agendaWeek';

        return new Calendar({
          el: el,
          events: events,
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          defaultDate: Moment('2015 02 23', 'YYYY MM DD'),
          options: {
            defaultView: defaultView,
            height: 'auto',
            minTime: '09:00:00',
            maxTime: '22:00:00',
            allDaySlot: false,
            hiddenDays: [0]
          }
        });
      }
    },
  }
});
