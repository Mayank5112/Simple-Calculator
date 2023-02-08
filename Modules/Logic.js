var Stack = require('stack-lifo'); //using npm stack to create stack
const operand = new Stack();
const operator = new Stack();

// for to handel bracket 
function answer(s) {

  for (var i = 0; i < s.length; i++) {
    if (isNumber(s.charAt(i))) {
      var num = 0;
      while (isNumber(s.charAt(i)) && i < s.length) {
        num = num * 10 + Number(s.charAt(i));
        i++;
      }
      i--;
      operand.push(num);
    }
    else if (s.charAt(i) == '(') {
      operator.push('(');
    }
    else if (s.charAt(i) == ')') {
      ;
      while (operator.peek() != '(') {
        var res = perform();
        operand.push(res);
      }
      operator.pop();
    }
    else if (isOperator(s.charAt(i))) {
      while (!operator.isEmpty() && precedence(s.charAt(i)) <= precedence(operator.peek())) {
        var res = perform();
        operand.push(res);
      }
      operator.push(s.charAt(i));
    }
  }
  // while to perform remaining operations
  while (!operator.isEmpty()) {
    var res = perform();
    operand.push(res);
  }
  return operand.pop();
}
// functio to perform current operations 
function perform() {
  var a = operand.pop();
  var b = operand.pop();
  var o = operator.pop();
  switch (o) {
    case '+':
      res = a + b;
      break;
    case '-':
      res = b - a;
      break;
    case '/':
      res = b / a;
      break;
    case '*':
      res = a * b;
      break;
  }
  return res;
}
// function to check is char is num or operator 
function isNumber(char) {
  if (typeof char !== 'string')
    return false;
  if (char.trim() === '')
    return false;

  return !isNaN(char);
}
function isOperator(o) {
  return (o == '+' || o == '*' || o == '/' || o == '-');
}

// function to assign precedence
function precedence(o) {
  switch (o) {
    case '+':
    case '-':
      return 1;
    case '*':
    case '/':
      return 2;
  }
  return -1;
}
module.exports = { answer }