const prompt = require("prompt-sync")(); // Import the prompt-sync package

// Function to get user input and validate it
function getUserChoice() {
  let choice = prompt(
    "Enter your choice (ROCK, PAPER, or SCISSORS): "
  ).toUpperCase();

  // Validate input
  while (!["ROCK", "PAPER", "SCISSORS"].includes(choice)) {
    console.log("Invalid input! Please enter ROCK, PAPER, or SCISSORS.");
    choice = prompt(
      "Enter your choice (ROCK, PAPER, or SCISSORS): "
    ).toUpperCase();
  }

  return choice;
}

// Function to generate a random choice for the computer
function getComputerChoice() {
  const randomNumber = Math.random();
  if (randomNumber <= 0.34) return "PAPER";
  else if (randomNumber <= 0.67) return "SCISSORS";
  else return "ROCK";
}

// Function to determine the winner
function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "It's a tie!";
  } else if (
    (userChoice === "ROCK" && computerChoice === "SCISSORS") ||
    (userChoice === "SCISSORS" && computerChoice === "PAPER") ||
    (userChoice === "PAPER" && computerChoice === "ROCK")
  ) {
    return "User Wins!";
  } else {
    return "Computer Wins!";
  }
}

// Main function to run the game
function playGame() {
  const userChoice = getUserChoice();
  const computerChoice = getComputerChoice();

  console.log(`User selected: ${userChoice}`);
  console.log(`Computer selected: ${computerChoice}`);

  const result = determineWinner(userChoice, computerChoice);
  console.log(result);
}

// Start the game
playGame();
