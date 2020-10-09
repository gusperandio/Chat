const { emit, connect } = require("../../config/server");

module.exports.iniciaChat = function (application, req, res) {
    //nome da view
    var dadosForm = req.body;

    req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou apelido deve ser maior que 3 ou menor que 15').len(3, 15);

    var errosDevalidacao = req.validationErrors();

    if (errosDevalidacao) {
        res.render("index", { validacao: errosDevalidacao });
        return;
    }

    application.get('io').emit(
        'msgParaCliente',
        { apelido: dadosForm.apelido, mensagem: 'Acabou de entrar no chat' }
    );

    res.render("chat", { dadosForm: dadosForm });


}

//controllers entregam as views reendenizadas