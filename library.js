// colors for the outer ring
export const tlp = ["red", "yellow", "green", "white"];

// all possible levels of threat
export const level = ["high", "moderate", "low", "none"];

// all of the pieces that are in the chart
export var pieces = ["First element", "Second element", "Third element", "Fourth element", "Fifth element"];

//gets the smallest diameter of svg space
export function getSmallerSvgDiameter(width, height) {
	let svgDiameter;
	if (width < height) {
		svgDiameter = width;
	} else {
		svgDiameter = height;
	}
	return svgDiameter;
}

// gets largest number from amount array
export function getLargestAmount(amount) {
	let largestAmount = amount[0];
	for (let i = 0; i < amount.length; i++) {
		if (largestAmount < amount[i]) {
			largestAmount = amount[i];
		}
	}
	console.log("Largest amount of the threats:" + " " + largestAmount);
	return largestAmount;
}

function buildSmileyFace(x, y, smileyCircleRadius, color, mood) {
	buildCircle(x, y, smileyCircleRadius, color);
	buildSmiley(x, y, smileyCircleRadius, mood);
}

// the circle in the center build
export function buildCircle(x, y, smileyCircleRadius, color) {
	let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle"); //Create a path in SVG's namespace
	circle.setAttribute("cx", x);
	circle.setAttribute("cy", y);
	circle.setAttribute("r", smileyCircleRadius);
	circle.setAttribute("id", "circle");
	circle.setAttribute("fill", color);
	svg.appendChild(circle);
	return circle;
}

//builds right smiley for the "mood"
export function buildSmiley(x, y, smileyCircleRadius, mood) {
	if (mood == "sad") {
		buildSadSmiley(x, y, smileyCircleRadius);
	} else if (mood == "neutral") {
		buildNeutralSmiley(x, y, smileyCircleRadius);
	} else if (mood == "happy") {
		buildHappySmiley(x, y, smileyCircleRadius);
	} else {
		buildEyes(x, y, smileyCircleRadius);
	}
}

//builds eyes for the smiley
function buildEyes(x, y, smileyCircleRadius) {
	let leftCirclex = x - (22 / 100) * smileyCircleRadius;
	let rightCirclex = x + (22 / 100) * smileyCircleRadius;
	let leftRightCircley = y - (12 / 100) * smileyCircleRadius;
	let leftRightCirclesmileyCircleRadius = (10 / 100) * smileyCircleRadius;

	// left eye of the smiley
	let leftCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle"); //Create a path in SVG's namespace
	leftCircle.setAttribute("cx", leftCirclex);
	leftCircle.setAttribute("cy", leftRightCircley);
	leftCircle.setAttribute("r", leftRightCirclesmileyCircleRadius);
	leftCircle.setAttribute("fill", "white");
	svg.appendChild(leftCircle);

	// right eye of the smiley
	let rightCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle"); //Create a path in SVG's namespace
	rightCircle.setAttribute("cx", rightCirclex);
	rightCircle.setAttribute("cy", leftRightCircley);
	rightCircle.setAttribute("r", leftRightCirclesmileyCircleRadius);
	rightCircle.setAttribute("fill", "white");
	svg.appendChild(rightCircle);
}

//builds smile for a smiley
function buildHappySmiley(x, y, smileyCircleRadius) {
	buildEyes(x, y, smileyCircleRadius);

	//variables for the circle elements
	let ySmile = y - (20 / 100) * smileyCircleRadius;
	let smilesmileyCircleRadiusStart = (60 / 100) * smileyCircleRadius;
	let smilesmileyCircleRadiusEnd = (65 / 100) * smileyCircleRadius;
	let smileStartAngle = 130;
	let smileEndAngle = 230;

	let smilePath = describeArc(
		x,
		ySmile,
		smilesmileyCircleRadiusStart,
		smilesmileyCircleRadiusEnd,
		smileStartAngle,
		smileEndAngle
	);
	let smileArc = document.createElementNS("http://www.w3.org/2000/svg", "path"); //Create a path in SVG's namespace
	smileArc.setAttribute("d", smilePath);
	smileArc.setAttribute("fill", "white");
	svg.appendChild(smileArc);
}

function buildNeutralSmiley(x, y, smileyCircleRadius) {
	buildEyes(x, y, smileyCircleRadius);

	let rectWidth = (95 / 100) * smileyCircleRadius;
	let rectHeight = (5 / 100) * smileyCircleRadius;
	let xRect = x - rectWidth / 2;
	let yRect = y - rectHeight / 2 + (25 / 100) * smileyCircleRadius;

	let flatSmile = document.createElementNS("http://www.w3.org/2000/svg", "rect"); //Create a path in SVG's namespace
	flatSmile.setAttribute("x", xRect);
	flatSmile.setAttribute("y", yRect);
	flatSmile.setAttribute("width", rectWidth);
	flatSmile.setAttribute("height", rectHeight);
	flatSmile.setAttribute("ry", 2);
	flatSmile.setAttribute("fill", "white");
	flatSmile.setAttribute("id", "flatSmile");
	svg.appendChild(flatSmile);
}

function buildSadSmiley(x, y, smileyCircleRadius) {
	buildEyes(x, y, smileyCircleRadius);

	let ySmile = y + (85 / 100) * smileyCircleRadius;
	let smilesmileyCircleRadiusStart = -((65 / 100) * smileyCircleRadius);
	let smilesmileyCircleRadiusEnd = -((60 / 100) * smileyCircleRadius);
	let smileStartAngle = 130;
	let smileEndAngle = 230;

	let smilePath = describeArc(
		x,
		ySmile,
		smilesmileyCircleRadiusStart,
		smilesmileyCircleRadiusEnd,
		smileStartAngle,
		smileEndAngle
	);
	let smileArc = document.createElementNS("http://www.w3.org/2000/svg", "path"); //Create a path in SVG's namespace
	smileArc.setAttribute("d", smilePath);
	smileArc.setAttribute("fill", "white");
	svg.appendChild(smileArc);
}

function polarToCartesian(centerX, centerY, smileyCircleRadius, angleInDegrees) {
	let angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

	return {
		x: centerX + smileyCircleRadius * Math.cos(angleInRadians),
		y: centerY + smileyCircleRadius * Math.sin(angleInRadians),
	};
}

//describes arc
export function describeArc(x, y, innersmileyCircleRadius, outersmileyCircleRadius, startAngle, endAngle) {
	let smileyCircleRadius = innersmileyCircleRadius;
	let spread = outersmileyCircleRadius - innersmileyCircleRadius;
	let innerStart = polarToCartesian(x, y, smileyCircleRadius, endAngle);
	let innerEnd = polarToCartesian(x, y, smileyCircleRadius, startAngle);
	let outerStart = polarToCartesian(x, y, smileyCircleRadius + spread, endAngle);
	let outerEnd = polarToCartesian(x, y, smileyCircleRadius + spread, startAngle);

	let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

	let d = [
		"M",
		outerStart.x,
		outerStart.y,
		"A",
		smileyCircleRadius + spread,
		smileyCircleRadius + spread,
		0,
		largeArcFlag,
		0,
		outerEnd.x,
		outerEnd.y,
		"L",
		innerEnd.x,
		innerEnd.y,
		"A",
		smileyCircleRadius,
		smileyCircleRadius,
		0,
		largeArcFlag,
		1,
		innerStart.x,
		innerStart.y,
		"L",
		outerStart.x,
		outerStart.y,
		"Z",
	].join(" ");
	console.log("d: " + d);
	return d;
}

//adds text to the arcs
export function addLabelText(bgPath, labelText) {
	let bbox = bgPath.getBBox();
	let x = bbox.x + bbox.width / 2;
	let y = bbox.y + bbox.height / 2;

	// Create a <text> element
	let textElem = document.createElementNS(bgPath.namespaceURI, "text");
	textElem.setAttribute("x", x);
	textElem.setAttribute("y", y);
	// Centre text horizontally at x,y
	textElem.setAttribute("text-anchor", "middle");
	// Give it a class that will determine the text size, colour, etc
	textElem.classList.add("label-text");
	// Set the text
	textElem.textContent = labelText;
	// Add this text element directly after the label background path
	bgPath.after(textElem);
}

//builds arc
export function buildArc(arcPath, svg, color, counter, pathNr) {
	let innerRing = document.createElementNS("http://www.w3.org/2000/svg", "path"); //Create a path in SVG's namespace
	innerRing.setAttribute("d", arcPath);
	let id = "path" + pathNr + counter; //gets ids for each element
	innerRing.setAttribute("id", id);
	innerRing.setAttribute("fill", color);
	svg.appendChild(innerRing);
}

//builds transparent arc for text label
export function buildLabelArc(arcPath, svg, counter, pathNr) {
	let textRing = document.createElementNS("http://www.w3.org/2000/svg", "path"); //Create a path in SVG's namespace
	textRing.setAttribute("d", arcPath);
	let id = "path" + pathNr + counter; //gets ids for each element
	textRing.setAttribute("id", id);
	textRing.setAttribute("fill", "none");
	svg.appendChild(textRing);
	return id;
}
