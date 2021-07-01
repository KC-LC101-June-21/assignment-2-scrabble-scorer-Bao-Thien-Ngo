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

//Transform function
function transform(oldPoints) {
  let object = {};
  for (const point in oldPointStructure) {
    let arr = oldPointStructure[point];
    for (let i = 0; i < arr.length; i++) {
      charac = arr[i].toLowerCase();
      object[charac] = point
    }
  }
  return object
};

let newPointStructure = transform(oldPointStructure);

//Ask the user to enter the word
function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let word = input.question("Enter a word to score: ");
   return word
};

//simpleScore method
let simpleScore = function(word) {
  let score = word.length;
  return score
};

//vowelBonusScore method
let vowelBonusScore = function(word) {
  let vowel = ['U','E','O','A','I'];
  word = word.toUpperCase();
  let score = 0;
  for (let i =0; i < word.length; i++) {
    if (vowel.includes(word[i])) {
      score += 3
    } else {
      score += 1
    }
  }
  return score
};

//scrabbleScore method
let scrabbleScore = function(word) {
  word = word.toLowerCase();
	let score = 0;
	for (let i = 0; i < word.length; i++) {
    for (const pointValue in newPointStructure) {
      if (pointValue === word[i]) {
        score += Number(newPointStructure[pointValue])
      }
    }
	}
	return score;
};

//Simple Score object
let simscore = {
  name:"Simple Score",
  description: "Each letter is worth 1 point.",
  scoringFunction: function(word) {return simpleScore(word)}
}

//Bonus Vowels object
let bovowels = {
  name:"Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoringFunction: function(word) {return vowelBonusScore(word)}
}

//Scrabble object
let scrascore = {
  name:"Scrabble",
  description: "The traditional scoring algorithm.",
  scoringFunction: function(word) {return scrabbleScore(word)}
}

const scoringAlgorithms = [simscore,bovowels,scrascore];

function scorerPrompt(word) {
  console.log("Which scoring algorithm would you like to use?\n")
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`)
  }
  let value = input.question("Enter 0, 1, or 2: ");
  while (Number(value) != 0 || Number(value) != 1 || Number(value) != 2) {
    if (Number(value) == 0) {
      console.log(`Score for '${word}': ${scoringAlgorithms[0].scoringFunction(word)}`)
      break;
    } else if (Number(value) == 1) {
      console.log(`Score for '${word}': ${scoringAlgorithms[1].scoringFunction(word)}`)
      break;
    } else if (Number(value) == 2){
      console.log(`Score for '${word}': ${scoringAlgorithms[2].scoringFunction(word)}`)
      break;
    }
    value = input.question("Enter the number in range 0, 1, or 2: ");
  }
}

//Main function
function runProgram() {
  let charac = initialPrompt();  
  scorerPrompt(charac);
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

/*
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
*/