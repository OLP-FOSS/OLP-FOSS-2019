var http = require('http').Server(function (req, res) {
    res.writeHead(301, {
        "location": "http://localhost"
    });
    res.end();
});

var io = require('socket.io')(http);
var Table = require('./_table.js');

var waitingQueue = [];
var tableCount = 1;

setInterval(function () {
    if (waitingQueue.length < 2)
        return;

    var index = Math.floor(Math.random() * waitingQueue.length);
    var playerX = waitingQueue[index];
    waitingQueue.splice(index, 1);

    index = Math.floor(Math.random() * waitingQueue.length);
    var playerO = waitingQueue[index];
    waitingQueue.splice(index, 1);

    var name = "Table" + tableCount++;
    var table = new Table(playerX, playerO);

    playerX.join(name);
    playerO.join(name);
    playerX.table = table;
    playerO.table = table;

    playerX.currentTable = name;
    playerO.currentTable = name;

    if (playerX.playerName == playerO.playerName) {
        playerO.playerName += "1";
        playerO.emit("renamed", playerO.playerName);
    }

    io.to(name).emit('join table', {
        playerX: playerX.playerName,
        playerO: playerO.playerName,
        currentTurn: table.getCurrentTurn()
    });
}, 2000);

io.on('connection', function (socket) {
    console.log('Player (id: ' + socket.id + ') connected');

    var makeamove = function (data, fn) {
        console.log('player (' + socket.id + ') make a move at [' + data.x + ';' + data.y + ']');
        var table = socket.table;
        var result = table.makeAMove(data.x, data.y, Math.ceil(new Date().getTime() / 1000));
        var turn_count = table.getTurnCount();
        fn({ ok: result.status >= 0 });
        if (result.status >= 0) {
            io.to(socket.currentTable).emit('make a move', {
                x: data.x,
                y: data.y,
                value: table.getCurrentTurn(),
                nextTurn: table.nextTurn(),
                timeToMove: parseInt(table.getTimeToMove()),
                isWinningMove: {
                    status: result.status == 1,
                    data: result.data
                }
            });

            if (result.status == 1) {
                var playerX = table.getPlayerX();
                var playerO = table.getPlayerO();

                playerX.leave(socket.currentTable);
                playerO.leave(socket.currentTable);
                table = null;
                playerX.currentTable = null;
                playerO.currentTable = null;
                playerX.table = null;
                playerO.table = null;
            } else {
                setTimeout(function () {
                    console.log(table.getTurnCount());
                    console.log(turn_count);
                    if (table.getTurnCount() == turn_count) {
                        leaveTable(socket, table.getCurrentTurn());
                    }
                }, table.getTimeToMove() * 1000);
            }

        }
    };

    socket.on("make a move", makeamove);

    socket.on("load json", function (json) {
        if (json == null) {
            return;
        }
        console.log('player (' + socket.id + ') load json');
        console.log(json);
        var table = socket.table;
        try {
            table._turns = json._turns;
            table._lastTurnTime = json._lastTurnTime;
            if (table._turns.length > 0) {
                table._currentTurn = table._turns[0][0];
                for (var turn of table._turns) {
                    makeamove({x: turn[1], y: turn[2]}, function () {});
                }
            }
            table._currentTurn = json._currentTurn;
        } catch (e) {
            console.log(e);
        }
    });

    socket.on("save json", function () {
        var table = socket.table;
        io.to(socket.id).emit('save json', table.saveJson());
    });

    socket.on("join queue", function (data) {
        console.log('player (' + socket.id + ') named ' + data);
        socket.playerName = data;
        socket.table = null;
        socket.currentTable = null;
        waitingQueue.push(socket);
    });

    socket.on("leave game", function (data) {
        leaveTable(socket);
    });

    socket.on('disconnect', function () {
        console.log('player (' + socket.id + ') disconnected');
        leaveTable(socket);
    });

    socket.on('chat message', function (msg) {
        console.log('chat message from ' + socket.id + ': ' + msg);
        if (socket.currentTable) {
            var name = socket.currentTable;
            socket.broadcast.to(name).emit('chat message', socket.playerName + ": " + msg);
        }
    });
});

var leaveTable = function (socket, pennalty = false) {
    var index = waitingQueue.indexOf(socket);
    if (index != -1)
        waitingQueue.splice(index, 1);
    if (socket.table) {
        var table = socket.table;
        if (pennalty == false) {
            var winner;
            if (table.getPlayerX() == socket)
                winner = table.getPlayerO();
            else
                winner = table.getPlayerX();
            io.to(socket.currentTable).emit('opponent disconnected', winner == table.getPlayerX() ? "x" : "o");
            winner.table = null;
            table = null;
        } else {
            io.to(socket.currentTable).emit('opponent pennalty', (pennalty == 'x') ? 'o' : 'x');
        }
    }
};

http.listen(3000, function () {
    console.log('listen on *:3000');
});

