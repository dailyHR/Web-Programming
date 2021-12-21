<?php
  $userID = $_POST["userID"];
  $dir_path = "../data/diaryFolder/" . $userID ."/diary/";
  $count = 0;
  if(file_exists($dir_path)){
    if($dh = opendir($dir_path)){
      while(($filename = readdir($dh)) !== false){
        if($filename == "." || $filename == "..") { continue; } //상위 폴더 출력 방지
          $count++;
        }
      }
      closedir($dh);
    }
  echo $count;

 ?>
