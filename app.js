var app = require('./config/server');

//app listen na porta 80 é padrão
var server = app.listen(80, function () {
    console.log('Servidor ON');
});

var io = require('socket.io').listen(server);

app.set('io', io);

//app.set('nome variavel'), para criar uma variavel global
//criando conexao do websocket
io.on('connection', function (socket) {
    console.log('Usuário conectou');

    socket.on('disconnect', function (data) {
        console.log('Usuário desconectou');
    });

    socket.on('msgParaServidor', function (data) {

        socket.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        );

        socket.broadcast.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        );

        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
                socket.emit(
                    'participantesParaCliente',
                    { apelido: data.apelido}
                );

                socket.broadcast.emit(
                    'participantesParaCliente',
                    { apelido: data.apelido}
                );
            }
        });

    });