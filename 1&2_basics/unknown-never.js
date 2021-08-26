(function () {
    var input;
    // let input: any;
    var inputString;
    input = "5";
    // inputString = input; // typescript throws error with unkown, where it doesn't throw with any
    if (typeof input === "string") {
        inputString = input;
    }
    console.log({ inputString: inputString });
    var generateError = function (msg, code) {
        // implicit never return type
        throw { msg: msg, code: code };
    };
    generateError("Error", 400);
    var neverReturn = function () {
        while (true) { }
    };
})();
