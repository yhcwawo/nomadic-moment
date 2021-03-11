const toDoForm =  document.querySelector(".js-toDoForm");
    toDoForminput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];
let idNumbers = 1;

function deleteToDo(event){

    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const cleanToDos =  toDos.filter( function(toDo) {
        return toDo.id !== parseInt(li.id)
    });

    toDos = cleanToDos;
    saveToDos();

}



function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn =  document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumbers;
    idNumbers += 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;

    toDoList.appendChild(li);

    const toDoObj = {
        text : text,
        id: newId,
    };

    toDos.push(toDoObj);
    saveToDos();
   // const doneBtn = document.createElement("button");
   // doneBtn.value = "✔";

}

function handleSubmit (event){
    event.preventDefault();
    const currentValue = toDoForminput.value;

    paintToDo(currentValue);
    toDoForminput.value = "";
}

function loadToDo(){
    const loadToDos = localStorage.getItem(TODOS_LS);
    if(loadToDos !== null){
        const pasredToDos = JSON.parse(loadToDos);
        pasredToDos.forEach(function(savedToDo){
            paintToDo(savedToDo.text);
        });

    }
  
}

function init(){
    loadToDo();
    toDoForm.addEventListener("submit", handleSubmit);
}


init();