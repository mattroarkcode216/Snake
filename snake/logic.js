/*move html element in to js script for logic interpretation*/
var canvas = document.getElementById('myCanvas');
var ctx= canvas.getContext('2d');




  /*default numbers*/
  const block = 32;
  const boardZeroX = block;
  const boardZeroY = block*3;
  /*pictures*/
  const background = new Image();
  background.src = 'Assets/images/background.png';
  const fruit = new Image();
  fruit.src = 'Assets/images/fruit.png';
  /*sounds*/
  let yumSound = new Audio();
  yumSound.src = "Assets/sounds/pluck_001.ogg"
  let deadSound= new Audio();
  deadSound.src ="Assets/sounds/error_008.ogg";




/*set up variables*/

  // event listener
  let d;
  document.addEventListener("keydown",direction);

  function direction(event){
    if(event.keyCode == 37 && d!="RIGHT"){
        d="LEFT"
        

    }
    if(event.keyCode == 40&& d!="DOWN"){
        d="UP"
        
    }
    if(event.keyCode == 39&& d!="LEFT"){
        d="RIGHT"
        
    }
    if(event.keyCode == 38&& d!="UP"){
        d="DOWN"
        
    }


  }



  // the snake
  let snake = [];
  snake[0] = {x:9*block,y:10*block};
  //food
  let food = {
    x: Math.floor(Math.random()*17 +1)*block,
    y: Math.floor(Math.random()*15 +3)*block};


  // score
  let score = 0;

  function collision(newHead,snake){
    
    //if snake hits itself return true
    for(let i =0; i<snake.length;i++){

     
      if(newHead.x == snake[i].x&&newHead.y==snake[i].y){
        return true;
  
      }
      
    }
    return false;
  }
  



/*for drawing the game*/
function draw(){
  ctx.drawImage(background, 0, 0);
  
  //draws all boxs of snake
  for(let i = 0; i<snake.length;i++){
    // if i is zero then green else white;
    ctx.fillStyle = (i==0)? "yellow":"white";
    ctx.fillRect(snake[i].x,snake[i].y,block,block);

    ctx.stokeStyle = "red";
    ctx.strokeRect(snake[i].x,snake[i].y,block,block);
  }

  //draws fruit in random places
  ctx.drawImage(fruit,food.x,food.y,block,block);
  
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // which direction
  if(d =="LEFT")snakeX -=block;
  if(d =="UP")snakeY +=block;
  if(d =="DOWN")snakeY -=block;
  if(d =="RIGHT")snakeX +=block;
  // remove tail
  
  if(snakeX == food.x && snakeY == food.y){

    score++;
    yumSound.play();
   food = {
      x: Math.floor(Math.random()*17 +1)*block,
      y: Math.floor(Math.random()*15 +3)*block};
  
  }
  else{
    snake.pop();
  
  }  
  
  let newHead ={
    x:snakeX,
    y:snakeY
  }
  //gameover Rules
  if(snakeX < block|| snakeX >17*block || snakeY < 3*block||snakeY >17*block|| collision(newHead,snake)){
      deadSound.play();
  

      clearInterval(game);
      

  }


  //create new head


  snake.unshift(newHead);
  
  // draws score
  ctx.fillStyle ="white";
  ctx.font="45px kabob-extrabold";
  ctx.fillText(score,3.75*block,block*2);
}
//return if hit head of snake hits itself

let game = setInterval( draw,100);

// for testing the images to see how they look.

