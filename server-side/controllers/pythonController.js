const compiler = require("compilex");
const os = require("os");
const createError = require("http-errors");

function pythonController(req, res, next) {
  console.log(req.body);
  const options = { stats: true };
  compiler.init(options);

  let envData = {};
  const { editorCode, takeInput } = req.body;

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

  if (takeInput) {
    // Python with inputs
    let input = 5;
    compiler.compilePythonWithInput(
      envData,
      editorCode,
      input,
      function (data) {
        res.send(data);
      }
    );
  } else {
    compiler.compilePython(envData, editorCode, function (data) {
      console.log(data);
      res.send(data);
    });
  }
}

module.exports = pythonController;
