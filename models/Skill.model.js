const mongoose = require('mongoose');
const { Schema, model } = mongoose;




const skillSchema = new Schema({
    title: String,
    description: String,  
    experiencesList: [{type: Schema.Types.ObjectId, ref: "Experience"}]

  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model("Skill", skillSchema);

