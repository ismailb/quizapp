'use strict';

angular.module('quizApp')
	.config(function($stateProvider) {
		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'app/main/main.html',
				controller: 'MainCtrl'
			});/*.state('takeexam', {
				url: '/exam',
				templateUrl: 'app/exam/exam.html',
				controller: 'ExamCtrl'
			});*/
	});