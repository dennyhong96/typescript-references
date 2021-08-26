(function () {
    var Role;
    (function (Role) {
        Role["ADMIN"] = "ADMIN";
        Role[Role["READ_ONLY"] = 5] = "READ_ONLY";
        Role[Role["AUTHOR"] = 6] = "AUTHOR";
    })(Role || (Role = {}));
    var denny = {
        name: "denny",
        age: 24,
        hobbies: ["eat", "sleep"],
        role: [2, "author"],
        role2: Role.ADMIN
    };
    console.log({ denny: denny });
    var favActivities = [];
    favActivities.push("hicking");
    favActivities.push("camping");
    console.log({ favActivities: favActivities });
    for (var _i = 0, _a = denny.hobbies; _i < _a.length; _i++) {
        var hobby = _a[_i];
        console.log(hobby.toUpperCase());
    }
    if (denny.role2 === Role.ADMIN) {
        console.log("is admin!");
    }
})();
