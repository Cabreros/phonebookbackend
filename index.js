require("dotenv").config();
const express = require("express");
const Person = require("./models/person");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.static("build"));
app.use(cors());
app.use(morgan("tiny"), morgan(":person"));

morgan.token("person", (req) => {
  return JSON.stringify(req.body);
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people <br/> ${Date()}`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(request.body);
  if (!body) {
    return response.status(400).json({
      error: "content missing",
    });
  } else if (!body.number || !body.name) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  const person = new Person({
    content: body,
    important: body.important || false,
    date: new Date(),
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
