CREATE TABLE
IF NOT EXISTS `persistent_attributes`
(
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR
(250) UNIQUE NOT NULL,
  data TEXT NOT NULL
);