<?php
  $index = $_POST["index"];
  $userID = $_POST["userID"];
  $today = $_POST["today"];
  $strTok = explode(".", $today);
  if($strTok[2] < 10){
    $strTok[2] = "0" . $strTok[2];
    $today = implode('.', $strTok);
  }
  $title = $_POST["title"];
  $wheather = $_POST["wheather"];
  $feeling = $_POST["feeling"];
  $textPlan = $_POST["textPlan"];

  $obj = new stdClass();

  $obj->title = $title;
  $obj->wheather = $wheather;
  $obj->feeling = $feeling;
  $obj->textPlan = $textPlan;

  $filepath = "../data/diaryFolder/" . $userID . "/diary/" . $today . ".json";
  $file = fopen($filepath, "r");

  $array = array();
  $i = 0;
  while(!feof($file)) {
      $line = json_decode(fgets($file));

      if($line != null){
        if($i == $index){
          $array[$i] = $obj;
          $i++;
        }
        else{
          $array[$i] = $line;
          $i++;
        }
      }
  }
  fclose($file);

  $file = fopen($filepath, "w");

  for($j = 0 ; $j < count($array); $j++){
    $myJSON = json_encode($array[$j], JSON_UNESCAPED_UNICODE);
    fwrite($file, $myJSON . "\n");
  }


  fclose($file);
 ?>
