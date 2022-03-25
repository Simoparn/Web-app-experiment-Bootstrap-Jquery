#   Overview

Node/Express/PUG/Bootstrap/JQuery web app person registry experiment with PostgreSQL as long-term storage.
Bootstrap is accessed through CDN, but is also installed locally. Uses Helmet package for security. Database queries
are parametrized to prevent SQL injections.



#   About package.json and packages

The following packages are needed for bootstrap CSS formatting: sass, css-loader, postcss, postcss-cli, autoprefixer, html-loader

The following packages are needed for bundling, as recommended by the official bootstrap documentation (https://getbootstrap.com/docs/5.1/getting-started/webpack/): webpack, webpack-cli

#   About webpack.config.js

#   Folder structure


## src
entry point (index.js)
db: PostgreSQL database connection configuration (dbconfig.js excluded from public repository)
Services: application user authentication
## Views 
PUG files
## dist 
webpack debug output etc. EXCLUDED FROM REMOTE REPOSITORY.
### node_modules 
Node modules, EXCLUDED FROM REMOTE REPOSITORY.


# About the database settings

    

#   Configuration

## Windows
    
    
Install PostgreSQL for Windows and the [node-postgres module](https://node-postgres.com/) (npm install pg)
    
Create dbconfig.js to ./db folder

    const { Pool } = require('pg')

    const pool = new Pool({
    user: "postgresusername",
    host: "localhost",
    port: xxxx,
    database: "postgresdatabasename",
    password: "postgrespassword"
    })

    module.exports = {
    query: (text, params) => pool.query(text, params),
    }

Create a new domain

Install and run certbot for a HTTPS certificate: https://certbot.eff.org/instructions?ws=other&os=windows



