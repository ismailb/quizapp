'use strict';

angular.module('quizApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider
      .otherwise('/');

    $stateProvider.state('takeExam', {
      url: '/exam',
      templateUrl: 'app/exam/exam.html',
      controller: 'ExamCtrl'
    });

    $locationProvider.html5Mode(true);
  });