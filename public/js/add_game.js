


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
    let NameCell = document.createElement("TD");
    let releaseyearCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let inventoryCell = document.createElement("TD");
    let genreCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.id;
    NameCell.innerText = newRow.game_name;
    releaseyearCell.innerText = newRow.release_year;
    priceCell.innerText = newRow.price;
    inventoryCell.innerText = newRow.inventory;
    genreCell.innerText = newRow.genre_id;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteGame(newRow.id);
    };


    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(NameCell);
    row.appendChild(releaseyearCell);
    row.appendChild(priceCell);
    row.appendChild(inventoryCell);
    row.appendChild(genreCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.game_name;
    option.value = newRow.id;
    selectMenu.add(option);
    // End of new step 8 code.
}