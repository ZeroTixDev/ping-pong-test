"use strict"
class Input{
	constructor([up1,down1,up2,down2]) {
		this.up =[up1,up2]
		this.down = [down1,down2]
	}
	copy() {
		return new Input([this.up[0],this.down[0],this.up[1],this.down[1]])
	}
  static trackKeys(event, paddles, currentInput) {
		const value = event.type === "keydown"
		if(LEFT_KEYS.includes(event.keyCode)) {
			const index = LEFT_KEYS.indexOf(event.keyCode)
			if (index == 0) {
				paddles[0].up = value
				currentInput.up[0] = value;
			} else {
				paddles[0].down = value
				currentInput.down[0] = value;
			}
		} else if(RIGHT_KEYS.includes(event.keyCode)) {
			const index = RIGHT_KEYS.indexOf(event.keyCode)
			if(index == 0) {
				paddles[1].up = value;
				currentInput.up[1] = value;
			} else {
				paddles[1].down = value;
				currentInput.down[1] = value
			}
		}
	}
}
