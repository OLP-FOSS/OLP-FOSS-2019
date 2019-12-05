window.blockchain = {
    savecontract: '0xDf36B3118DD133173798a523E32B0CAEb1056205',
    elocontract: '0x5FbB3fF86ada45c44dE6087D59B40c5D4D4E3f72',
    saveabi: [
        { "constant": false, "inputs": [{ "name": "x", "type": "string" }], "name": "set", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" },
        { "constant": false, "inputs": [{ "name": "x", "type": "uint256" }], "name": "remove", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" },
        { "constant": true, "inputs": [{ "name": "x", "type": "uint256" }], "name": "get", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" },
        { "constant": true, "inputs": [], "name": "count", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }
    ],
    eloabi: [
        { "constant": false, "inputs": [{ "name": "act", "type": "uint256" }], "name": "action", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" },
        { "constant": false, "inputs": [], "name": "reset", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" },
        { "constant": true, "inputs": [], "name": "get", "outputs": [{ "name": "", "type": "uint" }, { "name": "", "type": "uint" }], "payable": false, "stateMutability": "view", "type": "function" }
    ],
    save_value: function (val, callback) {
        try {
            var myAbi = web3.eth.contract(blockchain.saveabi);
            var myfunction = myAbi.at(blockchain.savecontract);
            myfunction.set.sendTransaction(val, { from: web3.eth.defaultAccount, gas: 4000000 }, function (error, result) {
                if (!error) {
                    callback(result);
                } else {
                    console.log(error);
                }
            });
        } catch (err) {
            console.log(err);
        }
    },
    remove_value: function (val, callback) {
        try {
            var myAbi = web3.eth.contract(blockchain.saveabi);
            var myfunction = myAbi.at(blockchain.savecontract);
            myfunction.remove.sendTransaction(val, { from: web3.eth.defaultAccount, gas: 4000000 }, function (error, result) {
                if (!error) {
                    callback(result);
                } else {
                    console.log(error);
                }
            });
        } catch (err) {
            console.log(err);
        }
    },
    get_value: function (id, callback) {
        try {
            var myAbi = web3.eth.contract(blockchain.saveabi);
            var myfunction = myAbi.at(blockchain.savecontract);
            myfunction.get.call(id, function (err, binary) {
                if (err) {
                    console.log(err)
                }
                if (binary) {
                    callback(binary);
                    return;
                }
            });
        } catch (err) {
            console.log(err);
        }
        callback(null);
    },
    count: function (callback) {
        try {
            var myAbi = web3.eth.contract(blockchain.saveabi);
            var myfunction = myAbi.at(blockchain.savecontract);
            myfunction.count.call(function (err, binary) {
                if (err) {
                    console.log(err);
                    callback(null);
                }
                if (binary) {
                    callback(binary);
                    return;
                }
            });
        } catch (err) {
            console.log(err);
        }
    },
    save_json_continue: function (msg) {
        var json = JSON.stringify(msg);
        console.log(json);
        blockchain.save_value(json, function (val) {
            prompt("Saving, Trans ID:", val);
        });
    },
    get_elo: function (callback) {
        try {
            var myAbi = web3.eth.contract(blockchain.eloabi);
            var myfunction = myAbi.at(blockchain.elocontract);
            myfunction.get.call(function (err, binary) {
                if (err) {
                    console.log(err);
                    callback(null);
                }
                if (binary) {
                    callback(binary);
                    return;
                }
            });
        } catch (err) {
            console.log(err);
        }
    },
    action_elo: function (act, callback) {
        try {
            var myAbi = web3.eth.contract(blockchain.eloabi);
            var myfunction = myAbi.at(blockchain.elocontract);
            myfunction.action.sendTransaction(act, { from: web3.eth.defaultAccount, gas: 4000000 }, function (error, result) {
                if (!error) {
                    callback(result);
                } else {
                    console.log(error);
                }
            });
        } catch (err) {
            console.log(err);
        }
    },
};

var blockchainUpdateElo = function (act) {
    blockchain.action_elo(act, function (val) {
        prompt("ELO updating, Trans ID:", val);
    });
};

var updateSaveCount = function () {
    blockchain.count(function (val) {
    try {
        $('#blockchainCount').html('none');
        var i = parseInt(val.c[0]);
        var temp = [];
        if (i > 0) {
            $('#blockchainCount').html('');
            while (i != 0) {
                temp.push(i - 1);
                i--;
            }
            $('#blockchainCount').append(temp.join(', '));
        }

    } catch (e) { }
});
};

var getRank = function (point) {
    if (point < 8000) {
        return 'Tập sự';
    } else if (point >= 8000 && point <= 18000) {
        return 'Kỳ thủ';
    } else if (point > 18000) {
        return 'Kỳ vương';
    }
};

var updateEloCount = function () {
    blockchain.get_elo(function (val) {
        try {
            $('#blockchainElo').html('none');
            var i = parseInt(val[0].c[0]);
            var j = parseInt(val[1].c[0])
            if (i >= 0 && j >= 0) {
                player_level = getRank(i);                
                opponent_level = getRank(j);
                $('#blockchainElo').html('player: ' + i + ', opponents: ' + j + '</br>' + 'Rank: player=<i>' + player_level + '</i> opponent=<i>' + opponent_level + '</i>(0-TS-8000-KT-18000-KV)');
            }

        } catch (e) { }
    });
};

$(document).ready(function () {
    if (typeof web3 === 'undefined') {
        alert('You need <a href="https://metamask.io/">MetaMask</a> browser plugin to run this!');
    }
    $("#saveBtn").on("click", function (e) {
        var id = confirm("Are you sure?");
        if (id) {
            socket.emit("save json");
        }
    });
    $("#deleteBtn").on("click", function (e) {
        var id = prompt("Enter match ID:", "");
        if (id) {
            id = parseInt(id);
            if (id && id > 0) {
                blockchain.remove_value(id, function (val) {
                    prompt("Deleting, Trans ID:", val);
                });
            }
        }
    });

    $("#loadBtn").on("click", function (e) {
        var id = prompt("Enter match ID:", "");
        if (id) {
            id = parseInt(id);
            if (id && id > 0) {
                blockchain.get_value(id, function (val) {
                    try {
                        var json = JSON.parse(val);
                        console.log(json);
                        socket.emit('load json', json, function(err, success) {
                            if (success) {
                                resetCountingInfo(0);
                            }
                        });
                    } catch (e) {
                        console.log(e);
                    }
                })
            }
        }
    });

    //window.web3 = new Web3(
    //    new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'),
    //);
    //console.log(web3.currentProvider.connected);
});
