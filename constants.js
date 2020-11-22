"use strict"
const LEFT_KEYS = [87,83] // up down
const RIGHT_KEYS = [38,40]
const PADDLE_COLOR = "#ffffff"
const BALL_COLOR = "#ffffff"
const PADDLE_WIDTH = 30
const PADDLE_HEIGHT = 125
const PADDLE_SPEED_PER_SECOND = 450   // per second
const BALL_RADIUS = 15;
const BALL_SPEED_PER_SECOND = 400;
const BALL_TOUCH_MULTIPLIER = 1.1;
const GAME_PADDING = 50
const GAME_WIDTH = 1600;
const GAME_HEIGHT = 900;
const START_ANIMATION_TIME = 1;
const CENTER = {x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2}
const SIMULATION_STEP_TIME = 1000 / 60; //ms