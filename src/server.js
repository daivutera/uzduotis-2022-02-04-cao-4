const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())
const URL = "http://localhost:3000"
const port = 3000
const db = require("./db/db.js")
const { cars, data } = db

app.get("/cars/:brand", (req, res) => {
    const { brand } = req.params
    const CarWithBrand = cars[brand]//jei po tasko tai neveikia :D

    console.log(CarWithBrand)
    res.json(
        CarWithBrand
    )
})
// Sukurkite bendrinį GET route, kuris paduos visus duomenis.
app.get("/data", (req, res) => {
    res.json(data)
})
// Sukurkite dinaminį GET route, kur URL turės automobilio markę ir pagal ją prafiltruos, ir grąžins tik tuos žmones, kurie turi šį automobilį.
app.get("/data/:car", (req, res) => {
    let personsWithSelectedCar = []
    const { car } = req.params;
    data.forEach(person => {
        console.log(car)
        console.log(person.car)
        if (person.car == car || person.car.toLowerCase() == car) {
            personsWithSelectedCar.push(person)
        }
    })
    if (personsWithSelectedCar) {
        res.json(personsWithSelectedCar)
    }
    if (!personsWithSelectedCar) {
        res.send("no data with this car request")
    }
})
// Sukurkite dinaminį GET route, kuris priims vartotojo id ir pagal jį grąžins atitinkamą vartotojo objektą. Hint: url parametrai visada stringai, o čia id - skaičius, tad reikės konvertuoti.
app.get("/data/id/:idValue", (req, res) => {
    const { idValue } = (req.params);
    console.log(Number(idValue))
    let personWithId = []
    data.filter(person => {
        if (person.id == idValue) {
            personWithId.push(person)
            res.json(person)
        }
    })
    console.log(personWithId)
    console.log("labas")
    if (personWithId.length < 1) {
        res.send("no person with such id")
    }

})

// Sukurkite GET route, kuris grąžins visus el. paštus (grąžinamas formatas: ["anb@abc.com", "abc@abc.com", "abc@acb.com]).
app.get("/data/em/email", (req, res) => {
    let emails = []
    data.forEach(person => emails.push(person.email))
    console.log(emails)
    res.json(emails)
})


// Sukurkite GET route, į kurį pasikreipus, grąžins visų moterų (gender: Female) vardą ir pavardę (formatas: ["Rita Kazlauskaite", "Monika Simaskaite"]).
app.get("/data/fem/female", (req, res) => {
    let femaleList = []
    console.log(data[1].first_name)
    console.log(data[1].last_name)
    data.forEach(person => {
        if (person.gender === "Female") {
            femaleList.push(`${person.first_name} ${person.last_name}`)
        }
    })
    res.json(femaleList)
})


app.listen(port, console.log("server is running on port " + port))