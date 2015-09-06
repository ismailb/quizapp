'use strict';

angular.module('quizApp')
	.controller('ExamCtrl', function($scope, $http) {
		$scope.exam = {
			takenExam: false,
		};
		
		$scope.sheet = {};
		$scope.totalItems = 10;
		$scope.currentItem = 1;

		$scope.canShow = function(pageNo) {
			return pageNo === $scope.currentItem;
		};

		$scope.next = function() {
			if($scope.currentItem != $scope.totalItems) {
				++$scope.currentItem;
			}
		};

		$scope.previous = function() {
			if ($scope.currentItem != 1) {
				--$scope.currentItem;
			}
		};

		$scope.submit = function(examForm) {
			
		    var sheet = angular.copy($scope.sheet);
		    console.log(sheet);
		};

		$scope.takeExam = function() {
			$http.get('/api/exam').then(function(response) {
				$scope.exam.takenExam = true;
				$scope.exam.questionPaper = response.data;
				$scope.totalItems = $scope.exam.questionPaper.length;
				console.log(response);
			}, function(response) {
				$scope.exam.takenExam = false;
				alert('Oops! Try again later!');
			});
		}
	});