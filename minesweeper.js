var GRID = [];
var ROW = 10;
var COLUMN = 10;
var GAME_IS_FINISH = false

function initialize(minesweep) {
  for (var row = 0; row < ROW; row++) {
    var tr = $('<tr />');
    GRID[row] = [];

    for (var column = 0; column < COLUMN; column++) {
      var td = $('<td class="unopened" />')
      GRID[row][column] = td;
      tr.append(td);
    }
    minesweep.append(tr);
  }
}


function getRandomNumber() {
  var probability = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 5, 4, 1, 5, 6, 7, 8];

  var number = Math.floor(Math.random() * probability.length);
  return probability[number];
}


function restartGame(){
  location.reload();
}


function loseGame(){
  var td = $('td')

  if (td.hasClass('mine')){
    setTimeout(function(){
      console.log('your score is ', getResult())
      GAME_IS_FINISH = true
      // td.removeClass().addClass('opened')
      $('body').append('<h1>Game Over</h1><h4>Score: '+ getResult()+'</h4><button onclick="restartGame()">Rejouer</button>').css("text-align", "center")
    }, 100)
  }
}

function getResult(){
  var sum = 0;
  $('.score-mine').each(function(){
    // console.debug(parseInt($(this).attr('data-number')))
    sum += parseInt($(this).attr('data-number'))
  })
  return sum
}

$(document).ready(function(){
  var minesweep = $('#minesweeper');
  initialize(minesweep);

  minesweep.find('td').on('mousedown', function(){
    if (GAME_IS_FINISH) return

    if($(this).hasClass('unopened')){
      if(getRandomNumber() === 5){
        $(this).removeClass().addClass('mine')
        loseGame()
      }
      else {
        var randomNumber = getRandomNumber()
        console.log(randomNumber)
        $(this)
          .removeClass()
          .addClass('mine-neighbour-'+randomNumber)
          .addClass('score-mine')
          .attr('data-number', randomNumber)

      }
    }
  })
});



//// ***PROGRA OBJET****////
// class Game {
//   constructor(row, column) {
//     this.grid = []
//     this.row = row
//     this.row = column

//   }


//   initialize(minesweep) {
//     for (var row = 0; row < ROW; row++) {
//       var tr = $('<tr />');
//       this.grid[row] = [];

//       for (var column = 0; column < COLUMN; column++) {
//         var td = $('<td class="unopened" />')
//         GRID[row][column] = td;
//         tr.append(td);
//       }
//       minesweep.append(tr);
//     }
//   }
// }


// new Game(10, 10)
