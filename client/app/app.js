'use strict';

angular.module('medicationReminderApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'mwl.calendar',
  'ngMdIcons',
  'ngAnimate',
  'ngAudio',
  'ui.bootstrap.datepicker',
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });