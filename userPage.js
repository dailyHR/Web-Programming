$(document).ready(function () {
  var userID = sessionStorage.getItem('id');
  $('#userID').text(userID);

  //달력 화면으로 이동
  $('#calendarIcon').click(function () {
    window.location.href = 'main.html';
  });

  //리스트화면으로 이동
  $('#listIcon').click(function () {
    window.location.href = 'list.html';
  });

  $('#logout').click(function () {
    sessionStorage.clear();
    window.location.href = 'index.html';
  });

  //챌린지 성공 여부

  $.post(
    'php/first.php',
    {
      userID: $('#userID').text(),
    },
    function (data) {
      var count = data;
      console.log(count);
      //1.첫걸음
      if (count > 0) {
        $('#first').css('color', 'black');
        $('#first .title span').css('background-color', '#ffffbb');
        $('#first .content').css('display', 'block');
      }
      //2. 7일 이상
      if (count >= 7) {
        $('#weekend').css('color', 'black');
        $('#weekend .title span').css('background-color', '#ffffbb');
        $('#weekend .content').css('display', 'block');
      }
      //4. 30일 이상
      if (count >= 30) {
        $('#month').css('color', 'black');
        $('#month .title span').css('background-color', '#ffffbb');
        $('#month .content').css('display', 'block');
      }
      listNum();
    }
  );

  $.post(
    'php/speak.php',
    {
      userID: $('#userID').text(),
    },
    function (data) {
      //3. 하루 3개
      var returnData = data.split(' ');
      console.log(returnData);
      var three = returnData[0];
      var happy = returnData[1];
      var sunny = returnData[2];

      if (three == 1) {
        $('#three').css('color', 'black');
        $('#three .title span').css('background-color', '#ffffbb');
        $('#three .content').css('display', 'block');
      }

      if (happy == 1) {
        $('#happy').css('color', 'black');
        $('#happy .title span').css('background-color', '#ffffbb');
        $('#happy .content').css('display', 'block');
      }

      if (sunny == 1) {
        $('#sunny').css('color', 'black');
        $('#sunny .title span').css('background-color', '#ffffbb');
        $('#sunny .content').css('display', 'block');
      }
      listNum();
    }
  );
});

function listNum() {
  var num = 0;
  for (var i = 0; i < $('.mainMenu').children().length; i++) {
    var temp = $('.mainMenu').children(i).find('.content');
    if (temp[i].style.display == 'block') {
      num++;
    }
  }
  $('#completeNumber').text(num);
}
