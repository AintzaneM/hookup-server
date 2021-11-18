const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Skill = require("../models/Skill.model")
const isLoggedIn = require("../middleware/isLoggedIn");
const isAdmin=require("../middleware/isAdmin")
const fileUploader=require("../config/cloudinary.config")



//Cloudinary
router.post('/upload', fileUploader.single('imageUrl'), (req, res, next) => {
    console.log('file is: ', req.file)
   
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    res.json({ secure_url: req.file.path });
  });
  

//Create a new skill in DB
router.post("/skills", isAdmin, (req, res, next) => {
    const { title, description, imageUrl, experiencesList } = req.body;
    Skill.create({
        title,
        description,
        imageUrl,
        experiencesList: []
    })
        .then(response => res.status(200).json(response))
        .catch(err => res.json(err))
})

//Get all the skills from DB
router.get('/skills', isLoggedIn, (req, res, next) => {
    Skill.find()
        .populate("experiencesList")
        .then(allExperiences => res.status(200).json(allExperiences))
        .catch(err => res.json(err));
})

//Get specific skill
router.get('/skills/:skillId', isLoggedIn, (req, res, next) => {
    const { skillId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(skillId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    Skill.findById(skillId)
        .populate('experiencesList')
        .then(skill => res.status(200).json(skill))
        .catch(err => res.json(err));
});

// Edit a specific experience from DB
router.put('/skills/:skillId', isLoggedIn, (req, res, next) => {
    const { skillId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(skillId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    Experience.findByIdAndUpdate(skillId, req.body)
      .then(() => res.status(200).json({ message: `Experience with ${experienceId} is updated successfully.` }))
      .catch(err => res.json(err));
  });


// Delete a specific experience from DB
router.delete('/skills/:skillId', (req, res, next) => {
    const { skillId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(skillId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    Experience.findByIdAndRemove(skillId)
      .then(() => res.status(200).json({ message: `Experience with ${skillId} is removed successfully.` }))
      .catch(error => res.json(error));
});

module.exports = router;