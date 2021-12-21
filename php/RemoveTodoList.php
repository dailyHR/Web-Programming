<?php
  $userID = $_POST["userID"];
  $todo = $_POST["todo"];
  $file_path = "../data/diaryFolder/".$userID . "/ToDoList.json";
  $file = fopen($file_path, "r");

  $array = array();
  $i = 0;
  while(!feof($file)) {
      $line = json_decode(fgets($file));

      if($line != null){

        if($line->todo === $todo){
        //저장xxx
        }
        else{
          array_push($array,$line);
        }
        $i++;
      }
  }
  fclose($file);

  $file = fopen($file_path, "w");

  for($j = 0 ; $j < count($array); $j++){
    $myJSON = json_encode($array[$j], JSON_UNESCAPED_UNICODE);
    fwrite($file, $myJSON . "\n");
  }
  fclose($file);

  if(count($array) == 0){
    unlink($file_path);
  }
 ?>
