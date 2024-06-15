import { Coordinates } from "../interfaces/Coordinates";
import { Field } from "./Field";
import { Fitness } from "./fitness";
import { Visual } from "./Visual";

type Item = { [key: string]: any};

export class HillClimber {

	private curPopulations: Field[] = [];
	private fitness: Fitness = new Fitness();
	private delay = (ms: number) => new Promise(res => setTimeout(res, ms));

	public hillclimber2(ratingFunc: Function, mutatingFunc: Function, bitLength: number, maxGens: number): void {
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

	public async hillclimber(maxGens: number, popSize: number): Promise<void> {
		let gen: number = 0;
		let candidates: Item[] = this.createInitialPopulation();

		let ratings: Item[] = candidates.map(candidate => ({
			value: this.fitness.calcFitness(<Field>candidate),
			item: <Field>candidate
		}));
		ratings.sort((a, b) => a.value - b.value);
		// let best = ratings.slice(0,Math.floor(popSize/2)).map(entry => entry.item);
		let best: Field[] = ratings.slice(0,1).map(entry => entry.item);

		console.log("Start: " + this.fitness.calcFitness(best[0]));

		while (gen < maxGens) {
			gen++;
			let newCandidates: Item[] = [];

			for (let i = 0; i < Math.floor(popSize); i++) {
				let mutatedCandidate: Field = this.mutateCandidate(best[0]);
				let newCandidate = {
					value: this.fitness.calcFitness(mutatedCandidate),
					item: mutatedCandidate
				}
				newCandidates.push(newCandidate);
			}
			newCandidates.sort((a, b) => a.value - b.value);
			// let best = newCandidates.slice(0,Math.floor(popSize/2)).map(entry => entry.item);
			let newBest: Field[] = newCandidates.slice(0,1).map(entry => entry.item);
			if (this.fitness.calcFitness(newBest[0]) < this.fitness.calcFitness(best[0])) {
				best = newBest;
			}
			// console.log("Gen " + gen + " - " + this.fitness.calcFitness(best[0]));
			Visual.getInstance().update(best[0]);
			Visual.getInstance().updateCurGeneration(gen);
			await this.delay(1);
		}
	}

	public getPopulation(): Field[] {
		return this.curPopulations;
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
		for (let i = 0; i < 10; i++) {
			let newField: Field = new Field(initialField.getSquares());
			for (let k = 0; k < 100; k++) {
				let tile1: Coordinates = this.chooseRandomTile();
				let tile2: Coordinates = this.chooseRandomTile();
				newField.swapSquares(tile1, tile2);
			}
			population.push(newField);
		}
		this.curPopulations = population;
		return population;
	}

	private chooseRandomTile(): Coordinates {
		let _x: number = Math.floor(Math.random() * 10);
		let _y: number = Math.floor(Math.random() * 10);
		return { x: _x, y: _y }
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

	private mutateCandidate(candidate: Field): Field {
		let newCandidate: Field = new Field(candidate.getSquares().map((row) => {
			return row.slice();
		}));
		for (let i = 0; i < 10; i++) {
			let tile1: Coordinates = this.chooseRandomTile();
			let tile2: Coordinates = this.chooseRandomTile();
			newCandidate.swapSquares(tile1, tile2);
		}
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
