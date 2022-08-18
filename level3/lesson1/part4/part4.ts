type myType<T> = Record<string, T>; // globalThis.Record<string, T>

function mapObject<Input, Output>(
  object: myType<Input>,
  transformer: (param: Input) => Output
): myType<Output> {
  const newObj: myType<Output> = {};
  for (let key in object) {
    newObj[key] = transformer(object[key]);
  }
  return newObj;
}

const obj: myType<number> = {
  roma: 5,
  vasya: 2,
  kolya: 4,
};
const transformer = (x: number) => x > 2;

const obj1: myType<string> = {
  roma: "complited",
  vasya: "complited",
  kolya: "process",
};
const transformer1 = (x: string) => x.includes("complited");

console.log(mapObject(obj, transformer)); // { roma: true, vasya: false, kolya: true }
console.log(mapObject(obj1, transformer1)); // { roma: true, vasya: true, kolya: false }
