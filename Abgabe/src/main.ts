import { Fitness } from "./classes/fitness";
// hillclimber(rateCandidateBalanced, mutateCandidateProbability, 20, 1000);

const squaresDiv: HTMLElement = getId("squares");
const resetBtn: HTMLButtonElement = <HTMLButtonElement>getId("resetBtn");
resetBtn.addEventListener("click", resetSquaresToOrigin);

export let squares: string[][] = createSquares();
localStorage.setItem("squares", JSON.stringify(squares));

let selectedTile: string | undefined = undefined;
let fitness: Fitness = new Fitness();

function getId(_id: string): HTMLElement {
	return <HTMLElement>document.getElementById(_id);
}

function createSquares() {
	let squares: string[][] = [];
	for (let i = 0; i < 10; i++) {
		squares[i] = new Array();
		for (let k = 0; k < 10; k++) {
			let randomColor = Math.floor(Math.random() * 16777215).toString(16);
			squares[i][k] = randomColor;
		}
	}
	return squares;
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
		update();
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

function resetSquaresToOrigin(): void {
	const squaresString: string | null = localStorage.getItem("squares");
	squares = squaresString ? JSON.parse(squaresString) : createSquares();
	update();
}

function update(): void {
	visualizeSquares();
	fitness.calcFitness();
}

update();