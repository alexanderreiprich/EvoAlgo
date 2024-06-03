import { Fitness } from "./classes/fitness";
// hillclimber(rateCandidateBalanced, mutateCandidateProbability, 20, 1000);

let squares: string[][] = [];
let selectedTile: string | undefined = undefined;
let fitness: Fitness = new Fitness();
const squaresDiv: HTMLElement = getId("squares");

function getId(_id: string): HTMLElement {
	return <HTMLElement>document.getElementById(_id);
}

function createSquares() {
	for (let i = 0; i < 10; i++) {
		squares[i] = new Array();
		for (let k = 0; k < 10; k++) {
			let randomColor = Math.floor(Math.random() * 16777215).toString(16);
			squares[i][k] = randomColor;
		}
	}
	console.log(squares);
}

function visualizeSquares() {
	squaresDiv.innerHTML = "";
	for (let i = 0; i < squares.length; i++) {
		let newOuterDiv = document.createElement("div");
		squaresDiv?.appendChild(newOuterDiv);
		for (let k = 0; k < squares[i].length; k++) {
			let newInnerDiv = document.createElement("div");
			newInnerDiv.id = i + "" + k;
			newInnerDiv.style.backgroundColor = "#" + squares[i][k];
			newInnerDiv.addEventListener("click", function () { swapTiles((this.id)); });
			squaresDiv?.children[i].appendChild(newInnerDiv);
		}
	}
}

function swapTiles(_tileId: string): void {
	if (selectedTile == undefined) {
		selectedTile = _tileId;
		getId(selectedTile).className = "selected";
	}
	else {
		let secondTile = _tileId;
		let selectedTileCol = Number(selectedTile.charAt(0));
		let selectedTileRow = Number(selectedTile.charAt(1));
		let secondTileCol = Number(secondTile.charAt(0));
		let secondTileRow = Number(secondTile.charAt(1));
		getId(secondTileCol.toString() + "" + secondTileRow.toString()).className = "";
		getId(selectedTileCol.toString() + "" + selectedTileRow.toString()).className = "";

		const tempTile = squares[selectedTileCol][selectedTileRow];
		squares[selectedTileCol][selectedTileRow] = squares[secondTileCol][secondTileRow];
		squares[secondTileCol][secondTileRow] = tempTile;

		selectedTile = undefined;
		visualizeSquares();
		fitness.calcFitness(squares);
	}
}

function simulateSwapping(): void {
	setInterval(() => {
		let a: string = (Math.floor(Math.random() * 10) + "" + (Math.floor(Math.random() * 10))).toString();
		let b: string = (Math.floor(Math.random() * 10) + "" + (Math.floor(Math.random() * 10))).toString();
		getId(a).click();
		getId(b).click();
	}, 100);
}

function main(): void {
	createSquares()
	visualizeSquares();
	console.log(fitness.calcFitness(squares));
	// simulateSwapping();
}

main();