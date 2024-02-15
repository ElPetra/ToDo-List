let inputNode = document.querySelector(".input");
let btnCrossNode = document.querySelectorAll(".cross");
let btnDelFinished = document.querySelector(".btn_grey");
let btnDelAll = document.querySelector(".btn_red");
let formNode = document.querySelector(".form");
let container = document.querySelector(".containerList");
let btnsNode = document.querySelector(".container_btns");
let LS = window.localStorage;
let arr = [];

let deleteItem = (item) =>{
    let value = item.closest(".content").querySelector(".text").innerText;
    arr.splice(arr.indexOf(value), 1);
    LS.setItem("x", arr);
    item.closest(".content").remove();
}

let createContent = (text) => {
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

let addLS = (text) => {
    arr.push(text);
    LS.setItem("x", arr);
}

if (LS.x) {
    arr = LS.getItem("x").split(",");
    for (let el of arr) {
        createContent(el);
    }
}

btnDelFinished.addEventListener('click', function(){
    let allCheckedTasks = document.querySelectorAll('.text_checked');
    for(let el of allCheckedTasks){
        deleteItem(el)
    }
})

container.addEventListener("click", function (event) {
  if (event.target.classList == "cross") {  
    deleteItem(event.target)
  }

  if(event.target.classList == "checkbox") {
    event.target.closest(".content").querySelector('.text').classList.toggle("text_checked");
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


