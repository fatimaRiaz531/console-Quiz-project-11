#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log("=".repeat(60));
console.log("^^^^^^^^^^Welcome to code with fatima^^^^^^^^^^^");
console.log("=".repeat(60));
const apiLink = "https://opentdb.com/api.php?amount=6&category=27&difficulty=easy&type=multiple&encode=url3986";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(apiLink);
let startQuiz = async () => {
    let score = 0;
    // for user name
    let name = await inquirer.prompt({
        type: "input",
        name: "fname",
        message: "What is your name?"
    });
    for (let index = 1; index <= 5; index++) {
        let anwers = [...data[index].incorrect_answers, data[index].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[index].question,
            choices: anwers.map((val) => val),
        });
        if (ans.quiz == data[index].correct_answer) {
            ++score;
            console.log(chalk.bold.italic.blue("Correct"));
        }
        else {
            console.log(`correct answer is ${chalk.bold.italic.red(data[index].correct_answer)}`);
        }
    }
    console.log(`Dear ${chalk.green.bold(name.fname)}, your score is ${chalk.red.bold(score)} out of ${chalk.red.bold("5")}`);
};
startQuiz();
