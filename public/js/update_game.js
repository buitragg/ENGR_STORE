// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-game-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("mySelect");
    let inputgenre= document.getElementById("input-genre-update");

    // Get the values from the form fields
    let gameNameValue = inputName.value;
    let genreValue = inputgenre.value;


    // Put our data we want to send in a javascript object
    let data = {
        game_name: gameNameValue,
        genre_id: genreValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-game-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, gameNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, gameID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("game-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == gameID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[5];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].genre_name; 
       }
    }
}


// updates drop down when a game is deleted
function deleteRow(gameID){

    let table = document.getElementById("game-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == gameID) {
            table.deleteRow(i);
            deleteDropDownMenu(gameID);
            break;
       }
    }
}


function deleteDropDownMenu(gameID){
  let selectMenu = document.getElementById("mySelect");
  for (let i = 0; i < selectMenu.length; i++){
    if (Number(selectMenu.options[i].value) === Number(gameID)){
      selectMenu[i].remove();
      break;
    } 

  }
}
