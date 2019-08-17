require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Person = require('./models/person')
const morgan = require('morgan')

const app = express()

app.use(express.static('build'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

var uniqueValidator = require('mongoose-unique-validator')


const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    console.log('error message from backend \n')
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }


    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


//let rawdata = fs.readFileSync('db.json');
//let phonebook = JSON.parse(rawdata);


morgan.token('person', (request, response) => {
    return JSON.stringify(request.body)
}),

    app.use(
        morgan(':method :url :status :res[content-length] - :response-time ms :person',
            {
                skip: function (req, res) { return req.method !== "POST" }
            },
        )
    )


app.get('/', (req, res) => {
    res.send('<h1>Hello World again!</h1>')
})

app.get('/info', (req, res) => {
    //let number_of_entries = phonebook["persons"].length
    //see https://stackoverflow.com/questions/10811887/how-to-get-all-count-of-mongoose-model, needs a callback
    let datetime = new Date();

    
    Person.countDocuments({}, function (err, count) {
        console.log(count)
        let datetime = new Date();
        res.write(`Phone has info for ${count} people`)
        res.write(`\n\n`)
        res.write(`${datetime}`)
        res.send()
    })

    /*
     let response_string = "Phone has info for " + number_of_entries + " people \n\n" + datetime
     console.log(response_string)
     res.send(response_string)
     */
})

app.get('/api/persons/:id', (request, response) => {
    //const id = Number(request.params.id)
    //const person = phonebook["persons"].find(element => element.id === id)

    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person.toJSON())
            }
            else {
                response.status(404).end();
            }
        })
        .catch(error => {
            console.log(error);
            response.status(404).end()
        })
    /*
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
        */
})

/*
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook["persons"] = phonebook["persons"].filter(element => element.id !== id)
    response.status(204).end()
})
*/

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        /*result.forEach(person => {
            res.json(person)
            //response.json(person.map(person_id => person_id.toJSON()))
        })*/
        if (result) {
            res.json(result.map(person => person.toJSON()))
        }
        else {
            res.status(404).end()
        }
    })
        .catch(error => next(error))
})

const generateId = () => {
    const RandomId = Math.floor(Math.random() * Math.floor(100));
    return RandomId + 1
}

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    /*
    if (!body.name) {
        return response.status(400).json({
            error: "person's name is missing"
        })
    }
    else if (!body.number) {
        return response.status(400).json({
            error: "person's number is missing"
        })
    }
    if (body.name === undefined) {
        return response.status(400).json({ 
            error: 'content missing' 
        })
    }
    */
    /*
    else if (phonebook["persons"].find(element => element.name === body.name)) {
        return response.status(400).json({
            error: "error, the name already exists in the phonebook"
        })
    }
    */

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.plugin(uniqueValidator);

    person.save()
    .then(savedPerson => {
        return savedPerson.toJSON()
    })
    .then(savedAndFormattedPerson => {
        response.json(savedAndFormattedPerson)
    }) 
    .catch(error => next(error))

    //phonebook["persons"] = phonebook["persons"].concat(new_person)
    //response.json(new_person)
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    console.log("updating person entry")
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            console.log("updating person in backend \n")
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})
