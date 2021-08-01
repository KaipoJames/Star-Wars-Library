# Star Wars Library | Full-Stack Web Application

Star Wars Library is a Full-Stack MERN project showcasing a library of star wars characters, worlds, specices, and more.
Currently, only characters functionality is available until future updates where other models will be added.
You can view the .csv files I am using in public/data-sets.

## Deployment
 - View this [app](https://star-wars-library-kaipo.herokuapp.com/) on Heroku.

## Technologies and Tools
  - MERN Stack: MongoDB, Express, React, Node.js
  - Dependencies: 
    - Back-end: 
      - concurrently
      - cors
      - dotenv
      - express
      - mongoose
      - nodemon
    - Front-end:
      - MaterialUI Core
      - MaterialUI Icons
      - Axios
      - Moment
      - Redux
      - Web Vitals
  
## Database Storage
  - All models are stored as documents in an active cluster contained in the non-relational database known as MongoDB.
  Learn more about [relational vs non-relational_databases](https://www.pluralsight.com/blog/software-development/relational-vs-non-relational-databases)

## Deployment References
 - https://devcenter.heroku.com/articles/deploying-nodejs
 - https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app
 - https://devcenter.heroku.com/articles/troubleshooting-node-deploys

## (For Reference)COMMANDS used while in development
 - heroku logs --tail -> get a report of previous deployments after pushing code to heroku
 - git push heroku master -> push all code and changes to the master branch.
 - heroku config
 - heroku config:set
 - heroku ps:restart web -a (app-name) 
 - heroku apps
 - heroku apps:rename (new-name)
 - sudo killall -9 node
 - npx kill-port 3000 8080 4200

app built by Kaipo Wilmeth
