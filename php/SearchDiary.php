<?php
  $userID = $_POST["userID"];
  $year = $_POST["year"];
  $month = $_POST["month"];

  $dir_path = "../data/diaryFolder/" . $userID ."/diary/";

  $day_array = array();

  if(file_exists($dir_path)){
    if($dh = opendir($dir_path)){
      while(($filename = readdir($dh)) !== false){
        if($filename == "." || $filename == "..") { continue; } //상위 폴더 출력 방지

        $strTok = explode('.', $filename);
        if(isset($day_array) == true){
          if($year == $strTok[0] && $month ==$strTok[1]){
            $filepath = $dir_path . $filename ;
            $file = fopen($filepath, "r");
            $count = 0;
            while(!feof($file)) {
                $line = json_decode(fgets($file));
                if($line != null){
                  $count++;
                }
            }
            fclose($file);
            if(substr($strTok[2], 0, 1) == '0'){
              $strTok[2] = substr($strTok[2], 1);
              $day_array[$strTok[2]] = $count;
            }
            else{
              $day_array[$strTok[2]] = $count;
            }
          }
        }
      }
      closedir($dh);
    }
  }

  echo json_encode($day_array);

?>
