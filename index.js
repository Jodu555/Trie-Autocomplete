class Node {
    constructor() {
        this.childrens = {};
    }
}

const root = new Node();

function feed(node, text, idx = 0) {
    if (!text[idx]) return;
    let n;
    if (node.childrens[text[idx]]) {
        n = node.childrens[text[idx]];
    } else {
        n = new Node();
        node.childrens[text[idx]] = n;
    }
    feed(n, text, idx + 1)
}

async function run() {
    const data = await (await fetch('data.json')).json();
    console.log('Start Inserting');
    [...new Set(data.list)].forEach(text => {
        feed(root, text);
    });
    console.log(root);
}


const input = document.querySelector('#autocomplete');
const ul = document.querySelector('#completions');


input.addEventListener('keyup', () => {
    console.log(input.value);
})


run();