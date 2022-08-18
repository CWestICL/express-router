const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");

let users = [
    {
        name: "User 1",
        age: 30
    },
    {
        name: "User 2",
        age: 45
    },
    {
        name: "User 3",
        age: 27
    },
    {
        name: "User 4",
        age: 22
    }
];

router.get("/",(req,res) => {
    res.send(users);
});

router.get("/:num",(req,res) => {
    res.send(users[req.params.num - 1]);
});

router.post("/",[check("name").trim().not().isEmpty()],(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({error: errors.array()});
    }
    users.push(req.body);
    res.status(202).send(users);
});

router.put("/:num",(req,res) => {
    let user = users[req.params.num - 1];
    let newData = req.body;
    user.name = newData.name;
    user.age = newData.age;
    res.status(202).send("User updated");
});

router.delete("/:num",(req,res) => {
    users.splice(req.params.num - 1,1)
    res.status(202).send("User deleted");
});

module.exports = router;