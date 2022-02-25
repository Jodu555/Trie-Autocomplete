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

feed(root, 'Hello');
feed(root, 'Habuba');
console.log(root);