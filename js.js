import {
	buildSmiley,
	pieces,
	describeArc,
	getLargestAmount,
	tlp,
	getSmallerSvgDiameter,
	buildArc,
	buildLabelArc,
	addLabelText,
	buildCircle,
} from "./library.js";

const colors = [
	"#3e9f8b",
	"#0076ff",
	"#66b7aa",
	"#7de5fb",
	"#8ccec7",
	"#b3e7e4",
	"#00c5ff",
	"#00a1ff",
	"#7180A2",
	"#CCA75F",
	"#CC905F",
	"#A07929",
	"#D7D079",
	"#FFEFBD",
	"#AFA63F",
];

// amount of threats in one piece
var amount = [50, 100, 25, 80, 75];

// threat level in a specific piece
var threatLevel = ["low", "low", "moderate", "undefined", "low"];

//size of the svg
var myWidth = 650;
var myHeight = 650;
svg.setAttribute("width", myWidth);
svg.setAttribute("height", myHeight);

buildPieDiagram(pieces, amount, threatLevel, myWidth, myHeight, getSmallerSvgDiameter(myWidth, myHeight));

function buildPieDiagram(threatList, amountList, threatLevelList, width, height, chartDiameter) {
	// variables with arc attributes
	var svg = document.getElementsByTagName("svg")[0]; // gets the svg element from html where the chart will be placed

	var xPosition = width / 2;
	var yPosition = height / 2;
	var outerRadiusStart = chartDiameter / 2 - (6 / 100) * chartDiameter;
	var outerRadiusEnd = chartDiameter / 2 - 2;

	var start = 0;
	var end = 0;
	let size = 359.999 / threatList.length;

	var innerRadiusStart = (14 / 100) * chartDiameter;
	var innerRadiusEndMax = outerRadiusStart;
	var innerRadiusSize = innerRadiusEndMax - innerRadiusStart;
	var innerRadiusEnd;

	/*------------- The loop that generates the right amount of chart elements ------------*/
	for (let n = 0; n < threatList.length; n++) {
		//changes inner arc radius depending on amount of threats (in this case just a number from the "amount" array)
		innerRadiusEnd = (amountList[n] / getLargestAmount(amountList)) * innerRadiusSize + innerRadiusStart;
		end = start + size;

		//builds inner ring arcs
		buildArc(describeArc(xPosition, yPosition, innerRadiusStart, innerRadiusEnd, start, end), svg, colors[n], n, 0);

		//builds outer ring arcs
		buildArc(
			describeArc(xPosition, yPosition, outerRadiusStart, outerRadiusEnd, start, end),
			svg,
			getColorForOuterRing(threatLevelList),
			n,
			1
		);

		//builds label paths (needs another arc function otherwise stops working)
		var textRingID = buildLabelArc(
			describeArc(xPosition, yPosition, innerRadiusStart, innerRadiusEndMax, start, end),
			svg,
			n,
			2
		);

		// function that set the text in the right position
		let label = document.getElementById(textRingID);
		addLabelText(label, threatList[n]);

		// just checking whether the values are correct
		console.log("Start of the " + n + " arc: " + start);
		console.log("End of the " + n + " arc: " + end);

		// changes the start point for next element to where the previous one ended
		start += size;

		// changes the color depending on the level of the threat
		function getColorForOuterRing(threatLevelList) {
			var outerRingColor;
			if (threatLevelList[n] == "high") {
				outerRingColor = tlp[0];
			} else if (threatLevelList[n] == "moderate") {
				outerRingColor = tlp[1];
			} else if (threatLevelList[n] == "low") {
				outerRingColor = tlp[2];
			} else if (threatLevelList[n] == "undefined") {
				outerRingColor = tlp[3];
			} else {
				outerRingColor = tlp[3];
			}
			// if there are no alerts changes the outer ring to white color
			if (amountList[n] == 0) {
				outerRingColor = tlp[3];
			}
			return outerRingColor;
		}
	}

	/*----------------- The circle in the center elements --------------*/

	// loop for the color charts center based on the threat level
	function getColorForCenter(threatList, threatLevel) {
		let fillColor;
		for (let n = 0; n < threatList.length; n++) {
			if (threatLevel[n] == "high") {
				fillColor = tlp[0];
				n = threatList.length; // stops the loop
			} else
				for (let n = 0; n < threatList.length; n++) {
					if (threatLevel[n] == "moderate") {
						fillColor = tlp[1];
						n = threatList.length;
					} else
						for (let n = 0; n < threatList.length; n++) {
							if (threatLevel[n] == "low") {
								fillColor = tlp[2];
								n = threatList.length;
							} else
								for (let n = 0; n < threatList.length; n++) {
									if (threatLevel[n] == "undefined") {
										fillColor = tlp[3];
										n = threatList.length;
									} else
										for (let n = 0; n < threatList.length; n++) {
											fillColor = tlp[3];
											n = threatList.length;
										}
								}
						}
				}
		}

		return fillColor;
	}

	// the smiley in the center build
	function smiley() {
		//loop for the smiley inside the circle
		let circle = buildCircle(width / 2, height / 2, innerRadiusStart - 5, getColorForCenter(threatList, threatLevel));
		let mood;
		if (circle.getAttribute("fill") === tlp[0]) {
			mood = "sad";
		} else if (circle.getAttribute("fill") === tlp[1]) {
			mood = "neutral";
		} else if (circle.getAttribute("fill") === tlp[2]) {
			mood = "happy";
		} else {
			mood = 0;
		}

		buildSmiley(width / 2, height / 2, innerRadiusStart - 5, mood);
	}

	smiley();
}
