let inputNode = document.querySelector(".input");
let btnAddNode = document.querySelector(".btn_black");
let textNode = document.querySelector(".text");
let checkBoxNode = document.querySelector(".check__box");
let btnCrossNode = document.querySelectorAll(".cross");
let btnDelFinished = document.querySelector(".btn_grey");
let btnDelAll = document.querySelector(".btn_red");
let formNode = document.querySelector(".form");
let listNode = document.querySelector(".list");
let container = document.querySelector(".containerList");
let btnsNode = document.querySelector(".container_btns");
let contentNode = document.querySelector(".content");
let checkboxNode = document.querySelectorAll(".checkbox");
let LS = window.localStorage;
let arr = [];

formNode.addEventListener("submit", function (event) {
  event.preventDefault();
  if (inputNode.value) {
    btnsNode.classList.remove("d-none");
    addLS(inputNode.value);
    createContent(inputNode.value);
  }
});

function addList() {
  arr = LS.getItem("x").split(",");
  for (let el of arr) {
    createContent(el);
  }
}

function createContent(text) {
  let content = document.createElement("div");
  content.classList.add("content");
  content.innerHTML = `
    <div class="left">
      <label class="check option">
        <input type="checkbox" class="checkbox" />
        <span class="check__box"></span>
        <p class="text">
          ${text}
        </p>
      </label>
    </div>
    <div class="right">
      <button class="cross">❌</button>
    </div>`;
  container.append(content);
  inputNode.value = "";
}

btnDelAll.addEventListener("click", function () {
  container.innerHTML = "";
  LS.removeItem("x");
  arr = [];
  btnsNode.classList.add("d-none");
});

function addLS(text) {
  arr.push(text);
  LS.setItem("x", arr);
}

if (LS.x) {
  addList();
}

container.addEventListener("click", function (event) {
  if (event.target.classList == "cross") {
    let value =
      // event.target.parentElement.parentElement.querySelector(".text").innerText;
      event.target.closest(".content").querySelector(".text").innerText;
    console.log(arr);
    arr.splice(arr.indexOf(value), 1);
    console.log(arr);
    LS.setItem("x", arr);
    event.target.closest(".content").remove();
  }

  // console.log(event.target);
  if (event.target.classList == "checkbox") {
    console.log(event.target.closest(".content").querySelector(".text").innerText);
    textNode.classList.add("text_checked");
  }
});
