-- to get the relationship--
SELECT * FROM interests JOIN topic ON topic._id = interests.topic_id WHERE user_id=2;
SELECT topicname,description FROM interests JOIN topic ON topic._id = interests.topic_id WHERE user_id=2;