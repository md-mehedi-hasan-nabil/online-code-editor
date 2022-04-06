const compiler = require("compilex");
const os = require("os");
const createError = require("http-errors");

function pythonController(req, res, next) {
  const options = { stats: true };
  compiler.init(options);

  let envData = {};
  const code = req.body.editorCode;

  // for windows
  if (os.platform() === "win32" || os.platform() === "win64") {
    envData = { OS: "windows" };
  } else if (os.platform() === "linux") {
    // for linux
    envData = { OS: "linux" };
  } else {
    next(
      createError(500, {
        message:
          "Could not determine OS distribution. Only support windows and linux",
      })
    );
  }

  compiler.compilePython(envData, code, function (data) {
    console.log(data);
    res.send(data);
  });
}

module.exports = pythonController;
