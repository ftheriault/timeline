let data = {
	title : "Timeline animation",
	backgroundColor : "#ccc",
	scrollSpeed : 2,
	runDelayBetweenEvent : 4000, 
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
			top : 39,
			fontFamily : "Arial",
			fontSize : "18px",
			image : "images/bubble.png"
		}
	},
	panel : {
		left : 15,
		top : 30,
		fontColor : "white",
		fontFamily : "Arial",
		fontSize : "24px",
		image : "images/arrow.png",
		y : 250
	},
	events : [
		{
			panelText : "1990",
			bubbleText : "J'ai gradué!",
			desc : "Lorem ipsum...",
		},
		{
			panelText : "1992",
			bubbleText : "Ha oui, le xyz!",
			desc : "Lorem ipsum...",
		},
	],
	ending: {
		top : 130,
		left : 100,
		fontColor : "white",
		fontFamily : "Arial",
		fontSize : "40px",
		text : "Et maintenant???",
	}
}