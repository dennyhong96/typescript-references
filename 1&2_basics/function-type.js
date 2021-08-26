(function () {
    function add(n1, n2) {
        // inferred number return type
        return n1 + n2;
    }
    var num1 = 5;
    var num2 = 2.8;
    var printResult = function (num) {
        console.log("Result: " + num);
        // inferred void return type
    };
    var printResultAlt = function (num) {
        console.log("Result(alt): " + num);
        // if return type is specified as undefined, must use return keyword
        return;
    };
    printResult(add(num1, num2));
    printResultAlt(add(num1, num2));
    var addNumbers = add;
    // addNumbers = 5;
    printResult(addNumbers(num1, num2));
    // Callback type
    function addAddHandle(n1, n2, cb) {
        var result = n1 + n2;
        cb(result);
    }
    addAddHandle(num1, num2, function (res) {
        console.log(res);
        return res; // Can return a number even though return type is void, because void simply means ignore the return
    });
})();
