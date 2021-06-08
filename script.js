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
  lowerCase: {
    name: "lower case", 
    data: "abcdefghijklmnopqrstuvwxyz"
  },
  upperCase: {
    name: "upper case",
    data: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  },
  special: {
    name: "special",
    data: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
  }, 
  numeric: {
    name: "numeric",
    data: "1234567890"
  } 
};

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

// generate password of length n
function generatePasswordOfLength(passwordLength){
  let result = "";
  let availableChars = "";
  let chosenCharTypes = createStateObject(charLists);
  chosenCharTypes = getChosenCharTypes(chosenCharTypes);



  for (let i in chosenCharTypes){
    if (chosenCharTypes[i]){
      availableChars += charLists[i];
    };
  };

  for (let i in chosenCharTypes){
    if (chosenCharTypes[i]){
      result += getRandomChar(charLists[i].data);
    };
  };
  

  if (result === ""){   // need to catch if they didn't pick anything
    window.alert("You must select least one type of characters!");
    // generateCharPool();
  } 
  // pick more characters from the consolidated pool to get to the required length
  let charLeftToSelect = passwordLength - result.length;
  for (let i of Array(charLeftToSelect).keys()) {
    result += getRandomChar(availableChars);
  }
  return shuffleString(result)
};

// create an object with properties from another object with all values set to false
function createStateObject(object){
  let result = Object.create(object);
  for (let prop in result) {
    result[prop] = false;
  };
  return result;
}

// ask user to pick which character set they want in their password
function getChosenCharTypes(chosenCharTypes) {
  // assume that chosenCharTypes have the same properties as charLists
  let result = Object.create(chosenCharTypes);
  for (let option in chosenCharTypes) { 
    let charSetToChoose = charLists[option];
    let include = window.confirm("Would you like at least one " + charSetToChoose.name + " character?");
    result[option] = include? true : false;
  };
  
  if (Object.values(result).includes(true)) {
    return result;
  } else { // catch if the user didn't select any character types
    window.alert("You must select least one type of characters!");
  } 
}


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

// shuffle string
function shuffleString(str) {
  let shuffled = str.split("").sort(function (){return 0.5- Math.random()}).join("");
  return shuffled;
}