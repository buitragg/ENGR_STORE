/*
    SETUP
*/

// Express

var express = require('express');
var app = express();
PORT = 4014;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))



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
    !!GENRE Routes
*/
app.get('/genres', function(req, res)
    {
        let query1 = "SELECT * from Genres";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('genres', {data: rows});                  // Render the index.hbs file, and also send the renderer
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
    !!Companies Routes
*/
// app.js - ROUTES section

//get

app.get('/companies', function(req, res)
    {
        let query1 = "SELECT * from Companies";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('companies', {data: rows});                  // Render the index.hbs file, and also send the renderer
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

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
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

            res.render('customers', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });

    app.post('/add-customer-form', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        // Create the query and run it on the database
        query1 = `INSERT INTO Customers (contact_name, email, phone_number, birthdate, sign_up_date, total_purchases) VALUES ('${data['input-name']}', '${data['input-email']}', '${data['input-number']}', '${data['input-birthday']}', '${data['input-signdate']}', '${data['input-purchases']}')`;
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
    !!Transactions Routes
*/
app.get('/transactions', function(req, res)
    {
        let query1 = "SELECT * from Transactions";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('transactions', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });
/*

/*
    !!Transaction Details Routes
*/
app.get('/transaction_details', function(req, res)
    {
        let query1 = "SELECT * from TransactionDetails";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('transaction_details', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });
/*

/*
    !!Companies and Games Routes
*/
app.get('/companies_and_games', function(req, res)
    {
        let query1 = "SELECT * from CompaniesAndGames";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('companies_and_games', {data: rows});                  // Render the index.hbs file, and also send the renderer
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

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
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
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.gname === undefined)
    {
        query1 = "SELECT * FROM Games;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Games WHERE game_name LIKE "${req.query.gname}%"`
    }

    let query2 = "SELECT * FROM Genres;";

    db.pool.query(query1, function(error, rows, fields){

        let game = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {

            // Save the planets
            let genres = rows;

            return res.render('index', {data: game, genres: genres});
        })
    })
});

app.post('/add-game-form', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;


        // Create the query and run it on the database
        query1 = `INSERT INTO Games (game_name, release_year, price, inventory, genre_id) VALUES ('${data['input-gname']}', '${data['input-year']}', '${data['input-price']}', '${data['input-inventory']}', '${data['input-genre']}')`;
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
    let gameID = parseInt(data.id);
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

    let genre = parseInt(data.genre);
    let game = parseInt(data.game);

    let queryUpdateGenre = `UPDATE Games SET genre = ? WHERE Games.game_id = ?`;
    let selectgenre = `SELECT * FROM Genres WHERE genre_id = ?`;

          // Run the 1st query
          db.pool.query(queryUpdateGenre, [genre, game], function(error, rows, fields){
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
