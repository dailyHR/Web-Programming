<?php
  $userID = $_POST["userID"];
  $todo = $_POST["todo"];

  $obj = new stdClass();
  // $obj->today = $today;
  $obj->todo = $todo;
  $myJSON = json_encode($obj, JSON_UNESCAPED_UNICODE);

  $file_path = "../data/diaryFolder/".$userID . "/ToDoList.json";
  $file = fopen($file_path, "a");
  fwrite($file, $myJSON . "\n");
  fclose($file);
 ?>
