const today = document.querySelector("h2.today");
const clock = document.querySelector("h2.clock");

function getTime() {
  const date = new Date();
  const ampm = date.getHours() >= 12 ? "오후" : "오전";

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours() % 12).padStart(2, 0);
  const minutes = String(date.getMinutes()).padStart(2, 0);
  const seconds = String(date.getSeconds()).padStart(2, 0);
  today.innerText = `${year}년 ${month}월 ${day}일`;
  clock.innerText = `${ampm} ${hours}:${minutes}:${seconds}`;
}

getTime();
setInterval(getTime, 1 * 1000);
