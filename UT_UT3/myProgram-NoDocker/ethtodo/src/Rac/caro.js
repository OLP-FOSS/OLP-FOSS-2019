const X = 1, O = 2, Empty = 0;
const noOfRow = 16, noOfCol = 16;
var Turn = X;
var time=10;
var checkTurn = true; // to check player turn
var gamming = false; //Gamming or Not.
var noOfPiece = 0; //number of Pieces on the table -> to check draw
var bestMove = {row:0, col:0};
var sq = new Array(); /* define an array storing XO position */
for (var i = 0; i < noOfRow; i++) {
	sq[i] = new Array();
	for (var j = 0; j < noOfCol; j++) {
		sq[i][j]=0;
	}
}

function isWin(){
	if (noOfPiece == 	noOfCol*noOfRow){
		return 3; //Draw
	}
	// horizontally eval (col +-)
	var valStr = ''; //1:X, 2: O, 0: Empty or Out of Board, 3: concat two line
	for (var i = 0; i < noOfRow; i++) {
		valStr += '0' + sq[i].join('') + '03';
	}
	// vertically eval (row +-)
	//1:X, 2: O, 0: Empty or Out of Board, 3: concat two line
	for (var j = 0; j < noOfCol; j++) {
		valStr += '0';
		for (var i = 0; i < noOfRow; i++) {
			valStr += sq[i][j];
		}
		valStr += '03';	
	}
	// dia from top
	 //1:X, 2: O, 0: Empty or Out of Board, 3: concat two line
	for (var k = 0; k < noOfCol; k++) {
		valStr += '0';
			i=0; j=k;
			while (i < noOfRow && j < noOfCol){
				valStr += sq[i][j];
				i++; j++;
			}
		valStr += '03';	
	}
	for (var k = 0; k < noOfCol; k++) {
		valStr += '0';
			i=0; j=k;
			while (i < noOfRow && j >= 0){
				valStr += sq[i][j];
				i++; j--;
			}
		valStr += '03';	
	}
	// dia from bottom
	for (var k = 0; k < noOfCol; k++) {
		valStr += '0';
			i=noOfRow-1; j=k;
			while (i >= 0 && j >= 0){
				valStr += sq[i][j];
				i--; j--;
			}
		valStr += '03';	
	}
	for (var k = 0; k < noOfCol; k++) {
		valStr += '0';
			i=noOfRow-1; j=k;
			while (i >= 0 && j < noOfCol){
				valStr += sq[i][j];
				i--; j++;
			}
		valStr += '03';	
	}

	if (valStr.search(/[^1]111110/) != -1 || valStr.search(/011111[^1]/) != -1){
		return 1
	}	
	if (valStr.search(/[^1]011110/) != -1 || valStr.search(/0111110[^1]/) != -1){
		return 1
	}	
	if (valStr.search(/[^2]222220/) != -1 || valStr.search(/022222[^2]/) != -1){
		return 2
	}
	if (valStr.search(/[^2]022220/) != -1 || valStr.search(/022220[^2]/) != -1){
		return 2
	}
	
};

// X: positive; O: negative;
function cval(){  // evaluate the board
	var cval_value = 0;
	var val = function(XO){
		var mArray = []; //Match [^1][01][01][01][01][01]0
		var value = 0;
		var count = 0 // count the number of pieces
		var regexp = (XO == X) ? /[^1][01][01][01][01][01]0/g : /[^2][02][02][02][02][02]0/g;
		var regexp2 = (XO == X) ? /0[01][01][01][01][01][^1]/g : /0[02][02][02][02][02][^2]/g;
		var	regexp3 = (XO == X) ? /1/g : /2/g;
		mArray = valStr.match(regexp).concat(valStr.match(regexp2));
		for (x in mArray) {
			count = (mArray[x].match(regexp3) || []).length; //number of XO;
			switch (count) {
				case 5: value += 100000000; break;
				case 4: value += 1000; break;
				case 3: value += 10; break;
				case 2: value += 1; break;
			}
		}
		return value;
	}
	// horizontally eval (col +-)
	var valStr = ''; //1:X, 2: O, 0: Empty or Out of Board, 3: concat two line
	for (var i = 0; i < noOfRow; i++) {
		valStr += '0' + sq[i].join('') + '03';
	}

	// vertically eval (row +-)
	//1:X, 2: O, 0: Empty or Out of Board, 3: concat two line
	for (var j = 0; j < noOfCol; j++) {
		valStr += '0';
		for (var i = 0; i < noOfRow; i++) {
			valStr += sq[i][j];
		}
		valStr += '03';	
	}
	// dia from top
	 //1:X, 2: O, 0: Empty or Out of Board, 3: concat two line
	for (var k = 0; k < noOfCol; k++) {
		valStr += '0';
			i=0; j=k;
			while (i < noOfRow && j < noOfCol){
				valStr += sq[i][j];
				i++; j++;
			}
		valStr += '03';	
	}
	for (var k = 0; k < noOfCol; k++) {
		valStr += '0';
			i=0; j=k;
			while (i < noOfRow && j >= 0){
				valStr += sq[i][j];
				i++; j--;
			}
		valStr += '03';	
	}
	// dia from bottom
	for (var k = 0; k < noOfCol; k++) {
		valStr += '0';
			i=noOfRow-1; j=k;
			while (i >= 0 && j >= 0){
				valStr += sq[i][j];
				i--; j--;
			}
		valStr += '03';	
	}
	for (var k = 0; k < noOfCol; k++) {
		valStr += '0';
			i=noOfRow-1; j=k;
			while (i >= 0 && j < noOfCol){
				valStr += sq[i][j];
				i--; j++;
			}
		valStr += '03';	
	}
	cval_value = val(O) - val(X);
	return cval_value;
}

function alphabeta(XO,alpha,beta, depth){
	if (depth==0){
		return cval();
	}
	if (isWin() == X){
		return -999999999;
	}
	if (isWin() == O){
		return 999999999;
	}
	var moveGen = function (XO){
		this.moveRow = new Array();
		this.moveCol = new Array();
		this.noOfMove = 0;
		var possi = new Array(); /* define an array storing possible position */
		for (var i = 0; i < noOfRow; i++) {
			possi[i] = new Array();
			for (var j = 0; j < noOfCol; j++) {
				possi[i][j]=false;
			}
		}
		for (var i = 0; i < noOfRow; i++) {
			for (var j = 0; j < noOfCol; j++) {
				if ((sq[i][j] == Empty) && (!possi[i][j])){
					for (var stepI = -1; stepI <= 1; stepI++) {
						for (var stepJ = -1; stepJ <= 1; stepJ++) {
							if (i+stepI>=0 && i+stepI<noOfRow && j+stepJ>=0 && j+stepJ<noOfCol){
								if (sq[i+stepI][j+stepJ] != Empty){
									possi[i][j] = true;
								} 
							}
						}
					}
				}
			}
		}
		for (var i = 0; i < noOfRow; i++) {
			for (var j = 0; j < noOfCol; j++) {
				if (possi[i][j]){
					this.noOfMove++;
					this.moveRow[this.noOfMove]=i;
					this.moveCol[this.noOfMove]=j;
					
				}
			}
		}
	}
	var makeMove = function(moveBoard, movePointer, XO){
		sq[moveBoard.moveRow[movePointer]][moveBoard.moveCol[movePointer]] = XO;
	}
	var undoMove = function(moveBoard, movePointer){
		sq[moveBoard.moveRow[movePointer]][moveBoard.moveCol[movePointer]] = Empty;
	}
	var gen = new moveGen(XO);
	var movePointer = 1;
	var score;
    if(XO == O){ //Max's Turn
    	while(movePointer <= gen.noOfMove){
    		makeMove(gen, movePointer, XO);
    		score = alphabeta(X, alpha, beta, depth-1);
    		undoMove(gen, movePointer);
    		if (score > alpha){
    			bestMove.row = gen.moveRow[movePointer];
    			bestMove.col = gen.moveCol[movePointer];
    			alpha = score; //(we have found a better best move)
    		}
    		if (alpha >= beta){
    			return alpha //(cut off);
    		}
    		movePointer++;
    	}
    	return alpha; //best move
    } else { //Min's Turn
    	while(movePointer <= gen.noOfMove){
    		makeMove(gen, movePointer, XO);
    		score = alphabeta(O, alpha, beta, depth-1);
    		undoMove(gen, movePointer);
    		if (score < beta){
    			beta = score; //(opponent has found a better worse move)
    		}
    		if (alpha >= beta) return beta //(cut off);
    		movePointer++;
    	}
    	return beta; //(this is the opponent's best move)
    }
}




function checkWin(){
	var result = isWin();
		if ( result == 1){	//check from current sq: has  the current player won?
			alert('X Thắng!');
			gamming = false;
			clearTimeout(timeout);
		} else if ( result == 2){
			alert('O Thắng!');
			gamming = false;
		} else if (result == 3) {  //check draw
			alert('Hoà!');
			gamming = false;
			clearTimeout(timeout);
		}
}


/* when click a square */
function sqClick(row, col) {
	time= 10;
	if (gamming && sq[row][col] == 0 && Turn == X) {
		sq[row][col] = X;
		sqUpdate(row, col);
		noOfPiece++;
		Turn = O;
		checkWin()
	}else{
		sq[row][col] = O;
		sqUpdate(row, col);
		noOfPiece++;
		Turn = X;
		checkWin()
	}	


	// if (gamming && sq[row][col] == 0) {
	// 	if(Turn == X){
	// 		sq[row][col] = X;
	// 		backgroundAdjust();
	// 		Turn = O;
	// 	}
	// 	else{
	// 		backgroundAdjust();
	// 		Turn = X;
	// 		sq[row][col] = O;
	// 	}
	// 	noOfPiece++;
		
	// 	sqUpdate(row, col);
	// 	checkWin()
	// 	alphabeta(O, -Infinity, Infinity, 2);
	// 	noOfPiece++;
	// 	checkWin()
	// }	
}

function sqMouseOver(row, col) {
	if (gamming && sq[row][col] == 0 && Turn == X) {
		var HTML='<img style="opacity: 0.5" src="img/x.png">';
		document.getElementById('s'+String('00' + row).slice(-2)+String('00' + col).slice(-2)+'').innerHTML = HTML;
	}
}


function undo(){
	alert('Chơi với máy đã gà thế này rồi nên không có chơi lại nha! :D :D ');
}

function resign(){
	gamming = false;
	alert('Bạn đã chịu thua. :D :D')
}

function newGame(){
	setTime();
	for (var i = 0; i < noOfRow; i++) {
		for (var j = 0; j < noOfCol; j++) {
			sq[i][j]=0;
			sqUpdate(i, j);
		}
	}
	Turn = X;
	gamming = true;
	noOfPiece = 0;
}

function sqUpdate(i,j){
	var OHtml='<img src="img/o.png">';
	var XHtml='<img src="img/x.png">';
	if (sq[i][j] == O){
		document.getElementById('s'+String('00' + i).slice(-2)+String('00' + j).slice(-2)+'').innerHTML = OHtml;
	} else if (sq[i][j] == X){
		document.getElementById('s'+String('00' + i).slice(-2)+String('00' + j).slice(-2)+'').innerHTML = XHtml;
	} else {
		document.getElementById('s'+String('00' + i).slice(-2)+String('00' + j).slice(-2)+'').innerHTML = '';
	}
}

function backgroundAdjust(){
	if(Turn == X){
		//background == blue
		document.getElementById("bodyid").style.background ="blue";
	}
	else{
		//backgound == red
		document.getElementById("bodyid").style.background ="red";
	}
}

 function setTime(){
	timeout = setTimeout(function(){
		time--;
		document.getElementById("time").innerHTML= time;
		setTime();
		if(time == 0){
			if(Turn == X){
				alert('O Thắng!');
				gamming = false;
				clearTimeout(timeout);
				
			}
			else{
				alert('X Thắng!');
				gamming = false;
				clearTimeout(timeout);
			}
		}
    }, 1000);
}