import { Coordinates } from "../interfaces/Coordinates";
import { Field } from "./Field";
import { Fitness } from "./Fitness";
import { Visual } from "./Visual";

type Item = { [key: string]: any};

export class Genetic {

	private fitness: Fitness = new Fitness();
	private delay = (ms: number) => new Promise(res => setTimeout(res, ms));

	// Starts the algorithm
	public async start(_maxGens: number, _popSize: number, _fieldSize: number, _bw: boolean): Promise<void> {
		// Initialize variables and candidates
		let gen: number = 0;
		let candidates: Item[] = this.generateCandidates(_popSize, _fieldSize, _bw);
		// Rate candidates and sort them
		let ratings: Item[] = candidates.map(candidate => ({
			value: this.fitness.calcFitness(<Field>candidate),
			item: <Field>candidate
		}));
		ratings.sort((a, b) => a.value - b.value);
		let best: Field[] = ratings.slice(0, 2).map(entry => entry.item);

		// Repeat until maximum generations are reached
		while (gen < _maxGens) {
			gen++;
			let newCandidates: Item[] = [];
			for (let i = 0; i < _popSize; i++) {
				let childField: Field = this.crossover(best[0], best[1]);
				childField = this.mutate(childField);
				// Wrap child in item to sort by fitness later
				let childItem = { 
					value: this.fitness.calcFitness(childField),
					item: childField
				}
				newCandidates.push(childItem);
			}

			newCandidates.sort((a, b) => a.value - b.value);
			best = newCandidates.slice(0,2).map(entry => entry.item);
			
			// Update visuals
			Visual.getInstance().update(best[0]);
			Visual.getInstance().updateCurGeneration(gen);
			await this.delay(1);
		}
	}

	// Generates the first candidates
	private generateCandidates(_amount: number, _size: number, _bw: boolean): Field[] {
		let initialField: Field = new Field(_size, undefined, _bw);
		let fields: Field[] = [];
		for (let i = 0; i < _amount; i++) {
			let newField: Field = new Field(initialField.getSquares().length, initialField.getSquares());
			for (let k = 0; k < 5; k++) {
				let tile1: Coordinates = newField.chooseRandomSquare();
				let tile2: Coordinates = newField.chooseRandomSquare();
				newField.swapSquares(tile1, tile2);
			}
			fields.push(newField);
		}

		return fields;
	}

	// Creates a new child based on two parents - uses OX (Order Crossover)
	private crossover(_parent1: Field, _parent2: Field): Field {
		// Get and create parent and child squares
		let parent1squares: string[][] = _parent1.getSquares();
		let parent2squares: string[][] = _parent2.getSquares();
		let childSquares: string[][] = new Array(_parent1.getFieldSize());
		for (let i = 0; i < _parent1.getFieldSize(); i++) {
			childSquares[i] = new Array(_parent1.getFieldSize()).fill(undefined);
		}
		// Determine where to start and end the crossover
		let [start, end] = [
			Math.floor((Math.random() * parent1squares.length)), 
			Math.floor((Math.random() * parent2squares.length))
		].sort();
		let randomRow: number = Math.floor(Math.random() * parent1squares.length);
		// Create a set to store already existing color values
		let existingValues = new Set<string>();
		// Fill the spaces from the crossover part
		for (let i = start; i <= end; i++) {
			childSquares[randomRow][i] = parent1squares[randomRow][i];
			existingValues.add(parent1squares[randomRow][i]);
		}
		// Iterate through the second parent squares to fill the remaining spaces
		let sourceRow: number = 0;
		let sourceCol: number = 0;
		for (let i = 0; i < childSquares.length; i++) {
			for (let j = 0; j < childSquares[i].length; j++) {
				if (childSquares[i][j] === undefined) {
					while (sourceRow < parent2squares.length) {
						while (sourceCol < parent2squares[sourceRow].length) {
							let sourceValue = parent2squares[sourceRow][sourceCol];
							sourceCol++;
							// If the current value is not in the set, add it so that duplicates are excluded
							if (!existingValues.has(sourceValue)) {
								childSquares[i][j] = sourceValue;
								existingValues.add(sourceValue);
								break;
							}
						}
						// Skip to next line
						if (sourceCol >= parent2squares[sourceRow].length) {
							sourceCol = 0;
							sourceRow++;
						}
						if (childSquares[i][j] !== undefined) break;
					}
				}
			}
		}
		let returnChild = new Field(parent1squares.length, childSquares);
		return returnChild;
	}

	// Mutates the candidate by swapping 0 to 5 random squares
	private mutate(_candidate: Field): Field {
		let newCandidate: Field = new Field(_candidate.getSquares().length, _candidate.getSquares().map((row) => {
			return row.slice();
		}));

		for (let i = 0; i < (Math.round(Math.random()) * 5); i++) {
			let tile1: Coordinates = newCandidate.chooseRandomSquare();
			let tile2: Coordinates = newCandidate.chooseRandomSquare();
			newCandidate.swapSquares(tile1, tile2);
		}

		return newCandidate;
	}
}