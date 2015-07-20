angular.module('starter.controllers', ['ngCookies'])

.controller('LoginCtrl', function ($scope, LoginService, $ionicPopup, $state, $cookies, $rootScope) {
    $scope.data = {};

    $scope.create = function () {
        $state.go('signup');
    }

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

.controller('SignUpCtrl', function ($http, $scope, $state) {
    $scope.data = {};

    $scope.create = function () {
        console.log($scope.data.username);
        $http.get('http://130.211.90.249:3000/signup', { params: { name: $scope.data.username, pass: $scope.data.password, tag: $scope.data.tagLine, phone: $scope.data.phone } });
        console.log($scope.data.username);
        $state.go('login');
    }

    //$scope.create = function () {
    //    $state.go('login');
    //}

    //$scope.create = function () {
    //    NewAccount.create($scope.data.username, $scope.data.password, $scope.data.tagLine, $scope.data.phone).success(function (data) {
    //        console.log($scope.data.username);
    //        $state.go('login');
    //    });
    //}
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
        socket.secretSend('chat message', $('#m').val(), $scope.chat.idchat);
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function (msg) {
        $('#messages').append($scope.chat.username).append($('<p>').text(msg));
    });
})

.controller('ContactCtrl', function($scope, $http, $rootScope) {
    $http.get('http://130.211.90.249:3000/friends', { params: { user_id: $rootScope.session } }).success(function (response) {
        $scope.friends = response;
    });
});
