(function () {
    function add(n1, n2, showResult, resultPhrase) {
        var result = n1 + n2;
        if (showResult) {
            console.log("" + resultPhrase + result);
        }
        else {
            return resultPhrase + " " + result;
        }
    }
    var num1 = 5;
    var num2 = 2.8;
    add(num1, num2, true, "The result is: ");
})();
