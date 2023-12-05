How to setup and config database (using mongodb):

- Step 1: Download and install MongoDB Community Server application at: https://www.mongodb.com/try/download/community

- Step 2: Start the MongoDBCompass application. At 'New Connection' box, enter the URI: "mongodb://localhost:27017". Then in the 'Advanced Connection Options', choose the "mongodb" option in Connection String Scheme. And in the 'host' box, enter value "localhost:27017". Finally click 'Connect button'

- Step 3: On the left side of the application screen, click on 'Databases' bar. Choose 'Create database'. Enter 'ssps' as database name and 'printers' as collection name

- Step 4: Add the other collections to the database. Click on the 'spss' database, on the right side of the screen, click 'Create Collection', then create the following collections: printers, printorders, queues, spsos, staffs, students.

- Step 5: Click on each collection, on the right side screen, click on 'ADD DATA' -> 'Import JSON or CSV file'. Then choose the suitable ssps.<colection>.JSON where 'collection' is also the name of the collection that you clicked on. All of the JSON files are stored in /mongodb/ folder. After add all the collections' initial data, the setup and config process have now done and ready to use.


Notice: 
- After Step 5, each time you run the application, run MongoDBCompass first, just hit 'connect' button.
- All of the files stored in /schemas/ folder are only used to demonstrate what attributes are included in each model (schema) of the database and what are their data type, and what how they reference each other.




