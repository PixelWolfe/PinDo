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

});

router.put('/:id', rejectUnauthenticated, (req,res)=>{

});

router.delete('/:id', rejectUnauthenticated, (req,res)=>{

});

module.exports = router;