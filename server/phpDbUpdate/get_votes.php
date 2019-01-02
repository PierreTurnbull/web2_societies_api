<?php
require_once "utils/connection.php";
$question_id = json_decode($argv[1])->question_id;

try {
  // Retrieve the votes corresponding to question_id
  $query = "
    SELECT
      `id`,
      `vote_value`,
      `vote_count`
    FROM
      `votes`
    WHERE
      `question_id`=:question_id;
  ";
  $stmt = $connection->prepare($query);
  $stmt->bindValue(':question_id', $question_id);
  $stmt->execute();
  if ($stmt->errorInfo()[0] !== '00000') {
    throw new PDOException();
  }
  echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $error) {
  exit(1);
}