<?php
  $index = $_POST["index"];
  $userID = $_POST["userID"];
  $today = $_POST["today"];

  $filepath = "../data/diaryFolder/" . $userID . "/diary/" . $today . ".json";
  $file = fopen($filepath, "r");

  $array = array();
  $i = 0;
  while(!feof($file)) {
      $line = json_decode(fgets($file));

      if($line != null){

        if($i == $index){
        //저장xxx
        }
        else{
          array_push($array,$line);
        }
        $i++;
      }
  }
  fclose($file);

  $file = fopen($filepath, "w");

  for($j = 0 ; $j < count($array); $j++){
    $myJSON = json_encode($array[$j], JSON_UNESCAPED_UNICODE);
    fwrite($file, $myJSON . "\n");
  }
  fclose($file);

  if(count($array) == 0){
    unlink($filepath);
  }
 ?>
