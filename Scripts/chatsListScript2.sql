SELECT chat.idchat, friends.idfriends, friends.userid, friends.friendid, user.username, user.tagline, user.pic
FROM chat
JOIN friends
JOIN user
WHERE friends.userid = 1 && friends.friendid = user.iduser && chat.friendshipid = friends.idfriends || friends.friendid = 1 && friends.userid = user.iduser && chat.friendshipid = friends.idfriends;