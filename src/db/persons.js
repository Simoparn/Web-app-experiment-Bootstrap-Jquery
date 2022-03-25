const { json } = require('body-parser');
const db = require('./dbconfig')

//TODO: add async/await to all query functions

const allpersons=[]


//Get all persons

const getAllPersons = (req, res, next) => {
    
  //Empty old array
    allpersons.length=0
    db.query('SELECT * FROM persons', (err, result) => { 
        if(err)
            {
                console.log('Error while trying to retrieve all persons from database:'+err);
                
            }
        else
            {
            
            console.log('List of all persons retrieved from the database:')
            for(row in result.rows){
              console.log(result.rows[row])
              console.log(result.rows[row]['id'])
              allpersons.push(result.rows[row])
            }

              console.log('Persons as a stringified array before returning the value to index.js:'+String(allpersons))
              //res.json(result.rows)
              //this.allpersons=result.rows
              return result.rows
            
           }
    })
    
}


// Get user by id
const getPersonById = (req, res) => {
   
  //parametrized query
  const query = {
        text: 'SELECT * FROM persons WHERE id = $1',
        values: [req.params.id],
      }
  
    
    
      db.query(query, (err, result) => {
        if (err) {
          return console.error('Error executing query', err.stack)
       }
       else {
         if (result.rows.length > 0)
           res.json(result.rows);
         else
           res.status(404).end();
       }
      })

}


// Add new person, automatic id with SERIAL column
const addPerson = (req, res, newperson) => {
  
  console.log("New person data before inserting into the database: " +newperson.firstname+" "+newperson.lastname+" "+newperson.birthyear)
  const query = {
    text: 'INSERT INTO persons (firstname, lastname, birthyear) VALUES ($1, $2, $3)',
    values: [newperson.firstname, newperson.lastname, newperson.birthyear],
  }
  db.query(query, (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }
  })

  
}

// Delete person
const deletePerson = (req, res) => {
    
  const query = {
        text: 'DELETE FROM persons WHERE id = $1',
        values: [req.params.id],
      }
         db.query(query, (err, res) => {
        if (err) {
          return console.error('Error executing query', err.stack)
        }
      })
    
      res.status(204).end();
}

// Update person
const updatePerson = (req, res) => {
     // Extract edited person from the request 
    const editedPerson = req.body;
    const query = {
    text: 'UPDATE persons SET title=$1, director=$2, year=$3 WHERE id = $4',
    values: [editedPerson.title, editedPerson.director, editedPerson.year, req.params.id],
    }
     db.query(query, (err, res) => {
     if (err) {
      return console.error('Error executing query', err.stack)
    }
  })

  res.json(editedPerson);
}


module.exports = {
    getAllPersons: getAllPersons,
    getPersonById: getPersonById,
    addPerson: addPerson,
    deletePerson: deletePerson,
    updatePerson: updatePerson,
    allpersons: allpersons
  }