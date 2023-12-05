# ssps
Student Smart Printing Service for HCMUT students

## ✋Introduction
The university is intent to build a Student Smart Printing Service (HCMUT_SSPS) for serving 
students in its campuses to print their documents.

## Tech Stack

**Front-end:** NodeJS,ExpressJS, TailwindCSS, jQuery, PDF.js

**Back-end:** NodeJS, ExpressJS, Multer, Mongoose

**Database:** MongoDB with Mongoose ODM

**Security:** JWT, Bcrypt


## Installation
**Node.js**
  - First, clone this branch to your local storage. 
  - Then download and install Node.js 20.10.0 version at: https://nodejs.org/en.

**Front-end:** 
  - Change terminal working directory to *./client* folder
  - Use `npm i` command to install all required packages for Front-end
  - Use `npm run build` command to build component files
  - Install *Live Server* extension on your Editor

**Back-end:**
  - Change terminal working directory to *./server/* folder
  - Use `npm i` command to install all required packages for Back-end

**Database**
  - Step 1: Download and install MongoDB Community Server application at: https://www.mongodb.com/try/download/community
  
  - Step 2: Start the MongoDBCompass application. At 'New Connection' box, enter the URI: "mongodb://localhost:27017". Then in the 'Advanced Connection Options', choose the "mongodb" option in Connection String Scheme. And in the 'host' box, enter value "localhost:27017". Finally click 'Connect button'
  
  - Step 3: On the left side of the application screen, click on 'Databases' bar. Choose 'Create database'. Enter 'ssps' as database name and 'printers' as collection name
  
  - Step 4: Add the other collections to the database. Click on the 'spss' database, on the right side of the screen, click 'Create Collection', then create the following collections: printers, printorders, queues, spsos, staffs, students.
  
  - Step 5: Click on each collection, on the right side screen, click on 'ADD DATA' -> 'Import JSON or CSV file'. Then choose the suitable ssps.<colection>.JSON where 'collection' is also the name of the collection that you clicked on. All of the JSON files are stored in `/database/mongodb/` folder. After adding all the collections' initial data, the setup and config process have now done and database is ready to use.

Notice: 
- After Step 5, each time you run the application, run MongoDBCompass first, then just hit 'connect' button.
- All of the files stored in ./database/schemas/ folder are only used to demonstrate what attributes are included in each model (schema) of the database and what are their data type, and how they reference each other.


## Start the website
- Run and connect database at `mongodb://localhost:27017`
- Navigate to `server` folder on your terminal, type `npm start` command to start backend server
- Open VSCode or any editor that already have *Live Server* extension installed
- Start *Live Server* on `./client/src/pages/home.html` file at `localhost` port `5500`
- Default login information is:
  - `student@hcmut.edu.vn` for student
  - `staff@gmail.com` for staff
  - `spso@gmail.com` for spso
  - password: `example` for 3 of them


