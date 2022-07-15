let array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
shuffle(array);
makeGamingField();

const click = document.querySelectorAll("span");

click.forEach(e => e.addEventListener("click", (event) => {
    let idx1 = +event.target.id - 3;
    let idx2 = +event.target.id - 1;
    let idx3 = +event.target.id + 1;
    let idx4 = +event.target.id + 3;
    if (idx3 < 9 && click[idx3].className === "zero" && idx3 != 3 && idx3 != 6) {
        event.target.setAttribute('class', 'zero');
        click[idx3].setAttribute('class', 'game');
        [event.target.innerText, click[idx3].innerText] = [click[idx3].innerText, event.target.innerText]
    }  
    else if (idx2 >= 0 && click[idx2].className === "zero" && idx2 != 2 && idx2 != 5) {
        event.target.setAttribute('class', 'zero');
        click[idx2].setAttribute('class', 'game');
        [event.target.innerText, click[idx2].innerText] = [click[idx2].innerText, event.target.innerText]
    } else if (idx1 >= 0 && click[idx1].className === "zero") {
        event.target.setAttribute('class', 'zero');
        click[idx1].setAttribute('class', 'game');
        [event.target.innerText, click[idx1].innerText] = [click[idx1].innerText, event.target.innerText]
    } else if (idx4 < 9 && click[idx4].className === "zero") {
        event.target.setAttribute('class', 'zero');
        click[idx4].setAttribute('class', 'game');
        [event.target.innerText, click[idx4].innerText] = [click[idx4].innerText, event.target.innerText]
    }
}));

function makeGamingField() {
    const element = document.getElementsByClassName("start_game")[0];
    for (let j = 0; j < 3; j++) {
        const div = document.createElement("div");

        for (let i = j * 3; i < j * 3 + 3; i++) {
            const span = document.createElement("span");
            const node = document.createTextNode(`${array[i]}`);
            span.setAttribute('id', `${i}`)
            span.setAttribute('class', array[i] == 0 ? 'zero' : `game`)
            span.appendChild(node);
            div.appendChild(span);
        } 
        element.appendChild(div);     
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}
