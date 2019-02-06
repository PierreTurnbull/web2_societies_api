-- Create database
DROP DATABASE IF EXISTS web2020_redline_project_1;
CREATE DATABASE web2020_redline_project_1 CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
USE web2020_redline_project_1;

-- Create vote table
CREATE TABLE votes (
  id          INT(6)        UNSIGNED            AUTO_INCREMENT PRIMARY KEY,
  question_id INT(6)        UNSIGNED  NOT NULL,
  vote_value  VARCHAR(255)            NOT NULL,
  vote_count  INT           UNSIGNED  NOT NULL
);

-- Create feedback table
CREATE TABLE feedbacks (
  id                INT(6)                  UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email_address     VARCHAR(255)  NOT NULL,
  feedback_message  INT(1)        NOT NULL,
  username          VARCHAR(255)
);

-- Create vote instances
INSERT INTO votes SET question_id=1, vote_value="oui",  vote_count=0;
INSERT INTO votes SET question_id=1, vote_value="non",  vote_count=0;

INSERT INTO votes SET question_id=2, vote_value="1",    vote_count=0;
INSERT INTO votes SET question_id=2, vote_value="2",    vote_count=0;
INSERT INTO votes SET question_id=2, vote_value="3",    vote_count=0;
INSERT INTO votes SET question_id=2, vote_value="4",    vote_count=0;
INSERT INTO votes SET question_id=2, vote_value="5",    vote_count=0;

-- Create feedback instances
INSERT INTO feedbacks SET email_address="test@test.te", feedback_message="This is a fixture (false data)."