module.exports.home = function (application, req, res) {
    res.render("index",
        { validacao: {} });
}

//controllers entregam as views reendenizadas