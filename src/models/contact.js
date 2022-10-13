const { Schema, model } = require("mongoose");
const handleSaveErrors = require("../heplers/handleSaveErrors");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSaveErrors);

const Contact = model("contacts", contactSchema);

module.exports =  {Contact} ;
