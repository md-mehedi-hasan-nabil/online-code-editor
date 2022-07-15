const { spawn } = require('child_process');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const runProgram = require('../lib/runProgram');

async function goController(req, res, next) {
  try {
    let output = '';
    const { editorCode } = req.body;
    // generate file name
    const filename = uuidv4() + '-' + Date.now() + '.go';
    // root directory and working path
    const root_directory = path.resolve(__dirname + '../../');
    const working_path = root_directory + '/temp/';
    const filepath = working_path + filename;
    // create temp folder
    if (!fs.existsSync(working_path)) {
      fs.mkdirSync(working_path);
    }
    // create python file in temp folder
    fs.writeFileSync(filepath, editorCode);

    // run java file
    const run = await spawn('go', [filepath]);
    const { stdout, stderr } = run;

    stdout.on('data', function (data) {
      console.log(data.toString());
      output += data.toString();
    });

    stderr.on('data', function (error) {
      console.log('error: ' + error);
    });

    run.on('close', function (code) {
      // check and delect java file
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      res.status(200).json({
        output,
      });
      output = '';
    });
  } catch (error) {
    next(error);
  }
}

module.exports = goController;
