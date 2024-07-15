import { Field } from "./Field";
import { Fitness } from "./Fitness";
import { Coordinates } from "../interfaces/Coordinates";

export class Visual {

	private static instance: Visual = new Visual();

	private squaresDiv: HTMLElement = this.getId("squares");
	private selectedTile: Coordinates = {x: -1, y: -1}
	private fitness: Fitness = new Fitness();

	// Handles Visuals as a singleton
	constructor() {
		Visual.instance = this;
	}
	public static getInstance(): Visual {
		return Visual.instance;
	}

	// Helper function for more readable code
	private getId(_id: string): HTMLElement {
		return <HTMLElement>document.getElementById(_id);
	}

	// Shows given field in the DOM
	private visualizeSquares(_field: Field) {
		let squares = _field.getSquares();
		this.squaresDiv.innerHTML = "";
		const parentThis = this;
		for (let i = 0; i < squares.length; i++) {
			let newOuterDiv = document.createElement("div");
			this.squaresDiv?.appendChild(newOuterDiv);
			for (let k = 0; k < squares[i].length; k++) {
				let newInnerDiv = document.createElement("div");
				newInnerDiv.id = i + "" + k;
				newInnerDiv.style.backgroundColor = "#" + squares[i][k];
				newInnerDiv.addEventListener("click", function () { parentThis.swapTiles(_field, ({x: Number(this.id.charAt(0)), y: Number(this.id.charAt(1))})); });
				this.squaresDiv?.children[i].appendChild(newInnerDiv);
			}
		}
	}

	// Updates generation count
	public updateCurGeneration(_curGen: number) {
		this.getId("currentGeneration").innerHTML = "Current Generation: " + _curGen;
	}

	// Either selects the given tile as a selected tile or swaps it with the previously selected tile
	public swapTiles(_field: Field, _tileId: Coordinates): void {
		if (this.selectedTile.x == -1 && this.selectedTile.y == -1) {
			this.selectedTile = _tileId;
			this.getId(this.selectedTile.x + "" + this.selectedTile.y).className = "selected";
		}
		else {
			let secondTile = _tileId;
			this.getId(this.selectedTile.x + "" + this.selectedTile.y).className = "";
			this.getId(secondTile.x + "" + secondTile.y).className = "";
			_field.swapSquares(this.selectedTile, secondTile);
			this.selectedTile = {x: -1, y: -1};
			this.update(_field);		
		}
	}

	// Called to update all visuals
	public update(_field: Field): void {
		this.visualizeSquares(_field);
		this.getId("fitness")!.innerHTML = "Fitness: " + this.fitness.calcFitness(_field).toFixed(4);
	}
}

export default Visual.getInstance();