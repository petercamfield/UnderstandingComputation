function Number(value) {
    this.value = value;
    this.reducible = false;
}
Number.prototype.toString = function () {
    return this.value.toString();
};

function Add(left, right) {
    this.left = left;
    this.right = right;
    this.reducible = true;
}
Add.prototype.toString = function () {
    return ("(" + this.left + " + " + this.right + ")");
};
Add.prototype.reduce = function () {
    if (this.left.reducible) return new Add(this.left.reduce(), this.right);
    if (this.right.reducible) return new Add(this.left, this.right.reduce());
    return new Number(this.left.value + this.right.value);
};

function Multiply(left, right) {
    this.left = left;
    this.right = right;
    this.reducible = true;
}
Multiply.prototype.toString = function () {
    return ("(" + this.left + " x " + this.right + ")");
};
Multiply.prototype.reduce = function () {
    if (this.left.reducible) return new Multiply(this.left.reduce(), this.right);
    if (this.right.reducible) return new Multiply(this.left, this.right.reduce());
    return new Number(this.left.value * this.right.value);
};

function Machine(expression) {
    this.expression = expression;
}
Machine.prototype.step = function () {
    this.expression = this.expression.reduce();
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

