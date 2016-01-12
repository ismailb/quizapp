// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .controller('examCtrl', function($scope, $state, examService, $ionicSlideBoxDelegate, $ionicPopup, $window) {

    $scope.questionPaper = [];
    $scope.index = 0;
    //$scope.question = $scope.questionPaper[$scope.index];
    $scope.sheet = {};

    examService.getExamQuestionPaper().then(function success(data) {
      console.log(data);
      $scope.questionPaper = data;
      $ionicSlideBoxDelegate.update();
    }, function error(error) {
      console.error(error);
    });

    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
      $ionicSlideBoxDelegate.update();
    };

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
      $ionicSlideBoxDelegate.update();
    };

    $scope.canEnableBack = function() {
      return $ionicSlideBoxDelegate.currentIndex() > 0;
    };

    $scope.canEnableNext = function() {
      return $ionicSlideBoxDelegate.currentIndex() + 1 != $ionicSlideBoxDelegate.slidesCount();
    };

    $scope.submit = function() {
      var sheet = angular.copy($scope.sheet);
      console.log(sheet);
      var request = _.map(sheet, function(value, key) {
        return {
          _id: key,
          answer: value
        };
      });
      console.log(request);
      examService.submitAnswerSheet(request).then(function success(data) {
        $ionicPopup.alert({
          title: 'Your Score',
          template: 'Your scored : ' + data.score + '. <br/> Do you want try again?'
        }).then(function(ok){
            $window.location.reload(true);
        });
      }, function error(error) {
        console.error(error)
      });
    };
  })

  .factory('examService',
    function examService($http, $q) {
      // interface
      var service = {
        getExamQuestionPaper: getExamQuestions,
        submitAnswerSheet: postAnswerSheet
      };
      return service;

      // implementation
      function getExamQuestions() {

        var def = $q.defer();

        $http.get("https://morning-retreat-3558.herokuapp.com/api/exam")
          .success(function(data) {
            service.questionPaper = data;
            def.resolve(data);
          })
          .error(function(e) {
            def.reject("Failed to get exams : " + e);
          });
        return def.promise;
      };

      function postAnswerSheet(request) {

        var def = $q.defer();

        $http.post("https://morning-retreat-3558.herokuapp.com/api/exam", request)
          .success(function(data) {
            console.log(data);
            def.resolve(data);
          })
          .error(function(e) {
            def.reject("Failed to submit answer sheet : " + e);
          });
        return def.promise;
      };

    });