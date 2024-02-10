let inputNode = document.querySelector(".input");
let btnAddNode = document.querySelector(".btn_black");
let textNode = document.querySelector(".text");
let checkBoxNode = document.querySelector(".check__box");
let contentNode = document.querySelector(".content");
let btnCrossNode = document.querySelector(".cross");
let btnDelFinished = document.querySelector(".btn_grey");
let btnDelAll = document.querySelector(".btn_red");
let formNode = document.querySelector(".form");
let listNode = document.querySelector(".list");

formNode.addEventListener("submit", function (event) {
  event.preventDefault();
});

btnAddNode.addEventListener("click", function () {
  contentNode.classList.remove("d-none");
  textNode.textContent = inputNode.value;
});

// btnDelFinished.addEventListener("click", function () {
    listNode.innerHTML = 
//})