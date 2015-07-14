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

.controller('ProfCtrl', function ($scope, $http, $rootScope) {

    $http.get('http://130.211.90.249:3000/prof', { params: { user_id: $rootScope.session } }).success(function (response) {
        $scope.user = response;
    });
})

.controller('ChatsCtrl', function ($scope, Chats) {

    Chats.all().success(function (response) {
        $scope.chats = response;
    })
    //$scope.remove = function(chat) {
    //  Chats.remove(chat);
    //}
})

.controller('ChatDetailCtrl', function ($scope, Chats, socket, User) {
    Chats.get().success(function (response) {
        $scope.chat = response[0];
    })
    User.get().success(function (response) {
        $scope.user = response[0];
    })
    var socket = io.connect('http://130.211.90.249:3001');
    $('form').submit(function () {
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function (msg) {
        $('#messages').append($scope.user.username).append($('<p>').text(msg));
    });
})

.controller('ContactCtrl', function($scope, $http, $rootScope) {
    $http.get('http://130.211.90.249:3000/friends', { params: { user_id: $rootScope.session } }).success(function (response) {
        $scope.friends = response;
    });
});
