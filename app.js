
// ES6 class
class Person {

	constructor(name, age){
		this.name = name;
		this.age = age;
	}

	getInfo(){
		return `My Name is ${this.name} and age is ${this.age}`;
	}
	
	// static method
	static classInfo(){
		return 'this class creates a new person';
	}

}


// let shivam = new Person('shivam', 24);
// console.log(Person.classInfo());


// ES6 inheritance
class Teacher extends Person{

	constructor(name, age){
		super(name, age);
		this.profession = 'Teacher';
	}

	getInfo(){
		return `My Name is ${this.name} and age is ${this.age} and i am a ${this.profession}`;
	}

}

let t1 = new Teacher('Manish', 28);
console.log(t1.getInfo());

// function Person(name, age){
// 	this.name = name;
// 	this.age = age;

// 	this.getInfo = function(){
// 		return `The name is ${this.name} and age is ${this.age}`;
// 	}
// }


// const shivam = new Person('Shivam', 21);
// console.log(shivam.getInfo());