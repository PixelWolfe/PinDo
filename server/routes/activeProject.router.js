const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

console.log('In the activeProject router');

router.get('/project/:id', rejectUnauthenticated, async (req, res) => {
    console.log('In activeProject get project')
    const client = await pool.connect();
    try{
      //start the transaction with BEGIN
      await client.query(`BEGIN;`);
      const projectQuery = `SELECT * FROM "project" WHERE user_id = $1 AND id = $2;`;
      const project = await client.query(projectQuery, [req.user.id, req.params.id]);
      
      if(project.rows.length > 0){
      const noteQuery = `SELECT * FROM "note" WHERE project_id = $1 ORDER BY id ASC;`;
      const notes = await client.query(noteQuery, [req.params.id]);
  
      const queryString = `SELECT * FROM "list" WHERE project_id = $1 ORDER BY id ASC;`;
      const listArray = await client.query(queryString, [req.params.id]);
      const allChecklists = [];
  
      //loop through array of lists and grab tasks for every list
      for(list of listArray.rows){
        const queryString = `SELECT * FROM "task" WHERE list_id = $1 ORDER BY position ASC;`;
        const tasks = await client.query(queryString, [list.id])
        allChecklists.push({id: list.id, title: list.title, project_id: list.project_id, color_id: list.color_id, tasks: tasks.rows})
      }
  
      const imageQuery = `SELECT * FROM "image" WHERE project_id = $1 ORDER BY id ASC;`;
      const images = await client.query(imageQuery, [req.params.id]);
  
  
      //end the transaction with COMMIT
      await client.query('COMMIT;');
      res.send({project: project.rows, notes: notes.rows, checklists: allChecklists, images: images.rows});
     }
     else{
        console.log('Board does not exist / User does not have access to ')
        await client.query('ROLLBACK;');
        res.sendStatus(500);
     }
    }
    catch(error){
      //transaction failed so lets reset it so other queries can be made
      console.log('Error on project get', error);
      await client.query('ROLLBACK;');
      res.sendStatus(500);
    }
    finally{
      //close connection no matter what
      client.release();
    }
  })

// router.get('/project/:id', rejectUnauthenticated, (req, res) => {
//     console.log('In /project GET, Req.body:', req.body);

//     console.log('project GET id param', req.params.id);

//     const queryString = `SELECT * FROM "project" WHERE user_id = $1 AND id = $2;`;

//     pool.query(queryString,  [req.user.id, req.params.id])
//         .then(response=>{
//             res.send(response.rows);
//         })
//         .catch(error=>{
//             console.log('Error with project GET:', error)
//             res.sendStatus(500);
//         })
// });

// router.get('/notes/:id', rejectUnauthenticated, (req, res) => {
//     console.log('In activeProject get notes');
//     const queryString = `SELECT * FROM "note" WHERE project_id = $1;`;

//     pool.query(queryString,  [req.params.id])
//         .then(response=>{
//             res.send(response.rows);
//         })
//         .catch(error=>{
//             console.log('Error with project GET:', error)
//             res.sendStatus(500);
//         })
// });

// router.get('/checklists/:id', rejectUnauthenticated, async (req, res) => {
//     console.log('In activeProject get checklists')
//     const client = await pool.connect();
//     try{
//       //start the transaction with BEGIN
//       await client.query(`BEGIN;`);
//       const queryString = `SELECT * FROM "list" WHERE project_id = $1;`;
//       const listArray = await client.query(queryString, [req.params.id]);
//       const allChecklists = [];

//       //loop through array of lists and grab tasks for every list
//       for(list of listArray.rows){
//         const queryString = `SELECT * FROM "task" WHERE list_id = $1;`;
//         const tasks = await client.query(queryString, [list.id])
//         allChecklists.push({id: list.id, title: list.title, project_id: list.project_id, color_id: list.color_id, tasks: tasks.rows})
//       }
//       //end the transaction with COMMIT
//       await client.query('COMMIT;')
//       res.send(allChecklists);
//     }
//     catch(error){
//       //transaction failed so lets reset it so other queries can be made
//       console.log('Error on create account', error);
//       await client.query('ROLLBACK;');
//       res.sendStatus(500);
//     }
//     finally{
//       //close connection no matter what
//       client.release();
//     }
//   })

// router.get('/images/:id', rejectUnauthenticated, (req, res) => {
//     console.log('In activeProject get images')
//     const queryString = `SELECT * FROM "image" WHERE project_id = $1;`;

//     pool.query(queryString, [req.params.id])
//         .then(response=>{
//             res.send(response.rows);
//         })
//         .catch(error=>{
//             console.log('Error with project GET:', error)
//             res.sendStatus(500);
//         })
// });

module.exports = router;