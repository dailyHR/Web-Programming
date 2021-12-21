<?php
  $userID = $_POST["userID"];
  $today = $_POST["today"];
  $strTok = explode(".", $today);
  if($strTok[2] < 10){
    $strTok[2] = "0" . $strTok[2];
    $today = implode('.', $strTok);
  }
  $feeling = $_POST["feeling"];
  $wheather = $_POST["wheather"];

  $dir_path = "../data/diaryFolder/" . $userID ."/diary/";

  $array = array();
  $diary = array();
  if(file_exists($dir_path)){
    if($dh = opendir($dir_path)){
      while(($filename = readdir($dh)) !== false){
        if($filename == "." || $filename == "..") { continue; } //상위 폴더 출력 방지

        $strTok = explode('.json', $filename);

        if($strTok[0] == $today){
          $filepath = $dir_path . "/" .$filename ;
          $file = fopen($filepath, "r");
          $i = 0;
          while(!feof($file)) {
              $line = json_decode(fgets($file));
              if($line != null && $line->feeling == $feeling && $line->wheather == $wheather){
                $diary[$i] = $line;
                $i++;
              }
          }
          fclose($file);
        }
      }
      closedir($dh);
    }
  }
  echo json_encode($diary);

 ?>
