angular.module('starter.controllers', [])

.controller('ProfCtrl', function ($scope) { })

.controller('LoginCtrl', function ($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function () {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function (data) {
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

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ContactCtrl', function($scope, $http) {
    $http.get("http://www.w3schools.com/angular/customers_sql.aspx")
      .success(function (response) { $scope.contacts = response.records; });
});
