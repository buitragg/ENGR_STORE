/*
    SETUP
*/

// Express

var express = require('express');
var app = express();
PORT = 4015;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.static('js'))



// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

/*
    !!HomeRoutes
*/
// app.js

app.get('/home', function(req, res)
    {
        res.render('home');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });                                         // will process this file, before sending the finished HTML to the client.

/*


/*
    !!GENRE Routes
*/
app.get('/genres', function(req, res)
    {
        let query1 = "SELECT * from Genres";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('genres', {data: rows});                  // Render the genres.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });

//post for adding genre
app.post('/add-genre-form', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        let description = parseInt(data['input-description']);
        if (isNaN(description))
        {
            description = 'NULL'
        }

        // Create the query and run it on the database
        query1 = `INSERT INTO Genres (genre_name, description) VALUES ('${data['input-genre']}', '${data['input-description']}')`;
        db.pool.query(query1, function(error, rows, fields){

            // Check to see if there was an error
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Genres and
            // presents it on the screen
            else
            {
                res.redirect('/');
            }
        })
 })
/*

/*
    !!Companies Routes
*/

//get

app.get('/companies', function(req, res)
    {
        let query1 = "SELECT * from Companies";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('companies', {data: rows});                  // Render the companies.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });


app.post('/add-company-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Companies (company_name) VALUES ('${data['input-company']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Companiesand
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
})

// post for adding company

// app.js

app.post('/add-company-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Companies (company_name) VALUES ('${data['input-company']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
})
/*



/*
    !!Customers Routes
*/
app.get('/customers', function(req, res)
    {
        let query1 = "SELECT * from Customers";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('customers', {data: rows});                  // Render the customers.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });

app.post('/add-customer-form', function(req, res){
       // Declare Query 1
    let query1 = "SELECT * FROM Transactions;";

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Customers;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let transaction = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let customer = rows;
            return res.render('index', {data: transaction, customer: customer});
        })
    })
});
/*

/*
    !!Transactions Routes
*/
app.get('/transactions', function(req, res){
    let query1 = "SELECT * FROM Transactions;";

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Customers;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let transactions = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let customers = rows;

             // BEGINNING OF NEW CODE
 
             // Construct an object for reference in the table
             // Array.map is awesome for doing something with each
             // element of an array.
             let customermap = {}
             customers.map(customer => {
                 let id = parseInt(customer.customer_id, 10);
 
                 customermap[id] = customer["contact_name"];
             })
 
             // Overwrite the homeworld ID with the name of the planet in the people object
             transactions = transactions.map(transaction => {
                 return Object.assign(transaction, {customer_id: customermap[transaction.customer_id]})
             })
 
             // END OF NEW CODE
 
             return res.render('transactions', {data: transactions, customers: customers});
        })                                                    // an object where 'data' is equal to the 'rows' we
    }) 
});




//add transaction route 

app.post('/add-transaction-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Transactions (customer_id, transaction_date, payment_method) VALUES ('${data['input-customer']}', '${data['input-date']}', '${data['input-payment']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
})

/*

/*
    !!Transaction Details Routes
*/
app.get('/transaction_details', function(req, res)
    {
            // Declare Query 1
    let query1 = "SELECT * FROM TransactionDetails;";

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Games;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the transactions
        let transaction = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the games
            let games = rows;

            // Construct an object for reference in the table
            // Array.map is awesome for doing something with each
            // element of an array.
            let gamemap = {}
            games.map(game => {
                let id = parseInt(game.game_id, 10);

                gamemap[id] = game["game_name"];
            })

           transaction = transaction.map(transactions => {
                return Object.assign(transactions, {game_id: gamemap[transactions.game_id]})
            })

            // END OF NEW CODE
            return res.render('transaction_details', {data: transaction, games: games});
        })                 // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });

//post for trasnaction details 
app.post('/add-detail-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO TransactionDetails (transaction_id, game_id, orderQTY, price, linetotal) VALUES ('${data['input-transaction']}', '${data['input-game']}', ${data['input-quantity']}, ${data['input-price']},${data['input-total']})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM TransactionDetails and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
})
/*

/*
    !!Companies and Games Routes
*/
app.get('/companies_and_games', function(req, res)
    {
        let query1 = "SELECT * FROM CompaniesAndGames";  // Define our query

        let query2 = "Select * FROM Games"

        let query3 ="Select * FROM Companies"

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            let com_games = rows;

            db.pool.query(query2, (error,rows,fields) =>{

                let games = rows;

                db.pool.query(query3, (error,rows, fields) => {
                    let companies = rows;

                    return res.render('companies_and_games', {data:com_games, games:games, companies : companies})
                })
            });                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });

// post for adding company and games

app.post('/add-c&g-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO CompaniesAndGames (game_id, company_id) VALUES ('${data['input-game']}', '${data['input-company']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM CompaniesAndGames and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
})


/*

    !!GAMES Routes
*/
app.get('/', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.genre === undefined)
    {
        query1 = "SELECT * FROM Games;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Games WHERE genre_id LIKE "${req.query.genre}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Genres;";``

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let games = rows;
        
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let genres = rows; 

            // BEGINNING OF NEW CODE

            // Construct an object for reference in the table
            // Array.map is awesome for doing something with each
            // element of an array.
            let planetmap = {}
            genres.map(genre => {
                let id = parseInt(genre.genre_id, 10);

                planetmap[id] = genre["genre_name"];
            })

            // Overwrite the homeworld ID with the name of the planet in the people object
            games = games.map(game => {
                return Object.assign(game, {genre_id: planetmap[game.genre_id]})
            })

             // END OF NEW CODE

             return res.render('index', {data: games, genres:genres});
        
        })

           
    })
});                                                  

// app.js

app.post('/add-game-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    query1 = `INSERT INTO Games (game_name, release_year, price, inventory, genre_id) VALUES ('${data['input-game_name']}', '${data['input-release_year']}', '${data['input-price']}', '${data['input-inventory']}', '${data['input-genre']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
});

// Delete function
app.delete('/delete-game-ajax/', function(req,res,next){
    let data = req.body;
    let gameID = parseInt(data.game_id);
    let deleteGame = `DELETE FROM Games WHERE game_id = ?`;


          // Run the 1st query
          db.pool.query(deleteGame, [gameID], function(error, rows, fields){
              if (error) {

              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }

              else
              {

                          res.sendStatus(204);
                      }


})});


//update
app.put('/put-game-ajax', function(req,res,next){
    let data = req.body;

    let genre = parseInt(data.genre_id);
    let game_name = parseInt(data.game_name);

    let queryUpdateGenre = `UPDATE Games SET genre_id = ? WHERE Games.game_id = ?`;
    let selectgenre = `SELECT * FROM Genres WHERE genre_id = ?`;

          // Run the 1st query
          db.pool.query(queryUpdateGenre, [genre, game_name], function(error, rows, fields){
              if (error) {

              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }

              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectgenre, [genre], function(error, rows, fields) {

                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});



/*
   !! LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
