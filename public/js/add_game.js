// Get the objects we need to modify
let addPersonForm = document.getElementById('add-game-form-ajax');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputGameName = document.getElementById("input-game_name");
    let inputRelease = document.getElementById("input-release_year");
    let inputPrice = document.getElementById("input-price");
    let inputInventory = document.getElementById("input-inventory");
    let inputGenre = document.getElementById("input-genre_id");

    // Get the values from the form fields
    let GameNameValue = inputGameName.value;
    let ReleaseValue = inputRelease.value;
    let PriceValue = inputPrice.value;
    let InventoryValue = inputInventory.value;
    let GenreValue = inputGenre.value;

    // Put our data we want to send in a javascript object
    let data = {
        game_name: GameNameValue,
        release_year: ReleaseValue,
        price: PriceValue,
        inventory: InventoryValue,
        genre_id: GenreValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-game-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 5 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputGameName.value = '';
            inputRelease.value = '';
            inputPrice.value = '';
            inputInventory.value = '';
            inputGenre.value = '';
        }
        else if (xhttp.readyState == 5 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("game-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let GameNameCell = document.createElement("TD");
    let ReleaseCell = document.createElement("TD");
    let PricedCell = document.createElement("TD");
    let InventoryCell = document.createElement("TD");
    let GenreCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.game_id;
    GameNameCell.innerText = newRow.game_name;
    ReleaseCell.innerText = newRow.release_year;
    PricedCell.innerText = newRow.price;
    InventoryCell.innerText = newRow.inventory;
    GenreCell.innerText = newRow.genre_id;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(GameNameCell);
    row.appendChild(ReleaseCell);
    row.appendChild(PricedCell);
    row.appendChild(InventoryCell);
    row.appendChild(GenreCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}

