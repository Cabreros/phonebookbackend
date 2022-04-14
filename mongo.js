const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.oiipd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  content: {
    id: Number,
    name: String,
    number: String,
  },
  date: Date,
  important: Boolean,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  content: {
    id: 1,
    name: process.argv[3],
    number: process.argv[4],
  },
  date: new Date(),
  important: true,
});

// person.save().then((result) => {
//   console.log(
//     `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
//   );
//   mongoose.connection.close();
// });

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((item) =>
      console.log(item.content.name, item.content.number)
    );

    mongoose.connection.close();
  });
}
