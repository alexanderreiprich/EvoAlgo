import { Coordinates } from "../interfaces/Coordinates";
import { Field } from "./Field";
import { Fitness } from "./Fitness";
import { Visual } from "./Visual";

type Item = { [key: string]: any};

export class OnePlusOne {

	private curPopulations: Field[] = [];
	private fitness: Fitness = new Fitness();
	private delay = (ms: number) => new Promise(res => setTimeout(res, ms));
	
	// Starts the algorithm
	public async start(_maxGens: number, _popSize: number, _fieldSize: number, _bw: boolean): Promise<void> {
		// Initialize variables and candidates
		let gen: number = 0;
		let candidates: Item[] = this.createInitialPopulation(_fieldSize, _bw);
		// Rate candidates and sort them
		let ratings: Item[] = candidates.map(candidate => ({
			value: this.fitness.calcFitness(<Field>candidate),
			item: <Field>candidate
		}));
		ratings.sort((a, b) => a.value - b.value);
		let best: Field[] = ratings.slice(0,1).map(entry => entry.item);
		// Repeat until maximum generations are reached
		while (gen < _maxGens) {
			gen++;
			let newCandidates: Item[] = [];

			for (let i = 0; i < Math.floor(_popSize); i++) {
				let mutatedCandidate: Field = this.mutate(best[0]);
				// Wrap child in item to sort by fitness later
				let newCandidateItem = {
					value: this.fitness.calcFitness(mutatedCandidate),
					item: mutatedCandidate
				}
				newCandidates.push(newCandidateItem);
			}
			newCandidates.sort((a, b) => a.value - b.value);
			let newBest: Field[] = newCandidates.slice(0,1).map(entry => entry.item);
			// If the mutated best individual is better than the previous best, replace
			if (this.fitness.calcFitness(newBest[0]) < this.fitness.calcFitness(best[0])) {
				best = newBest;
			}

			// Update visuals
			Visual.getInstance().update(best[0]);
			Visual.getInstance().updateCurGeneration(gen);
			await this.delay(1);
		}
	}

	public getPopulation(): Field[] {
		return this.curPopulations;
	}

	// Generates the first population
	public createInitialPopulation(_fieldSize: number, _bw?: boolean): Field[] {
		let initialField: Field = new Field(_fieldSize, undefined, _bw);
		let population: Field[] = [];
		for (let i = 0; i < 10; i++) {
			let newField: Field = new Field(initialField.getSquares().length, initialField.getSquares());
			for (let k = 0; k < 100; k++) {
				let tile1: Coordinates = newField.chooseRandomSquare();
				let tile2: Coordinates = newField.chooseRandomSquare();
				newField.swapSquares(tile1, tile2);
			}
			population.push(newField);
		}
		this.curPopulations = population;
		return population;
	}

	// Mutates the candidate by swapping 0 to 20 random squares
	private mutate(_candidate: Field): Field {
		let newCandidate: Field = new Field(_candidate.getSquares().length, _candidate.getSquares().map((row) => {
			return row.slice();
		}));
		for (let i = 0; i < (Math.round(Math.random()) * 20); i++) {
			let tile1: Coordinates = newCandidate.chooseRandomSquare();
			let tile2: Coordinates = newCandidate.chooseRandomSquare();
			newCandidate.swapSquares(tile1, tile2);
		}
		return newCandidate;
	}

}
