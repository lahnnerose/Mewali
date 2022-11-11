// Menu variables
const burger = document.getElementById("menu");
const closeMenu = document.getElementById("close");

// Open Menu
burger.addEventListener("click", () => {
  if (burger.classList.contains("active")) {
    gsap.to(".links", { x: "100%" });
  } else {
    gsap.to(".links", { x: "0%" });
    gsap.fromTo(
      ".links a",
      { opacity: 0, y: 0 },
      { opacity: 1, y: 20, delay: 0.4, stagger: 0.25 }
    );
    gsap.set("body", { overflow: "hidden" });
  }
  burger.classList.toggle("active");
});

// Close Menu
closeMenu.addEventListener("click", () => {
  if (burger.classList.contains("active")) {
    gsap.to(".links", { x: "100%" });
  } else {
    gsap.to(".links", { x: "0%" });
  }
  burger.classList.toggle("active");
  gsap.set("body", { overflow: "auto" });
  gsap.set("body", { overflowX: "hidden" });
});

// Next Retreat Video
const nextRetreatVideo = gsap.utils.toArray(".nextRetreatVideo");
gsap.set(nextRetreatVideo, { opacity: 0.8 });

nextRetreatVideo.forEach((video) => {
  ScrollTrigger.create({
    trigger: video,
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      gsap.to(video, { opacity: 0.8 });
      video.play();
    },
    onEnterBack: () => video.play(),
    onLeave: () => video.pause(),
    onLeaveBack: () => video.pause(),
  });
});

// Rituals Video Players

const videos = gsap.utils.toArray(".video");
gsap.set(videos, { opacity: 0 });

videos.forEach((video) => {
  ScrollTrigger.create({
    trigger: video,
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      gsap.to(video, { opacity: 1 });
      video.play();
    },
    onEnterBack: () => video.play(),
    onLeave: () => video.pause(),
    onLeaveBack: () => video.pause(),
  });
});

// Countdown Timer

const countdown = () => {
  const countDate = new Date("November 17, 2022 09:00:00").getTime();
  const now = new Date().getTime();
  const gap = countDate - now;

  // Time Maths
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  //  Calculate the countdown
  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % hour) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSecond = Math.floor((gap % minute) / second);

  document.querySelector(".day").innerText = textDay;
  document.querySelector(".hour").innerText = textHour;
  document.querySelector(".minute").innerText = textMinute;
  document.querySelector(".second").innerText = textSecond;

  if (gap < 1000) {
    launchFunction();
    // Dont have a launch function yet but when timer hits 0 do you want it to do something???
  }
};

setInterval(countdown, 1000);

//Parallax BG

let controller = new ScrollMagic.Controller();
let timeline = gsap.timeline().timeScale(2);

gsap.to(".hero-image", { x: 200 });
