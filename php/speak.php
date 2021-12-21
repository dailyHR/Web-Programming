<?php
  $userID = $_POST["userID"];
  $dir_path = "../data/diaryFolder/" . $userID ."/diary/";

  $isThree = 0;
  $isHappy = 0;
  $isSunny = 0;
  if(file_exists($dir_path)){
    if($dh = opendir($dir_path)){
      while(($filename = readdir($dh)) !== false){
        if($filename == "." || $filename == "..") { continue; } //상위 폴더 출력 방지
        $filepath = $dir_path . $filename;
        $file = fopen($filepath, "r");
        $count = 0;
        $happycount = 0;
        $sunnycount = 0;
        while(!feof($file)) {
            $line = json_decode(fgets($file));
            if($line != null){
              $count++;
              if($line->feeling == '😄'){
                $happycount++;
              }
              if($line->wheather =='🌞'){
                $sunnycount++;
              }
            }
        }
        fclose($file);
        if($count >=3){
          $isThree = 1;
        }
        if($happycount >=3){
          $isHappy = 1;
        }
        if($sunnycount >=3){
          $isSunny = 1;
        }
      }
      closedir($dh);
    }
  }
  echo $isThree . " " . $isHappy . " " . $isSunny;



 ?>
