const toDoForm =  document.querySelector(".js-toDoForm");
    toDoForminput = toDoForm.querySelector("input"),
    pendingList = document.querySelector(".js-pendingList");
    finishedList = document.querySelector(".js-finishedList");

const TODOS_LS = "toDos";
const DONE_TODOS_LS = "doneToDos";
let toDos = [];
let doneToDos = [];
let idNumbers = 1;
let doneIdNumbers = 1;

function deleteToDo(event){

    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);

    const cleanToDos =  toDos.filter( function(toDo) {
        return toDo.id !== parseInt(li.id)
    });

    toDos = cleanToDos;
    saveToDos();

}

function deleteDoneToDo(event){

    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);

    const cleanDoneToDos =  doneToDos.filter( function(toDo) {
        return toDo.id !== parseInt(li.id)
    });

    doneToDos = cleanDoneToDos;
    saveDoneToDos();
}

function doneToDo(event){

    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);

    const str = li.textContent;
    const slicedText = str.replace(/❌/g,"");
    const slicedText2 = slicedText.replace(/✔/g,"");
    const slicedText3 = slicedText2.replace(/↺/g,"");

    paintDoneToDo(slicedText3);

    const cleanToDos =  toDos.filter( function(toDo) {
        return toDo.id !== parseInt(li.id)
    });

    toDos = cleanToDos;
    saveToDos();

}

function returnDoneToDo(event){

    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);

    const str = li.textContent;
    const slicedText = str.replace(/❌/g,"");
    const slicedText2 = slicedText.replace(/✔/g,"");
    const slicedText3 = slicedText2.replace(/↺/g,"");

    paintToDo(slicedText3);

    const cleanDoneToDos =  doneToDos.filter( function(toDo) {
        return toDo.id !== parseInt(li.id)
    });

    doneToDos = cleanDoneToDos;
    saveDoneToDos();

}



function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function saveDoneToDos(){
    localStorage.setItem(DONE_TODOS_LS, JSON.stringify(doneToDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn =  document.createElement("button");
    const doneBtn =  document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumbers;
    idNumbers += 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);

    doneBtn.innerText = "✔";
    doneBtn.addEventListener("click", doneToDo);

    span.innerText = text;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(doneBtn);
    li.id = newId;

    pendingList.appendChild(li);

    const toDoObj = {
        text : text,
        id: newId,
    };

    toDos.push(toDoObj);
    saveToDos();
}

function paintDoneToDo(text){
    const li = document.createElement("li");
    const delBtn =  document.createElement("button");
    const doneBtn =  document.createElement("button");
    const span = document.createElement("span");
    const newId = doneIdNumbers;
    doneIdNumbers += 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteDoneToDo);

    doneBtn.innerText = "↺";
    doneBtn.addEventListener("click", returnDoneToDo);

    span.innerText = text;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(doneBtn);
    li.id = newId;

    finishedList.appendChild(li);

    const doneToDoObj = {
        text : text,
        id: newId,
    };

    doneToDos.push(doneToDoObj);
    saveDoneToDos();
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

function loadDoneToDo(){
    const loadDoneToDos = localStorage.getItem(DONE_TODOS_LS);
    if(loadDoneToDos !== null){
        const pasredToDos = JSON.parse(loadDoneToDos);
        pasredToDos.forEach(function(savedDoneToDo){
            paintDoneToDo(savedDoneToDo.text);
        });

    }
  
}

function init(){
  loadToDo();
  loadDoneToDo();
  toDoForm.addEventListener("submit", handleSubmit);
}




init();