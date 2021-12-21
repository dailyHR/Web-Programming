<?php
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
  // $obj->today = $today;
  $obj->title = $title;
  $obj->wheather = $wheather;
  $obj->feeling = $feeling;
  $obj->textPlan = $textPlan;

  $myJSON = json_encode($obj, JSON_UNESCAPED_UNICODE);

  $dir_path = "../data/diaryFolder/" . $userID ."/diary/";
  if(!file_exists($dir_path)){
    mkdir($dir_path, 0777, true);
  }

  $file_path = $dir_path . "/" . $today . ".json";
  $file = fopen($file_path, "a");
  fwrite($file, $myJSON . "\n");
  fclose($file);
 ?>
