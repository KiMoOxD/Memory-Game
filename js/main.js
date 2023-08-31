document.querySelector('.starter span').addEventListener('click', function() {
    let name = prompt('Type your name')
    name == null || name == '' ? 
    document.querySelector('.name span').textContent = 'Anonymous' :
    document.querySelector('.name span').textContent = name;

    document.querySelector('.starter').remove()
})


let container = document.querySelector('.mem-game'),
    boxes = Array.from(container.children),
    orderRange = [...Array(boxes.length).keys()],
    duration = 1000;

shuflle(orderRange)   

boxes.forEach((box, i) => {
    box.style.order = orderRange[i];

    box.addEventListener('click', function() {
        flip(box);
        if (boxes.every(box => box.classList.contains('match'))) {
            document.querySelector('audio').play();
            let win = document.createElement('div')
            win.style.cssText = `
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #eeeeeecc;
            transition: 0.3s;
            `;
            win.textContent = "You Won!!!!"
            document.querySelector('.mem-game').appendChild(win)
            setTimeout(() => {
                window.location.reload();
            }, duration*3.5)
        }
    })
})

function flip(box) {
    box.classList.add('is-flipped')
    let flippedboxes = boxes.filter(box => box.classList.contains('is-flipped'));
    if (flippedboxes.length == 2) {
        stopClick();
        checkMatch(flippedboxes[0], flippedboxes[1]);
    }
}

function checkMatch(first, second) {
    let tries = document.querySelector('.tries span')

    if (+first.dataset.cat == +second.dataset.cat) {
        first.classList.remove('is-flipped')
        second.classList.remove('is-flipped')
        first.classList.add('match')
        second.classList.add('match')
    } else {
        tries.textContent++
        setTimeout(() => {
            first.classList.remove('is-flipped')
            second.classList.remove('is-flipped')
        }, duration)
    }
}

function stopClick() {
    container.classList.add('no-click');

    setTimeout(() => {
        container.classList.remove('no-click');
    }, duration)
}

function shuflle(arr) {
    let curr = arr.length,
        random,
        temp;

    while (curr > 0) {
        random = Math.floor(Math.random() * curr)
        curr--;
        temp = arr[curr];
        arr[curr] = arr[random];
        arr[random] = temp;
    }
    return arr;
}

if (boxes.every(box => box.classList.contains('match'))) {
    console.log('Congrats!!!')
}