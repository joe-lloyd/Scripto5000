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

// note for gathering passwords
.controller('Password',function($scope,$http,$interval){
    checkpass();
    $interval(function(){
        checkpass();
    },300);
    function checkpass(){
        $http.get('http://130.211.90.249:3000/load').success(function(data){
            $scope.username=data;
        });
    };
})

.controller('ContactCtrl', function($scope, $http) {
    $http.get("http://130.211.90.249:3000/load")
      .success(function (data) { $scope.user = data; });
});
