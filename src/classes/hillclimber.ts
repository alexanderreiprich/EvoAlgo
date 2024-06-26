import { Coordinates } from "../interfaces/Coordinates";
import { Field } from "./Field";
import { Fitness } from "./Fitness";
import { Visual } from "./Visual";

type Item = { [key: string]: any};

export class HillClimber {

	private curPopulations: Field[] = [];
	private fitness: Fitness = new Fitness();
	private delay = (ms: number) => new Promise(res => setTimeout(res, ms));

	public async hillclimber(maxGens: number, popSize: number, fieldSize: number, bw: boolean): Promise<void> {
		let gen: number = 0;
		let candidates: Item[] = this.createInitialPopulation(fieldSize, bw);
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
				let mutatedCandidate: Field = this.mutateCandidate(best[0], gen, maxGens);
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

	public createInitialPopulation(_fieldSize: number, _bw?: boolean): Field[] {

		let initialField: Field = new Field(_fieldSize, undefined, _bw);
		let population: Field[] = [];
		for (let i = 0; i < 10; i++) {
			let newField: Field = new Field(initialField.getSquares().length, initialField.getSquares());
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
		let _x: number = Math.floor(Math.random() * 5);
		let _y: number = Math.floor(Math.random() * 5);
		return { x: _x, y: _y }
	}

	private mutateCandidate(candidate: Field, gen: number, maxGens: number): Field {
		let newCandidate: Field = new Field(candidate.getSquares().length, candidate.getSquares().map((row) => {
			return row.slice();
		}));
		for (let i = 0; i < (Math.round(Math.random()) * 20); i++) {
			let tile1: Coordinates = this.chooseRandomTile();
			let tile2: Coordinates = this.chooseRandomTile();
			newCandidate.swapSquares(tile1, tile2);
		}
		return newCandidate;
	}

}
