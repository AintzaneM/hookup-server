const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Skill = require("../models/Skill.model")


//Create a new skill in DB
router.post("/skills", (req, res, next) => {
    const {title, description} = req.body;

    Skill.create({
        title,
        description,
        experiences: [],
    })

    .then(response => res.json(response))
    .catch(err => res.json(err))
})

//Get all the skills from DB
router.get('/skills', (req, res, next) => {
    Skill.find()
    // .populate("experiences")
    .then(allExperiences => res.json(allExperiences))
    .catch(err=>res.json(err));
})



//Get specific skill

router.get('/skills/:skillId', (req, res, next) => {
    const { skillId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(skillId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    // Our projects have array of tasks' ids and
    // we can use .populate() method to get the whole task objects
    Skill.findById(skillId)
    //   .populate('experiences')
      .then(project => res.json(project))
      .catch(err => res.json(err));
  });
  


module.exports = router;