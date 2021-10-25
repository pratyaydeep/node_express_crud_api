import express from 'express';
import {v4 as uuidv4} from 'uuid';

import { getUser } from '../controllers/users.js';

const router = express.Router();

let users = []

router.get('/', getUser);

router.post('/', (req, res) => {
    const user = req.body;
    // const userId = uuidv4();
    // const userWithId = {...user, id: userId};
    // users.push(userWithId);
    users.push( { ...user, id:uuidv4() } );
    res.send(`user with name ${user.firstName} added to the database`);
});

router.get('/:id', (req,res) => {
    // const id = req.params.id;
    const { id } =req.params;
    const foundUser = users.find((user) => user.id === id);
    res.send(foundUser);
})

router.delete('/:id', (req,res) => {
    // const id = req.params.id;
    const { id } =req.params;
    users = users.filter((user) => user.id !== id);
    res.send('user deleted');
})

router.patch('/:id', (req,res) => {
    const { id } = req.params;
    const {firstName, lastName, age} = req.body;
    const user = users.find((user) => user.id === id);
    if(firstName){
        user.firstName = firstName;
    }
    if(lastName){
        user.lastName = lastName;
    }
    if(age){
        user.age = age;
    }
    res.send('user updated');
})

export default router;