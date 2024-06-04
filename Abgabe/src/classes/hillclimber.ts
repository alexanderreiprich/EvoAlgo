import { Coordinates } from "../interfaces/Coordinates";
import { Field } from "./Field";

export class HillClimber {

	public hillclimber(ratingFunc: Function, mutatingFunc: Function, bitLength: number, maxGens: number): void {
		let gen: number = 0;
		let candidate: number[] = this.createCandidate(bitLength);
		let ratingPrevGen: number = ratingFunc(candidate);
		console.log(candidate.toString() + " - Gen: " + gen + ", Rating: " + ratingFunc(candidate));
		while (ratingPrevGen != bitLength && gen < maxGens) {
			gen++;
			ratingPrevGen = ratingFunc(candidate);
			let newCandidate: number[] = mutatingFunc(candidate);
			let ratingNewGen: number = ratingFunc(newCandidate);
			if (ratingNewGen > ratingPrevGen) {
				candidate = newCandidate;
				console.log(candidate.toString() + " - Gen: " + gen + ", Rating: " + ratingFunc(candidate));
			}
		}
	}
	
	private createCandidate(length: number): number[] {
		let candidate: number[] = [];
		for (let i = 0; i < length; i++) {
			candidate[i] = Math.round(Math.random());
		}
		return candidate;
	}

	public createInitialPopulation(): Field[] {
		let initialField: Field = new Field();
		let population: Field[] = [];
		for (let i = 0; i < 3; i++) {
			let newField: Field = initialField;
			// for (let k = 0; k < 100; k++) {
				console.log(newField.getSquares())
				let tile1: Coordinates = this.chooseRandomTile();
				let tile2: Coordinates = this.chooseRandomTile();
				newField.swapSquares({x: 0, y: 0}, {x: 1, y: 0});
				console.log(newField.getSquares())
				//TODO: swapping doesn't work
			// }
			population.push(newField);
		}
		
		return population;
	}

	private chooseRandomTile(): Coordinates {
		let _x: number = Math.floor(Math.random() * 10);
		let _y: number = Math.floor(Math.random() * 10);
		return {x: _x, y: _y}
	}
	
	private rateCandidate(candidate: number[]): number {
		for (let i = 0; i < candidate.length; i++) {
			if (candidate[i] == 1) {
				return i;
			}
		}
		return candidate.length;
	}
	
	private rateCandidateBalanced(candidate: number[]): number {
		let balancedZeros: number = this.rateCandidate(candidate);
		let oneMax: number = 0;
	
		for (let i = 0; i < candidate.length; i++) {
			if (candidate[i] == 1) oneMax++;
		}
	
		return Math.min(balancedZeros, oneMax);
	}
	
	private mutateCandidate(candidate: number[]): number[] {
		let newCandidate: number[] = candidate.slice();
		let i = Math.floor(Math.random() * candidate.length);
		newCandidate[i] = 1 - candidate[i];
		return newCandidate;
	}
	
	private mutateCandidateProbability(candidate: number[]): number[] {
		let newCandidate: number[] = candidate.slice();
		for (let i = 0; i < candidate.length; i++) {
			if (Math.random() < (1 / candidate.length)) {
				newCandidate[i] = 1 - candidate[i];
			}
		}
		return newCandidate;
	}

}
