// import { hillclimber, rateCandidate, mutateCandidate, rateCandidateBalanced, mutateCandidateProbability } from "./classes/hillclimber";

// hillclimber(rateCandidateBalanced, mutateCandidateProbability, 20, 1000);

function getId(_id: string): HTMLElement {
	return <HTMLElement>document.getElementById(_id);
}

let squares: string[][] = [];
const squaresDiv: HTMLElement = getId("squares");
function createSquares() {
	for (let i = 0; i < 10; i++) {
		squares[i] = new Array();
		for (let k = 0; k < 10; k++) {
			let randomColor = Math.floor(Math.random()*16777215).toString(16);
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
			newInnerDiv.addEventListener("click", function() {swapTiles((this.id));});
			squaresDiv?.children[i].appendChild(newInnerDiv);
		}
	}
}

let selectedTile: string | undefined = undefined; 

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
	}
}

function main(): void {
	createSquares()
	visualizeSquares();
}

main();