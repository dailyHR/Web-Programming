<?php
  $id = $_POST["id"];
  $password = $_POST["Password"];

  $obj = new stdClass();
  $obj->id = $id;
  $obj->Password = $password;

  $myJSON = json_encode($obj);

  $file = fopen("../data/userData/person.json", "r");

  $validUser = 0;
  while(!feof($file)) {
      $line = json_decode(fgets($file));
      if($line != null){
        if($line->id === $id){
          $validUser = 1;
        }
      }
  }
  fclose($file);

  if($validUser == 0){
    $myfile = fopen("../data/userData/person.json", "a") or die("Unalbe to open");
    fwrite($myfile, $myJSON . "\n");
    fclose($myfile);
  }
  else{
    echo $validUser;
  }

 ?>
