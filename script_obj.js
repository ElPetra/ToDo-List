let inputNode = document.querySelector(".input");
let btnDelFinished = document.querySelector(".btn_grey");
let btnDelAll = document.querySelector(".btn_red");
let formNode = document.querySelector(".form");
let container = document.querySelector(".containerList");
let btnsNode = document.querySelector(".btns");
let LS = window.localStorage;
let arr = [];

let createContent = (text, check) => {
  let firstUpperLetter = (str) => str.split("")[0].toUpperCase() + str.slice(1);
  let content = document.createElement("div");
  content.classList.add("content");
  content.innerHTML = `
    <div class="left">
      <label class="check option">
        <input type="checkbox" class="checkbox" ${check === "text_checked" ? "checked" : ""}/>
        <span class="check__box"></span>
        <p class= "text ${check}">
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

let changeLS = (text) => {
  let obj = { task: text, check: false };
  arr.push(obj);
  LS.setItem("toDo", JSON.stringify(arr));
};

let deleteItem = (value) => {
  let textItem = value.closest(".content").querySelector(".text").innerText;
  arr.splice(
    arr.findIndex((el) => el.task === textItem),1);
  LS.setItem("toDo", JSON.stringify(arr));
  value.closest(".content").remove();
  if (arr.length === 0) {
    btnsNode.classList.add("d-none");
  }
};

btnDelFinished.addEventListener("click", function () {
  let AllTextCheckeds = document.querySelectorAll(".text_checked");
  for (let el of AllTextCheckeds) {
    deleteItem(el);
  }
  arr = arr.filter(el => el.check === false)
  LS.setItem("toDo", JSON.stringify(arr));
});

container.addEventListener("click", function (event) {
  if (event.target.classList == "cross") {
    deleteItem(event.target);
  }

  if (event.target.classList == "checkbox") {
    let textItem = event.target.closest(".content").querySelector(".text");
    textItem.classList.toggle("text_checked");
    let checkbox = document.querySelector(".checkbox");
    checkbox.toggleAttribute("checked");
    let variable = arr.findIndex((el) => el.task === textItem.innerText);
    arr[variable].check = arr[variable].check ? false : "text_checked";
    LS.setItem("toDo", JSON.stringify(arr));
  }
});

formNode.addEventListener("submit", function (event) {
  event.preventDefault();
  if (inputNode.value) {
    btnsNode.classList.remove("d-none");
    changeLS(inputNode.value);
    createContent(inputNode.value);
  }
});

if (LS.toDo) {
  btnsNode.classList.remove("d-none");
  arr = JSON.parse(LS.getItem("toDo"));
  for (let el of arr) {
    createContent(el.task, el.check);
  }
}

btnDelAll.addEventListener("click", function () {
  container.innerHTML = "";
  LS.removeItem("toDo");
  arr = [];
  btnsNode.classList.add("d-none");
});
