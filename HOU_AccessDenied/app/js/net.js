socket.on('chat message', function (msg) {
    appendMessage(msg + "\n");
});

socket.on('renamed', function (msg) {
    playerName = msg;
});

socket.on('save json', function (msg) {
    window.blockchain.save_json_continue(msg);
});

socket.on('opponent disconnected', function (msg) {
    endGame(msg, false);
});

socket.on('opponent pennalty', function (msg) {
    endGame(msg, true);
});

socket.on('make a move', function (msg) {
    console.log(msg);
    if (typeof msg.timeToMove !== 'undefined') {
        resetCountingInfo(msg.timeToMove);
    }
    setValue(msg.x, msg.y, msg.value);
    if (msg.isWinningMove.status) {
        drawResultLine(msg.isWinningMove.data);
        setTimeout(function () {
            endGame(msg.value, false);
        }, 500);
        return;
    } else {
        
    }
    currentTurn = msg.nextTurn;
    currentTurnStyle();
    canMove = true;
});

socket.on('join table', function (msg) {
    currentTurn = msg.currentTurn;
    playerType = msg.playerX === playerName ? "x" : "o";
    $("#player" + playerType.toUpperCase()).removeClass("list-group-item-danger").addClass("list-group-item-success");
    $("#playerX").text("[X] " + msg.playerX);
    $("#playerO").text("[O] " + msg.playerO);
    $("#player" + currentTurn.toUpperCase()).addClass("current");
    $("ul").first().show();
    $("#leaveBtn").show();
    $("#statusPanel").show();
    $("#messagePanel").show();
    $("#loadingTxt").hide();
    removeOverlay();

    updateSaveCount();
    updateEloCount();
});

$(document).ready(function () {
    $("#joinBtn").on("click", function (e) {
        var name = $("#nameTxt").val();
        if (name.length < 1) {
            alert('Error! Your name must contains at least 1 characters!');
            return;
        }
        var $this = $(this);
        socket.emit('join queue', name);
        playerName = name;
        $("#loadingTxt").show();
        $this.parents("div").first().hide();
    });

    $("#leaveBtn").on("click", function (e) {
        if (overlayContainter !== null)
            return;
        socket.emit("leave game", null);
    });

    $("#sendBtn").on("click", function (e) {
        sendMessage();
    });

    $("#messageTxt").keypress(function (e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            e.preventDefault();
            sendMessage();
        }
    });
});

var sidebarInit = function () {
    //side bar (re)init
    $("#loadingTxt").show();
    $("#messageTxt").val("");
    $("#logPanel").val("");
    $("ul").first().hide();
    $("#leaveBtn").hide();
    $("#statusPanel").hide();
    $("#messagePanel").hide();
    $(".current").first().removeClass("current");
    $("#player" + playerType.toUpperCase()).removeClass("list-group-item-success").addClass("list-group-item-danger");
};

var endGame = function (value, pennalty = false) {
    var type = (value === playerType ? " WIN!" : " LOSE!");
    var addon = pennalty ? " (UNEXEPECTED)" : "";
    alert("YOU " + addon + type);
    socket.emit('join queue', playerName);
    stage.clear();
    stage.removeAllChildren();
    sidebarInit();
    init();
    if (!pennalty) {
        blockchainUpdateElo((type == " WIN!") ? 1 : 3);
    }
};

var makeAMove = function (x, y) {
    socket.emit('make a move', {x: x, y: y}, function (msg) {
        if (!msg.ok) {
            alert('ERROR: CANNOT MAKE A MOVE');
            canMove = true;
        }
    });
};

var currentTurnStyle = function () {
    $("#playerX").toggleClass("current");
    $("#playerO").toggleClass("current");
};

var sendMessage = function (e) {
    var $messageTxt = $("#messageTxt");
    var msg = $messageTxt.val();
    $messageTxt.val("");
    appendMessage(playerName + ": " + msg + "\n");
    socket.emit('chat message', msg);
};

var appendMessage = function (msg) {
    var $logPanel = $("#logPanel");
    $logPanel.val($logPanel.val() + msg);
    if ($logPanel.length)
        $logPanel.scrollTop($logPanel[0].scrollHeight - $logPanel.height());
};