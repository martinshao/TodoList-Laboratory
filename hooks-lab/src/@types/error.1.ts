export class Person {
  // ⛔️ Error: Function implementation is missing or not immediately following the declaration.ts(2391)
  // console.log('Hello world')
}

// ⛔️ Error: Function implementation is missing or not immediately following the declaration.ts(2391)
// function sum(a: number, b: number): void;

abstract class Employee {
  abstract salary: number;

  // ⛔️ Error: Function implementation is missing or not immediately following the declaration.ts(2391)
  // increaseSalary(): number;
}
