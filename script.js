// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//------------------------------------------
// Generate password based on user inputs

// character lists
const charLists = {
  "lower case": {
    name: "lower case", 
    data: "abcdefghijklmnopqrstuvwxyz"
  },
  "upper case": {
    name: "upper case",
    data: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  },
  "special": {
    name: "special",
    data: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
  }, 
  "numeric": {
    name: "numeric",
    data: "1234567890"
  } 
}
const charOptions = ["lower case", "upper case", "special", "numeric"];

// main function to generate password
function generatePassword() {
  let passwordLength = getPasswordLength();
  if (passwordLength !== null){
    return generatePasswordOfLength(passwordLength);
  } else { // cancel is pressed
    return "";
  }
}

// get password length
//   - it will repeat the request if the user input is not an integer between 8 and 128
//   - if they click cancel, it will return null
function getPasswordLength() {
  let result = window.prompt("Please enter the length of your password between 8 and 128");
  if (result === null) {
    return result;
  } else if (isValidPasswordLength(result)) {
    return parseInt(result);
  } else {
    window.alert("This is not an integer between 8 and 128!")
    getPasswordLength()
  }
};

// boolean to generate acceptable password length
function isValidPasswordLength(text) {
  if (!isNaN(text) && text >= 8 && text <= 128){ 
    return (parseFloat(text) === Math.floor(parseFloat(text)));  // must be an integer
  } else {
    return false;
  }
}; 






// pick a char at random from a pool
// return
//  - a random char from a pool
//  - null otherwise
function getRandomChar(pool) {
  if (typeof pool === "string") {
    let index = Math.floor(Math.random() * pool.length);
    return pool.charAt(index);
  } else {
    return null;
  }
}

// from pool name
// return 
//  - a random character from that pool; and 
//  - a character pool of that name
let includeCharPool = function (poolName) {
  let include = window.confirm("Would you like at least one " + poolName + " character?");
  if (include) {
    let char = getRandomChar(charLists[poolName].data);
    return [char, charLists[poolName].data];
  } else {
    return ["", ""];
  }
}

// generate Character Pool 
let generateCharPool = function () {
  result = ["", ""];
  for (let option of charOptions) {
    let charToAdd = includeCharPool(option);
    result[0] += charToAdd[0];
    result[1] += charToAdd[1];
  }
  if (result[0] === ""){   // need to catch if they didn't pick anything
    window.alert("You must select least one type of characters!");
    generateCharPool();
  } else {
    return  result;
  }
}

// shuffle string
function shuffleString(str) {
  let shuffled = str.split("").sort(function (){return 0.5- Math.random()}).join("");
  return shuffled;
}

// generate password of length n
let generatePasswordOfLength = function(passwordLength) {
  
  let charPool = generateCharPool(); // [temporary password, character pool to choose from]
  let result = charPool[0];
  let charLeftToSelect = passwordLength - result.length;
  
  // pick more characters from the consolidated pool to get to the required length
  for (let i of Array(charLeftToSelect).keys()) {
    result += getRandomChar(charPool[1]);
  }
  return shuffleString(result)
}

