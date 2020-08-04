const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//G
router.get('/', rejectUnauthenticated, (req, res) => {
    
});

router.post('/', rejectUnauthenticated, (req, res) => {

});

router.put('/:id', rejectUnauthenticated, (req,res)=>{

});

router.delete('/:id', rejectUnauthenticated, (req,res)=>{

});

module.exports = router;