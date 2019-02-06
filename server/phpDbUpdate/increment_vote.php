<?php
require_once "utils/connection.php";
$id = json_decode($argv[1])->id;

try {
  // Retrieve the count that shall be incremented
  $query = "
    SELECT
      `vote_count`
    FROM
      `votes`
    WHERE
      `id`=:id;
  ";
  $stmt = $connection->prepare($query);
  $stmt->bindValue(':id', $id);
  $stmt->execute();
  $vote_count = intval($stmt->fetch(PDO::FETCH_ASSOC)['vote_count']);

  // POST the incremented count
  $query = "
    UPDATE
      `votes`
    SET
      `vote_count`=:incremented_vote_count
    WHERE
      `id`=:id
  ";
  $stmt = $connection->prepare($query);
  $stmt->bindValue(':incremented_vote_count', $vote_count + 1);
  $stmt->bindValue(':id', $id);
  $stmt->execute();
  if ($stmt->errorInfo()[0] !== '00000') {
    throw new PDOException();
  }
  exit(0);
} catch (PDOException $error) {
  exit(1);
}
