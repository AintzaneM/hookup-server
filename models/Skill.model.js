const { Schema, model } = require("mongoose");

const skillSchema = new Schema(
  {
    name: {
      type: String,
      
      
    },
    description: {
      type: String,
      
    },
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("Skill", skillSchema);

module.exports = User;
