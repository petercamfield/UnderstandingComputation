function number (value) {
    var instance = {};

    instance.value = value;

    instance.evaluate = function(environment) {
        console.log("number:", instance.value);
        return instance.value;
    };
    return instance;
}

function variable (name) {
    var instance = {};

    instance.evaluate = function(environment) {
        return environment[name].evaluate(environment);
    };

    return instance;
}

function add(left, right) {
    var instance={};

    instance.evaluate = function(environment) {
        console.log("add:", left, right);
        return number(left.evaluate(environment) + right.evaluate(environment)).evaluate(environment);
    };
    return instance;

}