"use strict";

window.addEventListener(
  "DOMContentLoaded",
  function() {
    $("header").textillate({
      loop: false,
      minDisplayTime: 2000,
      initialDelay: 2000,
      autoStart: true,
      in: {
        effect: "fadeInLeftBig",
        delayScale: 1.5,
        delay: 50,
        sync: false,
        shuffle: true
      }
    });
    $(function() {
      ScrollReveal().reveal("#btn1", {
        duration: 9000
      });
    });

    setTimeout(
      function() {
        let popMessage = "いらっしゃい!おみくじ引いてって!";
        window.alert(popMessage);
      },
      "5000"
    );
  },
  false
);

let soundEndFlag = "0"; // sound control
let w_sound;
let music;

function soundControl(status, w_sound) {
  if (status === "start") {
    music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();
  } else if (status === "end") {
    music.pause();
    music.currentTime = 0;
  }
}

// Chuyển các mảng ra khỏi hàm addEventListener để tối ưu hóa
const resultText = [
  "img/daikichi.png",
  "img/chukichi.png",
  "img/syokichi.png",
  "img/suekichi.png",
  "img/daikyo.png"
];

const resultMaxSpeed = [10, 10, 8, 5, 5];
const resultMaxSize = [30, 30, 30, 40, 30];

const resultImage = [
  "img/star.png",
  "img/sakura_hanabira.png",
  "img/water1.png",
  "img/redleaves4.png",
  "img/snowflakes.png"
];

const resultSound = [
  "sound/omikuji_sound1.mp3",
  "sound/omikuji_sound2.mp3",
  "sound/omikuji_sound3.mp3",
  "sound/omikuji_sound4.mp3",
  "sound/omikuji_sound5.mp3"
];

const btn1 = document.getElementById("btn1");
const omikujiText = document.getElementById("omikujiText");
const omikujiTextImage = document.getElementById("omikujiTextImage"); // add

btn1.addEventListener("click",
  function() {
    // sound control
    if (soundEndFlag === "1") {
      soundControl("end", "");
    }

    // Tạo biến n ngay tại đây để sử dụng cho các mảng
    let n = Math.floor(Math.random() * resultText.length);

    // おみくじのテキスト画像対応
    omikujiTextImage.src = resultText[n];
    omikujiTextImage.classList.add("omikujiPaper");

    // アニメーション終了時にclassを削除
    omikujiTextImage.addEventListener("animationend",
      function() {
        omikujiTextImage.classList.remove("omikujiPaper");
      }, false);

    // sound control
    w_sound = resultSound[n];
    soundControl("start", w_sound);
    soundEndFlag = "1";

    // snowfall stop
    $(document).snowfall("clear");

    // jQueryのsnowfall
    $(document).snowfall({
      maxSpeed: resultMaxSpeed[n], // 最大速度
      minSpeed: 1, // 最小速度
      maxSize: resultMaxSize[n], // 最大サイズ
      minSize: 1, // 最小サイズ
      image: resultImage[n]
    });
  },
  false
);