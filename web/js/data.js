let data = {
	title : "Biography",
	backgroundColor : "#ccc",
	scrollSpeed : 2,
	runDelayBetweenEvent : 1000, 
	backgroundImage : "images/swamp.png",
	runner : {
		x : 150,
		y : 260,
		continuousImages : true,
		cols : 3,
		rows : 2,
		speed : 3,
		delay: 250,
		images : [
				  "images/runner2.png",
				  "images/runner6.png",
				  "images/runner4.png",
				  "images/runner1.png", 
				  "images/runner5.png",
				  "images/runner3.png",
				],
		bubble : {
			offsetX : 0,
			offsetY : -150,
			fontColor : "black",
			left : 40,
			top : 35,
			fontFamily : "Arial",
			fontSize : "16px",
			image : "images/bubble.png"
		}
	},
	panel : {
		left : 15,
		top : 28,
		fontColor : "white",
		fontFamily : "Arial",
		fontSize : "22px",
		image : "images/arrow.png",
		y : 250
	},
	events : [
		{
			panelText : "Cégep",
			bubbleText : "Awesome!",
			desc : "",
		},
		{
			panelText : "Bacc",
			bubbleText : "Really<br>cool",
			desc : "",
		},
		{
			panelText : "Msc",
			bubbleText : "Neuroscience",
			desc : "",
		},
	],
	ending: {
		top : 130,
		left : 30,
		fontColor : "white",
		fontFamily : "Arial",
		fontSize : "40px",
		text : "Et<br>maintenant ???",
	}
}