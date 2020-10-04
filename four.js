console.log("hi");
var plyr1= prompt("Player one : Enter Your Name , You will be Blue");
var plyr1clr='rgb(86, 151, 255)';

var plyr2= prompt("Player Two : Enter Your Name , You will be Red");
var plyr2clr='rgb(237, 45, 73)';

var game_on=true;
var table= $("table tr");

function reportWin(rowNum, colNum)
{
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}

function chColor(rowIndex,colIndex,color)
{
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);

}

function retColor(rowIndex,colIndex)
{
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');


}

function chBottom(colIndex)
{
  var colorReport=retColor(5,colIndex);
  for (var row = 6; row > 0 ; row--) {
    colorReport=retColor(row,colIndex);
    if(colorReport=== 'rgb(128, 128, 128)')
     {
       return row;
     }
  }
}


function colorMatchCheck(one,two,three,four){
  return(one==two && one==three && one== four && one!=='rgb(128, 128, 128)' && one!=undefined);
}


function hWinCheck()
{
  for(var row= 0; row<6 ;row++)
   {
      for(var col= 0; col<4 ;col++){
        if(colorMatchCheck(retColor(row,col), retColor( row,col+1), retColor( row,col+2), retColor( row,col+3)))
        {console.log("horizontal");
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
      }
   }
}

function vWinCheck()
{
  for(var col= 0; col<7 ;col++)
   {
      for(var row= 0; row < 3 ;row++){
        if(colorMatchCheck(retColor(row,col), retColor( row+1,col), retColor( row+2,col), retColor( row+3,col)))
        {console.log("vertical");

        reportWin(row,col);
        return true;
      }else {
        continue;
      }
      }
   }
}

function dWinCheck()
{
  for(var col= 0; col<=5 ;col++)
   {
      for(var row= 0; row<7 ;row++)
      {
        if(colorMatchCheck(retColor(row,col), retColor( row+1,col+1), retColor( row+2,col+2), retColor( row+3,col+3)))
        {
          console.log("diagonal");
          reportWin(row,col);
          return true;
        }else if(colorMatchCheck(retColor(row,col), retColor( row-1,col+1), retColor( row-2,col+2), retColor( row-3,col+3)))
            {
              console.log("diagonal");
              reportWin(row,col);
              return true;
            }
            else{
           continue;
         }
      }
   }
}
//

var currentPlayer=1;
var currentName =plyr1;
var currentColor= plyr1clr;

$('h3').text(currentName + " it is your turn to pick a column to drop a chip");

$('.brd button').on('click',function()
 {
  var col=$(this).closest('td').index();

  var bottomAvail=chBottom(col);
  chColor(bottomAvail,col,currentColor);

  if(hWinCheck() || vWinCheck() || dWinCheck())
  {
    $('h2').text(currentName + " you have won")
    $('h3').fadeOut('3000');
    $('h1').fadeOut('3000');
  }

  currentPlayer= currentPlayer *-1;
  if(currentPlayer===1)
  {
    currentName=plyr1;
    $('h3').text(currentName+ " it is your turn")
    currentColor=plyr1clr;
  }else {
    currentName=plyr2;
    $('h3').text(currentName+ " it is your turn")
    currentColor=plyr2clr;
  }
});
