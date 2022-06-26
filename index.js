$(document).ready(function(){
  //로그인과 회원가입진행
  $("#logIn").click(function(){
    //빈칸일 경우 예외처리
    if($("#id").val() == "" || $("#password").val() == ""){
      alert("아이디와 비밀번호를 입력해주세요.");
    }
    else{
      var idTest = /^([A-Za-z0-9]){6,15}$/
      var passTest = /^.*(?=^.{8,15}$)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/
      var idTestResult = idTest.test($("#id").val());
      var passTestResult = passTest.test($("#password").val());
      if(idTestResult && passTestResult){
        $.post("php/SearchUser.php",
        {
          id: $("#id").val(),
          Password: $("#password").val()
        },
        function(data){
          if(data == 0){
            alert("아이디와 비밀번호를 다시 확인해주세요.");
          }
          else{
            alert("로그인이 완료되었습니다.");
            if(typeof(Storage) !== "undefined"){
              sessionStorage.setItem("id", $("#id").val());
            }
            window.location.replace("main.html");
          }
        });
      }
      else{
        alert("아이디 또는 패스워드의 입력양식을 체크해주세요.");
      }
    }
  })

  $("#signIn").click(function(){
    if($("#id").val() == "" || $("#password").val() == ""){
      alert("아이디와 비밀번호를 입력해주세요.");
    }
    else{
      var idTest = /^([A-Za-z0-9]){6,15}$/
      var passTest = /^.*(?=^.{8,15}$)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/
      var idTestResult = idTest.test($("#id").val());
      var passTestResult = passTest.test($("#password").val());
      if(idTestResult && passTestResult){
        $.post("php/SaveUser.php",
        {
          id: $("#id").val(),
          Password: $("#password").val()
        },
        function(data){
          if(data == 1){
            alert("이미 유효한 아이디입니다.");
          }
          else{
            alert("회원가입이 완료되었습니다.");
          }
        });
      }
      else{
        alert("아이디 또는 패스워드의 입력양식을 체크해주세요.");
      }
    }

  })

  $("#help").hover(function(){
    $(".helpMessage").css("display","block");
  },function(){
    $(".helpMessage").css("display","none");

  })


})
