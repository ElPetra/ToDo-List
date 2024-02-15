let inputNode = document.querySelector(".input");
let btnDelFinished = document.querySelector(".btn_grey");
let btnDelAll = document.querySelector(".btn_red");
let formNode = document.querySelector(".form");
let container = document.querySelector(".containerList");
let btnsNode = document.querySelector(".btns");
let LS = window.localStorage;
let arr = [];

let createContent = (text) => {
  let firstUpperLetter = (str) => str.split("")[0].toUpperCase() + str.slice(1);
  let content = document.createElement("div");
  content.classList.add("content");
  content.innerHTML = `
    <div class="left">
      <label class="check option">
        <input type="checkbox" class="checkbox" />
        <span class="check__box"></span>
        <p class="text">
          ${firstUpperLetter(text)}
        </p>
      </label>
    </div>
    <div class="right">
      <button class="cross">❌</button>
    </div>`;
  container.append(content);
  inputNode.value = "";
};

function addLS(text) {
  arr.push(text);
  LS.setItem("x", arr);
}

let deleteItem = (item) => {
  let value = item.closest(".content").querySelector(".text").innerText;
  arr.splice(arr.indexOf(value), 1);
  LS.setItem("x", arr);
  item.closest(".content").remove();
  if (arr.length === 0) {
  btnsNode.classList.add("d-none");
  }
}

if (LS.x) {
  arr = LS.getItem("x").split(",");
  for (let el of arr) {
    createContent(el);
  }
}

btnDelFinished.addEventListener("click", function () {
  let AllTextCheckeds = document.querySelectorAll(".text_checked");
  for (let el of AllTextCheckeds) {
    deleteItem(el);
  }
});

container.addEventListener("click", function (event) {
  if (event.target.classList == "cross") {
    deleteItem(event.target);
  }

  if (event.target.classList == "checkbox") {
    event.target
      .closest(".content")
      .querySelector(".text")
      .classList.toggle("text_checked");
  }
});

formNode.addEventListener("submit", function (event) {
  event.preventDefault();
  if (inputNode.value) {
    btnsNode.classList.remove("d-none");
    addLS(inputNode.value);
    createContent(inputNode.value);
  }
});

btnDelAll.addEventListener("click", function () {
  container.innerHTML = "";
  LS.removeItem("x");
  arr = [];
  btnsNode.classList.add("d-none");
});
