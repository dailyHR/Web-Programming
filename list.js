//main.js와 겹치는 부분이 많음. 다른 부분만 주석 작성.
var count = 0;
$(document).ready(function () {
  $('#calendarIcon').click(function () {
    window.location.href = 'main.html';
  });

  var userID = sessionStorage.getItem('id');
  $('#userID').text(userID);

  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  var date = today.getDate();
  $('h1').text(year + '년 ' + (month + 1) + '월');

  listContents(year, month);

  //todo 초기화
  $.post(
    'php/ReadTodoList.php',
    {
      userID: $('#userID').text(),
    },
    function (data) {
      var savedTodo = JSON.parse(data);
      for (var i = 0; i < savedTodo.length; i++) {
        $('.listBox').append(
          '<li>' +
            savedTodo[i]['todo'] +
            "<button class='todoRemove' type='button'>삭제</button></li>"
        );
      }
      $('.todoRemove').click(function () {
        var temp = $(this);
        var text = $(this).parent().html();
        var afterText = text.split('<');
        $.post(
          'php/RemoveTodoList.php',
          {
            userID: $('#userID').text(),
            todo: afterText[0],
          },
          function (data) {
            temp.parent().remove();
          }
        );
      });
    }
  );

  //1개월 단위로 날짜 변경. 단, 12월을 넘어가거나 1월에서 감소할때는 예외 처리.
  $('#nextMonth').click(function () {
    $('tbody').empty();
    month = month + 1;
    //12월을 넘어갈 경우
    if (Number(month + 1) > 12) {
      year = year + 1;
      month = 0;
    }
    $('h1').text(year + '년 ' + Number(month + 1) + '월');
    listContents(year, month);
  });

  $('#prevMonth').click(function () {
    $('tbody').empty();
    month = month - 1;
    if (month < 1) {
      year = year - 1;
      month = 11;
    }
    $('h1').text(year + '년 ' + Number(month + 1) + '월');
    listContents(year, month);
  });

  //일기 작성 버튼 클릭시 일기 작성 페이지가 나타남
  $('#writePlan').click(function () {
    var year = today.getFullYear();
    var month = today.getMonth();
    var date = today.getDate();
    if ($('.diaryBox').css('display') == 'none') {
      $('#date').text(year + '.' + (month + 1) + '.' + date);
      $('.diaryBox').css('display', 'block');
    } else {
      $('.diaryBox').css('display', 'none');
    }
  });

  $('#Xbutton').click(function () {
    removeContents();
    $('.diaryBox').css('display', 'none');
  });

  $('#w_Xbutton').click(function () {
    removeContents();
    $('.w_diaryBox').css('display', 'none');
    window.location.reload();
  });

  $('#emojiPicker').click(function () {
    if ($('.pick').css('display') == 'none') {
      $('.pick').css('display', 'block');
    } else {
      $('.pick').css('display', 'none');
    }
  });

  $('.pick span').click(function () {
    $('#feeling').val($(this).text());
    $('.pick').css('display', 'none');
  });

  $('#wheatherPicker').click(function () {
    if ($('.wheatherpick').css('display') == 'none') {
      $('.wheatherpick').css('display', 'block');
    } else {
      $('.wheatherpick').css('display', 'none');
    }
  });

  $('.wheatherpick span').click(function () {
    $('#wheather').val($(this).text());
    $('.wheatherpick').css('display', 'none');
  });

  $('#w_emojiPicker').click(function () {
    if ($('.w_pick').css('display') == 'none') {
      $('.w_pick').css('display', 'block');
    } else {
      $('.w_pick').css('display', 'none');
    }
  });

  $('.w_pick span').click(function () {
    $('#w_feeling').val($(this).text());
    $('.w_pick').css('display', 'none');
  });

  $('#w_wheatherPicker').click(function () {
    if ($('.w_wheatherpick').css('display') == 'none') {
      $('.w_wheatherpick').css('display', 'block');
    } else {
      $('.w_wheatherpick').css('display', 'none');
    }
  });

  $('.w_wheatherpick span').click(function () {
    $('#w_wheather').val($(this).text());
    $('.w_wheatherpick').css('display', 'none');
  });

  $('#searchemojiPicker').click(function () {
    if ($('.searchpick').css('display') == 'none') {
      $('.searchpick').css('display', 'block');
    } else {
      $('.searchpick').css('display', 'none');
    }
  });

  $('.searchpick span').click(function () {
    $('#searchfeeling').val($(this).text());
    $('.searchpick').css('display', 'none');

    if ($('#searchwheather').val() == '') {
      feelingSearch(year, month, $(this).text());
    } else {
      //bothSearch(year,month,feeling,wheather)
      bothSearch(year, month, $(this).text(), $('#searchwheather').val());
    }
  });

  $('#searchwheatherPicker').click(function () {
    if ($('.searchwheatherpick').css('display') == 'none') {
      $('.searchwheatherpick').css('display', 'block');
    } else {
      $('.searchwheatherpick').css('display', 'none');
    }
  });

  $('.searchwheatherpick span').click(function () {
    $('#searchwheather').val($(this).text());
    $('.searchwheatherpick').css('display', 'none');

    if ($('#searchfeeling').val() == '') {
      wheatherSearch(year, month, $(this).text());
    } else {
      //bothSearch(year,month,feeling,wheather)
      bothSearch(year, month, $('#searchfeeling').val(), $(this).text());
    }
  });

  //Todo List 입력하고 버튼 클릭했을 경우
  //서버에 투두 내용 저장
  $('#listClick').click(function () {
    var todo = $('#ToDo').val();
    $('#ToDo').val('');
    $('.listBox').append(
      '<li>' +
        todo +
        "<button class='todoRemove' type='button'>삭제</button></li>"
    );

    $.post('php/TodoList.php', {
      userID: $('#userID').text(),
      todo: todo,
    });

    $('.todoRemove').click(function () {
      var temp = $(this);
      var text = $(this).parent().html();
      var afterText = text.split('<');
      $.post(
        'php/RemoveTodoList.php',
        {
          userID: $('#userID').text(),
          todo: afterText[0],
        },
        function (data) {
          temp.parent().remove();
          console.log(data);
        }
      );
    });
  });

  $('#completeButton').click(function () {
    //작성완료 버튼을 누를시 서버로 정보 전달.

    var today = $('#date').text();
    var title = $('#title').val();
    var wheather = $('#wheather').val();
    var feeling = $('#feeling').val();
    var textPlan = $('#textPlan').val();

    if (title == '' || textPlan == '') {
      alert('제목과 내용은 필수 입력입니다.');
    } else {
      $.post(
        'php/SaveDiary.php',
        {
          userID: $('#userID').text(),
          today: today,
          title: title,
          wheather: wheather,
          feeling: feeling,
          textPlan: textPlan,
        },
        function (data) {
          removeContents();
          alert('작성 완료되었습니다.');
          window.location.reload();
        }
      );
    }
  });

  //챌린지 화면으로 전환
  $('#user').click(function () {
    window.location.href = 'userPage.html';
  });

  $('#logout').click(function () {
    sessionStorage.clear();
    window.location.href = 'index.html';
  });

  $('#modifyDiary').click(function () {
    var today = $('#w_date').text();
    var title = $('#w_title').val();
    var wheather = $('#w_wheather').val();
    var feeling = $('#w_feeling').val();
    var textPlan = $('#w_textPlan').val();

    $.post(
      'php/modifyDiary.php',
      {
        index: count,
        userID: $('#userID').text(),
        today: today,
        title: title,
        wheather: wheather,
        feeling: feeling,
        textPlan: textPlan,
      },
      function (data) {
        alert('수정되었습니다.');
        removeContents();
        window.location.reload();
      }
    );
  });

  $('#removeDiary').click(function () {
    var today = $('#w_date').text();

    $.post(
      'php/removeDiary.php',
      {
        index: count,
        userID: $('#userID').text(),
        today: today,
      },
      function (data) {
        alert('삭제되었습니다.');
        removeContents();
        window.location.reload();
      }
    );
  });
});

function removeContents() {
  $('#title').val('');
  $('#wheather').val('');
  $('#feeling').val('');
  $('#textPlan').val('');
}

//일기 개수로 버튼 배치가 다름.
//1개 이하 -> 버튼 나타나지않고,
//2개 -> 오른쪽으로 넘길 수 있는 버튼 생성
//2개 이상 ~ 해당 날짜 일기 개수 -1 이하 -> 좌우로 이동이 가능한 버튼 생성
//해당 날짜 일기 개수 -> 왼쪽으로 넘길 수 있는 버튼 생성
function buttonFunction(data) {
  var diary = JSON.parse(data);
  if (diary.length > 1) {
    $('#prevDiary').css('display', 'none');
    $('#nextDiary').css('display', 'inline');
  } else {
    $('#prevDiary').css('display', 'none');
    $('#nextDiary').css('display', 'none');
  }

  $('#w_title').val(diary[0]['title']);
  $('#w_wheather').val(diary[0]['wheather']);
  $('#w_feeling').val(diary[0]['feeling']);
  $('#w_textPlan').text(diary[0]['textPlan']);

  $('#nextDiary').click(function () {
    count++;
    $('#w_title').val(diary[count]['title']);
    $('#w_wheather').val(diary[count]['wheather']);
    $('#w_feeling').val(diary[count]['feeling']);
    $('#w_textPlan').text(diary[count]['textPlan']);
    $('#prevDiary').css('display', 'inline');

    if (count == diary.length - 1) {
      $('#nextDiary').css('display', 'none');
    }

    $('#w_Xbutton').click(function () {
      removeContents();
      $('.w_diaryBox').css('display', 'none');
      count = 0;
    });
  });

  $('#prevDiary').click(function () {
    count--;
    if (count == 0) {
      $('#prevDiary').css('display', 'none');
      $('#nextDiary').css('display', 'inline');
    }
    if (count > 0 && count < diary.length) {
      $('#nextDiary').css('display', 'inline');
    }
    $('#w_title').val(diary[count]['title']);
    $('#w_wheather').val(diary[count]['wheather']);
    $('#w_feeling').val(diary[count]['feeling']);
    $('#w_textPlan').text(diary[count]['textPlan']);

    $('#w_Xbutton').click(function () {
      removeContents();
      $('.w_diaryBox').css('display', 'none');
      count = 0;
    });
  });
}

function tableFunction() {
  $('table').click(function () {
    var today = $(this).find('th').text();
    $('#w_date').text(today);
    $('.w_diaryBox').css('display', 'block');

    $.post(
      'php/ReadDiary.php',
      {
        userID: $('#userID').text(),
        today: today,
      },
      function (data) {
        buttonFunction(data);
      }
    );
  });
}

//기분별로 일기 모아보기
function feelingSearch(year, month, feeling) {
  var newYear = year;
  var newMonth = month;
  var newFeeling = feeling;
  $.post(
    'php/feelingSearch.php',
    {
      userID: $('#userID').text(),
      year: newYear,
      month: newMonth + 1,
      feeling: newFeeling,
    },
    function (data) {
      var day_array = JSON.parse(data);
      $('.tableBox').empty();
      for (var i = 0; i < day_array.length; i++) {
        var today = day_array[i]['date'];
        var content = day_array[i]['title'];
        var newCount = day_array[i]['count'] - 1;
        if (newCount > 0) {
          $('.tableBox').append(
            '<table><tr><th>' +
              today +
              "</th></tr><tr><td>'" +
              content +
              "'외 " +
              newCount +
              '개의 일기</td></tr></table>'
          );
        } else {
          $('.tableBox').append(
            '<table><tr><th>' +
              today +
              '</th></tr><tr><td>' +
              content +
              '</td></tr></table>'
          );
        }
      }
      $('table').click(function () {
        var today = $(this).find('th').text();
        $('#w_date').text(today);
        $('.w_diaryBox').css('display', 'block');

        $.post(
          'php/feelingReadDiary.php',
          {
            userID: $('#userID').text(),
            today: today,
            feeling: newFeeling,
          },
          function (data) {
            buttonFunction(data);
          }
        );
      });
    }
  );
}

//날짜별로 일기 모아보기
function wheatherSearch(year, month, wheather) {
  var newYear = year;
  var newMonth = month;
  var newWheather = wheather;
  $.post(
    'php/wheatherSearch.php',
    {
      userID: $('#userID').text(),
      year: newYear,
      month: newMonth + 1,
      wheather: newWheather,
    },
    function (data) {
      var day_array = JSON.parse(data);
      console.log(day_array);
      $('.tableBox').empty();
      for (var i = 0; i < day_array.length; i++) {
        var today = day_array[i]['date'];
        var content = day_array[i]['title'];
        var newCount = day_array[i]['count'] - 1;
        if (newCount > 0) {
          $('.tableBox').append(
            '<table><tr><th>' +
              today +
              "</th></tr><tr><td>'" +
              content +
              "'외 " +
              newCount +
              '개의 일기</td></tr></table>'
          );
        } else {
          $('.tableBox').append(
            '<table><tr><th>' +
              today +
              '</th></tr><tr><td>' +
              content +
              '</td></tr></table>'
          );
        }
      }
      $('table').click(function () {
        var today = $(this).find('th').text();
        $('#w_date').text(today);
        $('.w_diaryBox').css('display', 'block');

        $.post(
          'php/wheatherReadDiary.php',
          {
            userID: $('#userID').text(),
            today: today,
            wheather: newWheather,
          },
          function (data) {
            buttonFunction(data);
          }
        );
      });
    }
  );
}

function bothSearch(year, month, feeling, wheather) {
  var newYear = year;
  var newMonth = month;
  var newFeeling = feeling;
  var newWheather = wheather;
  $.post(
    'php/bothSearch.php',
    {
      userID: $('#userID').text(),
      year: newYear,
      month: newMonth + 1,
      feeling: newFeeling,
      wheather: newWheather,
    },
    function (data) {
      var day_array = JSON.parse(data);
      $('.tableBox').empty();
      for (var i = 0; i < day_array.length; i++) {
        var today = day_array[i]['date'];
        var content = day_array[i]['title'];
        var newCount = day_array[i]['count'] - 1;
        if (newCount > 0) {
          $('.tableBox').append(
            '<table><tr><th>' +
              today +
              "</th></tr><tr><td>'" +
              content +
              "'외 " +
              newCount +
              '개의 일기</td></tr></table>'
          );
        } else {
          $('.tableBox').append(
            '<table><tr><th>' +
              today +
              '</th></tr><tr><td>' +
              content +
              '</td></tr></table>'
          );
        }
      }
      $('table').click(function () {
        var today = $(this).find('th').text();
        $('#w_date').text(today);
        $('.w_diaryBox').css('display', 'block');

        $.post(
          'php/bothReadDiary.php',
          {
            userID: $('#userID').text(),
            today: today,
            wheather: newWheather,
            feeling: newFeeling,
          },
          function (data) {
            buttonFunction(data);
          }
        );
      });
    }
  );
}

function listContents(year, month) {
  // 년도와 월에 해당하는 데이터 가져옴
  //ex) 2021.12 -> 2021년 12월의 데이터
  var newYear = year;
  var newMonth = month;
  $.post(
    'php/ListDiary.php',
    {
      userID: $('#userID').text(),
      year: newYear,
      month: newMonth + 1,
    },
    function (data) {
      var day_array = JSON.parse(data);
      $('.tableBox').empty();
      for (var i = 0; i < day_array.length; i++) {
        var today = day_array[i]['date'];
        var content = day_array[i]['title'];
        var newCount = day_array[i]['count'] - 1;
        if (newCount > 0) {
          $('.tableBox').append(
            '<table><tr><th>' +
              today +
              "</th></tr><tr><td>'" +
              content +
              "'외 " +
              newCount +
              '개의 일기</td></tr></table>'
          );
        } else {
          $('.tableBox').append(
            '<table><tr><th>' +
              today +
              '</th></tr><tr><td>' +
              content +
              '</td></tr></table>'
          );
        }
      }
      $('table').click(function () {
        var today = $(this).find('th').text();
        $('#w_date').text(today);
        $('.w_diaryBox').css('display', 'block');

        $.post(
          'php/ReadDiary.php',
          {
            userID: $('#userID').text(),
            today: today,
          },
          function (data) {
            buttonFunction(data);
          }
        );
      });
    }
  );
}
