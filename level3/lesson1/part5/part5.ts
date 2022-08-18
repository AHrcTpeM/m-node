function func<T>(data: Partial<T>, addProp: (elem: Partial<T>) => T) {
  //
}

function func2<T extends { id?: string }>(
  data: T,
  addProp: (elem: T) => T & { id: string }
) {
  //
}

class Rectangle {
  w!: number;
  h!: number;
}
class Circle {
  radius!: number;
}

function makeNewClass<T>(SOMECLASS: { new (): T }, count: number): T[] {
  // Using Class Types in Generics
  let a: T[] = [];
  for (let i = 0; i < count; i++) a.push(new SOMECLASS());

  return a;
}

let a: Rectangle[] = makeNewClass(Rectangle, 10);
let b: Circle[] = makeNewClass(Circle, 20);
