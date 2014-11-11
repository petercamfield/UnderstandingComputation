function Number(value) {
    this.value = value;
    this.reducible = false;
}
Number.prototype.toString=function() {
    return this.value.toString();
};

function Add(left, right) {
    this.left = left;
    this.right = right;
    this.reducible = true;
}
Add.prototype.toString = function() {
    return ("(" + this.left + " + " + this.right + ")");
};
Add.prototype.reduce = function() {
    if (this.left.reducible) return new Add(this.left.reduce(), this.right);
    if (this.right.reducible) return new Add(this.left, this.right.reduce());
    return new Number(this.left.value + this.right.value);
};

function Machine(expression) {
    this.expression = expression;
}
Machine.prototype.step = function() {
    this.expression = this.expression.reduce();
};
Machine.prototype.run = function() {
    while(this.expression.reducible===true) {
        console.log(this.expression, this.expression.toString());
        this.step();
    }
    console.log(this.expression, this.expression.toString());
};

