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

router.put('/updatePosition/', rejectUnauthenticated, (req, res) => {
  console.log('Update Position req.body',req.body)
  console.log('req.body.type', req.body.type)

  let type = '';
  switch(req.body.type){
    case 'note':
      type = 'note';
      break;
    case 'checklist':
      type = 'checklist';
      break;
    case 'image':
      type = 'image';
      break;
  }

  //bypass the inability to update table name with stl
  const queryString = `UPDATE ${type} SET x=$1, y=$2 WHERE id=$3 AND project_id=$4;`;
  pool.query(queryString, [ req.body.x, req.body.y, req.body.id, req.body.project_id])
    .then(response=>{
      res.sendStatus(201);
    })
    .catch(error=>{
      console.log('Error on position update', error);
      res.sendStatus(500);
    })
})

module.exports = router;