const message = document.querySelector("#message");
const cheerButton = document.querySelector("#cheer-button");

let isStarted = false;

cheerButton.addEventListener("click", function () {
  if (isStarted) {
    message.textContent = "좋아요! 작은 코드부터 직접 바꿔봅시다.";
  } else {
    message.textContent = "다시 눌러도 좋아요! 계속 연습해봐요.";
  }
  isStarted = !isStarted;
});
