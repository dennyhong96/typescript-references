var denny = {
    name: "denny",
    age: 24,
    hobbies: ["eat", "sleep"]
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
