const express = require("express")
const path = require("path");
//const { use } = require("./api/routes/index");
require("./api/data/db");
const routes = require("./api/routes/index");


const app = express();


app.set("port", 5050);



app.use((req, res, next) => {
    console.log(req.method + ' ' + req.url)
    next();
})
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")))
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));

app.use("/api", routes);



const server = app.listen(app.get("port"), function() {
    console.log("App started at ", server.address().port)
})
