angular.module('starter.services', ['ngCookies'])

.service('LoginService', function ($q, $http, $cookies, $rootScope) {
    return {
        loginUser: function (name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var user_data = $http.get("http://130.211.90.249:3000/login");
            user_data.then(function (result) {
                var user = result.data;
                //$cookies.put('session', log(user));
                log(user);
                var wat = $rootScope.session;
                console.log(wat);
            })
            function log(user) {
                var i;
                //var id = -1;
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
                //return id;
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

.factory('Account', function () {

    //Account test data

    var accounts = [{
        id: 0,
        name: 'Joe Lloyd',
        face: '..\img\blank_profile.png'
    }];
    return {
        myProf: function () {
            return accounts;
        }
    };
})

.factory('User', function ($http, $rootScope) {
    var user = $http.get('http://130.211.90.249:3000/prof', {
        params: { user_id: $rootScope.session }
    });
    //user.then(function (result) {
    //    var theUser = result.data;
    //    console.log(theUser);
    //})
    return {
        get: function () {
            return user;
        }
    };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Joe Blogs',
    lastText: 'this is some test text',
    face: 'http://www.clker.com/cliparts/5/7/4/8/13099629981030824019profile.svg.med.png'
  }, {
    id: 1,
    name: 'Luke skywalker',
    lastText: 'this is some test text',
    face: 'http://www.clker.com/cliparts/5/7/4/8/13099629981030824019profile.svg.med.png'
  },{
    id: 2,
    name: 'Yuno Gaesi',
    lastText: 'this is some test text',
    face: 'http://www.clker.com/cliparts/5/7/4/8/13099629981030824019profile.svg.med.png'
  }, {
    id: 3,
    name: 'Light Yagami',
    lastText: 'this is some test text',
    face: 'http://www.clker.com/cliparts/5/7/4/8/13099629981030824019profile.svg.med.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'this is some test text',
    face: 'http://www.clker.com/cliparts/5/7/4/8/13099629981030824019profile.svg.med.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
