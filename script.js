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
function minValue(node) {
    let minVal = node.data;
    while (node.left !== null) {
        minVal = node.left.data;
        node = node.left;
    }
    return minVal;
}
function deleteData(root, x) {
    if (root === null) {
        return root;
    }
    if (root.data > x) {
        root.left = deleteData(root.left, x);
    }
    else if (root.data < x) {
        root.right = deleteData(root.right, x);
    }
    else {
        if (root.left === null) {
            return root.right;
        }
        else if (root.right === null) {
            return root.left;
        }
        else {
            root.data = minValue(root.right);
            root.right = deleteData(root.right, root.data);
        }
    }
    return root;
}
function find(root, x) {
    if (root === null) {
        return false;
    }
    if (root.data === x) {
        return root;
    }
    else if (root.data < x) {
        return find(root.right, x);
    }
    else if(root.data > x) {
        return find(root.left, x);
    }
    
    
}
function levelOrder(root, callback = null) {
    if (callback === null || callback === undefined) {
        throw new Error('Callback is not defined!');
    }
    if (root === null) {
        return [];
    }
    let queue = [];
    let result = [];
    queue.push(root);

    while (queue.length > 0) {
        let node = queue.shift();
        if (callback) {
            let children = callback(node);
            for (let child of children) {
                queue.push(child);
            }
        }
        result.push(node.data);
    
    }
    // enqueueNodes(queue[0]).filter(item => {
    //     queue.push(item)
    // })
    // traversed.push(queue.shift());

    
    // levelOrder(queue[0])
    return result;
}
function enqueueNodes(node) {
    let arr = []
    if (node.left !== null) {
        arr.push(node.left);
    } 
    if (node.right !== null) {
        arr.push(node.right);
    }
    return arr;
  
}

let tree = new Tree([1,2,3,4,5,6]);
let emptyTree = new Tree();
tree.root = insert(tree.root, 7);
tree.root = insert(tree.root, 9);
tree.root = deleteData(tree.root, 7);
console.log(tree.root)
prettyPrint(tree.root)
let traversalResult; 
try {
    traversalResult = levelOrder(tree.root, enqueueNodes);
} catch (e) {
    console.error(e)
}
console.log(traversalResult)
// console.log(tree.root);
