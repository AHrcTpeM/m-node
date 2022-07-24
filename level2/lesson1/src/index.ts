/* task 1 */
function getFirstWord(a: string) {
	return a.split(/ +/)[0].length;
}

/* task 2 */
function getUserNamings(a: {name: string, surname: string}) {
    return { 
        fullname: a.name + " " + a.surname, 
        initials: a.name[0] + "." + a.surname[0] 
    };
}

/* task 3 */
function getAllProductNames(a: {products: {name: string}[]}) {
    return a?.products?.map(prod => prod?.name) || [];
}

/* task 4.1 */
function hey(a: {name: () => string, cuteness?: number, coolness?: number}) {
    return "hey! i'm " + a.name();
}
hey({name: () => "roma", cuteness: 100})
hey({name: () => "vasya", coolness: 100})

/* task 4.2 */
function hey2(abstractPet: {name: () => string}) {
    return "hey! i'm " + abstractPet.name();
}
class Cat {
    nickname: string;
    isReal: boolean;
    constructor(_nickname: string, _isReal: boolean) {
        this.nickname = _nickname;
        this.isReal = _isReal;
    }
    name() {
        return this.nickname;
    }
}
class Dog {
    nickname: string;
    medals: number;
    constructor(_nickname: string, _medals: number) {
        this.nickname = _nickname;
        this.medals = _medals;
    }
    name() {
        return this.nickname;
    }
}
let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
hey2(a)
hey2(b)

/* task 4.3 */
function hey3(a: {name: () => string, type: string, cuteness?: number, coolness?: number}) {
    return "hey! i'm " + a.name()
		 + (a.type === "cat" ? ("cuteness: "+a.cuteness) : ("coolness: "+a.coolness))
}
hey3({name: () => "roma", type: "cat", cuteness: 100})
hey3({name: () => "vasya", type: "dog", coolness: 100})

/* task 5 */
type Mytype = any[] | {};
function stringEntries(a: Mytype) {
    return Array.isArray(a) ? a : Object.keys(a)
}

/* task 6 */
async function world(a: number) {
    return "*".repeat(a)
}
const hello = async () => {
   return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))