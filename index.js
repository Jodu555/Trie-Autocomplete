function randID(len = 2) {
    let id = '';
    for (let i = 0; i < len; i++) {
        id += (Math.random() + 1).toString(36).substring(7);
    }
    return id;
}
class Node {
    constructor() {
        this.ID = randID(5);
        this.childrens = {};
    }
}

const root = new Node();

function feed(node, text, idx = 0) {
    text = text.toLowerCase();
    if (!text[idx]) return;
    let n;
    if (node.childrens[text[idx]]) {
        n = node.childrens[text[idx]];
    } else {
        n = new Node();
    }
    node.childrens[text[idx]] = n;
    feed(n, text, idx + 1)
}

async function run() {
    const data = await (await fetch('data.json')).json();
    console.log('Start Inserting');
    [...new Set(data.list)].map(x => x.toLowerCase()).forEach(text => {
        feed(root, text);
    });
}


const input = document.querySelector('#autocomplete');
const ul = document.querySelector('#completions');


input.addEventListener('keyup', () => {
    const search = input.value.toLowerCase();
    ul.innerHTML = '';
    if (!search) return;

    const n = getEndingNode(root, search);
    if (n.ID == root.ID) return;
    const words = complete(n);

    words.forEach(word => {
        const li = document.createElement('li');
        li.innerText = `(${search})${word}`;
        ul.appendChild(li);
    });
});

function complete(n, word = '') {
    let list = [];
    if (Object.keys(n.childrens).length == 0) return [word];
    Object.entries(n.childrens).forEach(([key, value]) => {
        console.log(word, key);
        const appender = complete(value, word + key);
        list = list.concat(appender);
    });
    return list;
}

function getEndingNode(node, search, idx = 0) {
    const tmp = node.childrens[search[idx]];
    return tmp ? getEndingNode(tmp, search, idx + 1) : node;
}
run();