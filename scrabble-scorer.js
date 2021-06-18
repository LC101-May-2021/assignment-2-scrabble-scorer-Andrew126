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


function vowelBonusScore(word) {
  let vowelBonusPoints = 0;
  let vowels = ["A","E","I","O","U"];
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



function scrabbleScore(word, structure) {
  let scrabbleScoreNumber = 0;
  for (let i=0; i<word.length; i++) {
    scrabbleScoreNumber += structure[word[i].toLowerCase()];
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

function transform(oldObject) {
  let newPointStructure = {};
  for (let numberValue in oldObject) {
    let letters = oldObject[numberValue];
    for (let i=0; i<letters.length; i++) {
      newPointStructure[letters[i].toLowerCase()] = Number(numberValue);
    }
  }
  return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
    const text = initialPrompt();
    const info = scorerPrompt();
    console.log(scoringAlgorithms[info].scoringFunction(text, newPointStructure));
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

