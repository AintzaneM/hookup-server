const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Experience = require("../models/Experience.model ");
const Skill = require('../models/Skill.model');


// Create a new experience in DB
router.post("/experience", (req, res, next) => {
    const {namePosition, description, skillID } = req.body;

    Experience.create({
        namePosition,
        description,
        skill: skillID
    })

    .then(newExperienceFromDB => {
        return Skill.findByIdAndUpdate(skillID, {
          $push: { experiences: newExperienceFromDB._id }
        });
      })

    .then(response => res.json(response))
    .catch(err => res.json(err))
})

// Get a specific experience from DB
router.get('/experience/:experienceId', (req, res, next) => {
    const {experienceId} = req.params;
    Experience.findById(experienceId)
    .then(experience => res.json(experience))
    .catch(err => res.json(err));
})

// Edit a specific experience from DB
router.put('/experience/:experienceId', (req, res, next) => {
  const { experienceId } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(experienceId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Experience.findByIdAndUpdate(experienceId, req.body)
    .then(() => res.json({ message: `Experience with ${experienceId} is updated successfully.` }))
    .catch(err => res.json(err));
});

// Delete a specific experience from DB
router.delete('/experience/:experienceId', (req, res, next) => {
  const { experienceId } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(experienceId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Experience.findByIdAndRemove(experienceId)
    .then(() => res.json({ message: `Experience with ${experienceId} is removed successfully.` }))
    .catch(error => res.json(error));
});

 

module.exports = router;