/* task 1 */
const firstDiv = document.getElementById("first")
const div = document.createElement("div");
div.setAttribute('id', '1');
firstDiv.appendChild(div);
function squareRemove() {
    const id1 = document.getElementById("1");
    if (id1) id1.remove();
}

/* task 2 */
const secondtDiv = document.getElementById("second")
for (let i = 0; i < 5; i++) {
    const div = document.createElement("div");
    div.setAttribute('class', 'blackSquare');
    div.setAttribute('id', `${i + 2}`);
    secondtDiv.appendChild(div);
}
function squareHidden() {
    const id1 = document.getElementById("1");
    if (id1.className !== "hidden") {        
        id1.setAttribute('class', 'hidden');
    } else {
        id1.setAttribute('class', 'visibility');
    }
}

/* task 3 */
const thirdDiv = document.getElementById("third")
const div2 = document.createElement("div");
div2.setAttribute('id', 'yellow');
thirdDiv.appendChild(div2);
function squaresHidden() {
    const arraySquares = document.querySelectorAll(".blackSquare");
    arraySquares.forEach(element => {
        element.style.visibility = (element.style.visibility != 'hidden') ? "hidden" : "visible";
    })
}

/* task 4 */
const fourthdDiv = document.getElementById("fourth")
const div3 = document.createElement("div");
div3.setAttribute('id', 'red');
fourthdDiv.appendChild(div3);
function searchSelector() {
    let form = document.forms.my;
    let elem = form.elements.selector;
    const element = document.querySelector(elem.value);
    if (element) {
        element.style.visibility = (element.style.visibility != 'hidden') ? "hidden" : "visible";
    }
}

/* task 5 */
function hello1() {
    alert("Привет");
    const yellow = document.querySelector("#third");
    yellow.onclick = hello2;
}
function hello2() {
    const third = document.querySelector("#third");
    third.onclick = hello1;
    const yellow = document.querySelector("#yellow");
    yellow.style.visibility = 'hidden';
}

/* task 6 */
const btnRed = document.getElementById("btn-red");
btnRed.addEventListener("mouseover", () => squareRedVisibility('visible'));
btnRed.addEventListener("mouseout", () => squareRedVisibility('hidden'));
function squareRedVisibility(visibility) {
    const red = document.querySelector("#red");
    red.style.visibility = visibility;
}

/* task 7 */
const seventhForm = document.getElementById("seventh")
const div4 = document.createElement("div");
div4.setAttribute('id', 'green');
seventhForm.appendChild(div4);
const seventhInput = document.querySelector("#seventh>input")
seventhInput.onfocus = () => squareGreenVisibility('visible');
seventhInput.oninput = () => squareGreenVisibility('hidden');
function squareGreenVisibility(visibility) {
    const green = document.querySelector("#green");
    green.style.visibility = visibility;
}

/* task 8 */
function getImage() {   
    const eighthInput = document.querySelector("#eighth>input");

    const eighthtDiv = document.getElementById("eighth");
    const image = makeImage(eighthInput.value);
    eighthtDiv.appendChild(image);

    eighthInput.value = "";
}
function makeImage(url) {
    const image = document.createElement("img");
    image.setAttribute('src', url);
    image.setAttribute('alt', 'Тут должна быть картинка');
    return image;
}

/* task 9 */
function getImages() {
    const ninthtArea = document.querySelector("#ninth>textarea");
    const ninthDiv = document.getElementById("ninth");
    console.log(ninthtArea.value.split("\n").forEach((url) => ninthDiv.appendChild(makeImage(url))));
    ninthtArea.value = "";
}

/* task 10-12 */
let rightTopText = "";
navigator.geolocation.getCurrentPosition(function(position) {
    rightTopText = navigator.language + "\nШ: " + position.coords.latitude + ",\nД: " + position.coords.longitude;
})
const tenthBody = document.querySelector("body");
tenthBody.setAttribute("onmousemove", "mouseMove(event)");
function mouseMove(event) {
    coordinates.innerText = 'X:' + event.clientX + ' Y:' + event.clientY + "\n" + rightTopText;
}

/* task 13 */
const thirteenthForm = document.getElementById("thirteenth")
for (let i = 0; i < 3; i++) {
    const textarea = document.createElement("textarea");
    textarea.setAttribute('class', 'nativeinput');
    textarea.setAttribute('placeholder', 'Напишите сообщение здесь');
    thirteenthForm.appendChild(textarea);
}
const thirteenthDiv = document.querySelectorAll("#thirteenth>textarea");
thirteenthDiv[0].value = localStorage.getItem('area');
thirteenthDiv[0].oninput = () => {
localStorage.setItem('area', thirteenthDiv[0].value)
};
let cookieHasTextarea = document.cookie.split(";").filter((e) => e.includes("textarea="))[0];
if (cookieHasTextarea) 
    thirteenthDiv[1].value = cookieHasTextarea.split("=")[1];
thirteenthDiv[1].oninput = () => {
    document.cookie = `textarea=${thirteenthDiv[1].value}; Secure;`;
};
thirteenthDiv[2].value = sessionStorage.getItem('area');
thirteenthDiv[2].oninput = () => {
sessionStorage.setItem('area', thirteenthDiv[2].value)
};

/* task 14 */
(function fourteenth() {
    arrowFourteenth.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    };
    window.addEventListener('scroll', function() {
        arrowFourteenth.hidden = (scrollY < 100);
    });
})();

/* task 15 */
let isSmallAlert;
function helloFifteenth() {
    if (isSmallAlert)
        isSmallAlert = false;
    else
        alert("Вам не надоели alert'ы?")
}
function helloFifteenthHalf(event) {
    isSmallAlert = true;
    alert("Мне да!")
}

/* task 16 */
const sixteenthDiv = document.getElementById("sixteenth");
const divInSixteenth = document.createElement("div");
divInSixteenth.setAttribute('id', 'greySquare');
divInSixteenth.setAttribute('onclick', "greySquareHidden();");
sixteenthDiv.appendChild(divInSixteenth);

function greySquareVisible() {
    const greySquare = document.querySelector("#sixteenth>div");
    greySquare.style = "visibility: visible;";

    const body = document.querySelector("body");
    body.style.overflow = "hidden";
}

function greySquareHidden() {
    const greySquare = document.querySelector("#sixteenth>div");
    greySquare.style = "visibility: hidden;"

    const body = document.querySelector("body");
    body.style.overflow = "visible";
}

/* task 18 */
droptarget.addEventListener("drop", (event) => droptarget.files = event.dataTransfer.files);
droptarget.addEventListener("dragenter", (event) => changeDropTarget(event));
droptarget.addEventListener("change", (event) => changeDropTarget(event));
droptarget.addEventListener("dragover", (event) => event.preventDefault());
droptarget.addEventListener("dragleave", (event) => {
    event.target.style.border = "";
    event.target.style.background = "white";
});
function changeDropTarget(event) {
    event.target.style.border = "3px dotted green";
    event.target.style.background = "rgb(0, 221, 255)";
}
