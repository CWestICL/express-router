const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");

let fruits = [
    {
        name: "Apple",
        color: "Red"
    },
    {
        name: "Banana",
        color: "Yellow"
    },
    {
        name: "Kiwi",
        color: "Green"
    },
    {
        name: "Grape",
        color: "Purple"
    },
];

router.get("/",(req,res) => {
    res.send(fruits);
});

router.get("/:fruit",(req,res) => {
    let name = req.params.fruit.charAt(0).toUpperCase() + req.params.fruit.slice(1);
    let payload;
    for (let fruit of fruits) {
        if (fruit.name === name) {
            payload = fruit;
        }
    }
    if (payload) {
        res.send(payload);
    }
    else {
        res.status(404).send("Fruit not found");
    }
});

router.post("/",[check("color").trim().not().isEmpty()],(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({error: errors.array()});
    }
    fruits.push(req.body);
    res.status(202).send(fruits);
});

router.put("/:num",(req,res) => {
    let fruit = fruits[req.params.num - 1];
    let newData = req.body;
    fruit.name = newData.name;
    fruit.color = newData.color;
    res.status(202).send("Fruit updated");
});

router.delete("/:num",(req,res) => {
    fruits.splice(req.params.num - 1,1)
    res.status(202).send("Fruit deleted");
});

module.exports = router;