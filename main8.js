var count = 0; //작성한 일기 index 확인 용도
$(document).ready(function(){

  //session으로 회원의 아이디 저장해놓음.
  //값을 가져와서 사용한다. 창을 새로고침해도 값은 유지가됨.
  var userID = sessionStorage.getItem("id");
  $("#userID").text(userID);

  //오늘 날짜('YYYY-MM')를 상단에 표시
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  var date = today.getDate();
  $("h1").text(year + "년 " + (month+1) +"월");
  makeCalendar(year,month);


  //1개월 단위로 날짜 변경. 단, 12월을 넘어가거나 1월에서 감소할때는 예외 처리.
  $("#nextMonth").click(function(){
    $("tbody").empty();
    month = month + 1;
    //12월을 넘어갈 경우
    if(Number(month+1) > 12){
      year = year + 1;
      month = 0;
    }
    $("h1").text(year + "년 " + Number(month+1) +"월");
    makeCalendar(year, month);

  });

  $("#prevMonth").click(function(){
    $("tbody").empty();
    month = month - 1;

    //1월보다 값이 작아질 경우
    if(month < 1){
      year = year - 1;
      month = 11;
    }
    $("h1").text(year + "년 " + Number(month+1) +"월");
    makeCalendar(year, month);

  });

//일기 작성 버튼 클릭시 일기 작성 페이지(class=".diaryBox")가 나타남
  $("#writePlan").click(function(){
    var year = today.getFullYear();
    var month = today.getMonth();
    var date = today.getDate();
    if($(".diaryBox").css("display") == "none"){
      $("#date").text(year + "." + (month+1) +"." + date);
      $(".diaryBox").css("display","block");
    }
    else{
      $(".diaryBox").css("display","none");
    }
  })

  //창을 닫는 xbutton, 현재 작성하고 있는 내용도 초기화.
  $("#Xbutton").click(function(){
    removeContents();
    $(".diaryBox").css("display","none");
  })

  //w_가 붙은 id명과 class명은 작성된 일기를 확인하기위한 페이지 용도.
  $("#w_Xbutton").click(function(){
    removeContents();
    $(".w_diaryBox").css("display","none");
    window.location.reload();
  })

  //이모지 이모티콘 선택시 여러 이모티콘중 하나 선택이 가능
  $("#emojiPicker").click(function(){
    if($(".pick").css("display") == "none"){
      $(".pick").css("display","block");
    }
    else{
      $(".pick").css("display","none");
    }
  })

  $(".pick span").click(function(){
    $("#feeling").val($(this).text());
    $(".pick").css("display","none");
  })

  $("#wheatherPicker").click(function(){
    if($(".wheatherpick").css("display") == "none"){
      $(".wheatherpick").css("display","block");
    }
    else{
      $(".wheatherpick").css("display","none");
    }
  })

  $(".wheatherpick span").click(function(){
    $("#wheather").val($(this).text());
    $(".wheatherpick").css("display","none");
  })




  //마찬가지로 w_가 붙은 id, class는 작성된 일기(class="w_diaryBox")에서 사용.
  //내용은 거의 동일하며, id명과 class명이 다름.
  $("#w_emojiPicker").click(function(){
    if($(".w_pick").css("display") == "none"){
      $(".w_pick").css("display","block");
    }
    else{
      $(".w_pick").css("display","none");
    }
  })

  $(".w_pick span").click(function(){
    $("#w_feeling").val($(this).text());
    $(".w_pick").css("display","none");
  })

  $("#w_wheatherPicker").click(function(){
    if($(".w_wheatherpick").css("display") == "none"){
      $(".w_wheatherpick").css("display","block");
    }
    else{
      $(".w_wheatherpick").css("display","none");
    }
  })

  $(".w_wheatherpick span").click(function(){
    $("#w_wheather").val($(this).text());
    $(".w_wheatherpick").css("display","none");
  })





  $("#completeButton").click(function(){
    //작성완료 버튼을 누를시 서버로 정보 전달.

    var today =$("#date").text();
    var title = $("#title").val();
    var wheather = $("#wheather").val();
    var feeling = $("#feeling").val();
    var textPlan = $("#textPlan").val();

    if(title == "" || textPlan ==""){
      alert("제목과 내용은 필수 입력입니다.");
    }
    else{
      $.post("php/SaveDiary.php",
      {
        userID: $("#userID").text(),
        today: today,
        title: title,
        wheather: wheather,
        feeling: feeling,
        textPlan: textPlan
      },
      function(data){
        removeContents();
        alert("작성 완료되었습니다.");
        window.location.reload();
      });
    }


  })

  //리스트 화면으로 전환
  $("#listIcon").click(function(){
    window.location.href = "list.html";
  })

  //챌린지 화면으로 전환
  $("#user").click(function(){
    window.location.href = "userPage.html";
  })

  //로그아웃 -> 첫번째 로그인화면으로 넘어가고, session값 삭제
  $("#logout").click(function(){
    sessionStorage.clear();
    window.location.href = "login.html";
  })

  //수정버튼-> 작성한 일기내용창에서 수정버튼을 클릭할 수 있음
  $("#modifyDiary").click(function(){
    var today =$("#w_date").text();
    var title = $("#w_title").val();
    var wheather = $("#w_wheather").val();
    var feeling = $("#w_feeling").val();
    var textPlan = $("#w_textPlan").val();

    $.post("php/modifyDiary.php",
    {
      index: count,
      userID: $("#userID").text(),
      today: today,
      title: title,
      wheather: wheather,
      feeling: feeling,
      textPlan: textPlan
    },
    function(data){
      alert("수정되었습니다.");
      removeContents();
      window.location.reload();
    });
  })

  $("#removeDiary").click(function(){
    var today =$("#w_date").text();

    $.post("php/removeDiary.php",
    {
      index: count,
      userID: $("#userID").text(),
      today: today
    },
    function(data){
      alert("삭제되었습니다.");
      removeContents();
      window.location.reload();
    });
  })


});

//달력작성
function makeCalendar(newYear, newMonth){
  var today = new Date();
  var year = newYear;
  var month = newMonth;
  var date = today.getDate();

  firstDay = new Date(year, month, 1).getDay(); //시작하는 날짜 요일. 0~6(월~금)
  lastDate = new Date(year, month+1, 0).getDate(); //말일
  lastDay = new Date(year, month+1, 0).getDay();

  //1주차
  for(var i = 0 ; i < firstDay; i++){
    $("tbody").append("<td></td>");
  }
  for(var i = 0 ; i < 7-firstDay ; i++){
    $("tbody").append("<td>" +(Number(i)+1) + "</td>");
    day = (Number(i)+1);
  }

  //2주차이상
  day++;
  while(day <= lastDate){
    $("tbody").append("<tr>");
    for(var i = 0 ; i < 7 && day <= lastDate; i ++){
      $("tbody").append("<td id = "+ day +">" + day +"</td>");
      day++;
    }
  }

  //마지막 주 비우기
  for(var i = lastDay ; i < 6; i++){
    $("tbody").append("<td></td>");
  }
  todayColor();

  $.post("php/SearchDiary.php",
  {
    userID: $("#userID").text(),
    year: year,
    month: month+1
  },
  function(data){
    var day_array = JSON.parse(data);
    console.log(day_array);
    for(var key in day_array){
      for(var i = 0 ; i < $("tbody").find("td").length; i++){
        if($("tbody").find("td").eq(i).text() == key){
          $("tbody").find("td").eq(i).append("<button class='diaryBtn' type='button'>"+ day_array[key] +"개의 일기" +"</button>");
        }
      }
    }

    $(".diaryBtn").click(function(){
      // var count = 0;
      console.log(count);
      var diary = [];
      var text = $(this).parent().html();
      var afterText = text.split('<');
      var num = Number(afterText[0]);
      var today = year + "." + (Number(month)+1) +"." + num ;
      $("#w_date").text(today);
      $(".w_diaryBox").css("display","block");

      $.post("php/ReadDiary.php",
      {
        userID: $("#userID").text(),
        today: today
      },
      function(data){
        diary = JSON.parse(data);
        if(diary.length > 1){
          $("#prevDiary").css("display","none");
          $("#nextDiary").css("display","inline");
        }
        else{
          $("#prevDiary").css("display","none");
          $("#nextDiary").css("display","none");
        }

        $("#w_title").val(diary[0]["title"]);
        $("#w_wheather").val(diary[0]["wheather"]);
        $("#w_feeling").val(diary[0]["feeling"]);
        $("#w_textPlan").text(diary[0]["textPlan"]);


        $("#nextDiary").click(function(){
          diary = JSON.parse(data);
          console.log(diary);
          count++;
          console.log(count);
          $("#w_title").val(diary[count]["title"]);
          $("#w_wheather").val(diary[count]["wheather"]);
          $("#w_feeling").val(diary[count]["feeling"]);
          $("#w_textPlan").text(diary[count]["textPlan"]);
          $("#prevDiary").css("display","inline");

          if(count == diary.length-1){
            $("#nextDiary").css("display", "none");
          }

          $("#w_Xbutton").click(function(){
            removeContents();
            $(".w_diaryBox").css("display","none");
            count=0;
          })
        })

        $("#prevDiary").click(function(){
          count--;
          console.log(count);
          if(count == 0){
            $("#prevDiary").css("display","none");
            $("#nextDiary").css("display","inline");
          }
          if(count>0 && count < diary.length){
            $("#nextDiary").css("display","inline");
          }
          $("#w_title").val(diary[count]["title"]);
          $("#w_wheather").val(diary[count]["wheather"]);
          $("#w_feeling").val(diary[count]["feeling"]);
          $("#w_textPlan").text(diary[count]["textPlan"]);

          $("#w_Xbutton").click(function(){
            removeContents();
            $(".w_diaryBox").css("display","none");
            count=0;
          })
        })
      }
    );
    })
  });

  //일기를 작성하고 싶은 날짜를 더블클릭하면 해당 날짜의 일기작성 페이지가 나타남
  $("td").dblclick(function(){
    if($(this).text() != ""){
      var calendar = $("h1").text();
      var pickYear = calendar.substr(0,4).replace(/[^0-9]/g,'');
      var pickMonth = calendar.substr(4,calendar.length).replace(/[^0-9]/g,'');
      var pickDate = $(this).html();
      var afterText = pickDate.split('<');
      var num = Number(afterText[0]);

      $("#date").text(pickYear + "." + pickMonth +"." + num);
      $(".diaryBox").css("display","block");
    }

  })
}

//오늘 날짜에 색표시
function todayColor(){
  var today = new Date();
  var nowYear = today.getFullYear();
  var nowMonth = today.getMonth() + 1;
  var nowDate = today.getDate();

//캘린더 위에 적힌 날짜 값 가져오기
  var calendar = $("h1").text();
  var calendarYear = calendar.substr(0,4).replace(/[^0-9]/g,'');
  var calendarMonth = calendar.substr(4,calendar.length).replace(/[^0-9]/g,'');

  for(var i = 0 ; i < $("tbody").find("td").length; i++){
    if($("tbody").find("td").eq(i).text() == nowDate &&
      nowMonth == calendarMonth && nowYear == calendarYear){
      $("tbody").find("td").eq(i).css("background-color", "powderblue");
    }
  }

}


function removeContents(){
  $("#title").val("");
  $("#wheather").val("");
  $("#feeling").val("");
  $("#textPlan").val("");
}
