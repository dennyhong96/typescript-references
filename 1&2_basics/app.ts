const denny: {
  name: string;
  age: number;
  hobbies: string[];
} = {
  name: "denny",
  age: 24,
  hobbies: ["eat", "sleep"],
};

console.log({ denny });

const favActivities: string[] = [];
favActivities.push("hicking");
favActivities.push("camping");

console.log({ favActivities });

for (const hobby of denny.hobbies) {
  console.log(hobby.toUpperCase());
}
