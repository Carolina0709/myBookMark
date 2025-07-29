import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "bookmark",
  password: "root",
  port: 5432,
});
db.connect();

app.use(async (req, res, next) => {
    try {
        const result = await db.query("SELECT category FROM book");
        res.locals.categories = result.rows;
        next();
    } catch (error) {
        console.log(error);
        next(error)
    }
});


app.get("/", async (req, res) => {
    try {
        const books = await db.query("SELECT * FROM book");
        res.render("index.ejs", {books: books.rows});
    } catch (error) {
        console.log(error);
        res.render("index.ejs", {error: "Failed to load the books"});
    }
    
    
});

app.get("/create", async (req, res) => {
    res.render("create.ejs");
});

app.get("/see/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const book = await db.query("SELECT * FROM book WHERE id = $1", [id]); 
        const quotes = await db.query("SELECT * FROM quote WHERE book_id = $1", [id]);

        res.render("see.ejs", {book: book.rows[0], quotes: quotes.rows});
    } catch (error) {
        console.log(error);
        res.render("see.ejs", {error: "No such information found" + id});
    }
});

app.get("/createQuote/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const book = await db.query("SELECT * FROM book WHERE id = $1", [id]);

        if (book.rows.length === 0) {
            return res.render("createQuote.ejs", { error: "Book not found" });
        }

        res.render("createQuote.ejs", { book: book.rows[0] });
    } catch (error) {
        console.log(error);
        res.render("createQuote.ejs", { error: "Something went wrong" });
    }
});

app.get("/editBook/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const book = await db.query("SELECT * FROM book WHERE id = $1", [id]); 
        console.log(book.rows[0]);
        
        
        res.render("editBook.ejs", {book: book.rows[0]});
    } catch (error) {
        console.log(error);
        res.render("see.ejs", {error: "No book found" + id});
    }
});

app.post("/editBook/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const bookQuery = await db.query("SELECT * FROM book WHERE id = $1", [id]);
        const currentBook = bookQuery.rows[0];
        
        if (!currentBook) {
            return res.status(404).send("Book not found");
        }

        const title = req.body.title || currentBook.title;
        const author = req.body.author || currentBook.author;
        const isbn = req.body.isbn || currentBook.isbn;
        const category = req.body.category || currentBook.category;
        const date_read = req.body.date_read || currentBook.date_read;
        const rate = req.body.rate || currentBook.rate;
        const summary = req.body.summary || currentBook.summary;

        await db.query(
        `UPDATE book 
        SET title = $1, author = $2, isbn = $3, category = $4, date_read = $5, rate = $6, summary = $7 
        WHERE id = $8`,
        [title, author, isbn, category, date_read, rate, summary, id]
        );

        
        res.redirect(`/see/${id}`)
    } catch (error) {
        console.log(error);
        res.render("editBook.ejs", { error: "No book found " + id });
    }
});

app.post("/create", async (req, res) => {
    let {title, author, isbn, category, date_read, rate, summary} = req.body;
    
    try {
        await db.query("INSERT INTO book (title, author, isbn, category, date_read, rate, summary) VALUES ($1, $2, $3, $4, TO_DATE($5, 'YYYY-MM-DD'), $6, $7 )", 
            [title, author, isbn, category, date_read, rate, summary]
        );
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.render("create.ejs", {error: "Failed to create the book"});
    }
});

app.post("/createQuote", async (req, res) => {
    let {book_id, quote} = req.body;
    
    try {
        await db.query("INSERT INTO quote (quote, book_id) VALUES ($1, $2)", 
            [quote, book_id]
        );
        
        res.redirect(`/see/${book_id}`);
    } catch (error) {
        console.log(error);
        res.render("createQuote.ejs", {error: "Failed to create the quote"});
    }
});


app.post("/category", async (req, res) => {
    const category = req.body.category;

    if (category === 'all') {
        res.redirect("/");
    }else{
        const booksByCategory = await db.query("SELECT * FROM book WHERE category = $1", [category]);
        res.render("index.ejs", {books: booksByCategory.rows});
    }

    
});


app.get("/deleteQuote", async (req, res) => {
    const quoteId = req.query.quoteId;
    const bookId = req.query.bookId;

    try {
        await db.query("DELETE FROM quote WHERE id = $1", [quoteId]);
        res.redirect(`/see/${bookId}`);
    } catch (error) {
        console.log(error);
        res.send("Error deleting quote");
    }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
