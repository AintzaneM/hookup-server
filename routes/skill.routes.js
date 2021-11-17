const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Skill = require("../models/Skill.model")
const isLoggedIn = require("../middleware/isLoggedIn");
const isAdmin=require("../middleware/isAdmin")


//Create a new skill in DB
router.post("/skills", isAdmin, (req, res, next) => {
    const { title, description, experiencesList } = req.body;
    Skill.create({
        title,
        description,
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


module.exports = router;