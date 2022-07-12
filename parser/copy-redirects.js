const fs = require("fs");

// File destination.txt will be created or overwritten by default.
fs.copyFile("_redirects", "build/_redirects", (err) => {
  if (err) throw err;
  console.log("Redirect file coppied");
});
