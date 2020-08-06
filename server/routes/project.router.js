const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);

    const queryString = `SELECT * FROM "project" WHERE user_id = $1;`;
    pool.query(queryString, [req.user.id])
        .then(results=>{
            res.send(results.rows)
        })
        .catch(error=>{
            console.log('Error getting projects', error);
            res.sendStatus(500);
        })
});



router.post('/', rejectUnauthenticated, (req, res) => {

    console.log('req.body',req.body)

    const user_id = req.user.id;
    const title = req.body.payload.title;
    const image_url = req.body.payload.image_url;
    const description = req.body.payload.description;

    const queryString = `
        INSERT INTO "project" (user_id, title, image_url, description)
        VALUES ($1,$2,$3,$4)`;

    pool.query(queryString, [user_id, title, image_url, description])
        .then(response=>{
            res.sendStatus(201);
        })
        .catch(error=>{
            console.log('Error posting project:', error);
            res.sendStatus(500);
        })
});

router.put('/:id', rejectUnauthenticated, (req,res)=>{

});

router.delete('/:id', rejectUnauthenticated, (req,res)=>{

});

module.exports = router;