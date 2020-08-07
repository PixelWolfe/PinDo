const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { query } = require('../modules/pool');

//
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);

    const queryString = `SELECT * FROM "project" WHERE user_id = $1 ORDER BY id ASC;`;
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

router.put('/', rejectUnauthenticated, (req,res)=>{

    const user_id = req.user.id;
    const project_id = req.body.payload.project_id;
    const title = req.body.payload.title;
    const image_url = req.body.payload.image_url;
    const description = req.body.payload.description;

    let queryString = `
        UPDATE "project" SET title=$1, image_url=$2, description=$3 
        WHERE id=$4 AND user_id=$5;`;

    pool.query(queryString, [title, image_url, description, project_id, user_id])
        .then(response=>{
            res.sendStatus(201);
        })
        .catch(error=>{
            console.log('Error updating project PUT', error)
            res.sendStatus(500);
        })
});

router.delete('/', rejectUnauthenticated, (req,res)=>{

    const user_id = req.user.id;
    const project_id = req.body.project_id;
    const queryString = `DELETE FROM "project" WHERE user_id = $1 AND id = $2; `;

    pool.query(queryString, [user_id, project_id])
        .then(response=>{
            console.log('Success deleting!', response)
            //update to 204 when all children are also deleted
            res.sendStatus(200);
        })
        .catch(error=>{
            console.log('Error deleting project board:', error);
            res.sendStatus(500);
        })
});

module.exports = router;