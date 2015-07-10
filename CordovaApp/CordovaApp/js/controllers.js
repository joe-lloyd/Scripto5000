angular.module('starter.controllers', ['ngCookies'])

.controller('LoginCtrl', function ($scope, LoginService, $ionicPopup, $state, $cookies, $rootScope) {
    $scope.data = {};

    $scope.login = function () {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function (data) {
            var wat = $rootScope.session;
            console.log(wat);
            $state.go('tab.prof');
        }).error(function (data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ProfCtrl', function ($scope, $http, $rootScope) {

    $http.get('http://130.211.90.249:3000/prof', { params: { user_id: $rootScope.session } }).success(function (response) {
        $scope.user = response;
    });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ContactCtrl', function($scope, $http, $rootScope) {
    $http.get('http://130.211.90.249:3000/friends', { params: { user_id: $rootScope.session } }).success(function (response) {
        $scope.friends = response;
    });
});
