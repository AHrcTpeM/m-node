"use strict";
var Button;
(function (Button) {
    Button["plus"] = "plus";
    Button["minus"] = "minus";
})(Button || (Button = {}));
var count;
(function (count) {
    count[count["plus"] = 0] = "plus";
    count[count["minus"] = 1] = "minus";
})(count || (count = {}));
function clickButton(button) {
    let span;
    fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ button })
    })
        .then(res => res.json())
        .then(response => {
        span = document.getElementById('span1');
        if (span)
            span.innerText = response.count.plus;
        span = document.getElementById('span2');
        if (span)
            span.innerText = response.count.minus;
    });
}
const onclick1 = () => {
    const button = Button.plus;
    clickButton(button);
};
const onclick2 = () => {
    const button = Button.minus;
    clickButton(button);
};
