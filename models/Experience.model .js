const { Schema, model } = require("mongoose");

const experienceSchema = new Schema(
  {
    title: {
      type: String,
      
      
    },
    description: {
      type: String,
      
    },

    skill: {
      type: Schema.Types.ObjectId, ref: "Skill"

    },

    owner: {
      type: Schema.Types.ObjectId, ref: "User"

    }

  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("Experience", experienceSchema);

module.exports = User;
