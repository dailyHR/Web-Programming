<?php
  $userID = $_POST["userID"];
  $file_path = "../data/diaryFolder/".$userID . "/ToDoList.json";
  $file = fopen($file_path, "r");

  $array = array();
  $i = 0;
  while(!feof($file)) {
      $line = json_decode(fgets($file));
      if($line != null){
        array_push($array,$line);
        $i++;
      }
  }
  fclose($file);
  echo json_encode($array);

 ?>
