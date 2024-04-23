// import { hillclimber, rateCandidate, mutateCandidate, rateCandidateBalanced, mutateCandidateProbability } from "./classes/hillclimber";

// hillclimber(rateCandidateBalanced, mutateCandidateProbability, 20, 1000);

function getId(_id: string): HTMLElement {
	return <HTMLElement>document.getElementById(_id);
}

let selectedTile: number = 0; 

function swapTiles(_tileId: number): void {
	if (selectedTile == null) {
		selectedTile = _tileId;
	}
	else {
		let secondTile = _tileId;
		let selectedTileCol = Number(selectedTile.toString().at(0));
		let selectedTileRow = Number(selectedTile.toString().at(1));
		let secondTileCol = Number(secondTile.toString().at(0));
		let secondTileRow = Number(secondTile.toString().at(1));

		const tempTile = squares[selectedTileCol][selectedTileRow];
		squares[selectedTileCol][selectedTileRow] = squares[secondTileCol][secondTileRow];
		squares[secondTileCol][secondTileRow] = tempTile;

		secondTile = 0;
		visualizeSquares();
	}
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
			newInnerDiv.addEventListener("click", function() {swapTiles(Number(this.id))});
			squaresDiv?.children[i].appendChild(newInnerDiv);
		}
	}
}

createSquares()
visualizeSquares();