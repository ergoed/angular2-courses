import * as chai from 'chai';
var expect = chai.expect;

describe.only('about classes', () => {
  function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => Object
        .getOwnPropertyNames(baseCtor.prototype)
        .forEach(name => derivedCtor.prototype[name] = baseCtor.prototype[name]));
  }

  it('1-your first class', () => {
    class SuperHero {

      private firstName: string;
      private secondName: string;

      constructor(firstName: string, secondName: string){
        this.firstName = firstName;
        this.secondName = secondName;
      }
      talk(){
        return "My favourite saying is : Hi my name is " + this.firstName + " " + this.secondName;
        // `My favourite saying is : Hi my name is ${firstName} ${secondName}`
      }
    } // _

    var hero = new SuperHero('Bruce', 'Wayne');
    expect(hero.talk()).to.equal('My favourite saying is : Hi my name is Bruce Wayne');
  });

  it('2-you can use getter and setters', () => {
    class Person {
      private firstName : string;
      private secondName : string;

      get firstName() : string{
        return this.firstName;
      }
      get lastName() : string{
        return this.secondName;
      }

      set fullName() : string{
        return  this.firstName + " " + this.secondName;
      }
    } // _

    var person = new Person('John', 'Doe');
    expect(person.fullName).to.equal('John Doe');
    person.fullName = 'Jane Doe';
    expect(person.fullName).to.equal('Jane Doe');
  });

  it('3-implement an interface', () => {
    interface IDeveloper {
      favouriteLanguage: string;
      sayHi(): string;
    }

    class Developer implements IDeveloper {
      constructor(favouriteLanguage : string){
        this.favouriteLanguage = favouriteLanguage;
      }

      sayHi() {
        return "Hello my favourite language is" + " " + this.favouriteLanguage
      }
    } // _

    var developer: IDeveloper = new Developer('TypeScript');
    expect(developer.sayHi()).to.equal('Hello my favourite language is TypeScript');
  });

  it('4-extend an other class', () => {
    class SuperHero {
      public name: string;
      public ability: string;

      constructor(name: string, ability: string) {
        this.name = name;
        this.ability = ability;
      }
      public talk() {
        return `I fight against evil with ${this.ability}`;
      }
    }

    class Sidekick extends SuperHero{
        public master: string;

        get SuperHero() : string{
          return this.name;
          this.master = this.name;
        }
        public talk() {
          return `I fight against evil with ${this.ability} and my master is ${this.master}`;
        }

      } // _

    var batman = new SuperHero('Batman', 'Martial arts');
    var robin = new Sidekick('Robin', 'Stick', batman);
    expect(robin.talk()).to.equal('I fight against evil with Stick and my master is Batman');
  });

  it('5-share methods like in pure JS', () => {
    class Developer {
      public favouriteLanguage: string;

      constructor(favouriteLanguage: string) {
        this.favouriteLanguage = favouriteLanguage;
      }

      public sayHi() {
        return `Hello my favourite language is ${this.favouriteLanguage}`;
      }
    }

    var developer = new Developer('JavaScript');
    expect(developer.sayHi.call( _ ))
      .to.equal('Hello my favourite language is TypeScript');
  });

  it('6-mix it', () => {
    class BackDeveloper {
      public static languages = ['CSharp'];
      public writeCSharp() {
        return true;
      }
    }

    class FrontDeveloper {
      public static languages = ['JavaScript', 'TypeScript'];
      public writeTypeScript() {
        return true;
      }
      public writeJavaScript() {
        return true;
      }
    }

    class FullStackDeveloper { } // _

    var developer = new FullStackDeveloper();
    expect(developer.talk())
      .to.equal('Hello I\'m a FullStackDeveloper and I know CSharp and JavaScript and TypeScript');
    expect(developer.talk.call(new BackDeveloper()))
      .to.equal('Hello I\'m a BackDeveloper and I know CSharp');
    expect(developer.talk.call(new FrontDeveloper()))
      .to.equal('Hello I\'m a FrontDeveloper and I know JavaScript and TypeScript');
  });
});
