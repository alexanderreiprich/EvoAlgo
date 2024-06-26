import { Field } from "./Field";
import { Fitness } from "./Fitness";
import { Coordinates } from "../interfaces/Coordinates";

export class Visual {

	private static instance: Visual = new Visual();

	private squaresDiv: HTMLElement = this.getId("squares");
	private selectedTile: Coordinates = {x: -1, y: -1}
	private fitness: Fitness = new Fitness();

	constructor() {
		Visual.instance = this;
	}

	public static getInstance(): Visual {
		return Visual.instance;
	}

	private getId(_id: string): HTMLElement {
		return <HTMLElement>document.getElementById(_id);
	}

	public visualizeSquares(_field: Field) {
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

	public updateCurGeneration(_curGen: number) {
		this.getId("currentGeneration").innerHTML = "Current Generation: " + _curGen;
	}

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

	public update(_field: Field): void {
		this.visualizeSquares(_field);
		this.fitness.calcFitness(_field);
	}
	
}

export default Visual.getInstance();