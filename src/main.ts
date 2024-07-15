import { Field } from "./classes/Field";
import { Visual } from "./classes/Visual";
import { OnePlusOne } from "./classes/OnePlusOne";
import { Genetic } from "./classes/Genetic";

// Initialize HTML Inputs
const populationSizeInput: HTMLInputElement = <HTMLInputElement>getId("populationSize");
const maxGenerationsInput: HTMLInputElement = <HTMLInputElement>getId("maxGenerations");
const fieldSizeInput: HTMLInputElement = <HTMLInputElement>getId("fieldSize");
const bwCheckbox: HTMLInputElement = <HTMLInputElement>getId("bwCheckbox");
const startAlgorithmBtn: HTMLButtonElement = <HTMLButtonElement>getId("startAlgo");
const opoRadio: HTMLInputElement = <HTMLInputElement>getId("opoRadio");

startAlgorithmBtn.addEventListener("click", startAlgorithm);

export let field: Field = new Field(10);
let opo: OnePlusOne = new OnePlusOne();
let genetic: Genetic = new Genetic();

// Helper function for more readable code
export function getId(_id: string): HTMLElement {
	return <HTMLElement>document.getElementById(_id);
}

// Starts the algorithm based on checked inputs
function startAlgorithm(): void {
	if (opoRadio.checked) {
		console.log("Starting One-Plus-One-Algorithm");
		opo.start(Number(maxGenerationsInput.value), Number(populationSizeInput.value), Number(fieldSizeInput.value), bwCheckbox.checked);
	}
	else {
		if (bwCheckbox.checked) {
			alert("Genetic Algorithm is incompatible with the black and white option.");
		}
		console.log("Starting Genetic Algorithm");
		genetic.start(Number(maxGenerationsInput.value), Number(populationSizeInput.value), Number(fieldSizeInput.value), bwCheckbox.checked);
	}
}

Visual.getInstance().update(field);
