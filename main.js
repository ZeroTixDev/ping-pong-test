"use strict"
const canvas = document.createElement("canvas")
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
document.body.appendChild(canvas)
const ctx = canvas.getContext("2d")
ctx.textAlign = "center"
ctx.textBaseline = "center"
let scale = resize(canvas)
let startAnimationTime;
let winnerNumber;
let lastTime = 0;
let paddles; 
let ball;
const scores = [0,0]
const state = new State("start", {start: ()=>{
  startAnimationTime = START_ANIMATION_TIME;
},game: ()=>{
	paddles = [new Paddle({x:GAME_PADDING, y:CENTER.y - GAME_PADDING / 2}), 
	new Paddle({x:GAME_WIDTH - GAME_PADDING,y: CENTER.y - GAME_PADDING / 2})] 
	ball = new Ball()
	tick = 0;
	states = [{paddles,ball}]
	inputs = [new Input([false,false,false,false])]
},result: ()=>{
	startAnimationTime = 0;
}})
let tick = 0;
let states = []
let inputs = []
const currentInput = new Input([false,false,false,false])
window.addEventListener("resize", () => {
	scale = resize(canvas)
})
window.requestAnimationFrame(run)
window.addEventListener("keydown", (event)=>{
	Input.trackKeys(event, paddles, currentInput)
})
window.addEventListener("keyup", (event)=>{
	Input.trackKeys(event, paddles, currentInput)
})

function run(time){
	const delta = (time - lastTime) / 1000
	lastTime = time;
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	if(state.value === "start") {
		startAnimationTime -= delta;
		ctx.fillStyle = `rgb(255,255,255)`
		ctx.font = `${START_ANIMATION_TIME / startAnimationTime * 10}px Arial`
		ctx.fillText("PING PONG", CENTER.x, CENTER.y)
		if(startAnimationTime <= 0) state.setState("game")
	} else if(state.value === "game") {
		
		for(let i = 0; i < paddles.length; i ++) {
			const paddle = paddles[i]
			paddle.update(delta)
			if(paddle.flash && paddle.flash_time >= paddle.flash_time_max) {
				winnerNumber = i + 1;
				scores[i]++;
				state.setState("result")
			}
		}
		for(let i = 0; i < paddles.length; i ++) {
			const paddle = paddles[i]
			if(paddle.flash && paddle.flash_time >= paddle.flash_time_max) {
				winnerNumber = i + 1;
				scores[i]++;
				state.setState("result")
			}
		}
		ball.update(delta, paddles)
		for(let paddle of paddles) {
			paddle.render(ctx)
		}
		ball.render(ctx)
	  if(ctx.font != "50px Arial") ctx.font = "50px Arial"
		ctx.fillStyle = "white"
		ctx.fillText(`${scores[0]}`, CENTER.x - GAME_PADDING, GAME_PADDING)
		ctx.fillText(`${scores[1]}`, CENTER.x + GAME_PADDING, GAME_PADDING)
	} else if(state.value === "result") {
		startAnimationTime -= delta;
		ctx.fillStyle = `rgb(255,255,255)`
		ctx.font = `${-START_ANIMATION_TIME / startAnimationTime * 10}px Arial`
		ctx.fillText(`Player ${winnerNumber} has won!`, CENTER.x, CENTER.y)
		if(startAnimationTime <= -START_ANIMATION_TIME) {
			state.setState("game")
		}
	}
	window.requestAnimationFrame(run)
}
CanvasRenderingContext2D.prototype.circle = function(x,y,r) {
	ctx.arc(x,y,r,0,Math.PI*2);
}