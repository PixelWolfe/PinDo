# PinDo

## Duration: 2 Week Sprint

  - PinDo is an online tackboard to help creators maintain a highly visual overview of any project they are working on. Users log in to have access to any of their projects, here they have free reign to recolor, reposition, overlap, and create/delete/edit any information on a project board. All projects are accessable/deleteable from a user Home page and have built in zoom capacity so users can control the scope in which they're viewing their boards.

### Why Create This?

  - There are a lot of project board or kanban applications for creators to use, however, most are quite rigid in their format and unintuitive for a new user. PinDo targets a community of creators that want full control of the layout of their organization in a quick, easy to use, and visually appealing format. Pindo aims to empower creators to work in an environment that works best for them and change/delete layout or formatting on a whim.

  - This project was also completed as a 2-week long solo project for Prime Digital Academy.

#### Personal Goals

  - My goals for this project were to solidify my existing knowledge of the many fullstack CRUD interactions from the client to the database by building this application. PinDo focuses entirely around the user being able to manipulate data rather freely, whether that is the x/y position, z_index, title, text, color you name it, the entire application is Create Read Update Delete, and therefore good practice.

  - Besides active recollection and application of concepts, I was also very interested in learning about about a few libaries like React-Draggable, SweetAlert2, and React-PopupJS, so a goal was to work those into the application. 

### Screen Shots / Gifs

![PinDo](/documentation/PinDo.gif)

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

### Setup Instructions

1. Set up a database for the information.
  * Create a new database named `pindo`.
  * Use `database.sql` to create tables in `pindo`.
  
2. Make an .env file 
  * Create a `.env` file at the root of the project and paste the following line into the file:
      
    SERVER_SESSION_SECRET=superDuperSecret
       
  * Inside the `.env` file, replace `superDuperSecret` with a long random string to keep the application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, or create a secret with less than eight characters / leave it as `superDuperSecret`, you will get a warning.
  
3. Let's run some commands.
   * Run `npm install`
   * Start postgres if not running already with `brew services start postgresql`
   * Run `npm run server`
   * Run `npm run client` this should open up a new browser tab for you :)
     * If no tab opens, navigate to `localhost:3000`

### Usage

A user may log in or register with a new account, once logged in they arrive on their home page where they can click 'create a project' and enter new project information which will populate a project card.
  
(All existing projects will also populate here as cards as well)
  
Upon clicking on the desired project a user will enter a project page with has a large scrollable/zoomable viewport, and the options to create notes/images/checklists. Upon clicking any option a new item will appear in the upper right corner of their view port. This item and can moved by clicking and holding down upon it and moving the cursor somewhere else on the board, releasing will set the new position.

All items can be edited by clicking upon the upper right edit icon, additionally they can be brought to the front of the viewport by a simple click on the item.

### Built With / Technologies Used

  - PinDo was built using the following technologies:
      1. Node
      2. Express
      3. PostgreSQL
      4. React
      5. Redux
  
  - Some of more noteable libraries used were:
      * axios
      * material-ui
      * react-card-flip
      * react-draggable
      * react-reveal
      * react-router-dom
      * reactjs-popup
      * sweetalert2

  - User authentication / authorization.
      * bcryptjs
      * passport

  - Styling
      * material-ui/core
      * material-ui/icons
      * css (+ or - some javascript logic)

#### Future Goals

  * These are some of the things that didn't quite get done in this 14 day sprint, but would greatly enhance PinDo from either a user or development perspective.
  
  - PinDo could greatly benefit from better way to import and store images. I would very much like to implement AWS to upload and store images, it would make the user experience of this project a lot cleaner as well. User given url's (unsafe and unpleasant) would be replaced with actually storing the image in the database, being able to drag and drop them into a 'dropzone'. 

  - Draggable and interchangeable tasks from one checklist to another, reorderable checklists. React-Beautiful-Dnd would be a fantastic library to dive into for this! Draggable items within and already draggable context should be able to be solved with clever usage of a .handle class with react-draggable.

  - Wrtie a couple more transactional queries to delete all of the corresponding notes/images/lists/tasks that are attached to a deleted board.
  
  - A fully fleshed out 'about' page and a lot of css condensing and reworking with BEM methodology. 

### Acknowledgement and Thanks

   - Many thanks to Prime Digital Academy, your guidance and help throughout the past 4 months has been extraordinary, you're all fantastic and amazing people.
  
   - My wonderful girlfriend for being so excited to be able to use PinDo, to make something that someone will enjoy is to truely awesome, you're the best.

   - Thanks to Chris Ferdinandi at https://gomakethings.com, their scrollstop functionality helped innovate a solution to a user being able to create an item in view no matter the user's scroll status. This greatly helped me when I later had to update my code to account for zoom scaling later on as well. Rock on Chris.

#### Support
  - If you have suggestions or issues, or are looking to get in touch, please email me at RobertEJohnson10@gmail.com.

