-- Creates customers tables
CREATE OR REPLACE TABLE Customers(
    customer_id int not Null auto_increment, -- Primary key
    contact_name varchar(45) not Null,
    email varchar(100) not Null,
    phone_number varchar(20),
    birthdate date,
    sign_up_date date not Null, 
    total_purchases int(11),
    Primary Key (customer_id) 
);

INSERT INTO Customers (contact_name, email, phone_number, birthdate, sign_up_date, total_purchases) VALUES
('Gian Buitrago', 'gb@hello.com', '123-456-8972', '1990-01-01', '2010-01-01', 2),
('Nico Rodriguez', 'nr@hello.com', '123-456-8973', '1990-01-02', '2010-01-02', 1),
('Tommy Buitrago', 'tb@hello.com', '123-456-8974', '1990-01-03', '2010-01-03', 0),
('Phillip Ma', 'pm@hello.com', '123-456-8975', '1990-01-04', '2010-01-04', 1),
('Gus Alemany', 'ga@hello.com', '123-456-8976', '1990-01-05', '2010-01-05', 0);

-- Creates Genre Table 
Create or Replace Table Genres(
    genre_id int not Null auto_increment,
    genre_name varchar(100),
    description varchar(200),
    Primary Key (genre_id)
);

INSERT INTO Genres (genre_name, description) VALUES
('RPG', 'Role Playing'),
('Action', 'Action'),
('Sci-fi', 'Science Fiction'), 
('Horror', 'Horror'),
('Shooter', 'Shooter');


-- Create Companiies table
CREATE OR  REPLACE Table Companies(
    company_id  int not Null auto_increment,
    company_name varchar(45),
    Primary Key (company_id)
);

INSERT INTO Companies (company_name) VALUES
('Nintendo'),
('Microsoft'),
('Sony');



--Creates Games Table
CREATE OR REPLACE TABLE Games(
    game_id int not Null auto_increment, -- Primary Key 
    game_name varchar(50) not Null, 
    release_year int not Null,
    price decimal(18,2) not Null,
    inventory int,
    genre_id int, 
    Primary Key (game_id),
    Foreign Key (genre_id) references Genres(genre_id)
);

-- Create Companies and games transaction table
CREATE OR REPLACE Table CompaniesAndGames(
	game_id int NOT NULL,
    company_id int NOT NULL,
    Foreign Key (game_id) references Games(game_id),
    Foreign Key (company_id) references Companies(company_id)
);

INSERT INTO CompaniesAndGames (game_id, company_id) VALUES
(1, 1),
(5,1),
(1,2),
(3,2),
(4,2),
(1,3),
(2,3),
(4,3);


INSERT INTO Games (game_name, release_year, price, inventory, genre_id) VALUES
('Monster Hunter', 2012, 60.00, 8, (SELECT genre_id FROM Genres WHERE genre_name='RPG')),
( 'Ratchet and Clank', 2007, 25.00, 1, (SELECT genre_id FROM Genres WHERE genre_name='Sci-fi')),
( 'Gears of War', 2015, 35.00, 6, (SELECT genre_id FROM Genres WHERE genre_name='Shooter')),
( 'Dead Space', 2020, 65.00, 0, (SELECT genre_id FROM Genres WHERE genre_name='Horror')),
( 'Super Mario Odyssey', 2020, 60.00, 2, (SELECT genre_id FROM Genres WHERE genre_name='Action'));


-- Creates Transaction table
Create or Replace Table Transactions(
    transaction_id int not Null auto_increment,
    customer_id int, 
    transaction_date date, 
    payment_method varchar(100) NOT NULL,
    Primary Key (transaction_id),
    Foreign Key (customer_id) references Customers(customer_id) ON DELETE CASCADE
);

INSERT INTO Transactions (customer_id, transaction_date, payment_method) VALUES
( (SELECT customer_id FROM Customers WHERE contact_name='Gian Buitrago'), '2020-01-01', 'cash'),
((SELECT customer_id FROM Customers WHERE contact_name='Nico Rodriguez'), '2020-01-02', 'credit'),
((Select customer_id From Customers Where customer_name= 'Tommy Buitrago'), '2020-01-03', 'cash'),
((SELECT customer_id FROM Customers WHERE contact_name='Gian Buitrago'), '2020-01-04', 'cash'),
((SELECT customer_id FROM Customers WHERE contact_name='Phillip Ma'), '2020-01-04', 'credit');

--Creates Transactions Details table
Create or Replace TABLE TransactionDetails(
    transaction_id int , -- FK 
    game_id int, -- FK
    orderQTY int(11),
    price decimal(19,2), 
    linetotal decimal(18,2),
    Foreign Key (transaction_id) references Transactions(transaction_id) ON DELETE CASCADE,
    Foreign Key (game_id) references Games(game_id) ON DELETE CASCADE
);


INSERT INTO TransactionDetails (transaction_id, game_id, orderQTY, price, linetotal) VALUES
((SELECT transaction_id FROM Transactions WHERE transaction_id = 1), 1, 1, 60.00, 60.00),
((SELECT transaction_id FROM Transactions WHERE transaction_id = 2), 1, 1, 60.00, 60.00),
((SELECT transaction_id FROM Transactions WHERE transaction_id = 2), 2, 1, 25.00, 25.00),
((SELECT transaction_id FROM Transactions WHERE transaction_id = 4), 2, 1, 25.00, 25.00),
((SELECT transaction_id FROM Transactions WHERE transaction_id = 4), 3, 1, 35.00, 35.00);