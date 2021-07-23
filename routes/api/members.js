const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

//Get all members
router.get('/', (req, res) => res.json(members));

//Get a single member
router.get('/:id', (req, res) =>{
    //res.send(req.params.id);
    /* check to see if id is available
    Show request if found
    show message if there is no request
    */
//arrow function here shows return
const found = members.some(member => member.id === parseInt(req.params.id));

if (found) {
res.json(members.filter(member => member.id === parseInt(req.params.id)));

}else {
    res.status(400).json({msg: `No member with the id of ${req.params.id}`});

}

});

//create Member
router.post('/', (req, res)=>{
    //res.send(req.body);
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email:req.body.email,
        status: 'active'

    };

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include a name and an email'});
    }

    members.push(newMember);
    res.json(members);
    //for templates use redirect
    //res.redirect('/');
});

//update member
router.put('/:id', (req, res) =>{
//arrow function here shows return - get 1
const found = members.some(member => member.id === parseInt(req.params.id));

if (found) {
    const updateMember = req.body;
    members.forEach(member => {
        if(member.id === parseInt(req.params.id)){
            member.name = updateMember.name ? updateMember.name : member.name;
            member.email = updateMember.email ? updateMember.email : member.email;

            res.json({msg: 'Member updated', member});
        } 
     });

}else {
    res.status(400).json({msg: `No member with the id of ${req.params.id}`});
}
});


//Delete member
router.delete('/:id', (req, res) =>{
//arrow function here shows return
const found = members.some(member => member.id === parseInt(req.params.id));

if (found) {
    res.json({
        msg: 'member deleted',
        members: members.filter(member =>  member.id !== parseInt(req.params.id))
    });

}else {
    res.status(400).json({msg: `No member with the id of ${req.params.id}`});

}

});

module.exports = router;
