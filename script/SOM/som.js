var c=document.getElementById("drawCanvas");
var button = document.getElementById('startstop');
var ctx=c.getContext("2d");
var yLoc = 120;
var xLoc = 100;
var gridSize = 3;
var iterationNumber=0;
var maxIterations=0;
var scale = 480;
var transx = 10;
var transy = 10;
var start = false;
var error;
var tError = 0;
var started = false;
var randX;
var randY;
var Nodes = [];
var length;
var som_dataset_index = null;

/* 初始化SOM网络*/
function init() {
	maxIterations=document.getElementById("itnum").value;
	gridSize=document.getElementById("nodenum").value;
	length = document.getElementById("itnum").value.length;
	initWeights();
	initNeighbours();
}

/* 开始暂停按钮*/
function startstop() {
	if (started) {
		start^=true;
		maxIterations=document.getElementById("itnum").value;
		length = document.getElementById("itnum").value.length;
	}
	
}

/* 开始新的演化*/
function generateNew() {
	if(!som_dataset){
		window.alert("请先选择加载数据");
		return;
	}
	if(document.getElementById("nodenum").value.length>0&&document.getElementById("nodenum").value>0) {
		Nodes=[];
		init();
		iterationNumber=0;
		start=false;
		started=true;
	}
}

/* 节点对象, 竞争层节点*/
function Node(weightX, weightY, indexI, indexJ, lX, lY){
	this.weightX = weightX;
	this.weightY = weightY;
	this.indexI = indexI;
	this.indexJ = indexJ;
	this.lerpX = lX;
	this.lerpY = lY;
	var neighbours = [];

	this.getWeightX = function(){
		return this.weightX;
	} 
	this.getWeightY = function(){
		return this.weightY;
	} 
	this.getindexI = function(){
		return this.indexI;
	} 
	this.getindexJ = function(){
		return this.indexJ;
	}
	this.pushNeighbour = function(neighbour){
		neighbours.push(neighbour);
	} 	
	this.getNeighbours = function(neighbour){
		return neighbours;
	} 
	this.setWeightX = function(X){
		this.weightX=X;
	} 
	this.setWeightY = function(Y){
		this.weightY=Y;
	} 
	this.calculateLerp = function() {

		this.lerpX+=(this.weightX - this.lerpX)*0.01;
		this.lerpY+=(this.weightY - this.lerpY)*0.01;
	}
	this.getLerpY = function() {
		 return this.lerpY;
	}
	this.getLerpX = function() {
		 return this.lerpX;
	}
}

function printErrors() {
	if (iterationNumber%100==0) {
		tError /= 100;
		tError = 0;
		
	}else{
		tError += error;
	}
	
}

function mainLoop() { 
	clear();
	if (start) {
		if (length==0) {
			update();
			button.innerHTML = "&#10074;&#10074;";
		}
		else if (iterationNumber<maxIterations) {
			update();
			button.innerHTML = "&#10074;&#10074;";
		}
		else {
		start=false;
		}
		
	}
	else {
		button.innerHTML = "&#9658;";
	}
	if (started){
		draw();
	} 
	
	requestAnimationFrame(mainLoop);
}



function clear() {
	ctx.beginPath(); //
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 600, 600);
	ctx.stroke();
	ctx.closePath();
}

/* 给一个随机数据作为输入向量*/
/* 当前则给输入作为当前输入 */
function generateRandomVector() {
	som_dataset_index = iterationNumber % som_dataset.length
	randX = som_dataset[som_dataset_index].x
	randY = som_dataset[som_dataset_index].y
	// randX = Math.random();
	// randY = Math.random();
}


/*BMU Best Matching Unit 选取距离最小的节点作为优胜节点，也就是最佳匹配节点*/
function calculateBMU() {
	var currentNormSquared = 10000;
	var BMU = 0;
	for (var i=0; i<gridSize*gridSize; i++) {
		var x = randX - Nodes[i].getWeightX();
		var y = randY - Nodes[i].getWeightY();
		normSquared = x*x + y*y;
		
		if (normSquared<currentNormSquared) {
			currentNormSquared = normSquared;
			BMU=i;
		}
	}
	//console.log("BEST " + BMU);
	return BMU;
}


function alterNodes(i) {
	//console.log(bestNode);
	var lambda = 1/(1+(Math.log(iterationNumber)));
	var gamma = 0.5*lambda;
	var nodeWX = Nodes[i].getWeightX();
	var nodeWY = Nodes[i].getWeightY();
	Nodes[i].setWeightX(nodeWX + lambda*(randX-nodeWX));
	Nodes[i].setWeightY(nodeWY + lambda*(randY-nodeWY));
	
	var neighbours = Nodes[i].getNeighbours();
	for (var i=0; i<neighbours.length; i++) {
		var nodeNeighbourWX = neighbours[i].getWeightX();
		var nodeNeighbourWY = neighbours[i].getWeightY();
		neighbours[i].setWeightX(nodeNeighbourWX + gamma*(randX-nodeNeighbourWX));
		neighbours[i].setWeightY(nodeNeighbourWY + gamma*(randY-nodeNeighbourWY));
	}
}

function computeError() {
	error=0;
	for (var i=0; i<gridSize*gridSize; i++) {
		var err=0;
		var weightI = Nodes[i].getWeightX();
		var weightJ = Nodes[i].getWeightY();
		var neighbours = Nodes[i].getNeighbours();
		for (var j=0; j<neighbours.length; j++) {
			var weightI2 = neighbours[j].getWeightX();
			var weightJ2 = neighbours[j].getWeightY();
			err+=Math.pow((1/gridSize)-Math.sqrt(Math.pow(weightI2-weightI,2) + Math.pow(weightJ-weightJ2,2)),2);
			
		}
		err=err/neighbours.length;
		error+=err;
	}
	error=error/(gridSize*gridSize);
}

function update() {
	iterationNumber++;
	generateRandomVector();
	alterNodes(calculateBMU());
	computeError();
	printErrors();
}

/* 初始化权重 */
function initWeights() {

	for (var i=0; i<gridSize; i++) {
		for (var j=0; j<gridSize; j++) {
			var node = new Node(Math.random(), Math.random(), i, j, 0 ,0);
			Nodes.push(node);
		}
	}

}

function isNeighbour(indexI,indexJ,indexI2,indexJ2) {
	if (indexI+1==indexI2 && indexJ==indexJ2 || indexJ+1==indexJ2 && indexI==indexI2|| indexI-1==indexI2 && indexJ==indexJ2 || indexJ-1==indexJ2 && indexI==indexI2) {
		return true;
	}
	else {
		return false;
	}
}

function initNeighbours() {
	for (var i=0; i<gridSize*gridSize; i++) {
		var indexI = Nodes[i].getindexI();
		var indexJ = Nodes[i].getindexJ();
		for (var j=0; j<gridSize*gridSize; j++) {
			if(j!=i) {
				var indexI2 = Nodes[j].getindexI();
				var indexJ2 = Nodes[j].getindexJ();
				if (isNeighbour(indexI,indexJ,indexI2,indexJ2)) {
					Nodes[i].pushNeighbour(Nodes[j]);
					// console.log("PUSHING NEIGHBOUR " + Nodes[j].getindexI() + ", " + Nodes[j].getindexJ() + " FOR NODE " + i);
				}
			}
		}
	}
}
function drawLine(stx,sty,endx,endy) {
	ctx.beginPath();
	ctx.moveTo(stx,sty);
	ctx.lineTo(endx,endy);
	ctx.strokeStyle = "rgb(150,150,150)";
	ctx.stroke();
	ctx.closePath();
}

function drawConnections() {
	for(var i=0; i<gridSize*gridSize; i++) {
		var neighbours = Nodes[i].getNeighbours();
		for(var j=0; j<neighbours.length; j++) {
			Nodes[i].calculateLerp();
			neighbours[j].calculateLerp();
			drawLine((Nodes[i].getLerpX()*scale)+transx,(Nodes[i].getLerpY()*scale)+transy,(neighbours[j].getLerpX()*scale)+transx,(neighbours[j].getLerpY()*scale)+transy);
			//console.log(i + " Drawing line between " + Nodes[i].getWeightX()+","+Nodes[i].getWeightY() +" and "+ neighbours[j].getWeightX()+","+neighbours[j].getWeightY());
		}
		//console.log(i + " " + neighbours.length);
	}
	//console.log("complete");
}
function drawPoints() {
	
	for(var i=0; i<gridSize*gridSize; i++) {
	
		Nodes[i].calculateLerp();
		
		ctx.beginPath();
		ctx.arc((Nodes[i].getLerpX()*scale)+transx,(Nodes[i].getLerpY()*scale)+transy,8,0,2*Math.PI);
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.arc((Nodes[i].getLerpX()*scale)+transx,(Nodes[i].getLerpY()*scale)+transy,8,0,2*Math.PI);
		ctx.strokeStyle = "rgb(150,150,150)";
		ctx.lineWidth=1;
		ctx.stroke();
		ctx.closePath();
	}	
}

function drawText() {
	ctx.font = "15px Calibri";
	ctx.fillStyle = "rgb(170,170,170)";
	ctx.fillText("Iteration: " + iterationNumber,20,470);
	
	// ctx.font = "15px Calibri";
	// ctx.fillStyle = "rgb(170,170,170)";
	// ctx.fillText("Convergence error = " + parseFloat(error.toFixed(4)) + "%",20,490);
}

function draw() {
	drawConnections();
	drawPoints();	
	drawText();
}

	Nodes=[];
	maxIterations=null;
	gridSize=4
	length = document.getElementById("itnum").value.length;
	initWeights();
	initNeighbours();
	iterationNumber=0;
	// 未开始
	start=false;
	// 已经开始
	started=true;

	if (started) {
		start^=true;
		maxIterations=null;
		length = document.getElementById("itnum").value.length;
	}

requestAnimationFrame(mainLoop);
