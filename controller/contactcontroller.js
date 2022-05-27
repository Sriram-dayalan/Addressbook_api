const contact = require('../models/contacts');
const colors = require('colors');
const contacts = require('../models/contacts');

// @route   Get api/contacts
// @desc    add contacts
// @access  private
const getcontact = async (req,res) => {
    try{
        const contacts = await contact.find({user: req.user.id});

        res.json(contacts);
    }catch(err){
        console.log(`Error: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('server error');
    }
}

// @route   POST api/contacts
// @desc    add contacts
// @access  private
const addcontact = async (req, res) => {
    try{
      const {firstName, lastName, organization, email, phoneNO, address} = req.body;

      if(!firstName) return res.status(400).json({msg: 'first name is required for a contact'});
      if(!phoneNO) return res.status(400).json({msg: 'Phone number is required for a contact'});

      let newContact = await contact.findOne({phoneNO})

      if(newContact) return res.status(400).json({msg: 'contact already exists'});

      newContact = new contact({...req.body, user: req.user.id});

      await newContact.save();

      res.json(newContact);
    }catch(err){
        console.log(`Error: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('server error')
    }
}


// @route   put api/contacts/:id
// @desc    update contacts
// @access  private
const updatecontact = async (req, res) => {
    try{
        const contactid = req.params.id;

        let contact = await contact.findById(contactid);

        if(!contact) return res.status(404).json({msg: 'contact not found'});

        if(contact.user.toString() != req.user.id) return res.status(401).json({msg: 'unauthorised action'});

        contact = await contact.findByIdAndUpdate(contactid, req.body, {new: true});

        res.json(contact);

    }catch(err){
        console.log(`Error: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('server error');
    }
}

// @route   get api/contacts/:id
// @desc    get contacts by id
// @access  private
const getcontactbyid = async(req, res) => {
    try{
       const contactid = req.params.id;

        const contact = await contact.findById(contactid);

       if(!contact) return res.status(404).json({msg: 'contact not found'});

       if(contact.user.toString() != req.user.id) return res.status(401).json({msg: 'unauthorised action'});

       res.json(contact);
    }catch(err){
        console.log(`Error: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('server error');
    }
}

// @route   get api/contacts/:id
// @desc    get contacts by id
// @access  private
const deletecontact = async(req, res) => {
    try{
       const contactid = req.params.id;

        const contact = await contact.findById(contactid);

       if(!contact) return res.status(404).json({msg: 'contact not found'});

       if(contact.user.toString() != req.user.id) return res.status(401).json({msg: 'unauthorised action'});

       await contact.findByIdAndRemove(contactid);

       res.json({msg: 'contact deleted'})

    }catch(err){
        console.log(`Error: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('server error');
    }
}


module.exports = {
    addcontact,getcontact, updatecontact, getcontactbyid, deletecontact
}