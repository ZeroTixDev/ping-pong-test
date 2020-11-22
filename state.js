"use strict"
class State{
	constructor(state,functions) {
		this.state = state;
		this.functions = functions;
		this.applyState()
	}
	get value() {
		return this.state;
	}
	applyState() {
		if(this.state === "start") {
			this.functions.start()
		} else if(this.state === "game") {
			this.functions.game()
		} else if(this.state === "result") {
			this.functions.result()
		}
	}
	setState(state) {
		this.state = state;
		this.applyState()
	}
}