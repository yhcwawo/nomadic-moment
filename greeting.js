const form =  document.querySelector(".js-form");
 input = form.querySelector("input"),
 greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser";
    SHOWING_ON = "showing";


function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    greeting.innerText = `${text}`;

}

function handleSubmit (event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_ON);
    form.addEventListener("submit", handleSubmit);

}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);

    if(currentUser === null){
        askForName();
    } else {
        paintGreeting(currentUser);
    }
  
}

function init(){
    loadName();
}


init();