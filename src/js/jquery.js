$(function () {
  $(".icon-toggle-sidebar").on("click", function () {
    $(".content-area, .sidebar").toggleClass("no-sidebar");
    $(".aside-nav").toggleClass("open");
    $("main.content").toggleClass("open");
  });

  // $(".box-info").css({
  //   left: ($(window).width() - 500) / 2,
  // });
  let arrayInfo = [
      "Name: Taha Abdelmoneim",
      "Age: 22......",
      "From: Egypt, Giza, Saqqara",
      "Email: taha.abdelmoonim@gmail.com",
      "Phone: (+20) 1090770686",
    ],
    theText;
  let theTextLength1,
    theTextLength2 = arrayInfo.length,
    n = 0,
    i = 0,
    theTyper = setInterval(function () {
      theText = arrayInfo[i];
      theTextLength1 = arrayInfo[i].length;
      let textprev = $(".type-write").html();
      $(".type-write").html(`${textprev}${theText[n]}`);
      if (n === theTextLength1) {
        n = -1;
        $(".type-write").html("");
        if (i === theTextLength2 - 1) {
          n = -1;
          i = -1;
          // clearInterval(theTyper);
        }
        i += 1;
      }
      n += 1;
    }, 200);
  
  $("li[data-color]").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });
  $(".icon-color").on("click", function () {
    $(".icon-color i").toggleClass("fa-spin");
    $(this.parentElement).toggleClass("open");
  });
  $(document).mousemove(function (e) {
    $(".pointer").offset({ left: e.pageX, top: e.pageY });
  });
  let bool = true;
  let ele = $(".trail").clone(true);
  $(window).on("dblclick", function () {
    bool = !bool;
    if (bool) {
      $(".trail").detach();
      $(".trail").css("display", "none");
    } else {
      ele.prependTo("body");
      $(".trail").css("display", "block");
    }
  });
  setTimeout(() => {
    $(".prelouder-wrapper").fadeOut(1000);
  }, 3000);
});
