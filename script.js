//In mathematics, an infix is a mathematical operator that appears between its two operands. For example, 1 + 2 is an infix expression.To parse these expressions, you will need to map the symbols to relevant functions. Declare an infixToFunction variable, and assign it an empty object.
const infixToFunction = {
    //Object values do not have to be primitive types, like a string or a number. They can also be functions.Give your infixToFunction object a + property. That property should be a function that takes an x and y parameter and implicitly returns the sum of those two parameters.Because + is not alphanumeric, you'll need to wrap it in quotes for your property.
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
}

//Now that you have your infix functions, you need a way to evaluate them. Declare an infixEval function which takes two parameters, str and regex. It should implicitly return the .replace() method of str, with regex and an empty callback as the arguments.//Your callback needs four parameters. match, arg1, operator, and arg2.You will not be using the match parameter, so remember to prefix it.//The regex you will be passing to your infixEval function will match two numbers with an operator between them. The first number will be assigned to arg1 in the callback, the second to arg2, and the operator to operator.Have your callback function implicitly return the operator property of your infixToFunction object. Remember that operator is a variable which holds the property name, not the actual property name.//infixToFunction[operator] returns a function. Call that function directly, passing arg1 and arg2 as the arguments.//You have a slight bug. arg1 and arg2 are strings, not numbers. infixToFunction['+']("1", "2") would return 12, which is not mathematically correct.Wrap each of your infixToFunction[operator] arguments in a parseFloat() call.
const infixEval = (str, regex) => str.replace(regex, (_match, arg1, operator, arg2) => infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)));


//Now that you can evaluate mathematical expressions, you need to account for order of operations. Declare a highPrecedence function that takes a str parameter.
const highPrecedence = str => {
    //In your highPrecedence function, declare a regex variable. Assign it a regular expression that matches a number (including decimal numbers) followed by a * or / operator followed by another number.Each number, and the operator, should be in separate capture groups.
    const regex = /([\d.]+)([*\/])([\d.]+)/;

    //Now that you have a regular expression to match multiplication or division, you can evaluate that expression.Declare a str2 variable and assign it the result of calling infixEval with str and regex as arguments.
    const str2 = infixEval(str, regex);

    //Your infixEval function will only evaluate the first multiplication or division operation, because regex isn't global. This means you'll want to use a recursive approach to evaluate the entire string.If infixEval does not find any matches, it will return the str value as-is. Using a ternary expression, check if str2 is equal to str. If it is, return str, otherwise return the result of calling highPrecedence() on str2.
    return str2 === str ? str : highPrecedence(str2);
}


//Declare an isEven function, which takes a num parameter and returns true if the number is even, and false otherwise. Use the modulo operator % to determine if a number is even or odd.
const isEven = num => num % 2 === 0;

//Most spreadsheet programs include built-in functions for calculation.Declare a sum function that takes a nums parameter, which will be an array of numbers. It should return the result of calling reduce on the array to sum all of the numbers.
const sum = (nums) => nums.reduce((acc, el) => acc + el, 0);

//Declare an average function which takes an array of numbers as the nums parameter. It should return the average of all the numbers in the array.The average can be calculated by dividing the sum of all the numbers in the array by the length of the array. Remember that you have a sum function you can use.
const average = nums => sum(nums) / nums.length;

//Your next function will calculate the median value of an array of numbers. Start by declaring a median arrow function that takes a nums parameter.In the function, declare a sorted variable and assign it the value of sorting a copy of the nums array.You should use the slice() method for creating a shallow copy of the array.
const median = nums => {
    const sorted = nums.slice().sort((a, b) => a - b);
    //Declare a length variable and assign it the length of your sorted array, and a middle variable that has the value of the length divided by 2, subtracted by 1.
    const length = sorted.length;
    const middle = length / 2 - 1;
    //Using ternary syntax, check if length is even using your isEven function. If it is, return the average of the number at the middle index and the number after that. If it's odd, return the number at the middle index – you'll need to round the middle value up.
    return isEven(length) ? average([sorted[middle], sorted[middle + 1]]) : sorted[Math.ceil(middle)];
}

//Object properties consist of key/value pairs. You can use shorthand property names when declaring an object literal. When using the shorthand property name syntax, the name of the variable becomes the property key and its value the property value.To keep track of all of your spreadsheet's functions, declare a spreadsheetFunctions object. Using the shorthand notation syntax, set sum, average, and median as properties on the spreadsheetFunctions object.
const spreadsheetFunctions = {
    //Finally, to handle potential edge cases, add an empty string property (you will need to use quotes) which is a function that takes a single argument and returns that argument.
    "": arg => arg,
    sum,
    average,
    median,
    //Add an even property to your spreadsheetFunctions. It should take a nums parameter, and return the result of filtering the nums array to only include even numbers. Use a reference to your isEven function to help.
    even: nums => nums.filter(isEven),

    //Arrays have a .some() method. Like the .filter() method, .some() accepts a callback function which should take an element of the array as the argument. The .some() method will return true if the callback function returns true for at least one element in the array.Add a someeven property to your spreadsheetFunctions - use the .some() method to check if any element in the array is even.
    someeven: nums => nums.some(isEven),

    //Arrays have an .every() method. Like the .some() method, .every() accepts a callback function which should take an element of the array as the argument. The .every() method will return true if the callback function returns true for all elements in the array.Add an everyeven property to your spreadsheetFunctions - use the .every() method to check if any element in the array is even.
    everyeven: nums => nums.every(isEven),

    //Add a firsttwo property which takes a nums parameter and returns the first two elements of the nums array. Then add a lasttwo property which returns the last two elements of the nums array.
    firsttwo: nums => nums.slice(0, 2),
    lasttwo: nums => nums.slice(-2),
    //Add a has2 property which returns whether the nums array has 2 in the values, and an increment property which returns nums with every value incremented by one.
    has2: nums => nums.includes(2),
    increment: nums => nums.map(num => num + 1),

    //Add a random property which takes the first two numbers from an array and returns a random number between them. Use the Math.random() function to help.
    random: ([x, y]) => Math.floor(Math.random() * y + x),

    //Add a range property which generates a range from nums. Remember that you have a range function you can reuse here.
    range: nums => range(...nums),

    //The last function has a few approaches to implement, and you are free to choose whichever approach you would like.Add a nodupes property which returns nums with all duplicate values removed. For example, [2, 1, 2, 5, 3, 2, 7] should return [2, 1, 5, 3, 7].
    nodupes: nums => [...new Set(nums).values()]
}

//Now you can start applying your function parsing logic to a string. Declare a function called applyFunction, which takes a str parameter.
const applyFunction = str => {
    //First you need to handle the higher precedence operators. Declare a noHigh variable, and assign it the result of calling highPrecedence() with str as an argument.
    const noHigh = highPrecedence(str);

    //Declare an infix variable, and assign it a regular expression that matches a number (including decimal numbers) followed by a + or - operator followed by another number.
    const infix = /([\d.]+)([+-])([\d.]+)/;

    //Declare a str2 variable, and assign it the result of calling infixEval() with noHigh and infix as arguments.
    const str2 = infixEval(noHigh, infix);

    //Declare a functionCall variable, and assign it this regular expression: /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i...This expression will look for function calls like sum(1, 4).
    const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;

    //Declare a toNumberList function that takes an args parameter and implicitly returns the result of splitting the args by commas. Then chain a map method to your split method and pass in parseFloat as the argument to the map method.
    const toNumberList = (args) => args.split(",").map(parseFloat);

    //Declare an apply function that takes a fn and args parameter.//The fn parameter will be the name of a function, such as SUM. Update apply to implicitly return the function found at the fn property of your spreadsheetFunctions object.Remember that fn might not be lowercase, so you'll need to convert it to a lowercase string.//Your apply function is returning the spreadsheet function, but not actually applying it. Update apply to call the function. Pass in the result of calling toNumberList with args as an argument.
    const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));

    //Now your applyFunction needs to return a result. Return the result of calling the .replace() method on str2. Pass your functionCall regex and an empty callback.//Update the callback function to take match, fn, and args as parameters. It should implicitly return the result of checking whether spreadsheetFunctions has its own property of fn.Remember to make fn lower case.//Use the ternary operator to turn your .hasOwnProperty() call into the condition. If the object has the property, return the result of calling apply with fn and args as arguments. Otherwise, return match.
    return str2.replace(functionCall, (match, fn, args) => spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) ? apply(fn, args) : match);
}


//You will need a function to generate a range of numbers.Declare an empty range function which takes a start and end parameter. Use the Array() constructor and implicitly return an empty array.//Your array will need to be the size of the range. You can calculate this by finding the difference between end and start, and adding 1 to the result.Pass this calculation as the argument for your Array() constructor.//The Array() constructor has a .fill() method which can be used to fill an array with a value. You can use this to fill your array with the start value.Chain the .fill() method to your Array() constructor, and pass it the start value.//Currently your range function returns an array with the correct length, but all of the values are the value of start. To fix this, chain the .map() method to your .fill() method.Pass the .map() method a callback which takes element and index as parameters and returns the sum of those parameters.
const range = (start, end) => Array(end - start + 1).fill(start).map((element, index) => element + index);

//Now that you have a range function, you can use it to create a range of letters as well.Declare a charRange function using const and arrow syntax. It should take a start and end parameter. The function should implicitly return the result of calling range() with start and end as the arguments.//Your range function expects numbers, but your start and end values will be strings (specifically, they will be single characters such as A).Convert your start and end values in your range() call to numbers by using the .charCodeAt() method on them, passing the number 0 as the argument to that method.//range() will return an array of numbers, which you need to convert back into characters. Chain the .map() method to your range() call.Pass a callback function that takes code as the parameter and implicitly returns the value of passing code to the String.fromCharCode() method.
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map((code) => String.fromCharCode(code));

//In order to run your spreadsheet functions, you need to be able to parse and evaluate the input string. This is a great time to use another function.Declare an evalFormula arrow function which takes the parameters x and cells.
const evalFormula = (x, cells) => {
    //Declare an idToText arrow function which takes an id parameter.Your idToText function should return the result of calling .find() on the cells array with a callback function that takes an cell parameter and returns cell.id === id.//Your idToText function currently returns an input element. Update it to return the value of that input element.
    const idToText = id => cells.find(cell => cell.id === id).value;

    //You need to be able to match cell ranges in a formula. Cell ranges can look like A1:B12 or A3:A25. You can use a regular expression to match these patterns.Start by declaring a rangeRegex variable and assign it a regular expression that matches A through J (the range of columns in your spreadsheet). Use a capture group with a character class to achieve this.//After matching a cell letter successfully, your rangeRegex needs to match the cell number. Cell numbers in your sheet range from 1 to 99.Add a capture group after your letter capture group. Your new capture group should match one or two digits – the first digit should be 1 through 9, and the second digit should be 0 through 9. The second digit should be optional.//Ranges are separated by a colon. After your two capture groups, your rangeRegex should look for a colon.//After your rangeRegex finds the :, it needs to look for the same letter and number pattern as it did before.Copy your two existing capture groups and paste them after the colon.//Finally, make your rangeRegex global and case-insensitive.
    const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;

    //Declare a rangeFromString arrow function that takes two parameters, num1 and num2. The function should implicitly return the result of calling range with num1 and num2 as arguments.To be safe, parse num1 and num2 into integers as you pass them into range.
    const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));

    //Declare a function elemValue which takes a num parameter. The function should be empty.
    //const elemValue = num => {
    //Declare a function called inner which takes a character parameter.Then, return your inner function.
    //const inner = character => {
    //In your inner function, return the result of calling idToText with character + num as the argument.
    //return idToText(character + num);
    //}
    //return inner;
    //}

    //Use the same syntax as your addCharacters function to update your elemValue function. It should no longer declare inner, but should return the function implicitly.
    const elemValue = num => character => idToText(character + num);

    //The concept of returning a function within a function is called currying. This approach allows you to create a variable that holds a function to be called later, but with a reference to the parameters of the outer function call.innerOne would be your inner function, with num set to 1, and final would have the value of the cell with the id of A1. This is possible because functions have access to all variables declared at their creation. This is called closure.You'll get some more practice with this. Declare a function called addCharacters which takes a character1 parameter.//In your elemValue function, you explicitly declared a function called inner and returned it. However, because you are using arrow syntax, you can implicitly return a function. For example:curry is a function which takes a soup parameter and returns a function which takes a veggies parameter. Using this syntax, update your addCharacters function to return an empty function which takes a character2 parameter.//Your inner functions can also return a function. Using the same arrow syntax, update your addCharacters function to return a third function which takes a num parameter.//Now update your innermost function in the addCharacters chain to implicitly return the result of calling charRange() with character1 and character2 as the arguments.//Your addCharacters function ultimately returns a range of characters. You want it to return an array of cell ids. Chain the .map() method to your charRange() call.//You can pass a function reference as a callback parameter. A function reference is a function name without the parentheses.Pass a reference to your elemValue function as the callback to your .map() method.//Because elemValue returns a function, your addCharacters function ultimately returns an array of function references. You want the .map() method to run the inner function of your elemValue function, which means you need to call elemValue instead of reference it. Pass num as the argument to your elemValue function.
    const addCharacters = character1 => character2 => num => charRange(character1, character2).map(elemValue(num));

    //Declare a rangeExpanded variable and assign it the result of calling the .replace() method of your x parameter. Pass the rangeRegex variable as the argument.//The second argument to the .replace() method does not have to be a string. You can instead pass a callback function to run more complex logic on the matched string.The callback function takes a few parameters. The first is the matched string. Pass an empty callback function to your .replace() call, and give it a match parameter.//The callback function then has a parameter for each capture group in the regular expression. In your case, rangeRegex has four capture groups: the first letter, the first numbers, the second letter, and the second numbers.Give your callback function four more parameters to match those capture groups: char1, num1, char2, and num2. char will be short for character.//Have your callback implicitly return the result of calling rangeFromString() with num1 and num2 as the arguments.//Call the .map() method on your rangeFromString() call, passing a reference to addCharacters as the callback function.//addCharacters returns a function, so you'll want to call it. Pass char1 as the argument.//Your addCharacters(char1) is also returning a function, which returns another function. You need to make another function call to access that innermost function reference for the .map() callback. JavaScript allows you to immediately invoke returned functions:Immediately invoke the function returned from your addCharacters(char1) call, and pass char2 as the argument.//Now that your .map() function is receiving the innermost function reference from addCharacters, it will properly iterate over the elements and pass each element as n to that function.You'll notice that you are not using your match parameter. In JavaScript, it is common convention to prefix an unused parameter with an underscore _. You could also leave the parameter empty like so: (, char1) but it is often clearer to name the parameter for future readability.Prefix your match parameter with an underscore.
    const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));

    //Declare a variable cellRegex to match cell references. It should match a letter from A to J, followed by a digit from 1 to 9, and an optional digit from 0 to 9. Make the regular expression case-insensitive and global.
    const cellRegex = /[A-J][1-9][0-9]?/gi;

    //Declare a cellExpanded variable and assign it the value of calling .replace() on your rangeExpanded variable. Pass it your cellRegex and an empty callback function. The callback function should take a match parameter.//Update your callback function to return the result of calling idToText() with match as the argument. Remember that your regular expression is case-insensitive, so you will need to call toUpperCase() on match before passing it to idToText().
    const cellExpanded = rangeExpanded.replace(cellRegex, (match) => match => idToText(match.toUpperCase()));

    //Now you can start applying your function parser to your evalFormula logic. Declare a functionExpanded variable, and assign it the result of calling applyFunction with your cellExpanded string.
    const functionExpanded = applyFunction(cellExpanded);


    //Like you did with your highPrecedence() function, your evalFormula() function needs to ensure it has evaluated and replaced everything.Use a ternary to check if functionExpanded is equal to the original string x. If it is, return functionExpanded, otherwise return the result of calling evalFormula() again with functionExpanded and cells as arguments.
    return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells);
}

//The global window object represents the browser window (or tab). It has an onload property which allows you to define behavior when the window has loaded the entire page, including stylesheets and scripts.Start by setting the onload property of window to an arrow function with no parameters. In the function, declare a container variable and assign it the value of getting the element by the id of container.

window.onload = () => {
    const container = document.getElementById("container");
    //Functions are ideal for reusable logic. When a function itself needs to reuse logic, you can declare a nested function to handle that logic.Declare a nested createLabel function using arrow syntax. It should take a name parameter.
    const createLabel = (name) => {
        //Remember that the document object has a .createElement() method which allows you to dynamically create new HTML elements.In your createLabel function, declare a label variable and assign it a new div element.
        const label = document.createElement("div");
        //Set the className of the label element to label, and set the textContent to the name parameter.
        label.className = "label";
        label.textContent = name;
        //Finally, use the .appendChild() method to add your label element to the container element.
        container.appendChild(label);
    }
    //Now that your helper functions are complete, back in your onload event handler you should declare a letters variable. Assign it the result of calling charRange() with the letters A and J as arguments.
    const letters = charRange("A", "J");
    //Now call the .forEach() method of your letters array, and pass your createLabel function reference as the callback.
    letters.forEach(createLabel);

    //Remember that range() returns an array, so you can chain array methods directly to the function call.Call range() with 1 and 99 as the arguments, and chain the .forEach() method. Pass the .forEach() method an empty callback which takes number as the parameter.
    range(1, 99).forEach((number) => {
        //In your callback, you will need to make two function calls. Start by calling createLabel() and pass number as the argument. You should see some numbers appear in your spreadsheet.Then call the .forEach() method on your letters array. Pass an empty callback function which takes a letter parameter.
        createLabel(number);
        letters.forEach((letter) => {
            //In your nested .forEach() call, declare an input variable. Use the .createElement() method of the document object to create an input element. Set the type attribute to text and the id attribute to letter + number.
            const input = document.createElement("input");
            input.type = "text";
            input.id = letter + number;
            //In earlier projects you learned about the setAttribute method.The property names for hyphenated HTML attribute values, such as aria-label, follow camel case, becoming ariaLabel.Set the aria-label attribute for the input element to the same value as the id attribute.
            input.ariaLabel = letter + number;

            //In your window.onload function, you need to tell your input elements to call the update function when the value changes. You can do this by directly setting the onchange property.
            input.onchange = update;
            //Append the input element to your container element as a child.
            container.appendChild(input);
        })
    });
};

//Now you can start using your spreadsheet functions. Begin by declaring an update arrow function. It should take an event parameter.
const update = event => {
    //Since your update event is running as a change event listener, the event parameter will be a change event.The target property of the change event represents the element that changed. Assign the target property to a new variable called element.
    const element = event.target;
    //Because the change event is triggering on an input element, the element will have a value property that represents the current value of the input.Assign the value property of element to a new variable called value, and use .replace() to remove all whitespace.
    const value = element.value.replace(/\s/g, "");

    //Check if the value does not include the id of the element. Create an if condition to do so.//Spreadsheet software typically uses = at the beginning of a cell to indicate a calculation should be used, and spreadsheet functions should be evaluated.Use the && operator to add a second condition to your if statement that also checks if the first character of value is =.
    if (!value.includes(element.id) && value.startsWith('=')) {
        //Inside your if statement, set the value of the element to be the result of your evalFormula() function. Do not pass any arguments yet.//The first argument for your evalFormula call needs to be the contents of the cell (which you stored in value). However, the contents start with an = character to trigger the function, so you need to pass the substring of value starting at index 1.//You can quickly get all cells from your page by getting the #container element by it's id and accessing the children property of the result. Pass that to your evalFormula() call as the second parameter.//Unfortunately, that children property is returning a collection of elements, which is array-like but not an array. Wrap your second argument in Array.from() to convert it to an array.
        element.value = evalFormula(value.slice(1), Array.from(document.getElementById("container").children));
    }
}
