const clockContainer =  document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

console.log(clockContainer);
console.log(clockTitle);


function getTime(){
    const date = new Date();
    const minutes =  date.getMinutes();
    const hours =  date.getHours();
    const seconds =  date.getSeconds();
    clockTitle.innerHTML = `${hours}:${minutes}:${seconds}`;

}

function init(){
    getTime();
}


init();