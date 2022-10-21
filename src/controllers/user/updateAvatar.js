const { User } = require("../../models/users");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");


const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload } = req.file;

  try {

    const newAvatar = await Jimp.read(tempUpload);
    newAvatar.resize(250, 250).write(tempUpload);

    const extention = tempUpload.split(".").pop();

    const filename = `${_id}.${extention}`;

    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    
    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ status: 200, avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
