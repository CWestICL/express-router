const express = require("express");
const app = express();
const users = require("./routes/users");
const fruits = require("./routes/fruits");
const port = 3000

app.use(express.json());
app.use("/users",users);
app.use("/fruits",fruits);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
