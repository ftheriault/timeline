class Timeline {
	constructor(data, descDiv, initCallback) {
		this.data = data;
		this.descDiv = descDiv;

		this.background = new Image();
		this.background.onload = () => {
			this.canvasWidth = this.background.width;
			this.canvasHeight = this.background.height;
			initCallback();
		};
		this.background.src = this.data.backgroundImage;
		
		this.runnerSprite = new TiledImage(this.data.runner.images[0], this.data.runner.cols, this.data.runner.rows, this.data.runner.delay);
		this.runnerSprite.setContinuous(this.data.runner.continuousImages);
		this.runnerSprite.changeMinMaxInterval(1, this.data.runner.cols);
		
		for (let i = 1; i < this.data.runner.images.length; i++) {
			this.runnerSprite.addImage(this.data.runner.images[i]);
		}

		if (this.data.runner.bubble != null) {
			this.bubble = new Image();
			this.bubble.src = this.data.runner.bubble.image;
		}

		if (this.data.panel != null) {
			this.panel = new Image();
			this.panel.src = this.data.panel.image;
		}
		
		this.panels = [];
		this.backgroundX = 0;
		this.runnerX = -100;
		this.currentEvent = -1;
		this.currentEventPercent = -1;
		this.endingPercent = -1;
	}

	nextEvent() {
		this.descDiv.innerHTML = "";

		if (this.currentEvent == -1) {
			this.currentEvent++;
			this.currentEventPercent = 0;

			if (this.data.panel != null && this.data.events[this.currentEvent].panelText != null) {
				this.panels.push([this.data.events[this.currentEvent].panelText , this.background.width]);
			}
		}
		else if (this.timeoutId == null) {
			if (this.currentEvent + 1 < this.data.events.length) {
				this.timeoutId = setTimeout(() => {
					this.timeoutId = null;
					this.currentEvent++;
					this.currentEventPercent = 0;

					if (this.data.panel != null && this.data.events[this.currentEvent].panelText != null) {
						this.panels.push([this.data.events[this.currentEvent].panelText , this.background.width]);
					}
				}, this.data.runDelayBetweenEvent);
			}
			else {
				this.timeoutId = setTimeout(() => {
					this.endingPercent = 0;
				}, this.data.runDelayBetweenEvent);
			}

			this.currentEventPercent = -1;
		}
	}

	tick (ctx) {
		if (this.background.complete) {
			let bgSpeed = this.data.scrollSpeed;
			let runnerSpeed = this.data.runner.speed;
			let showBubble = false;

			if (this.currentEventPercent >= 0 && this.currentEventPercent < 1) {
				this.currentEventPercent += 0.005;

				if (this.currentEventPercent > 0.5) {
					bgSpeed = bgSpeed * (1.0 - this.currentEventPercent);
					runnerSpeed = runnerSpeed * (1.0 - this.currentEventPercent);
				}
			}
			else if (this.currentEventPercent >= 1) {
				bgSpeed = 0;
				showBubble = true;
			}

			ctx.drawImage(this.background, this.backgroundX - this.canvasWidth, 0);
			ctx.drawImage(this.background, this.backgroundX, 0);
			ctx.drawImage(this.background, this.backgroundX + this.canvasWidth, 0);
			this.backgroundX -= bgSpeed;

			if (this.backgroundX <= -this.canvasWidth/2) {
				this.backgroundX +=this.canvasWidth;
			}

			if (this.runnerX < this.data.runner.x) {
				this.runnerX += runnerSpeed;
			}

			if (bgSpeed == 0) {
				this.runnerSprite.setLooped(false);
			}
			else {
				this.runnerSprite.setLooped(true);
			}

			if (this.data.panel != null) {
				for (let i = 0; i < this.panels.length; i++) {
					let panel = this.panels[i];
					panel[1] -= bgSpeed;

					ctx.drawImage(this.panel, panel[1], this.data.panel.y);
					
					ctx.fillStyle = this.data.panel.fontColor;
					ctx.font = this.data.panel.fontSize + " " + this.data.panel.fontFamily;
					ctx.fillText(panel[0], 
								 panel[1] + this.data.panel.left, 
								 this.data.panel.y + this.data.panel.top)


					if (panel[1] < -this.panel.width) {
						this.panels.splice(i, 1);
						i--;
					}
				}
			}

			this.runnerSprite.tick(this.runnerX, this.data.runner.y, ctx);

			if (showBubble && this.bubble != null && this.bubble.complete && this.data.events[this.currentEvent].bubbleText != null) {
				const bubbleX = this.runnerX + this.data.runner.bubble.offsetX;
				const bubbleY = this.data.runner.y + this.data.runner.bubble.offsetY;
				ctx.drawImage(this.bubble, bubbleX, bubbleY);
				
				ctx.fillStyle = this.data.runner.bubble.fontColor;
				ctx.font = this.data.runner.bubble.fontSize + " " + this.data.runner.bubble.fontFamily;
				ctx.fillText(this.data.events[this.currentEvent].bubbleText, 
							 bubbleX + this.data.runner.bubble.left, 
							 bubbleY+ this.data.runner.bubble.top);
				
				if (this.descDiv.innerHTML == "") {
					this.descDiv.innerHTML = this.data.events[this.currentEvent].desc;
				}
			}

			if (this.endingPercent >= 0) {
				this.endingPercent += 0.01;

				if (this.endingPercent > 1.0) {
					this.endingPercent = 1.0;
				}

				ctx.fillStyle = "rgba(0, 0, 0, " + this.endingPercent + ")";
				ctx.fillRect(0, 0, this.background.width, this.background.height);

				if (this.endingPercent == 1.0) {
					ctx.fillStyle = this.data.ending.fontColor;
					ctx.font = this.data.ending.fontSize + " " + this.data.ending.fontFamily;
					ctx.fillText(this.data.ending.text, 
								 this.data.ending.left, 
								 this.data.ending.top);
				}
			}
		}
	}
}