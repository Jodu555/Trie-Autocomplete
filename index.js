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
    [...new Set(data.list)].map(x => x.toLowerCase()).forEach(text => {
        feed(root, text);
    });
    console.log(root);
}


const input = document.querySelector('#autocomplete');
const ul = document.querySelector('#completions');


input.addEventListener('keyup', () => {
    const search = input.value;
    if (!search) return;

    const n = getEndingNode(root, search);
    const words = complete(n);
});

function complete(n, word = '') {
    const list = [];
    if (n.childrens.length == 0) return [word];
    Object.entries(n.childrens).forEach(([key, value]) => {
        const appender = complete(value, word += value);
        list.concat(appender);
    });
    return list;
}

function getEndingNode(node, search, idx = 0) {
    const tmp = node.childrens[search[idx]];
    return tmp ? getEndingNode(tmp, search, idx + 1) : node;
}


run();