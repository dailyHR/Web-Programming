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
        $strTok = explode('.json', $filename);
        array_push($day_array, $strTok[0]);

      }
      closedir($dh);
    }
  }
  sort($day_array);

  //$filename = $year . "." . $month . ".";

  $diray_array = array();
  //data 형식 : 날짜, title을 리턴
  if(file_exists($dir_path)){
    for($i = 0 ; $i < count($day_array); $i++){
      $dateVal = $day_array[$i];
      $strTok = explode('.', $dateVal);
      if($strTok[2] < 10){
        $strTok[2] = substr($strTok[2], 1);
        $dateVal = implode('.', $strTok);
      }

      if($year == $strTok[0] && $month == $strTok[1]){
        $newfilename = $dir_path . $day_array[$i]. ".json";

        $file = fopen($newfilename, "r");
        $obj = new stdClass();
        $obj->date = $dateVal;
        $str = "";
        $count = 0;
        while(!feof($file)) {
            $line = json_decode(fgets($file));
            if($line != null){
                $count++;
                if($count == 1){
                  $str = $line->title;
                }
            }

        }
        fclose($file);
        $obj->title = $str;
        $obj->count = $count;
        array_push($diray_array, $obj);
      }

    }
  }

  echo json_encode($diray_array, JSON_UNESCAPED_UNICODE);
 ?>
