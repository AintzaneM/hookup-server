const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Experience = require("../models/Experience.model ");
const Skill = require('../models/Skill.model');
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
const fileUploader = require('../config/cloudinary.config');



//Cloudinary
router.post('/upload', fileUploader.single('imageUrl'), (req, res, next) => {
  console.log('file is: ', req.file)
 
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ secure_url: req.file.path });
});


// Create a new experience in DB
router.post("/experiences", (req, res, next) => {
  const { namePosition, description, imageUrl, skill: skillId, owner } = req.body;

  Experience.create({
    namePosition,
    description,
    imageUrl,
    skill: skillId,
    owner: req.session.user
  })
    .then((newExperienceFromDB) => {
      console.log(newExperienceFromDB)
      return Skill.findByIdAndUpdate(skillId, {
        $push: { experiencesList: newExperienceFromDB._id }
      });
    })
    .then(response => res.json(response))
    .catch(err => res.json(err))
})



//Get all experiences from DB
router.get('/experiences', (req, res, next) => {
  Experience.find()
    .populate('skill')
    .then(allTheExperiences => res.json(allTheExperiences))
    .catch(err => res.json(err));
});

// Get a specific experience from DB
router.get('/skills/:skillId/experiences/:experienceId', (req, res, next) => {
  const { experienceId } = req.params;
  Experience.findById(experienceId)
    .then((experience) => res.status(200).json(experience))
    .catch((err) => res.json(err));
})

// Edit a specific experience from DB
router.put('/skills/:skillId/experiences/:experienceId', (req, res, next) => {
  const { experienceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(experienceId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Experience.findByIdAndUpdate(experienceId, req.body)
    .then(() => res.status(200).json({ message: `Experience with ${experienceId} is updated successfully.` }))
    .catch(err => res.json(err));
});

// Delete a specific experience from DB
router.delete('/skills/:skillId/experiences/:experienceId', (req, res, next) => {
  const { experienceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(experienceId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Experience.findByIdAndRemove(experienceId)
    .then(() => res.status(200).json({ message: `Experience with ${experienceId} is removed successfully.` }))
    .catch(error => res.json(error));
});


module.exports = router;