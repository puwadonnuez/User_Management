const fs = require("fs");
const path = require("path");

const writeFile = async (path, base64) => {
  if (!base64) return false;
  const data = base64.replace(/^data:image\/\w+;base64,/, "");
  try {
    fs.writeFileSync(`.${path}`, data, { encoding: `base64` });
    return path;
  } catch (error) {
    return false;
  }
};

const deleteFile = (id) => {
  const fileName = `${id}.png`;
  const path = `/public/images/${fileName}`;
  console.log(`path : `, path);
  fs.unlink(`.${path}`, (err) => {
    if (err) console.log(err);
    else {
      console.log("\nDeleted file");
    }
  });
};

module.exports = {
  writeFile,
  deleteFile,
};
