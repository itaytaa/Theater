'use strict';

var gSelectedPos = null;
var gElSelectedSeat = null;
var gCinema = createCinema();
console.table(gCinema)
renderBoard()






//buile a 7X15 board;

function createCinema() {
    var board = [];
    for (var i = 0; i < 7; i++) {
        board[i] = [];
        for (var j = 0; j < 15; j++) {
            board[i][j] = {
                type: 'SEAT',
                price: 4,
                isBooked: false
            };
            if (j === 7) board[i][j] = { type: 'EMPTY' }
        }
    }
    return board;
}

//render the board

function renderBoard() {
    var strHtml = '<tbody>'
    for (var i = 0; i < gCinema.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < gCinema[i].length; j++) {
            var cell = gCinema[i][j];
            var cellClass = (cell.type === 'SEAT') ? ' seat' : '';
            if (gCinema[i][j].isBooked) {
                cellClass += ' booked';
            }
            if (j < 7) {
                cellClass += ' left';
            } else if (j > 7) {
                cellClass += ' right';
            }
            strHtml += `<td class="${cellClass} cell pos-${i}-${j}" onclick="selectSeat(this,${i},${j})"> </td>`

        }
        strHtml += '</tr>'
    }
    strHtml += '</tbody>';
    document.querySelector('table').innerHTML = strHtml;
}

function selectSeat(element, i, j) {
    var cell = gCinema[i][j];
    if (cell.type === 'EMPTY') return;
    element.classList.toggle('selected');
    if (gElSelectedSeat) {

        gElSelectedSeat.classList.remove('selected');


    }
    gElSelectedSeat = (gElSelectedSeat === element) ? null : element;
    if (gElSelectedSeat === element) gSelectedPos = { i: i, j: j }
    if (gElSelectedSeat === null) gSelectedPos = null;
    if (gElSelectedSeat) {
        showPop(i, j);
    } else {
        hidePop();
    }

}

function showPop(i, j) {
    var popUp = document.querySelector(".pop-up");
    var price = gCinema[i][j].price;
    document.querySelector('.pop-price').innerText = price;
    document.querySelector('.pop-seat').innerText = ` ${i + 1}-${j + 1}`;
    console.log(popUp)
    popUp.hidden = false;

}
function hidePop(i, j) {
    // debugger
    var popUp = document.querySelector(".pop-up");

    popUp.hidden = true;

}



function bookSeat() {
    debugger
    var seat = gCinema[gSelectedPos.i][gSelectedPos.j];
    seat.isBooked = true;
    renderBoard()

}




