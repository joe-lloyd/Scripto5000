SELECT friends.idfriends, friends.userid, friends.friendid, user.username, user.tagline, user.pic
FROM friends
JOIN user
WHERE friends.userid = 1 && friends.friendid = user.iduser || friends.friendid = 1 && friends.userid = user.iduser;