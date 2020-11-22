"use strict"
function resize(canvas) {
	let winw = window.innerWidth;
	let winh = window.innerHeight;
	let scale = Math.min(winw / canvas.width,winh / canvas.height);
	canvas.style.transform = "scale(" + scale + ")";
	canvas.style.left = ( winw - canvas.width ) / 2 + "px";
	canvas.style.top = ( winh - canvas.height ) / 2 + "px";
	return scale;
}
// resize (canvas) -> scale