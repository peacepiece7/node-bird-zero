function* genSeq() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

const generator = genSeq();

function test() {
  console.log("test");
}
function ex(a, b, c) {
  return a + b + c;
}
console.log(ex(1, 2, 3));
console.log(ex.call(null, 1, 2, 3));
console.log(ex.apply(null, [1, 2, 3]));

const obj = {
  string: "zero",
  yell: function () {
    console.log(this.string);
  },
};
const obj2 = {
  string: "what?",
};
obj.yell(); // 'zero';
obj.yell.call(obj2); // 'what?'
