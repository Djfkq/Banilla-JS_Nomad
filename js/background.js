const backImgs = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
const backImg = document.querySelector("img.background");
const chosenImg = Math.floor(Math.random() * backImgs.length)

backImg.src = `img/${chosenImg}.jpg`


