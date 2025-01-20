import Tree from "./tree.js";

function makeRandomNumberArray() {
  const array = [];
  for (let i = 0; i < 10; i++) {
    const randomNumber = Math.floor(Math.random() * 100);
    array.push(randomNumber);
  }
  return array;
}

const tree = new Tree();
tree.buildTree(makeRandomNumberArray());

tree.printTree();

console.log(tree.isBalanced());

tree.levelOrder((node) => {
  console.log(node.data);
});
tree.inOrder((node) => {
  console.log(node.data);
});
tree.preOrder((node) => {
  console.log(node.data);
});
tree.postOrder((node) => {
  console.log(node.data);
});

let node = tree.find(101);
console.log(tree.height(node));
console.log(tree.depth(node));

tree.insert(101);
tree.insert(102);
tree.insert(103);

tree.printTree();

console.log(tree.isBalanced());
tree.rebalance();

tree.printTree();
console.log(tree.isBalanced());

tree.levelOrder((node) => {
  console.log(node.data);
});
tree.inOrder((node) => {
  console.log(node.data);
});
tree.preOrder((node) => {
  console.log(node.data);
});
tree.postOrder((node) => {
  console.log(node.data);
});

node = tree.find(101);
console.log(tree.height(node));
console.log(tree.depth(node));

tree.deleteItem(101);
tree.deleteItem(102);
tree.deleteItem(103);

tree.printTree();

console.log(tree.isBalanced());
tree.rebalance();

tree.printTree();
console.log(tree.isBalanced());

tree.levelOrder((node) => {
  console.log(node.data);
});
tree.inOrder((node) => {
  console.log(node.data);
});
tree.preOrder((node) => {
  console.log(node.data);
});
tree.postOrder((node) => {
  console.log(node.data);
});

node = tree.find(101);
console.log(tree.height(node));
console.log(tree.depth(node));
