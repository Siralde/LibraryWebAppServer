# LibraryWebAppServer
Server side of a Managing Libraries Web App, developed with Node.js, Mongoose and MongoDB

Steps: 
  Iniciate the database, use the command line: mongod <br />
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


How I put it on git: <br />
    git init <br />
    git remote add origin https://github.com/Siralde/LibraryWebAppServer.git<br />
    git fetch<br />
    git reset origin/master<br />
    git checkout -t origin/master<br />
    ls<br />
    git pull<br />
    git pull origin master<br />
    git push --set-upstream origin master<br />
    git status<br />
    git add .<br />
    git status
    sudo rm -rf node_modules/<br />
    git add .<br />
    git commit -m "Initial Commit"<br />
    git push<br />
