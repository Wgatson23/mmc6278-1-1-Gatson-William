const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    try{
    // Read text file
    const data = await fs.readFile(`./${QUOTE_FILE}`, { encoding: 'utf-8' });
   //split lines and filter empty lines 
    const quotes = data.split('\n');
    const nonEmptyQuotes = quotes.filter(quote => quote.trim() !== '');
if (nonEmptyQuotes.length === 0) {
  console.log(chalk.red.italic("No quotes found"));
  return;
}
    // select random quote
    const randomQuote = nonEmptyQuotes[Math.floor(Math.random() *nonEmptyQuotes.length)];
    //split the author
    const [quote, author] = randomQuote.split('|');
    // console log the quote and author
    console.log(chalk.grey.bold(quote.trim()));
    console.log(chalk.grey.italic('by'), chalk.grey.italic(author || "Anonymous"));
  } catch (err) {
    console.error(chalk.red.italic("Error", err.message));
    }
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    try {
    // Add the quote and author to the quotes file
    // If no author is provided, save the author as "Anonymous".
    const newQuote = `${quote.trim()} | ${author} || "Anonymous"`;
    //add the new quote to file
    await fs.appendFile(QUOTE_FILE, newQuote + `\n`);
    // alert the user that the quote was added.
    console.log(chalk.grey.italic('Quote added to file!'));
    } catch (err) {
    console.error(chalk.red.italic("Error, try again!", err.message));
    }
  });

program.parse();