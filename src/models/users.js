const { Schema, model } = require("mongoose");
const handleSaveErrors = require("../heplers/handleSaveErrors");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL:{
      type:String,
    }
  },
  { versionKey: false, timestamps: true }
);

// const handleSaveErrors = (error, data, next)=>{
  
//   console.log(error.name);
//   console.log(error.message);
// next();
// }
userSchema.post('save', handleSaveErrors);
const User = model("user", userSchema);

module.exports = { User };
