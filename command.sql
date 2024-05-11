-- to get the relationship--
SELECT * FROM interests JOIN topic ON topic._id = interests.topic_id WHERE user_id=2;
SELECT topicname,description FROM interests JOIN topic ON topic._id = interests.topic_id WHERE user_id=2;

SELECT * FROM posts JOIN users ON posts.user_id=users._id;

--getting all the posts on users interests--
SELECT * FROM interests
JOIN topic ON interests.topic_id = topic._id
JOIN posts ON topic._id = posts.topic_id
WHERE interests.user_id = 2;
