(function () {
    function combine(n1, n2, // union type
    format // literal type
    ) {
        if (format === void 0) { format = "as-text"; }
        var result;
        if ((typeof n1 === "number" && typeof n2 === "number") ||
            format === "as-number") {
            result = +n1 + +n2;
        }
        else {
            result = n1.toString() + n2.toString();
        }
        return result;
    }
    var combinedAges = combine(24, 27, "as-text");
    console.log({ combinedAges: combinedAges });
    var combinedNames = combine("denny", "sharon");
    console.log({ combinedNames: combinedNames });
})();
