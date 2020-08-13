const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/project/:id', rejectUnauthenticated, async (req, res) => {

    const client = await pool.connect();
    try{
      //start the transaction with BEGIN
      await client.query(`BEGIN;`);
      const projectQuery = `SELECT * FROM "project" WHERE user_id = $1 AND id = $2;`;
      const project = await client.query(projectQuery, [req.user.id, req.params.id]);
      
      if(project.rows.length > 0){
      const noteQuery = `SELECT * FROM "note" WHERE project_id = $1 ORDER BY z_index ASC;`;
      const notes = await client.query(noteQuery, [req.params.id]);
  
      const queryString = `SELECT * FROM "list" WHERE project_id = $1 ORDER BY z_index ASC;`;
      const listArray = await client.query(queryString, [req.params.id]);
      const allChecklists = [];
  
      //loop through array of lists and grab tasks for every list
      for(list of listArray.rows){
        const queryString = `SELECT * FROM "task" WHERE list_id = $1 ORDER BY position ASC;`;
        const tasks = await client.query(queryString, [list.id])
        allChecklists.push({id: list.id, title: list.title, project_id: list.project_id, color_id: list.color_id, x:list.x, y:list.y, z_index: list.z_index, tasks: tasks.rows})
      }
  
      const imageQuery = `SELECT * FROM "image" WHERE project_id = $1 ORDER BY z_index ASC;`;
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

router.put('/updatePosition', rejectUnauthenticated, (req, res) => {
  
  //for puts use :id better practice for REST api

  let type = '';
  switch(req.body.type){
    case 'note':
      type = 'note';
      break;
    case 'list':
      type = 'list';
      break;
    case 'image':
      type = 'image';
      break;
  }

  const queryString = `UPDATE ${type} SET x=$1, y=$2 WHERE id=$3 AND project_id=$4;`;

  pool.query(queryString, [ Math.floor(req.body.x), Math.floor(req.body.y), req.body.id, req.body.project_id])
    .then(response=>{
      res.sendStatus(201);
    })
    .catch(error=>{
      console.log('Error on position update', error);
      res.sendStatus(500);
    })
})

router.put('/updateNote', rejectUnauthenticated, (req,res)=>{
  console.log('Update Note req.body', req.body);
  
  const queryString = `UPDATE note SET title=$1, text=$2 WHERE id=$3 AND project_id=$4;`;

  pool.query(queryString, [req.body.title, req.body.text, req.body.id, req.body.project_id])
    .then(response=>{
      res.sendStatus(201);
    })
    .catch(error=>{
      console.log('Error on note update', error);
      res.sendStatus(500);
    })
})

router.put('/updateImage', rejectUnauthenticated, (req,res)=>{
  
  const queryString = `UPDATE image SET title=$1, url=$2 WHERE id=$3 AND project_id=$4;`;

  pool.query(queryString, [req.body.title, req.body.url, req.body.id, req.body.project_id])
    .then(response=>{
      res.sendStatus(201);
    })
    .catch(error=>{
      console.log('Error on image update', error);
      res.sendStatus(500);
    })
})

router.delete('/deleteNote', rejectUnauthenticated, (req,res)=>{
  console.log('Delete Note req.body', req.body);
  
  const queryString = `DELETE FROM "note" WHERE id = $1 AND project_id = $2; `;

  pool.query(queryString, [req.body.id, req.body.project_id])
    .then(response=>{
      res.sendStatus(204);
    })
    .catch(error=>{
      console.log('Error on note delete', error);
      res.sendStatus(500);
    })

})

router.delete('/deleteImage', rejectUnauthenticated, (req,res)=>{
  
  const queryString = `DELETE FROM "image" WHERE id = $1 AND project_id = $2; `;

  pool.query(queryString, [req.body.id, req.body.project_id])
    .then(response=>{
      res.sendStatus(204);
    })
    .catch(error=>{
      console.log('Error on image delete', error);
      res.sendStatus(500);
    })

})

router.post('/createNote', rejectUnauthenticated, (req,res)=>{

  const queryString = `INSERT INTO "note" (title, text, project_id, color_id, x, y, z_index)
  VALUES ('Click the edit icon upper right', 'Fill in the text and you''re set!', $1, 1, $2, $3, $4);`

  pool.query(queryString, [req.body.project_id, Math.floor(req.body.x), Math.floor(req.body.y), req.body.z_index])
    .then(response=>{
      res.sendStatus(201);
    })
    .catch(error=>{
      console.log('Error on note create', error);
      res.sendStatus(500);
    })
})

router.post('/createImage', rejectUnauthenticated, (req,res)=>{

  const queryString = `INSERT INTO "image" (title, url, project_id, color_id, x, y, z_index)
  VALUES ('Click the edit icon upper right!', '', $1, 1, $2, $3, $4);`

  pool.query(queryString, [req.body.project_id, Math.floor(req.body.x), Math.floor(req.body.y), req.body.z_index])
    .then(response=>{
      res.sendStatus(201);
    })
    .catch(error=>{
      console.log('Error on note create', error);
      res.sendStatus(500);
    })
})

router.post('/createChecklist', rejectUnauthenticated, (req,res)=>{

  const queryString = `INSERT INTO "list" (title, project_id, color_id, x, y, z_index)
  VALUES ('Click the edit icon upper right!', $1, 1, $2, $3, $4);`

  pool.query(queryString, [req.body.project_id, Math.floor(req.body.x), Math.floor(req.body.y), req.body.z_index])
    .then(response=>{
      res.sendStatus(201);
    })
    .catch(error=>{
      console.log('Error on note create', error);
      res.sendStatus(500);
    })
})

router.put('/updateZIndex', rejectUnauthenticated, (req,res)=>{
  let type = '';
  switch(req.body.type){
    case 'note':
      type = 'note';
      break;
    case 'list':
      type = 'list';
      break;
    case 'image':
      type = 'image';
      break;
    default:
      type = null;
  }

  const queryString = `UPDATE ${type} SET z_index=$1 WHERE id=$2 AND project_id=$3;`;
  pool.query(queryString, [req.body.z_index, req.body.id, req.body.project_id])
    .then(response=>{
      res.sendStatus(201);
    })
    .catch(error=>{
      console.log('Error updating z-index:', error);
      res.sendStatus(500);
    })
})

router.delete('/deleteChecklist', rejectUnauthenticated, (req,res)=>{

  const queryString = `DELETE FROM "list" WHERE id = $1 AND project_id = $2;`;
  pool.query(queryString, [req.body.id, req.body.project_id])
    .then(response=>{
      res.sendStatus(204);
    })
    .catch(error=>{
      console.log('Error deleting checklist:', error);
      res.sendStatus(500);
    })
})

module.exports = router;