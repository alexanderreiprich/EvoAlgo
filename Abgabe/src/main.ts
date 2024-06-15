import { Fitness } from "./classes/fitness";
import { Field } from "./classes/Field";
import { Coordinates } from "./interfaces/Coordinates";
import { Visual } from "./classes/Visual";
import { HillClimber } from "./classes/hillclimber";

const resetBtn: HTMLButtonElement = <HTMLButtonElement>getId("resetBtn");
const nextPopBtn: HTMLButtonElement = <HTMLButtonElement>getId("nextPopBtn");
resetBtn.addEventListener("click", resetSquaresToOrigin);
nextPopBtn.addEventListener("click", nextPopulation);

export let field: Field = new Field();
localStorage.setItem("squares", JSON.stringify(field));

let fitness: Fitness = new Fitness();

export function getId(_id: string): HTMLElement {
	return <HTMLElement>document.getElementById(_id);
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

Visual.getInstance().update(field);

let hc: HillClimber = new HillClimber();
console.log(hc.createInitialPopulation());
hc.hillclimber(2000, 100);