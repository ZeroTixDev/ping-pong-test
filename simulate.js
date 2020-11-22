"use strict" 
//work in progress....
function simulate(state, input) {
	//state -> {paddles: [paddle, paddle], ball: ball class}
	//input -> Input {up : [paddle1up, paddle2up], down : [paddle1down, paddle2down]}
	let delta = SIMULATION_STEP_TIME; //for example, ill make it non frame dependent later :shrug:
	let newState = {...state}
	for(let i = 0; i < newState.paddles.length; i ++) {
		const paddle = newState.paddles[i]
		paddle.update(delta,[input.up[i],input.down[i]])
	}
	newState.ball.update(delta, newState.paddles)
	return newState;
}