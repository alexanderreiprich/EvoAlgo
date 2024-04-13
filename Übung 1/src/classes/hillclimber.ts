export function hillclimber(ratingFunc: Function, mutatingFunc: Function, bitLength: number, maxGens: number): void {
	let gen: number = 0;
	let candidate: number[] = createCandidate(bitLength);
	let ratingPrevGen: number = ratingFunc(candidate);
	console.log(candidate.toString() + " - Gen: " + gen + ", Rating: " + ratingFunc(candidate)
	);
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

export function createCandidate(length: number): number[] {
	let candidate: number[] = [];
	for (let i = 0; i < length; i++) {
		candidate[i] = Math.round(Math.random());
	}
	return candidate;
}

export function rateCandidate(candidate: number[]): number {
	for (let i = 0; i < candidate.length; i++) {
		if (candidate[i] == 1) {
			return i;
		}
	}
	return candidate.length;
}

export function rateCandidateBalanced(candidate: number[]): number {
	let balancedZeros: number = rateCandidate(candidate);
	let oneMax: number = 0;

	for (let i = 0; i < candidate.length; i++) {
		if (candidate[i] == 1) oneMax++;
	}

	return Math.min(balancedZeros, oneMax);
}

export function mutateCandidate(candidate: number[]): number[] {
	let newCandidate: number[] = candidate.slice();
	let i = Math.floor(Math.random() * candidate.length);
	newCandidate[i] = 1 - candidate[i];
	return newCandidate;
}

export function mutateCandidateProbability(candidate: number[]): number[] {
	let newCandidate: number[] = candidate.slice();
	for (let i = 0; i < candidate.length; i++) {
		if (Math.random() < (1 / candidate.length)) {
			newCandidate[i] = 1 - candidate[i];
		}
	}
	return newCandidate;
}
