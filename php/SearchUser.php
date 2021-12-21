<?php
  $id = $_POST["id"];
  $Password = $_POST["Password"];
  $isLogin = 0;

  $file = fopen("../data/userData/person.json", "r");


  while(!feof($file)) {
      $line = json_decode(fgets($file));
      if($line != null){
        if($line->id === $id){
          if($line->Password === $Password){
            $isLogin = 1;
          }
        }
      }

  }
  echo $isLogin;


  fclose($file);
 ?>
