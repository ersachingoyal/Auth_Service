const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
// const sequelize = require('sequelize')
// const db = require('./models/index');
// const { User, Role } = require('./models/index');

const app = express();

const prepareAndStartServer = () =>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () =>{        
        console.log(`Server started at ${PORT}`);
        // db.sequelize.sync({alter:true});

        // const u1 = await User.findByPk(1);
        // // const r1 = await Role.findByPk(1); //id 1 is the admin role;
        // const r1 = await Role.findByPk(3);
        // // u1.addRole(r1); //this add role method is given by sequelize, this means assign role r1 to user u1, this command will automatically add the particular record in the user_roles table

        // // the above method we did to assign a particular role to the user, we will also create an api for the same

        // // const response = await u1.getRoles();  //this will give all the roles of u1

        // const response = await r1.getUsers(); //this will give all the users having the role r1 i.e the airline buisness role
        // console.log(response)

    })

}

prepareAndStartServer();