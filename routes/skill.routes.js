const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Skill = require("../models/Skill.model")
const isLoggedIn= require("../middleware/isLoggedIn");

//Create a new skill in DB
router.post("/skills", (req, res, next) => {
    const {title, description, experiences} = req.body;

    Skill.create({
        title,
        description,
        experiences:[]
    })

    .then(response => res.json(response))
    .catch(err => res.json(err))
})

//Get all the skills from DB
router.get('/skills', isLoggedIn,(req, res, next) => {
    Skill.find()
    // .populate("experiences")
    .then(allExperiences => res.json(allExperiences))
    .catch(err=>res.json(err));
})

//Get specific skill

router.get('/skills/:skillId', isLoggedIn,(req, res, next) => {
    const { skillID } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(skillID)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    // Our projects have array of tasks' ids and
    // we can use .populate() method to get the whole task objects
    Skill.findById(skillID)
    //   .populate('experiences')
      .then(project => res.json(project))
      .catch(err => res.json(err));
  });
  


module.exports = router;