//CSS styles
//TODO: Folder doesn't exist, unnecessary?
// import '../node_modules/dist/js/bootstrap.js';
//TODO: following two imports (unsupported direct import) don't work after upgrading to Node 16
//Ready to use bootstrap styles, import() is needed for CommonJS
//import('../node_modules/bootstrap/dist/css/bootstrap.min.css')
//import('../node_modules/express-promise-router')

// database queries
const query = require('./db/users');
const personquery= require('./db/persons')
// user authentication and token creation
const auth = require('./Services/authenticate');

const express = require('express');
//Needed for POST requests, 
const bodyParser = require('body-parser');
//Needed for security
const helmet = require("helmet");


		const app = express();
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(helmet());
		app.set('view engine', 'pug');
		const port = 3000;
		process.env.SECRET_KEY = "5b1a3923cc1e1e19523fd5c3f20b409509d3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84d";

		//Application name
		const directory =process.cwd();
		const appnamestart=directory.lastIndexOf("\\");
		const appname=directory.substring(appnamestart+1, directory.length);

		


	//Initial main list data here if needed
	let records=[]
	    


	// Login page
	    app.get("/login", (req, res) => {
			// login error message empty by default when opening the page, see also ./views/login.pug
			loginfailedmessage=""
			res.render("login", {loginfailedmessage:loginfailedmessage});
			
		})
		// Login method for authentication 
		//TODO: no error message when the login succeeded
		app.post("/login", auth.login, (req,res)=>{
			loginfailedmessage="Wrong username or password, try again"
			res.render("login", {loginfailedmessage:loginfailedmessage});

		})
		
	    //Start window
		//TODO: bootstrap styles broken
		app.get("/", (req, res) => {
		//TODO: res.send unnecessary here?
 	 	//res.send("Hello. The name of this project is    "+appname);
		res.render("frontpage", {appname:appname});
		})
		
		//all records as a table
		app.get("/listofrecords", (req, res) => {
    	//console.log('List of persons as an array '+persons)
		personquery.getAllPersons()
		setTimeout(()=>console.log("Persons as an array after returning the value: "+personquery.allpersons), 2000)
		setTimeout(()=>res.render("listofrecords", {records: personquery.allpersons}), 400);
		})

		//Window for adding a new record
		app.get("/addrecord", (req, res) => {
			res.render("addrecord");
		})
		//Adding a new record to the list with the button from the "add a new person" page
		app.post("/addrecord", (req, res) => {
			//TODO: For protection agains't cross-site scripting (XSS)
			//var v = require('validator');
			//var escaped_input = v.escape(user_input);
			const newPerson = {id: Date.now(), firstname: req.body.firstname, lastname: req.body.lastname, birthyear: req.body.birthyear};
			console.log("New person data before passing the data to the query function: "+newPerson.id+" "+newPerson.firstname+" "+newPerson.lastname+" "+newPerson.birthyear)
			//records = [...records, newPerson];
			personquery.addPerson(null,null,newPerson)
			setTimeout(()=>res.redirect("/"), 3000);
			//res.render("recordaddedalert");
		})

		

		


		//TODO: Delete record
 	//	app.delete("/api/deleterecord/:id", (req, res) => { 
			//parse id value from the request parameter
   	//	const id = req.params.id;
 	//Remove movies from array and send response
   	//	movies = movies.filter(movie => movie.id !== id);
   	//	res.status(204).end();
 	//})

	//TODO:	Update record
	//app.put("/api/updaterecord/:id", (req, res) => { 
	//	const id = req.params.id;
	//	const updatedMovie = {'id': id, ...req.body};
  
		//Get the index of updated movie
	//	const index = movies.findIndex(movie => movie.id === id);
	//	Replace updated movie in the array
	//	movies.splice(index, 1, updatedMovie);
	//	res.json(updatedMovie);
  	//})
		
		// Server data to console
		app.listen(port, () => {
  		console.log(`Server for ${appname} is running on port ${port}.`);
		});