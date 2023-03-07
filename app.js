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
app.get('/', function(req, res)
    {
        let query1 = 'SELECT * FROM Games';
        db.pool.query(query1, function(error, rows, fields){
            res.render('index', {data: rows});
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
    })

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
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
