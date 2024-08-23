function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
}
function Tree(array) {
    let sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = buildTree(sortedArray)            
}
function buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
        return null;
    }

    let mid = parseInt((start + end) / 2);
    let node = new Node(array[mid]);
    node.left = buildTree(array, start, mid - 1);
    node.right = buildTree(array, mid + 1, end);
    return node;
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

function insert(root, x) {
    const temp = new Node(x);
    if (root === null) {
        return temp;
    }
    let parent = null;
    let current = root;
    while(current !== null) {
            parent = current;
        if (current.data > x) {
            current = current.left;
        } else if (current.data < x) {
            current = current.right;
        } else {
            return root;
        }
    }
    if (parent.data > x) {
        parent.left = temp;
    }
    else {
        parent.right = temp;
    }
    return root;
}
let tree = new Tree([1,2,3,4]);
tree.root = insert(tree.root, 7);
console.log(tree.root)
prettyPrint(tree.root)
// console.log(tree.root);
