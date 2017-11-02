let ctx = null;
let timeline = null;

window.onload = () => {
	const desc = document.querySelector("#desc");

	timeline = new Timeline(data, desc, () => {
		desc.style.width = timeline.canvasWidth + "px";

		const container = document.querySelector("#container");
		container.style.width = timeline.canvasWidth + "px";
		container.style.height = timeline.canvasHeight + "px";
	
		const canvas = document.querySelector("#canvas");
		canvas.width = timeline.canvasWidth;
		canvas.height = timeline.canvasHeight;
		
		document.onkeyup = (evt) => {
			if (evt.which == 39) {
				timeline.nextEvent();
			}
		}

		tick();
	});

	document.title = timeline.data.title;
	document.body.style.backgroundColor = timeline.data.backgroundColor;

	ctx = canvas.getContext("2d");
}

function tick() {
	ctx.clearRect(0, 0, timeline.canvasWidth, timeline.canvasHeight);

	timeline.tick(ctx);

	window.requestAnimationFrame(tick);
}