import "./layoutJs/images";
import "../css/main.scss";


function addListenerMulti(element, eventNames, listener) {
  var events = eventNames.split(" ");
  for (var i = 0, iLen = events.length; i < iLen; i++) {
    element.addEventListener(events[i], listener, false);
  }
}
function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

// setAttributes(elem, {"src": "http://example.com/something.jpeg", "height": "100%", ...});

// change color
let changeColor = document.querySelectorAll("li[data-color]");
changeColor.forEach((el) => {
  el.addEventListener("click", (e) => {
    document.body.classList.remove("green", "pink", "blue", "linear", "yellow");
    document.body.classList.add(e.currentTarget.dataset.color);
  });
});
let changeFont = document.querySelectorAll("li[data-font]");
changeFont.forEach((el) => {
  el.addEventListener("click", (e) => {
    document.body.classList.remove("cairo", "oswald", "abril", "monda", "courgette");
    document.body.classList.add(e.currentTarget.dataset.font);
  });
});

// Start box move mouse
var mousePosition,
  offset = [0, 0],
  isDown = false,
  target = null;
var boxInfo = document.querySelector(".box-info");

["mousedown", "touchstart"].forEach(function (e) {
  boxInfo.addEventListener(
    e,
    function (e) {
      // cursor: grabbing;
      if (e.touches) {
        // var touch = e.touches[0];
        target = e.touches[0].target.parentElement.parentElement;
      }
      boxInfo.classList.add("move");
      isDown = true;
      offset = [boxInfo.offsetLeft - e.clientX, boxInfo.offsetTop - e.clientY];
    },
    true
  );
});

["mouseup", "touchend"].forEach(function (e) {
  boxInfo.addEventListener(
    e,
    function () {
      boxInfo.classList.remove("move");
      isDown = false;
      document.body.style.overflowY = "inherit";
    },
    true
  );
});
boxInfo.addEventListener("touchmove", handleTouchMove, false);

function handleTouchMove(e) {
  e.stopPropagation();
  if (e.touches.length == 1) {
    if (target === boxInfo) {
      document.body.style.overflowY = "clip";
      moveDrag(e);
    }
  }
}

function moveDrag(e) {
  var touch = e.touches[0];
  mousePosition = {
    x: touch.pageX,
    y: touch.pageY,
  };
  // var posX = touch.pageX - container.x - drag.w / 2;
  boxInfo.style.cssText = `transform: rotateX(${mousePosition.y + "deg"}) 
    rotateY(${mousePosition.x + "deg"})`;
}

boxInfo.addEventListener(
  "mousemove",
  function (event) {
    // boxInfo.style.left = `${window.innerWidth - 500 / 2}px`;
    event.preventDefault();
    if (isDown) {
      mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      // ;
      boxInfo.style.cssText = `transform: rotateX(${mousePosition.y + offset[1] + "deg"}) 
    rotateY(${mousePosition.x + offset[0] + "deg"})`;
    } else {
      boxInfo.classList.remove("move");
    }
  },
  true
);
// End box move mouse

// Start Number About
let numberAbout = document.querySelectorAll("#number-about");
let numberCounter = 0;
let numberAboutF = () => {
  numberAbout.forEach((el) => {
    let setIntNumber = setInterval(
      () => {
        el.dataset.percent < 100 ? (numberCounter = 1) : (numberCounter = 100);
        el.innerHTML = Number(el.innerHTML) + numberCounter;
        if (Number(el.innerHTML) >= el.dataset.percent) {
          clearInterval(setIntNumber);
        }
      },
      el.dataset.percent < 100 ? 200 : 10
    );
  });
};
// End Number About
// Start light services title
let servicesTitle = document.getElementById("services-title");
servicesTitle.addEventListener("click", () => {
  import("./layoutJs/app").then(() => console.log(""));
});
// End light services title
// Start Get Data Fom Api

let gallery = document.querySelector(".container.gallery .row");
let modalWebsite = document.querySelector(".modal-website");
let getRepos = () => {
  const createRepo = (repo, hrefA2) => {
    let repoName = repo.name;
    if (repo.name.length > 22) {
      repoName = repo.name.slice(0, 22) + " ...";
    }
    gallery.innerHTML += `
        <div class="col-12 col-md-6 col-lg-4 py-4">
          <div class="box-work-gallery position-relative">
            <i class="fa-solid fa-expand position-absolute fw-bold fs-1" data-bs-toggle='modal' data-bs-target='#${repo.name}'></i>
            <div class="overlay"></div>
            <img class="img-fluid" src="./assets/${repo.name}.webp" alt="${repo.name}">
            <a class="fw-bold text-decoration-none fs-5 d-block p-3" href="${repo.html_url}" title="${repo.name}" alt="${repo.name}" target="_blank">${repoName}</a>
            <div class="contact-gallery p-3 border-top d-flex justify-content-between align-items-center">
            <a class="fw-bold text-decoration-none fs-5" href="${hrefA2}" alt="Elzero" target="_blank">Show Site</a>
              <i class="fas fa-long-arrow-alt-right"></i></div>
          </div>
        </div>
      `;
    modalWebsite.innerHTML += `
      <div class="modal fade" id="${repo.name}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header">
              <a class="fw-bold text-decoration-none fs-5" href="${hrefA2}" alt="Elzero" target="_blank">Show Site</a>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <object class="w-100" data="${hrefA2}"></object>
            </div>
          </div>
        </div>
      </div>
      `;
  };
  let swiper = document.querySelector(".swiper-wrapper");
  fetch("https://api.github.com/users/Taha-Abdelmonim/repos")
    .then((response) => response.json())
    .then((repositories) => {
      repositories.forEach((repo, index) => {
        if (
          repo.name === "jsonapi" ||
          repo.name === "Taha-Abdelmonim" ||
          repo.name === "webpack-5-final"
        ) {
        } else if (repo.name === "Courses") {
          createRepo(repo, `https://courses-xi.vercel.app/`);
        } else if (repo.name === "portfolio") {
          createRepo(repo, `https://portfolio-taha-abdelmonim.vercel.app/`);
        } else {
          createRepo(repo, `https://taha-abdelmonim.github.io/${repo.name}`);
        }
      });
    });
  setTimeout(() => {
    let imgShowGithub = gallery.querySelectorAll("img"),
      overlay = gallery.querySelectorAll(".overlay");
    imgShowGithub.forEach((ele, index) => {
      overlay[index].style.height = `${ele.clientHeight}.5px`;
      swiper.innerHTML += `
          <div class='swiper-slide'>
            <img src="${ele.src}" alt="${ele.alt}"/>
          </div>
          `;
    });
  }, 2000);
  setTimeout(() => {
    SliderImages();
  }, 3000);
};
window.addEventListener("resize", () => {
  let imgShowGithub = gallery.querySelectorAll("img"),
    overlay = gallery.querySelectorAll(".overlay");
  imgShowGithub.forEach((ele, index) => {
    overlay[index].style.height = `${ele.clientHeight}.5px`;
  });
});

// End Get Data Fom Api
// Start Skills
let showSkills = () => {
  let allCircle = document.querySelectorAll("#circle");
  let percent = document.querySelectorAll(".number h2");

  let skillsF = (arr) => {
    arr.forEach((el) => {
      setTimeout(() => {
        el.style.strokeDashoffset = `${440 - (440 * el.dataset.percent) / 100}`;
      }, el.dataset.speed);
    });
  };
  allCircle.forEach((ele) => {
    skillsF([ele]);
  });

  let percentF = (arr) => {
    arr.forEach((el) => {
      setTimeout(() => {
        let number = 0;
        let intrvel = setInterval(
          () => {
            number += 1;
            el.textContent = `${number}%`;
            if (number == el.dataset.percent) {
              clearInterval(intrvel);
            }
          },
          el.dataset.speed < 10000 ? el.dataset.speed / 60 - 60 : el.dataset.speed / 60 - 260
        );
      }, el.dataset.speed);
    });
  };
  percent.forEach((ele) => {
    percentF([ele]);
  });
};
// End Skills

// Start ScrollOut
let workGallery = document.getElementById("gallery"),
  about = document.getElementById("about-2"),
  skills = document.getElementById("skills"),
  services = document.getElementById("services");
ScrollOut({
  targets: ".work-gallery, .services, .skills, .about-2",
  once: true,
});

let barScroll = document.querySelector(".bar-scroll"),
  buttonScroll = document.querySelector(".scroll-up");

buttonScroll.onclick = () => {
  window.scrollTo({ top: 0 });
};
window.addEventListener("scroll", () => {
  barScroll.style.cssText = `width:${Math.trunc(
    (window.pageYOffset / (document.documentElement.scrollHeight - window.outerHeight)) * 100
  )}%;`;
  if (window.pageYOffset > 1000) {
    buttonScroll.classList.add("open");
  } else {
    buttonScroll.classList.remove("open");
  }
  if (
    workGallery.dataset.scroll == "in" &&
    workGallery.classList[workGallery.classList.length - 1] !== "in"
  ) {
    getRepos();
    workGallery.classList.add("in");
  }
  // if (services.dataset.scroll == "in" && services.classList[services.classList.length - 1] !== "in") {
  //   services.classList.add("in");
  //   setTimeout(() => {
  //
  //   }, 2000);
  // }
  if (skills.dataset.scroll == "in" && skills.classList[skills.classList.length - 1] !== "in") {
    skills.classList.add("in");
    showSkills();
  }
  if (about.dataset.scroll == "in" && about.classList[about.classList.length - 1] !== "in") {
    about.classList.add("in");
    numberAboutF();
  }
});
// End ScrollOut

// Start form Send mail
let form = document.getElementById("form-contact");

let sendEmail = () => {
  let name = document.getElementById("name").value,
    email = document.getElementById("email").value,
    phone = document.getElementById("phone").value,
    gender = document.getElementById("gender").value,
    message = document.getElementById("message").value,
    body = `name: ${name} <br /> email: ${email} <br /> phone: ${phone} <br /> gender: ${gender} <br /> ... message <br /> ${message}`;
  Email.send({
    Host: "smtp.gmail.com",
    Username: "taha.abdelmoonim@gmail.com",
    Password: "gerwwebfqjazmmhh",
    To: "taha.abdelmoonim@gmail.com",
    From: email,
    Subject: "From My Portfolio",
    Body: body,
  }).then((message) => {
    if (message == "OK") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success Send your Message Status " + message,
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "the error message is: " + message,
      });
    }
  });
};
let submit = document.getElementById("submit"),
  numberSubmit = document.getElementById("number-submit");

let intrvelSubmitF = () => {
  let intrvelSubmit = setInterval(() => {
    numberSubmit.style.opacity = "1";
    numberSubmit.innerHTML = Number(numberSubmit.innerHTML) - 1;
    if (Number(numberSubmit.innerHTML) == "0") {
      clearInterval(intrvelSubmit);
      numberSubmit.innerHTML = 11;
      numberSubmit.style.opacity = "0";
    }
  }, 1000);
};

form.onsubmit = (e) => {
  e.preventDefault();
  sendEmail();
  submit.style.cssText = "pointer-events: none; background: #ffffff8c !important";
  let spans = submit.querySelectorAll("span");
  spans.forEach((el) => {
    el.style.opacity = "0";
  });
  intrvelSubmitF();
  setTimeout(() => {
    spans.forEach((el) => {
      el.style.opacity = "1";
    });
    submit.style.cssText = "pointer-events: auto;";
  }, 11000);
};
// End form Send mail
// Start Slider Images Projects
let SliderImages = () => {
  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
};

// Star Counter Page
// https://api.countapi.xyz/create?namespace=portfolio&key=myportfolio&value=0
// https://api.countapi.xyz/get/portfolio/myportfolio

var websiteContainer = document.querySelector(".website-counter");

let updateVisitCount = () => {
  fetch("https://api.countapi.xyz/update/portfolio/myportfolio/?amount=1")
    .then((res) => res.json())
    .then((res) => {
      websiteContainer.innerHTML = res.value;
    });
};
// updateVisitCount();
// Start Input Check
let inputCheck = document.querySelector(".input-toggle-check");

inputCheck.onclick = (e) => {
  let ele = e.currentTarget;
  if (ele.hasAttribute("checked")) {
    document.querySelector(".sidebar").classList.remove("open");
    ele.removeAttribute("checked");
  } else {
    document.querySelector(".sidebar").classList.add("open");
    ele.setAttribute("checked", "");
  }
};

import "./jquery";