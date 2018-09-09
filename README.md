# LibraryWebAppServer
Server side of a Managing Libraries Web App, developed with Node.js, Mongoose and MongoDB

Steps: 
  Iniciate the database, use the command line: mongod
  Iniciate the Server Site:
  
    The default method
        // Windows
        SET DEBUG=nameOfTheProject:* & npm start
        // macOS or Linux
        DEBUG=nameOfTheProject:* npm start
        
    If you previously set up nodemon, you can instead use:
        // Windows
        SET DEBUG=nameOfTheProject:* & npm run devstart
        // macOS or Linux
        DEBUG=nameOfTheProject:* npm run devstart
