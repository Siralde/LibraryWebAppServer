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


How I put it on git: 
  578  git init
  579  git remote add origin https://github.com/Siralde/LibraryWebAppServer.git
  580  git fetch
  581  git reset origin/master
  582  git checkout -t origin/master
  583  ls
  584  git pull
  585  git pull origin master
  586  git push --set-upstream origin master
  587  git status
  588  git add .
  589  git status
  590  sudo rm -rf node_modules/
  591  git add .
  592  git commit -m "Initial Commit"
  593  git push
