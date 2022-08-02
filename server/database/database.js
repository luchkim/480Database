
const sqlite3 = require("sqlite3").verbose();
const express = require('express')
const router = express.Router();

// exports.db = new sqlite3.Database('./Shop.db', sqlite3.db, (err)=>{
let db = new sqlite3.Database('./Shop.db', sqlite3.OPEN_READWRITE, (err)=>{
    if(err) return console.error(err.message);
    console.log("DB Connection successfull");

})

// CREATE
// let a = `CREATE TABLE Customer(Customer_id INTEGER PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, phone TEXT NOT NULL);`
// let sql = `CREATE TABLE Item(Item_id INTEGER PRIMARY KEY, item_name TEXT NOT NULL, price REAL, description TEXT, weight REAL);`
// let b = `CREATE TABLE Orders(Order_id INTEGER PRIMARY KEY, Customer_id INTEGER NOT NULL, date TEXT NOT NULL, FOREIGN KEY (Customer_id) references Customer);`
// let s = `CREATE TABLE Order_detail(Order_id INTEGER NOT NULL, Item_id INTEGER NOT NULL, quantity INTEGER, price REAL, PRIMARY KEY(Order_id, Item_id), FOREIGN KEY(Order_id) REFERENCES Orders, FOREIGN KEY(Item_id) REFERENCES Item);`

// insert to the table for 
// db.run(sql);
// db.run(b);
// db.run(s);

module.export = db;


// // create table. id auto increase
// sql = 'CREATE TABLE Customer(id INTEGER PRIMARY KEY, first_name, last_name, phone)';
// db.run(sql);


// // insert into 
// sql = `INSERT INTO Customer(first_name, last_name, phone) VALUES (?, ?, ?)`;
// db.run(sql, ["luke", "Kim", 394222333], (err)=>{
//     if(err) return console.log(err.message);
// })


// // QUERY THE DATA, returning multiple rows
// sql = 'SELECT * FROM Customer';
// db.all(sql, [], (err, rows)=>{
//     if(err) return console.log(err.message)
//     rows.forEach(row=>{
//         console.log(row);
//     })
// })

// // UPDATE 
// sql = 'UPDATE  Customer SET first_name, = ? WHERE id = ?';
// db.run(sql, ["Jack", 1], (err)=>{
//     if(err) return console.error(err.message)
// })
