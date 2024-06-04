import { Fitness } from "./classes/fitness";
import { Field } from "./classes/Field";
import { Coordinates } from "./interfaces/Coordinates";
import { HillClimber } from "./classes/hillclimber";
// hillclimber(rateCandidateBalanced, mutateCandidateProbability, 20, 1000);

const squaresDiv: HTMLElement = getId("squares");
const resetBtn: HTMLButtonElement = <HTMLButtonElement>getId("resetBtn");
resetBtn.addEventListener("click", resetSquaresToOrigin);

export let field: Field = new Field();
localStorage.setItem("squares", JSON.stringify(field));

let selectedTile: Coordinates = {x: -1, y: -1};
let fitness: Fitness = new Fitness();

function getId(_id: string): HTMLElement {
	return <HTMLElement>document.getElementById(_id);
}

function visualizeSquares() {
	let squares = field.getSquares();
	squaresDiv.innerHTML = "";
	for (let i = 0; i < squares.length; i++) {
		let newOuterDiv = document.createElement("div");
		squaresDiv?.appendChild(newOuterDiv);
		for (let k = 0; k < squares[i].length; k++) {
			let newInnerDiv = document.createElement("div");
			newInnerDiv.id = i + "" + k;
			newInnerDiv.style.backgroundColor = "#" + squares[i][k];
			newInnerDiv.addEventListener("click", function () { swapTiles(({x: Number(this.id.charAt(0)), y: Number(this.id.charAt(1))})); });
			squaresDiv?.children[i].appendChild(newInnerDiv);
		}
	}
}

function swapTiles(_tileId: Coordinates): void {
	if (selectedTile.x == -1 && selectedTile.y == -1) {
		selectedTile = _tileId;
		getId(selectedTile.x + "" + selectedTile.y).className = "selected";
	}
	else {
		let secondTile = _tileId;
		getId(selectedTile.x + "" + selectedTile.y).className = "";
		getId(secondTile.x + "" + secondTile.y).className = "";
		
		field.swapSquares(selectedTile, secondTile);

		selectedTile = {x: -1, y: -1};
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
	field = squaresString ? JSON.parse(squaresString) : field.createSquares();
	update();
}

function update(): void {
	visualizeSquares();
	fitness.calcFitness();
}

update();

let hc: HillClimber = new HillClimber();
console.log(hc.createInitialPopulation());