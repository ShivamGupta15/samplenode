const express = require('express');
const router = express.Router();
var app = express();
const bodyparser = require('body-parser');
const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host: "shivamsg15.mysql.database.azure.com",
    user: "shivam@shivamsg15",
    password: "database@1997",
    database: "shivamazure",
    port: 3306,
    //ssl: ""
});
const querystring = require('querystring');
const cors = require('cors');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

/*var mysqlConnection = mysql.createConnection({
    host: '//enter your host of mysql',
    user: '//enter your mysql user',
    password: '//enter your mysql password',
    database: '//enter your database name'
});
*/
//URL PARSE

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('DB connection successful');
    } else {
        console.log('DB connection failed /n Error: ' + JSON.stringify(err, undefined, 2));
    }
});
//angular post

router.post('/enroll', (req, res) => {
    continsDuplicate = true;
    console.log("bodyyyy" + req.body);

    //res.status(200).send({ "message": "Data recieved successfully" });
    name = req.body.name
    phone = req.body.phone
    email = req.body.email
    topic = req.body.topic
    valid = false;

    mysqlConnection.query("INSERT INTO `nodejs` (name,email,phone,topic) VALUES (?,?,?,?)", [name, email, phone, topic], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            continsDuplicate = false;
            res.status(200).send({ "message": true })

        } else {
            continsDuplicate = true;
            res.send({ "message": false })
            console.log("error: " + err.message);

            console.log("error:" + err.code);
            console.log("error:" + err.errno);
            console.log("Eorror caught") //hgfhgfgnf
                //this is added from shivam git


        }
    });
});



router.get('/', (req, res) => {
    console.log("bodyyyy" + req.body.name + req.body.email + req.body.phone + req.body.topic)

    mysqlConnection.query('SELECT * FROM nodejs', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
            //console.log(rows)

        } else {
            console.error("error" + err);
        }
    });
});

//check email validy by get request
router.get('/email', (req, res) => {
        email = req.query.email;
        console.log("email hit!");
        console.log(email);
        mysqlConnection.query('Select * from `nodejs` where email=(?)', [email], (err, rows, fields) => {
            if (!err) {
                console.log(rows);
                console.log(typeof(rows))
                res.json(rows);
                /*if (rows.length > 0) {
                    res.send({ "AVAILABLE": true })

                } else {
                    res.send({ "AVAILABLE": false })
                        //res.send(rows)
                }
                */

                //console.log(fields)
            } else {
                //console.log(rows)
                console.log(err)
                    // res.send({ "AVAILABLE": false })
            }
        })
    })
    //phone check
router.get('/phone', (req, res) => {
    phone = req.query.phone;
    console.log("phone hit!");
    console.log(phone);
    mysqlConnection.query('Select * from `nodejs` where (phone)=(?)', [phone], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            console.log(typeof(rows))
            res.json(rows);
            /*if (rows.length > 0) {
                res.send({ "AVAILABLE": true })

            } else {
                res.send({ "AVAILABLE": false })
                    //res.send(rows)
            }
            */

            //console.log(fields)
        } else {
            //console.log(rows)
            console.log(err)
            res.send({ "AVAILABLE": false })
        }
    })
})

//------------------------
router.get('/thriller', (req, res) => {

    res.send('This is Thriller section')
    console.log('Thriller section working')

});
router.post('/:name', (req, res) => {
    var name = req.params.name;
    console.log(name)



    mysqlConnection.query("INSERT INTO `nodejs` (name) VALUES (?)", [name], (err, rows, fields) => {
        if (!err) {
            console.log(rows);


        } else {
            console.log("error");
        }
    })
})

module.exports = router;