// Non-reducible objects
function Basic() {
    this.reducible = false;
}
Basic.prototype.toString = function () {
    return this.value.toString();
};

function Number(value) {
    this.value = value;
}
Number.prototype = new Basic();
Number.prototype.constructor = Number;

function Boolean(value) {
    this.value = value;
}
Boolean.prototype = new Basic();
Boolean.prototype.constructor = Boolean;

// Reducible objects - two-sided
function ComplexLeftRight() {
    this.reducible = true;
}
ComplexLeftRight.prototype.toString = function () {
    return "(" + this.left + " " + this.symbol + " " + this.right + ")";
};

function Bigger(left, right) {
    this.left = left;
    this.right = right;
    this.symbol = '>';
}
Bigger.prototype = new ComplexLeftRight();
Bigger.prototype.constructor = Bigger;
Bigger.prototype.reduce = function(environment){
    if (this.left.reducible) return new Bigger(this.left.reduce(environment), this.right);
    if (this.right.reducible) return new Bigger(this.left, this.right.reduce(environment));
    return new Boolean(this.left.value > this.right.value);
};

function Add(left, right) {
    this.left = left;
    this.right = right;
    this.symbol = '+';
}
Add.prototype = new ComplexLeftRight();
Add.prototype.constructor = Add;
Add.prototype.reduce = function () {
    if (this.left.reducible) return new Add(this.left.reduce(), this.right);
    if (this.right.reducible) return new Add(this.left, this.right.reduce());
    return new Number(this.left.value + this.right.value);
};

function Multiply(left, right) {
    this.left = left;
    this.right = right;
    this.symbol = '*';
}
Multiply.prototype = new ComplexLeftRight();
Multiply.prototype.constructor = Multiply;
Multiply.prototype.reduce = function () {
    if (this.left.reducible) return new Multiply(this.left.reduce(), this.right);
    if (this.right.reducible) return new Multiply(this.left, this.right.reduce());
    return new Number(this.left.value * this.right.value);
};

// Reducible objects - one-sided
function Complex() {
    this.reducible = true;
}
Complex.prototype.toString = function () {
    return this.name.toString();
};

function Variable (name) {
    this.name = name;
}
Variable.prototype = new Complex();
Variable.prototype.constructor = Variable;
Variable.prototype.reduce = function(environment) {
    return environment[this.name];
};

// Machine for processing expressions
function Machine(expression, environment) {
    this.expression = expression;
    this.environment = environment;
}
Machine.prototype.step = function () {
    this.expression = this.expression.reduce(this.environment);
};
Machine.prototype.run = function () {
    console.group(" --Run-- ");
    while (this.expression.reducible === true) {
        console.log(this.expression.toString(), this.expression);
        this.step();
    }
    console.log(this.expression.toString(), this.expression);
    console.groupEnd();
};



