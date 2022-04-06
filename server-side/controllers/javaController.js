function javaController(req, res) {
    console.log(req.body)
    res.send("javaCompiler")
}

module.exports = javaController;
