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
  578  git init <br />
  579  git remote add origin https://github.com/Siralde/LibraryWebAppServer.git<br />
  580  git fetch<br />
  581  git reset origin/master<br />
  582  git checkout -t origin/master<br />
  583  ls<br />
  584  git pull<br />
  585  git pull origin master<br />
  586  git push --set-upstream origin master<br />
  587  git status<br />
  588  git add .<br />
  589  git status
  590  sudo rm -rf node_modules/<br />
  591  git add .<br />
  592  git commit -m "Initial Commit"<br />
  593  git push<br />
