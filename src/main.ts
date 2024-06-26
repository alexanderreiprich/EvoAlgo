import { Field } from "./classes/Field";
import { Visual } from "./classes/Visual";
import { HillClimber } from "./classes/Hillclimber";

const resetBtn: HTMLButtonElement = <HTMLButtonElement>getId("resetBtn");
const nextPopBtn: HTMLButtonElement = <HTMLButtonElement>getId("nextPopBtn");
const populationSizeInput: HTMLInputElement = <HTMLInputElement>getId("populationSize");
const maxGenerationsInput: HTMLInputElement = <HTMLInputElement>getId("maxGenerations");
const bwCheckbox: HTMLInputElement = <HTMLInputElement>getId("bwCheckbox");
const startAlgorithmBtn: HTMLButtonElement = <HTMLButtonElement>getId("startAlgo");

resetBtn.addEventListener("click", resetSquaresToOrigin);
nextPopBtn.addEventListener("click", nextPopulation);
startAlgorithmBtn.addEventListener("click", startAlgorithm);

export let field: Field = new Field();
localStorage.setItem("squares", JSON.stringify(field));

let hc: HillClimber = new HillClimber();

export function getId(_id: string): HTMLElement {
	return <HTMLElement>document.getElementById(_id);
}

function resetSquaresToOrigin(): void {
	const squaresString: string | null = localStorage.getItem("squares");
	squaresString ? field.setSquares(JSON.parse(squaresString).squares) : field.createSquares();
	Visual.getInstance().updateCurGeneration(0);
	Visual.getInstance().update(field);
}

function nextPopulation(): void {
	let fields: Field[] = hc.getPopulation();
	let curNum: number = Number(nextPopBtn.getAttribute("num"));
	field.setSquares(fields[curNum].getSquares());
	if (curNum == fields.length-1) {
		curNum = 0;
		nextPopBtn.setAttribute("num", "0");
	}
	else {
		curNum++;
		nextPopBtn.setAttribute("num", curNum.toString());
	}
	getId("numberOfPopulation").innerHTML = "Number of Population: " + (curNum);
	Visual.getInstance().update(field);
}

function startAlgorithm(): void {
	hc.hillclimber(Number(maxGenerationsInput.value), Number(populationSizeInput.value), bwCheckbox.checked);
}

Visual.getInstance().update(field);
