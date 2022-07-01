var request = null;
var mouse = { x: 0, y: 0 };
var cx = window.innerWidth / 2;
var cy = window.innerHeight / 2;

$('body').mousemove(function(event) {

	mouse.x = event.pageX;
	mouse.y = event.pageY;

	cancelAnimationFrame(request);
	request = requestAnimationFrame(update);	
});

function update() {

	dx = mouse.x - cx;
	dy = mouse.y - cy;

	tiltx = (dy / cy);
	tilty = - (dx / cx);
	radius = Math.sqrt(Math.pow(tiltx,2) + Math.pow(tilty,2));
	degree = (radius * 5);
	TweenLite.to("#section0 .wrap", 1, {transform:'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)', ease:Back.easeOut});
	TweenLite.to("#menu-content-1", 1, {transform:'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)', ease:Back.easeOut});
}

$(window).resize(function() {
	cx = window.innerWidth / 2;
	cy = window.innerHeight / 2;
});	