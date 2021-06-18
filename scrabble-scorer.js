// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some scrabble!\n");
  return input.question("Enter a word to score:");
};

function simpleScore(word) {
  return word.length;
}

let vowelBonusPoints = 0;
let vowels = ["A","E","I","O","U"];

function vowelBonusScore(word) {
  word = word.toUpperCase();
  for (let i=0; i<word.length; i++) {
    if (vowels.includes(word[i])) {
    vowelBonusPoints += 3;
    } else {
    vowelBonusPoints += 1;
    }
  }
  return vowelBonusPoints;
}

let scrabbleScoreNumber = 0;

function scrabbleScore(word) {
  for (let i=0; i<word.length; i++) {
    for (letterKeys in newPointStructure) {
      if (word[i] === letterKeys) {
        scrabbleScoreNumber += newPointStructure[letterKeys];
      }
    }
  }
  return scrabbleScoreNumber;
}

const simpleScoreObj = {
  name : "Simple Score",
  description : "Each letter is worth 1 point",
  scoringFunction : simpleScore
};
const bonusVowelsObj = {
  name : "Bonus Vowels",
  description : "Vowels are 3 pts, consonants are 1 pt.",
  scoringFunction : vowelBonusScore
};
const newScrabbleObj = {
  name : "Scrabble",
  description : "The new scoring algorithm",
  scoringFunction : scrabbleScore
};

let scoringAlgorithms = [ simpleScoreObj, bonusVowelsObj, newScrabbleObj ]; 

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?\n");
  console.log("0 - Simple: One point per character");
  console.log("1 - Vowel Bonus: Vowels are worth 3 points");
  console.log("2 - Scrabble: Uses scrabble point system");
  promptNumber = Number(input.question("Enter 0, 1, or 2: "));
  while (promptNumber < 0 || promptNumber > 2) {
    promptNumber = Number(input.question("Enter 0, 1, or 2: "));
  }
  return promptNumber;
};

let newPointStructure = {};

function transform(oldObject) {
  for (numberValue in oldObject) {
    for (let letters of oldObject[numberValue]) {
      newPointStructure[letters.toLowerCase()] = Number(numberValue)
    }
  }
  return newPointStructure;
};

function runProgram() {
    const text = initialPrompt();
    const info = scorerPrompt();
    newPointStructure = transform(oldPointStructure);
    console.log(scoringAlgorithms[info].scoringFunction(text));
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

