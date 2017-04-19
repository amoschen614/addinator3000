const add = require('./adder.js').add;

class TestSuite {

	runTest(testName) {
		const result = this[testName]();
		console.log(result, testName);
	}

	runTests() {
		Object.getOwnPropertyNames(Object.getPrototypeOf(this))
		.filter(prop => this[prop] instanceof Function)
		.filter(prop => prop.indexOf('test') !== -1)
		.forEach(testName => this.runTest(testName));
		/*
		this.testAddPositiveNumbers();
		this.testAddNegativeNumbers();
		this.testAddPositiveAndNegativeNumbers();
		*/
	}

	assertEquals(a, b) {
		return a === b;
	}

	testAddPositiveNumbers() {
		return this.assertEquals(add(5, 7), 12);
		//console.log(result, 'testAddPositiveNumbers');
	}

	testAddNegativeNumbers() {
		return this.assertEquals(add(-5, -7), -12);
		//console.log(result, 'testAddNegativeNumbers');
	}

	testAddPositiveAndNegativeNumbers() {
		return this.assertEquals(add(5, -7), -2);
		//console.log(result, 'testAddPositiveAndNegativeNumbers');
	}
}

const testSuite = new TestSuite();
testSuite.runTests();

/*
console.log(add(5, 7) === 12, 'add positive numbers');
console.log(add(-5, -7) === -12, 'add negative numbers');
console.log(add(5, -7) === -2, 'add positive and negative numbers');
*/
