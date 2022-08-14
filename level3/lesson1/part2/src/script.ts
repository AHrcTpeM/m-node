enum Button {
    plus = 'plus',
    minus = 'minus'
  }
enum count {
    plus,
    minus
}

function clickButton(button: Button){
    let span: HTMLSpanElement | null;

    fetch('http://localhost:3000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({button})
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
    const button: Button = Button.plus;
    clickButton(button);
}

const onclick2 = () => {
    const button: Button = Button.minus;
    clickButton(button);
}