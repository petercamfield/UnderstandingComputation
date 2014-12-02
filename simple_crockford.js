var NumberContainer = function(value) {
	var instance = {};
	var privateField_Value;

	if (typeof value != 'undefined') {
		privateField_Value = value;
	}

	instance.isReducible = function() {
		return false;
	}

	instance.getValue = function() {
		return privateField_Value;
	}

	instance.toString = function() {
		return privateField_Value.toString();
	}

	return instance;
}

var BooleanContainer = function(value) {
	var instance = {};
	var privateField_Value;

	if (typeof value != 'undefined') {
		privateField_Value = value;
	}

	instance.isReducible = function() {
		return false;
	}

	instance.getValue = function() {
		return privateField_Value;
	}

	instance.toString = function() {
		return privateField_Value.toString();
	}

	return instance;
}

var BiggerContainer = function(left, right) {
	var instance = {};
	var privateField_LeftValue;
	var privateField_RightValue;

	if (typeof left != 'undefined') {
		privateField_LeftValue = left;
	}

	if (typeof right != 'undefined') {
		privateField_RightValue = right;
	}

	instance.isReducible = function() {
		return true;
	}

	instance.getLeftValue = function() {
		return privateField_LeftValue;
	}

	instance.getRightValue = function() {
		return privateField_RightValue;
	}

	instance.toString = function() {
		return "(" + privateField_LeftValue.toString() + " > " + privateField_RightValue.toString() + ")";
	}

	instance.reduce = function(environment) {
	    if (privateField_LeftValue.isReducible()) return BiggerContainer(privateField_LeftValue.reduce(environment), privateField_RightValue);
    	if (privateField_RightValue.isReducible()) return BiggerContainer(privateField_LeftValue, privateField_RightValue.reduce(environment));
    	return BooleanContainer(privateField_LeftValue.getValue() > privateField_RightValue.getValue());
	}

	return instance;
}

var AddContainer = function(left, right) {
	var instance = {};
	var privateField_LeftValue;
	var privateField_RightValue;

	if (typeof left != 'undefined') {
		privateField_LeftValue = left;
	}

	if (typeof right != 'undefined') {
		privateField_RightValue = right;
	}

	instance.isReducible = function() {
		return true;
	}

	instance.getLeftValue = function() {
		return privateField_LeftValue;
	}

	instance.getRightValue = function() {
		return privateField_RightValue;
	}

	instance.toString = function() {
		return "(" + privateField_LeftValue.toString() + " + " + privateField_RightValue.toString() + ")";
	}

	instance.reduce = function(environment) {
	    if (privateField_LeftValue.isReducible()) return AddContainer(privateField_LeftValue.reduce(environment), privateField_RightValue);
    	if (privateField_RightValue.isReducible()) return AddContainer(privateField_LeftValue, privateField_RightValue.reduce(environment));
    	return NumberContainer(privateField_LeftValue.getValue() + privateField_RightValue.getValue());
	}

	return instance;
}

var MultiplyContainer = function(left, right) {
	var instance = {};
	var privateField_LeftValue;
	var privateField_RightValue;

	if (typeof left != 'undefined') {
		privateField_LeftValue = left;
	}

	if (typeof right != 'undefined') {
		privateField_RightValue = right;
	}

	instance.isReducible = function() {
		return true;
	}

	instance.getLeftValue = function() {
		return privateField_LeftValue;
	}

	instance.getRightValue = function() {
		return privateField_RightValue;
	}

	instance.toString = function() {
		return "(" + privateField_LeftValue.toString() + " x " + privateField_RightValue.toString() + ")";
	}

	instance.reduce = function(environment) {
	    if (privateField_LeftValue.isReducible()) return MultiplyContainer(privateField_LeftValue.reduce(environment), privateField_RightValue);
    	if (privateField_RightValue.isReducible()) return MultiplyContainer(privateField_LeftValue, privateField_RightValue.reduce(environment));
    	return NumberContainer(privateField_LeftValue.getValue() * privateField_RightValue.getValue());
	}

	return instance;
}

var VariableContainer = function(name) {
	var instance = {};
	var privateField_Name;

	if (typeof name != 'undefined') {
		privateField_Name = name;
	}

	instance.isReducible = function() {
		return true;
	}

	instance.getNameValue = function() {
		return privateField_Name;
	}

	instance.toString = function() {
		return privateField_Name.toString();
	}

	instance.reduce = function(environment) {
	    return environment[privateField_Name];
	}

	return instance;
}


var DoNothing = function() {
    var instance={};

    instance.isReducible = function() {
        return false;
    };

    instance.toString= function(){
        return "DoNothing";
    };

    return instance;
};

var Assign = function(name, expression){
    var instance={};

    instance.toString = function() {
        return "[" + name.toString() + " = " + expression.toString() + "]";
    };

    instance.isReducible = function() {
        return true;
    };

    instance.reduce = function(environment){
        if (expression.isReducible()) return Assign(name, expression.reduce(environment));
        var newEnvironment = environment;
        newEnvironment[name] = expression;
        return [DoNothing(), newEnvironment];
    };

    return instance;

};

var MachineContainer = function(expression, environment) {
	var instance = {};
	var privateField_ExpressionValue;
	var privateField_EnvironmentValue;

	if (typeof expression != 'undefined') {
		privateField_ExpressionValue = expression;
	}


		privateField_EnvironmentValue = environment ||{};


	instance.getExpressionValue = function() {
		return privateField_ExpressionValue;
	}

	instance.getRightValue = function() {
		return privateField_EnvironmentValue;
	}

	var doStep = function() {
        var result = [].concat(privateField_ExpressionValue.reduce(privateField_EnvironmentValue));
		privateField_ExpressionValue = result[0];
        privateField_EnvironmentValue = result[1] || privateField_EnvironmentValue;
	};

	instance.run = function() {
	    console.group(" --Run-- ");
	    while (privateField_ExpressionValue.isReducible() === true) {
            console.log(privateField_ExpressionValue.toString(), privateField_ExpressionValue);
            console.log(privateField_EnvironmentValue.toString(), privateField_EnvironmentValue);

	        doStep();
	    }
	    console.log(privateField_ExpressionValue.toString(), privateField_ExpressionValue);
        console.log(privateField_EnvironmentValue.toString(), privateField_EnvironmentValue);
	    console.groupEnd();
        return privateField_EnvironmentValue;
	};

	return instance;
}
