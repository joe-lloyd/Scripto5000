angular.module('starter.services', [])

.service('LoginService', function ($q) {
    return {
        loginUser: function (name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name == 'user' && pw == 'secret') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
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
