(function () {
  enum Role {
    ADMIN = "ADMIN",
    READ_ONLY = 5,
    AUTHOR,
  }

  const denny: {
    name: string;
    age: number;
    hobbies: string[];
    role: readonly [number, string]; // Tuple type
    role2: Role;
  } = {
    name: "denny",
    age: 24,
    hobbies: ["eat", "sleep"],
    role: [2, "author"] as const, // as const converts arr into tuple
    role2: Role.ADMIN,
  };

  console.log({ denny });

  const favActivities: string[] = [];
  favActivities.push("hicking");
  favActivities.push("camping");

  console.log({ favActivities });

  for (const hobby of denny.hobbies) {
    console.log(hobby.toUpperCase());
  }

  if (denny.role2 === Role.ADMIN) {
    console.log("is admin!");
  }
})();
