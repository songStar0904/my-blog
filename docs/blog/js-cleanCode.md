# [译] JavaScript Clean Code - Best Practices

原文: [JavaScript Clean Code - Best Practices](https://devinduct.com/blogpost/22/javascript-clean-code-best-practices)

译文：songstar

## 介绍

如果你关注代码本身或是如何去写代码，而不只是担心它是否能工作，那么你能练习并关注清洁代码。一个专业的开发者会为了将来的自己和“其他人”写代码而不是为了机器。你写的任何代码都不会是第一次，而是会坐下来等待将来的人并让他痛苦。但愿这个将来的人不是你。

基于这一点，清洁代码可以定义为**以一目了然的方式写代码， 能让人容易的理解和容易的去修改或者扩展。**

当第一印象是“WTF”的问题之一时，问问你自己有多少次你继续其他人的工作？

"WTF is that?"

"WTF did you do here?"

"WTF is this for?"

![](https://camo.githubusercontent.com/2050cd696ecddcabad1380b1964c48a60597323e/687474703a2f2f7777772e6f736e6577732e636f6d2f696d616765732f636f6d6963732f7774666d2e6a7067)

:::tips
即使是糟糕的代码也能运作，但如果代码不干净，它可能会使开发组织陷入困境。
:::

## 您来到这里阅读的实际部分 - 清洁代码最佳实践

1. 强力型检查

使用`===`代替`==`

```js
// If not handled properly, it can dramatically affect the program logic. It's like, you expect to go left, but for some reason, you go right.
0 == false // true
0 === false // false
2 == "2" // true
2 === "2" // false

// example
const value = "500";
if (value === 500) {
  console.log(value);
  // it will not be reached
}

if (value === "500") {
  console.log(value);
  // it will be reached
}
```

2. 变量

使用揭秘意图的方式来命名变量。这种方式让开发者看到后易于搜索和理解。

Bad：

```js
let daysSLV = 10;
let y = new Date().getFullYear();

let ok;
if (user.age > 30) {
  ok = true;
}
```

Good:

```js
const MAX_AGE = 30;
let daysSinceLastVisit = 10;
let currentYear = new Date().getFullYear();

//...

const isUserOlderThanAllowed = user.age > MAX_AGE;
```

不要加入额外不需要的单词来命名变量。

Bad:

```js
let nameValue;
let theProduct;
```

Good:

```js
let name;
let product;
```

不要强制记忆上下文。

Bad:

```js
const users = ["John", "Marco", "Peter"];
users.forEach(u => {
  doSomething();
  doSomethingElse();
  // ...
  // ...
  // ...
  // ...
  // Here we have the WTF situation: WTF is `u` for?
  register(u);
});
```

Good:

```js
const users = ["John", "Marco", "Peter"];
users.forEach(user => {
  doSomething();
  doSomethingElse();
  // ...
  // ...
  // ...
  // ...
  register(user);
});
```

不要加入不必要的上下文

Bad:

```js
const user = {
  userName: "John",
  userSurname: "Doe",
  userAge: "28"
};

...

user.userName;
```

Good:

```js
const user = {
  name: "John",
  surname: "Doe",
  age: "28"
};

...

user.name;
```

3. 函数

使用长而具有描述性名字。考虑到它表示某种行为，函数名称应该是动词或短​​语，完全暴露其背后的意图以及参数的意图。他们的名字应该说明他们做了什么。

Bad:

```js
function notif(user) {
  // implementation
}
```

Good:

```js
function notifyUser(emailAddress) {
  // implementation
}
```

避免使用大量参数。理想情况下，函数应该指定两个或更少的参数。参数越少，测试函数就越容易。

Bad:

```js
function getUsers(fields, fromDate, toDate) {
  // implementation
}
```

Good:

```js
function getUsers({ fields, fromDate, toDate }) {
  // implementation
}

getUsers({
  fields: ['name', 'surname', 'email'],
  fromDate: '2019-01-01',
  toDate: '2019-01-18'
});
```

使用默认参数而不是条件。

Bad:

```js
function createShape(type) {
  const shapeType = type || "cube";
  // ...
}
```

Good:

```js
function createShape(type = "cube") {
  // ...
}
```

一个函数应该只做一件事情。避免在一个函数里执行多个动作。

Bad:

```js
function notifyUsers(users) {
  users.forEach(user => {
    const userRecord = database.lookup(user);
    if (userRecord.isVerified()) {
      notify(user);
    }
  });
}
```

Good:

```js
function notifyVerifiedUsers(users) {
  users.filter(isUserVerified).forEach(notify);
}

function isUserVerified(user) {
  const userRecord = database.lookup(user);
  return userRecord.isVerified();
}
```

使用`Object.assign`来设置默认对象。

Bad:

```js
const shapeConfig = {
  type: "cube",
  width: 200,
  height: null
};

function createShape(config) {
  config.type = config.type || "cube";
  config.width = config.width || 250;
  config.height = config.width || 250;
}

createShape(shapeConfig);
```

Good:

```js
const shapeConfig = {
  type: "cube",
  width: 200
  // Exclude the 'height' key
};

function createShape(config) {
  config = Object.assign(
    {
      type: "cube",
      width: 250,
      height: 250
    },
    config
  );

  ...
}

createShape(shapeConfig);
```

不要使用flag作为参数，因为它们告诉你该函数正在做的比它应该做的更多。

Bad:

```js
function createFile(name, isPublic) {
  if (isPublic) {
    fs.create(`./public/${name}`);
  } else {
    fs.create(name);
  }
}
```

Good:

```js
function createFile(name) {
  fs.create(name);
}

function createPublicFile(name) {
  createFile(`./public/${name}`);
}
```

不要污染全局变量。如果需要扩展现有对象使用`ES Class`和 继承，而不是在原对象的原型链上创建函数。

Bad:

```js
Array.prototype.myFunc = function myFunc() {
  // implementation
};
```

Good:

```js
class SuperArray extends Array {
  myFunc() {
    // implementation
  }
}
```

4. 条件

避免负面条件

Bad:

```js
function isUserNotBlocked(user) {
  // implementation
}

if (!isUserNotBlocked(user)) {
  // implementation
}
```

Good:

```js
function isUserBlocked(user) {
  // implementation
}

if (isUserBlocked(user)) {
  // implementation
}
```

使用条件短线。这可能是微不足道的，但值得一提。仅将此方法用于布尔值，并且如果您确定该值不是undefined或者null。

Bad:

```js
if (isValid === true) {
  // do something...
}

if (isValid === false) {
  // do something...
}
```

Good:

```js
if (isValid) {
  // do something...
}

if (!isValid) {
  // do something...
}
```

尽可能避免条件。请改用多态和继承。

Bad:

```js
class Car {
  // ...
  getMaximumSpeed() {
    switch (this.type) {
      case "Ford":
        return this.someFactor() + this.anotherFactor();
      case "Mazda":
        return this.someFactor();
      case "McLaren":
        return this.someFactor() - this.anotherFactor();
    }
  }
}
```

Good:

```js
class Car {
  // ...
}

class Ford extends Car {
  // ...
  getMaximumSpeed() {
    return this.someFactor() + this.anotherFactor();
  }
}

class Mazda extends Car {
  // ...
  getMaximumSpeed() {
    return this.someFactor();
  }
}

class McLaren extends Car {
  // ...
  getMaximumSpeed() {
    return this.someFactor() - this.anotherFactor();
  }
}
```

5. ES 类

类是`JavaScript`中的新语法糖。一切都像以前一样工作原型只有它现在看起来不同，你应该更喜欢它们而不是ES5普通功能。

Bad:

```js
const Person = function(name) {
  if (!(this instanceof Person)) {
    throw new Error("Instantiate Person with `new` keyword");
  }

  this.name = name;
};

Person.prototype.sayHello = function sayHello() { /**/ };

const Student = function(name, school) {
  if (!(this instanceof Student)) {
    throw new Error("Instantiate Student with `new` keyword");
  }

  Person.call(this, name);
  this.school = school;
};

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.printSchoolName = function printSchoolName() { /**/ };
```

Good:

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    /* ... */
  }
}

class Student extends Person {
  constructor(name, school) {
    super(name);
    this.school = school;
  }

  printSchoolName() {
    /* ... */
  }
}
```

使用链式方法，很多类使用这种模式例如jQuery，Lodash。因此，你的代码不那么冗长。在你的类中，只需在每个函数的末尾返回`this`，你就可以将更多的类方法链接到它上面。

Bad:

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  setSurname(surname) {
    this.surname = surname;
  }

  setAge(age) {
    this.age = age;
  }

  save() {
    console.log(this.name, this.surname, this.age);
  }
}

const person = new Person("John");
person.setSurname("Doe");
person.setAge(29);
person.save();
```

Good:

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  setSurname(surname) {
    this.surname = surname;
    // Return this for chaining
    return this;
  }

  setAge(age) {
    this.age = age;
    // Return this for chaining
    return this;
  }

  save() {
    console.log(this.name, this.surname, this.age);
    // Return this for chaining
    return this;
  }
}

const person = new Person("John")
    .setSurname("Doe")
    .setAge(29)
    .save();
```

## 总结

这仅仅是改善你代码的一小部分。依我看，这里所说的原则是人们经常不遵循的原则。他们试图去做但因各种原因而不成功。也许在项目的一开始，代码是整洁干净的，但是在满足期限时，原则经常被忽略并转移到“TODO”或“REFACTOR”部分。基于这一点，你的客户宁愿让你满足截止日期而不要求代码干净。