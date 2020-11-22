"use strict"
class Ball {
	constructor() {
		this.x = CENTER.x;
		this.y = CENTER.y;
		/*this.angle = Math.random() * Math.PI * 2;
		this.xv = Math.cos(this.angle) *  BALL_SPEED_PER_SECOND;
		this.yv = Math.sin(this.angle) * BALL_SPEED_PER_SECOND;*/
		if(Math.random() < 0.5) {
			this.xv = BALL_SPEED_PER_SECOND
		} else {
			this.xv = -BALL_SPEED_PER_SECOND
		}
		if(Math.random() < 0.5) {
			this.yv = BALL_SPEED_PER_SECOND
		} else {
			this.yv = -BALL_SPEED_PER_SECOND
		}
	}
	update(delta, paddles) {
		this.x += this.xv * delta;
		this.y += this.yv * delta;
		if(this.y + BALL_RADIUS > GAME_HEIGHT || this.y - BALL_RADIUS < 0) this.yv *= -1
		this.paddle_collide(paddles)
	}
	paddle_collide(paddles){
		let index = 0;
		if(this.x > CENTER.x) index = 1;
		const paddle = paddles[index]
		if(index == 0) {
			if(this.x - BALL_RADIUS < paddle.x + PADDLE_WIDTH / 2 && 
				this.x + BALL_RADIUS > paddle.x - PADDLE_WIDTH / 2 &&
				this.y - BALL_RADIUS < paddle.y + PADDLE_HEIGHT / 2 && 
				this.y + BALL_RADIUS > paddle.y - PADDLE_HEIGHT / 2) {
						this.xv *= -1 * BALL_TOUCH_MULTIPLIER
						this.x = paddle.x + PADDLE_WIDTH / 2 + BALL_RADIUS
			}
			if(this.x - BALL_RADIUS < 0) {
				paddles[1].flash = true;
			}
		} else {
			if(this.x + BALL_RADIUS > paddle.x - PADDLE_WIDTH / 2 && 
				this.x - BALL_RADIUS < paddle.x + PADDLE_WIDTH /2 &&
				this.y - BALL_RADIUS < paddle.y + PADDLE_HEIGHT / 2 && 
				this.y + BALL_RADIUS > paddle.y - PADDLE_HEIGHT / 2) {
						this.xv *= -1 * BALL_TOUCH_MULTIPLIER
						this.x = paddle.x - PADDLE_WIDTH / 2 - BALL_RADIUS
			}
			if(this.x + BALL_RADIUS > GAME_WIDTH) {
				paddles[0].flash = true;
			}
		}
	}
	render(ctx) {
		ctx.fillStyle = BALL_COLOR;
		ctx.beginPath()
		ctx.circle(Math.round(this.x),Math.round(this.y),BALL_RADIUS)
		ctx.fill()
	}
}