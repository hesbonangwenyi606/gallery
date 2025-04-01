// tests/app.test.js

// A simple test to check if 1 + 2 equals 3
test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });
  
  // Test case to check if the string "Hello" + " World" equals "Hello World"
  test('concatenates strings "Hello" and "World"', () => {
    const greeting = 'Hello' + ' ' + 'World';
    expect(greeting).toBe('Hello World');
  });
  
  // Test case to check if an array contains a specific number
  test('array contains the number 5', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toContain(5);
  });
  
  // Test case to check if an object has a specific key-value pair
  test('object has a name property with value John', () => {
    const person = { name: 'John', age: 30 };
    expect(person).toHaveProperty('name', 'John');
  });
  
  // Test case to check if a function throws an error when passed invalid input
  test('throws error when dividing by zero', () => {
    const divide = (a, b) => {
      if (b === 0) throw new Error('Cannot divide by zero');
      return a / b;
    };
  
    expect(() => divide(5, 0)).toThrow('Cannot divide by zero');
  });
  
  // Test case to check if a number is greater than another number
  test('5 is greater than 3', () => {
    expect(5).toBeGreaterThan(3);
  });
  
  // Test case to check if a number is less than another number
  test('3 is less than 5', () => {
    expect(3).toBeLessThan(5);
  });
  
  // Test case for checking an object deep equality (using `toEqual`)
  test('objects are equal', () => {
    const object1 = { name: 'Alice', age: 25 };
    const object2 = { name: 'Alice', age: 25 };
    expect(object1).toEqual(object2);
  });
  