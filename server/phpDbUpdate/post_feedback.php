<?php
require_once "utils/connection.php";
$feedbackData = json_decode($argv[1]);
$emailAddress = $feedbackData->emailAddress ?? '';
$feedbackMessage = $feedbackData->feedbackMessage ?? '';
$username = $feedbackData->username ?? '';

echo $username;
try {
    // POST the feedback
    $query = "
        INSERT INTO
            `feedbacks`
        SET
            `email_address`=:email_address,
            `feedback_message`=:feedback_message,
            `username`=:username";
    $stmt = $connection->prepare($query);
    $stmt->bindValue(':email_address', $emailAddress);
    $stmt->bindValue(':feedback_message', $feedbackMessage);
    $stmt->bindValue(':username', $username);
    $stmt->execute();
    if ($stmt->errorInfo()[0] !== '00000') {
        throw new PDOException();
    }
    exit(0);
} catch (PDOException $error) {
    exit(1);
}
  