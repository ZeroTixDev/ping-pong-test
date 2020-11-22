"use strict"
class Paddle {
	constructor(pos) {
		this.x = pos.x;
		this.y = pos.y;
		this.up = false;
		this.down = false;
		this.flash = false;
		this.flash_iter = 0;
		this.flash_max = 0.15;
		this.flash_time = 0;
		this.flash_time_max = 1;
	}
	get rectPos() {
		return {x:this.x-PADDLE_WIDTH/2,y:this.y-PADDLE_HEIGHT/2}
	}
	update(delta) {
		if(this.up) {
			this.y -= PADDLE_SPEED_PER_SECOND * delta;
		}
		if(this.down) {
			this.y += PADDLE_SPEED_PER_SECOND * delta;
		}
		if(this.flash) {
			this.flash_iter += delta;
			this.flash_time += delta;
			this.flash_iter = this.flash_iter % this.flash_max;
		}
		this.collision()
	}
	collision() {
		if(this.y - PADDLE_HEIGHT / 2 < 0) {
			this.y = PADDLE_HEIGHT / 2;
		}
		if(this.y + PADDLE_HEIGHT / 2 > GAME_HEIGHT) {
			this.y = GAME_HEIGHT - PADDLE_HEIGHT / 2;
		}
	}
	render(ctx) {
		ctx.fillStyle = PADDLE_COLOR;
		if(this.flash) {
			const color = this.flash_iter / this.flash_max * 255;
			ctx.fillStyle = `rgb(${color},${color},${color})`
		}
		const pos = this.rectPos;
		ctx.fillRect(Math.round(pos.x),Math.round(pos.y),PADDLE_WIDTH, PADDLE_HEIGHT);
	}
}