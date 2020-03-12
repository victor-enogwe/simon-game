$(document).ready(function () {
  $("#overlayone").hide();
  $("#overlaytwo").hide();
  $("#overlaythree").hide();
  $("#overlayfour").hide();
  $('#stopmenu').hide();
  document.getElementById('start').style.backgroundColor = '#ddd';
  document.getElementById('strict').style.backgroundColor = '#ddd';
  document.getElementById('start').style.pointerEvents = 'none';
  document.getElementById('strict').style.pointerEvents = 'none';
  document.getElementById("on").checked = false;
  var press = [], playerPress = [], board = ["one", "two", "three", "four"], boards = document.getElementsByClassName('boards'), onOff = false, strict = false, terminate = false, hello = 0;
  $('#strict').on('click', function () {
    if (strict == false) {
      document.getElementById('strict').style.backgroundColor = '#ff5';
      strict = true;
    }
    else if (strict == true) {
      document.getElementById('strict').style.backgroundColor = '#ddd';
      strict = false;
    }
  });
  function pattern() {
    if (terminate == true) {
      return;
    }
    //get random div play
    var min = Math.ceil(0), max = Math.floor(3), turn = Math.floor(Math.random() * (max - min + 1) + min);
    press.push(board[turn]);
  }
  //trailing zero on count
  function pad(num, size) {
    if (terminate == true) {
      return;
    }
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
  //sounds
  function sounds(interval) {
    //base terminating case
    if (interval > press.length - 1) {
      for (var z = 0; z < boards.length; z++) {
        boards[z].style.pointerEvents = 'auto';
      }
      clearTimeout(tone);
      clearTimeout(ttwo);
      return;
    }
    else if (terminate == true) {
      return;
    }
    //recursive case
    //disable div while sound is playing
    for (var z = 0; z < boards.length; z++) {
      boards[z].style.pointerEvents = 'none';
    }
    document.getElementById("count").innerHTML = "<span>" + pad(press.length, 2) + "</span>";
    //highlight divs and play sound
    $("#overlay" + press[interval]).show();
    $("#a" + press[interval]).trigger('play');
    var tone = setTimeout(function () {
      $("#overlay" + press[interval]).hide();
    }, 500);
    var ttwo = setTimeout(function () {
      sounds(interval + 1)
    }, 1000);  // call myself in 3 seconds time if required
  }

  function playStarted() {
    press = [], playerPress = [];
    //user play
    pattern();
    var pone = setTimeout(function () {
      sounds(0);
    }, 2000);
    //play audio on board div click
    if (hello < 1) {
      board.forEach(function (b) {
        $("#" + b).on('click', function () {
          $("#overlay" + b).show();
          $("#a" + b).trigger('play');
          var ptwo = setTimeout(function () {
            $("#overlay" + b).hide();
          }, 500);
          playerPress.push(b);
          if (press.length == playerPress.length) {
            for (var z = 0; z < boards.length; z++) {
              boards[z].style.pointerEvents = 'none';
            }
            if (playerPress.toString("") == press.toString("")) {
              playerPress = [];
              pattern();
              var pthree = setTimeout(function () {
                sounds(0);
              }, 2000);
              return;
            }
            else {
              if (strict == true) {
                press = [], playerPress = [];
                pattern();
                var pfour = setTimeout(function () {
                  $("#error").trigger('play');
                  document.getElementById("count").innerHTML = '<span style="color: #cc0000">!!</span>';
                }, 1000);
                var pfive = setTimeout(function () {
                  document.getElementById("count").innerHTML = '<span style="color: #cc0000"></span>';
                }, 1500);
                var psix = setTimeout(function () {
                  document.getElementById("count").innerHTML = '<span style="color: #cc0000">!!</span>';
                }, 2000);
                document.getElementById("count").innerHTML = '<span style="color: #cc0000">--</span>';
                var pseven = setTimeout(function () {
                  sounds(0);
                }, 3000);
                return;
              }
              else {
                playerPress = [];
                var peight = setTimeout(function () {
                  $("#error").trigger('play');
                  document.getElementById("count").innerHTML = '<span style="color: #cc0000">!!</span>';
                }, 1000);
                var pnine = setTimeout(function () {
                  document.getElementById("count").innerHTML = '<span style="color: #cc0000"></span>';
                }, 1500);
                var pten = setTimeout(function () {
                  document.getElementById("count").innerHTML = '<span style="color: #cc0000">!!</span>';
                }, 2000);
                var peleven = setTimeout(function () {
                  document.getElementById("count").innerHTML = "<span>" + pad(press.length, 2) + "</span>";
                }, 3000);
                var ptwelve = setTimeout(function () {
                  sounds(0)
                }, 3000);
                return;
              }
            }
          }
        });
      });
      $('#stop').on('click', function () {
        hello += 1;
        terminate = true;
        $('#stopmenu').hide();
        document.getElementById('switch').style.pointerEvents = 'auto';
        $('#startmenu').show();
        document.getElementById("count").innerHTML = '<span style="color: #cc0000">--</span>'
        for (var z = 0; z < boards.length; z++) {
          boards[z].style.pointerEvents = 'none';
        }
        return;
      });
    }
  }
  //switching
  function switching() {
    //on and off game
    $("#on").on('click', function () {
      onOff = document.getElementById("on").checked;
      if (onOff == true) {
        document.getElementById('switch').style.pointerEvents = 'none';
        document.getElementById("count").innerHTML = '<span style="color: #cc0000">--</span>';
        document.getElementById('start').style.pointerEvents = 'auto';
        $('#start').on('click', function () {
          terminate = false;
          $('#startmenu').hide();
          $('#stopmenu').show();
          document.getElementById("count").innerHTML = '<span style="color: #cc0000">--</span>';
          document.getElementById('strict').style.pointerEvents = 'auto';
          document.getElementById('start').style.backgroundColor = '#cc0000';
          document.getElementById('strict').style.backgroundColor = '#ddd';
          mainret = false;
          new Array(playStarted());
        });
      }
      else if (onOff == false) {
        strict = false, terminate = true;
        $("#stopmenu").hide();
        $("#startmenu").show();
        document.getElementById("count").innerHTML = '';
        document.getElementById('start').style.backgroundColor = '#ddd';
        document.getElementById('strict').style.backgroundColor = '#ddd';
        document.getElementById('start').style.pointerEvents = 'none';
        document.getElementById('strict').style.pointerEvents = 'none';
        document.getElementById('one').style.pointerEvents = 'none';
        document.getElementById('two').style.pointerEvents = 'none';
        document.getElementById('three').style.pointerEvents = 'none';
        document.getElementById('four').style.pointerEvents = 'none';
      }
    });
  }
  switching();
});
