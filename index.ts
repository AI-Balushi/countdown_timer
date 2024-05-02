import inquirer from "inquirer";
import chalk from "chalk";

const res = await inquirer.prompt({
    type: "number",
    name: "userInput",
    message: "Please Enter the amount of seconds:",
    validate: (input) => {
        if (isNaN(input)) {
            return "Please enter a valid number";
        } else if (input > 60) {
            return "Seconds must be less than or equal to 60";
        } else {
            return true;
        }
    }
});

const input = res.userInput;

function startTime(val: number) {
    const inTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(inTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.red.bold("Time has expired"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(chalk.green(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
    }, 1000);
}

startTime(input);

function differenceInSeconds(date1: Date, date2: Date) {
    return Math.floor((date1.getTime() - date2.getTime()) / 1000);
}
