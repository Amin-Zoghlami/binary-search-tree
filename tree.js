import Node from "./node.js";

export default class Tree {
  #root = null;

  buildTree(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.#root = this.#buildTreeRecursion(sortedArray);
  }

  #buildTreeRecursion(array) {
    if (array.length === 0) {
      return null;
    }

    const mid = Math.floor(array.length / 2);

    const root = new Node();
    root.data = array[mid];

    const leftArray = array.slice(0, mid);
    root.left = this.#buildTreeRecursion(leftArray);

    const rightArray = array.slice(mid + 1);
    root.right = this.#buildTreeRecursion(rightArray);

    return root;
  }

  printTree() {
    this.#printTreeRecursion(this.#root);
  }

  #printTreeRecursion(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.#printTreeRecursion(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.#printTreeRecursion(
        node.left,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }

  insert(value) {
    const newNode = new Node();
    newNode.data = value;

    if (this.#root === null) {
      this.#root = newNode;
      return;
    }

    let currNode = this.#root;

    for (;;) {
      const currValue = currNode.data;

      if (value === currValue) {
        throw new Error("No duplicates");
      } else if (value < currValue) {
        if (currNode.left === null) {
          currNode.left = newNode;
          return;
        }
        currNode = currNode.left;
      } else {
        if (currNode.right === null) {
          currNode.right = newNode;
          return;
        }
        currNode = currNode.right;
      }
    }
  }

  deleteItem(value) {
    this.#root = this.#deleteItemRecursion(value, this.#root);
  }

  #deleteItemRecursion(value, root) {
    if (root === null) {
      return null;
    }

    if (value < root.data) {
      root.left = this.#deleteItemRecursion(value, root.left);
    } else if (value > root.data) {
      root.right = this.#deleteItemRecursion(value, root.right);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      let currNode = root.right;

      while (currNode.left !== null) {
        currNode = currNode.left;
      }

      root.data = currNode.data;
      root.right = this.#deleteItemRecursion(root.data, root.right);
    }

    return root;
  }

  find(value) {
    let currNode = this.#root;

    while (currNode !== null) {
      const currValue = currNode.data;

      if (value === currValue) {
        return currNode;
      } else if (value < currValue) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }

    return null;
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Argument must be a callback");
    }

    if (this.#root === null) {
      return;
    }

    const queue = [];
    queue.push(this.#root);

    while (queue.length !== 0) {
      const currNode = queue.shift();

      if (currNode.left !== null) {
        queue.push(currNode.left);
      }

      if (currNode.right !== null) {
        queue.push(currNode.right);
      }

      callback(currNode);
    }
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Argument must be a callback");
    }

    this.#inOrderRecursion(callback, this.#root);
  }

  #inOrderRecursion(callback, node) {
    if (node === null) {
      return;
    }

    this.#inOrderRecursion(callback, node.left);
    callback(node);
    this.#inOrderRecursion(callback, node.right);
  }

  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Argument must be a callback");
    }

    this.#preOrderRecursion(callback, this.#root);
  }

  #preOrderRecursion(callback, node) {
    if (node === null) {
      return;
    }

    callback(node);
    this.#preOrderRecursion(callback, node.left);
    this.#preOrderRecursion(callback, node.right);
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Argument must be a callback");
    }

    this.#postOrderRecursion(callback, this.#root);
  }

  #postOrderRecursion(callback, node) {
    if (node === null) {
      return;
    }

    this.#postOrderRecursion(callback, node.left);
    this.#postOrderRecursion(callback, node.right);
    callback(node);
  }

  height(node) {
    if (node === null) {
      return null;
    }
    return this.#heightRecursion(node) - 1;
  }

  #heightRecursion(node) {
    if (node === null) {
      return 0;
    }

    const leftHeight = 1 + this.#heightRecursion(node.left);
    const rightHeight = 1 + this.#heightRecursion(node.right);
    return Math.max(leftHeight, rightHeight);
  }

  depth(node) {
    if (node === null) {
      return null;
    }

    const value = node.data;
    let currNode = this.#root;

    let depth = 0;
    while (currNode !== null) {
      const currValue = currNode.data;
      if (value === currValue) {
        return depth;
      } else if (value < currValue) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }

      depth++;
    }

    return null;
  }

  isBalanced() {
    if (this.#root === null) {
      return true;
    }

    const leftHeight = this.height(this.#root.left);
    const rightHeight = this.height(this.#root.right);

    return Math.abs(leftHeight - rightHeight) <= 1;
  }

  rebalance() {
    const treeValues = [];
    this.inOrder((node) => {
      treeValues.push(node.data);
    });

    this.buildTree(treeValues);
  }
}
