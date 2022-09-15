const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const axios = require("axios");

app.use(cors());
app.use(express.json());

app.post("/add-company", async(req, res) => {
    try {
        const { id, name } = req.body;
        await pool.query(
            "INSERT INTO company_data (cin,name) VALUES($1,$2) RETURNING *", [id, name]
        ).then((data) => console.log(data)).catch((error) => console.log(error));
        res.json({ id, name });
    } catch (err) {
        console.error(err.message);
    }
});


app.get("/get-company-name", async(req, res) => {
    const search = req.query.search;
    let url = `https://www.zaubacorp.com/custom-search`;
    axios.post(url, { 'filter': 'company', 'search': search })
        .then(done => {
            return res.send({ data: done.data })
        })
        .catch(er => res.send({ error: er.MessageDetail }))
});




app.get("/get-all-saved-company-data", async(req, res) => {
    try {
        const allCompany = await pool.query("SELECT * FROM company_data");
        res.json(allCompany.rows);
    } catch (err) {
        console.error(err.message);
    }
});



app.delete("/delete-company/:id", async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM company_data WHERE company_id = $1", [
            id
        ]);
        res.json("Company data was deleted!");
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});