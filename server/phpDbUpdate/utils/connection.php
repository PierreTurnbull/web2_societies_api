<?php
try {
  $host         = "localhost";
  $port         = "3306";
  $user         = "root";
  $pass         = "root";
  $db           = "web2020_redline_project_1";
  $connection   = new PDO("mysql:host=$host;port=$port;dbname=$db", $user, $pass);
} catch (PDOException $error) {
  exit(1);
}
