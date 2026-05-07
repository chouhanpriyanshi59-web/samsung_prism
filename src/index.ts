import * as fs from "fs";
import * as path from "path";
import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import chalk from "chalk";

const rl = readline.createInterface({ input, output });

const baseDir = process.cwd();
const memoryDir = path.join(baseDir, "memory");
const peopleDir = path.join(memoryDir, "people");
const decisionsFile = path.join(memoryDir, "decisions.md");
const tasksFile = path.join(memoryDir, "tasks.md");

function banner() {
  console.clear();
  console.log(chalk.cyan("===================================="));
  console.log(chalk.cyan.bold("           COLLAB MESH"));
  console.log(chalk.cyan("===================================="));
  console.log(chalk.gray("A shared team memory for decisions, tasks, and people"));
  console.log("");
}

function menu() {
  banner();
  console.log(chalk.yellow("1) Save decision"));
  console.log(chalk.yellow("2) Save task"));
  console.log(chalk.yellow("3) Show recent memory"));
  console.log(chalk.yellow("4) Open person memory"));
  console.log(chalk.yellow("5) Search memory"));
  console.log(chalk.yellow("0) Exit"));
  console.log("");
  rl.question(chalk.green("Choose an option: "), handleMenu);
}

function appendLine(filePath: string, speaker: string, text: string) {
  const time = new Date().toISOString();
  const entry = `\n- [${time}] ${speaker}: ${text}\n`;
  fs.appendFileSync(filePath, entry, "utf8");
}

function appendPersonLine(name: string, text: string) {
  const filePath = path.join(peopleDir, `${name.toLowerCase()}.md`);
  const time = new Date().toISOString();
  const entry = `\n- [${time}] ${text}\n`;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.appendFileSync(filePath, entry, "utf8");
}

function readRecent(filePath: string, label: string) {
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red(`${label}: no file yet`));
    return;
  }

  const content = fs.readFileSync(filePath, "utf8").trim();
  if (!content) {
    console.log(chalk.red(`${label}: empty`));
    return;
  }

  const lines = content.split(/\r?\n/).filter(Boolean);
  const recent = lines.slice(-5);

  console.log(chalk.cyan(`\n${label}:`));
  for (const line of recent) {
    console.log(line);
  }
}

function readPerson(name: string) {
  const filePath = path.join(peopleDir, `${name.toLowerCase()}.md`);

  if (!fs.existsSync(filePath)) {
    console.log(chalk.red(`No memory found for ${name}`));
    return;
  }

  const content = fs.readFileSync(filePath, "utf8").trim();
  if (!content) {
    console.log(chalk.red(`${name}'s file is empty`));
    return;
  }

  const lines = content.split(/\r?\n/).filter(Boolean);
  const recent = lines.slice(-10);

  console.log(chalk.cyan(`\nMemory for ${name}:`));
  for (const line of recent) {
    console.log(line);
  }
}

function searchMemory(keyword: string) {
  const term = keyword.toLowerCase();
  const results: string[] = [];

  function scanFile(filePath: string, label: string) {
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split(/\r?\n/);

    lines.forEach((line, i) => {
      if (line.toLowerCase().includes(term)) {
        results.push(chalk.cyan(`\n# ${label}`));
        if (i > 0 && lines[i - 1].trim()) {
          results.push(`${String(i).padStart(3, " ")} | ${lines[i - 1]}`);
        }
        results.push(chalk.green(`${String(i + 1).padStart(3, " ")} | ${line}`));
        if (i < lines.length - 1 && lines[i + 1].trim()) {
          results.push(`${String(i + 2).padStart(3, " ")} | ${lines[i + 1]}`);
        }
        results.push(chalk.gray("----"));
      }
    });
  }

  scanFile(decisionsFile, "decisions.md");
  scanFile(tasksFile, "tasks.md");

  if (fs.existsSync(peopleDir)) {
    const files = fs.readdirSync(peopleDir);
    for (const file of files) {
      if (file.endsWith(".md")) {
        scanFile(path.join(peopleDir, file), `people/${file}`);
      }
    }
  }

  if (results.length === 0) {
    console.log(chalk.red(`No matches found for "${keyword}"`));
    return;
  }

  console.log(chalk.cyan(`\nSearch results for "${keyword}":`));
  for (const line of results.slice(0, 60)) {
    console.log(line);
  }
}

function askForEntry(kind: "decision" | "task") {
  rl.question(chalk.green(`Type: Name | ${kind}: ... : `), (answer) => {
    const text = answer.trim();
    const parts = text.split("|");

    if (parts.length < 2) {
      console.log(chalk.red("Please use: Name | decision: ... OR Name | task: ..."));
      return menu();
    }

    const speaker = parts[0].trim();
    const message = parts.slice(1).join("|").trim();
    const normalizedMessage = message.replace(/\s+/g, " ");

    if (kind === "decision" && normalizedMessage.toLowerCase().startsWith("decision:")) {
      const clean = normalizedMessage.slice("decision:".length).trim();
      appendLine(decisionsFile, speaker, clean);
      appendPersonLine(speaker, `decision: ${clean}`);
      console.log(chalk.green("Saved to memory/decisions.md and memory/people/"));
    } else if (kind === "task" && normalizedMessage.toLowerCase().startsWith("task:")) {
      const clean = normalizedMessage.slice("task:".length).trim();
      appendLine(tasksFile, speaker, clean);
      appendPersonLine(speaker, `task: ${clean}`);
      console.log(chalk.green("Saved to memory/tasks.md and memory/people/"));
    } else {
      console.log(chalk.red(`Please start your message with ${kind}:`));
    }

    menu();
  });
}

function handleMenu(choice: string) {
  const picked = choice.trim();

  if (picked === "1") {
    askForEntry("decision");
    return;
  }

  if (picked === "2") {
    askForEntry("task");
    return;
  }

  if (picked === "3") {
    readRecent(decisionsFile, "Recent decisions");
    readRecent(tasksFile, "Recent tasks");
    rl.question(chalk.gray("\nPress Enter to return to menu..."), () => menu());
    return;
  }

  if (picked === "4") {
    rl.question(chalk.green("Enter person name: "), (name) => {
      readPerson(name.trim());
      rl.question(chalk.gray("\nPress Enter to return to menu..."), () => menu());
    });
    return;
  }

  if (picked === "5") {
    rl.question(chalk.green("Enter keyword to search: "), (keyword) => {
      searchMemory(keyword.trim());
      rl.question(chalk.gray("\nPress Enter to return to menu..."), () => menu());
    });
    return;
  }

  if (picked === "0") {
    console.log(chalk.gray("Goodbye."));
    rl.close();
    return;
  }

  console.log(chalk.red("Please choose 0, 1, 2, 3, 4, or 5."));
  menu();
}

menu();