(function () {
  abstract class Department {
    static fiscalYear = new Date().getFullYear();
    // private readonly id: string;
    // public name: string;

    // private employees: string[] = []; // Private access modifier - only accessible within the class declaration
    protected employees: string[] = []; // protected access modifier - accessible within this class and sub-class declarations

    constructor(protected readonly id: string, public name: string) {
      // Shorthand initialization
      // this.id = id;
      // this.name = name;

      // Access static members with ClassName.xxx within the class declaration
      console.log(Department.fiscalYear);
    }

    // Static helper method
    static createEmployee(name: string) {
      return { name };
    }

    // Dummy "this" parameter for type safety
    // Use abstract class when you want to force sub-classes to implement a method,
    // that is different depends on the individual sub-classes
    abstract describe(this: Department): void;

    addEmployee(...employees: string[]) {
      employees.forEach((emp) => this.employees.push(emp));
    }

    printEmployeeInformation() {
      console.log(this.employees.length);
      console.log(this.employees);
    }
  }

  // const dept = new Department(); // Cannot create an instance of an abstract class.

  class ITDepartment extends Department {
    public admins: string[];

    constructor(id: string, admins: string[]) {
      super(id, "IT"); // call super first
      this.admins = admins;
    }

    describe() {
      console.log(`Department: ${this.name}, ID: ${this.id}`);
    }
  }

  // Using the static helper
  const employee1 = Department.createEmployee("Denny");
  console.log({ employee1 });
  console.log(Department.fiscalYear);

  const it = new ITDepartment("def456", ["Denny", "Sharon"]);

  it.addEmployee("Sam", "Sally", "Daming");

  console.log({ it });

  class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    // Private constructor, use with static property and method
    private constructor(id: string, private reports: string[] = []) {
      super(id, "Accounting"); // call super first
      this.lastReport = reports[reports.length - 1];
    }

    static getInstance(id: string, reports?: string[]) {
      // using `this` in static methods refers to the class itself, or we can use AccountingDepartment.instance
      if (!this.instance) {
        AccountingDepartment.instance = new AccountingDepartment(id, reports);
      }
      return AccountingDepartment.instance;
    }

    // Getter
    get mostRecentReport() {
      if (!this.lastReport) throw new Error("No report available.");
      return this.lastReport;
    }

    // Setter, can be of same name as getter
    set mostRecentReport(report: string) {
      if (!report) throw new Error("Please pass in a report.");
      this.addReport(report);
      this.lastReport = report;
    }

    addReport(...reports: string[]) {
      reports.forEach((rep) => this.reports.push(rep));
      this.lastReport = this.reports[this.reports.length - 1];
    }

    getReport() {
      console.log(this.reports);
    }

    addEmployee(...employees: string[]) {
      employees.forEach((emp) => {
        if (emp === "Denny") return;
        this.employees.push(emp);
      });
    }

    describe() {
      return `Name: ${this.name} - ID: ${this.id}`;
    }
  }

  const accounting = AccountingDepartment.getInstance("acb123");
  const accounting2 = AccountingDepartment.getInstance("acb123");
  console.log(accounting === accounting2);

  // console.log(accounting.mostRecentReport);
  accounting.addReport("Denny is awesome!", "Sharon is awesome!");
  accounting.addEmployee("Denny", "Sharon");

  console.log({ accounting });
  console.log(accounting.mostRecentReport);

  // accounting.mostRecentReport = "";
  accounting.mostRecentReport = "We are awesome!";
  console.log(accounting.mostRecentReport);
  console.log(accounting.describe());
})();
