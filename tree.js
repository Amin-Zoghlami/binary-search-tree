import Node from "./node.js";

export default class Tree {
  #root = null;

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }

    const sortedArray = [...new Set(array)].sort();
    const mid = sortedArray.length / 2;

    this.#root = new Node();
    this.#root.data = sortedArray[mid];

    const leftArray = sortedArray.slice(0, mid);
    this.#root.left = buildTree(leftArray);

    const rightArray = sortedArray.slice(mid);
    this.#root.left = buildTree(rightArray);

    return this.#root;
  }

  insert(value) {
    const newNode = newNode();
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

  inOrder(callback, root = this.#root) {
    if (typeof callback !== "function") {
      throw new Error("Argument must be a callback");
    }

    if (root === null) {
      return;
    }

    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }

  preOrder(callback, root = this.#root) {
    if (typeof callback !== "function") {
      throw new Error("Argument must be a callback");
    }

    if (root === null) {
      return;
    }

    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  postOrder(callback, root = this.#root) {
    if (typeof callback !== "function") {
      throw new Error("Argument must be a callback");
    }

    if (root === null) {
      return;
    }

    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
  }

  height(node) {
    if (node === null) {
      return -1;
    }

    const leftHeight = 1 + height(node.left);
    const rightHeight = 1 + height(node.right);
    return Math.max(leftHeight, rightHeight);
  }

  depth(node) {
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

    const leftHeight = height(this.#root.left);
    const rightHeight = height(this.#root.right);

    return Math.abs(leftHeight - rightHeight) <= 1;
  }

  rebalance() {
    const array = [];
    this.inOrder((node) => {
      array.push(node.data);
    });
  }
}
