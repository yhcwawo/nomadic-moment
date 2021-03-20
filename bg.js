const body = document.querySelector(".js-bg");

const IMG_NUMBER = 10;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `./images/${imgNumber + 1}.gif`;
    image.classList.add("bgImage");
    body.appendChild(image);
}


function genRandome(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandome();
    paintImage(randomNumber);
}


init();