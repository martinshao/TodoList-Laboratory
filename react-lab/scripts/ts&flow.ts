// type ExactUser = {| name: string, age: number |};

type ExactUser = { name: string, age: number };
type User = { name: string, age: number, [otherProperty: string]: any };

type OptionalUser = Partial<ExactUser>; // all properties become optional

const xiaoming: OptionalUser = {
  name: 'xiaoming',
}