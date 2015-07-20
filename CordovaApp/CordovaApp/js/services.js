angular.module('starter.services', ['ngCookies'])

.service('LoginService', function ($q, $http, $cookies, $rootScope) {
    return {
        loginUser: function (name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var user_data = $http.get("http://130.211.90.249:3000/login");
            user_data.then(function (result) {
                var user = result.data;
                log(user);
                console.log($rootScope.session);
            })
            function log(user) {
                var i;
                var isloggedin = false;
                for (i = 0; i < user.length; i++) {
                    if (name == user[i].username && pw == user[i].password) {
                        isloggedin = true;
                        id = user[i].iduser;
                        $rootScope.session = id;
                        break;
                    } 
                }
                if (isloggedin) {
                    deferred.resolve('Welcome ' + name + '!');
                } else {
                    deferred.reject('Wrong credentials.');
                }
            }
            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

// Socket factory to recive the io and wrap it in AngularJS
.factory('socket', function ($rootScope) {
    //var socket = io.connect('http://130.211.90.249:3000');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {  
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        },
        secretSend: function (eventName, data, id, callback) {
            socket.broadcast.to(id).emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
})
 

.factory('User', function ($http, $rootScope) {
    return {
        get: function () {
            return $http.get('http://130.211.90.249:3000/prof', { params: { user_id: $rootScope.session } })
        }
    };
})

.factory('NewAccount', function ($http) {
    return {
        create: function (name, pass, tag, phone) {
            return $http.get('http://130.211.90.249:3000/signup', { params: { name: name, pass: pass, tag: tag, phone: phone } })
        }
    };
})

.factory('Chats', function ($http, $rootScope, $stateParams) {

  return {
      all: function () {
          return $http.get('http://130.211.90.249:3000/chats', { params: { user_id: $rootScope.session } })
      },
      get: function () {
          return $http.get('http://130.211.90.249:3000/chat', { params: { user_id: $rootScope.session, chat_id: $stateParams.idchat } })
      }      
  };
});
