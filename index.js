const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program.name("quotes").description("CLI tool for inspiration").version("0.1.0");

program
	.command("getQuote")
	.description("Retrieves a random quote")
	.action(async () => {
		try {
			// Read text file
			const data = await fs.readFile(`./${QUOTE_FILE}`, { encoding: "utf-8" });
			// Split lines and filter empty lines
			const quotes = data.split("\n").filter((quote) => quote.trim() !== "");
			if (quotes.length === 0) {
				console.log(chalk.red.italic("No quotes found"));
				return;
			}
			// Select random quote
			const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
			// Split the quote and author
			const [quote, author] = randomQuote.split("|");
			// Console log the quote and author
			console.log(chalk.grey.bold(quote.trim()));
			console.log(
				chalk.grey.italic("by"),
				chalk.grey.italic(author || "Anonymous")
			);
		} catch (err) {
			console.error(chalk.red.italic("Error:", err.message));
		}
	});

program
	.command("addQuote <quote> [author]")
	.description("Adds a quote to the quote file")
	.action(async (quote, author) => {
		try {
			// Add the quote and author to the quotes file
			// If no author is provided, save the author as "Anonymous".
			const newQuote = `${quote.trim()} | ${author || "Anonymous"}`;
			// Add the new quote to the file
			await fs.appendFile(QUOTE_FILE, newQuote + "\n");
			// Alert the user that the quote was added.
			console.log(chalk.grey.italic("Quote added to file!"));
		} catch (err) {
			console.error(chalk.red.italic("Error, try again!", err.message));
		}
	});

program.parse();
