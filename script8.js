// Command Pattern

// encapsulates actions or operations as objects.

// in this pattern, you abstract the actual functions or execution of the action
//     from the action itself.

// if you have been using Redux, you've used the command pattern...
// redux.js.org
// which is where we use it by extracting the actions, which are called from the
//     execution of the actions, which are reducers.

// also often used in functional programming.

// we can see reducers, actions, and the container components in action (command pattern)
// http://better-than-i-was-yesterday.com/redux-document/docs/basics/ExampleTodoList.html
// this is a good example of the command pattern where each function is abstracted from
//     each other, but still used through the execution of the code inside of the app.

// In our example we have a calculator with 4 basic operations: add, subtract,
//    multiply and divide. Each operation is encapsulated by a Command object.

function add(x, y) {
  return x + y;
}
function sub(x, y) {
  return x - y;
}
function mul(x, y) {
  return x * y;
}
function div(x, y) {
  return x / y;
}

// The Calculator maintains a stack of commands. Each new command is executed and
//    pushed onto the stack. When an undo request arrives, it simply pops the last
//    command from the stack and executes the reverse action.

var Command = function (execute, undo, value) {
  this.execute = execute;
  this.undo = undo;
  this.value = value;
};

var AddCommand = function (value) {
  return new Command(add, sub, value);
};

var SubCommand = function (value) {
  return new Command(sub, add, value);
};

var MulCommand = function (value) {
  return new Command(mul, div, value);
};

var DivCommand = function (value) {
  return new Command(div, mul, value);
};

var Calculator = function () {
  var current = 0;
  var commands = [];

  function action(command) {
    var name = command.execute.toString().substr(9, 3);
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  return {
    execute: function (command) {
      current = command.execute(current, command.value);
      commands.push(command);
      console.log(action(command) + ": " + command.value);
    },

    undo: function () {
      var command = commands.pop();
      current = command.undo(current, command.value);
      console.log("Undo " + action(command) + ": " + command.value);
    },

    getCurrentValue: function () {
      return current;
    },
  };
};

function run() {
  var calculator = new Calculator();

  // issue commands

  calculator.execute(new AddCommand(100));
  calculator.execute(new SubCommand(24));
  calculator.execute(new MulCommand(6));
  calculator.execute(new DivCommand(2));

  // reverse last two commands

  calculator.undo();
  calculator.undo();

  console.log("\nValue: " + calculator.getCurrentValue());
}
