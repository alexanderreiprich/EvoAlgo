"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutateCandidateProbability = exports.mutateCandidate = exports.rateCandidateBalanced = exports.rateCandidate = exports.createCandidate = exports.hillclimber = void 0;
function hillclimber(ratingFunc, mutatingFunc, bitLength, maxGens) {
    let gen = 0;
    let candidate = createCandidate(bitLength);
    let ratingPrevGen = ratingFunc(candidate);
    console.log(candidate.toString() + " - Gen: " + gen + ", Rating: " + ratingFunc(candidate));
    while (ratingPrevGen != bitLength && gen < maxGens) {
        gen++;
        ratingPrevGen = ratingFunc(candidate);
        let newCandidate = mutatingFunc(candidate);
        let ratingNewGen = ratingFunc(newCandidate);
        if (ratingNewGen > ratingPrevGen) {
            candidate = newCandidate;
            console.log(candidate.toString() + " - Gen: " + gen + ", Rating: " + ratingFunc(candidate));
        }
    }
}
exports.hillclimber = hillclimber;
function createCandidate(length) {
    let candidate = [];
    for (let i = 0; i < length; i++) {
        candidate[i] = Math.round(Math.random());
    }
    return candidate;
}
exports.createCandidate = createCandidate;
function rateCandidate(candidate) {
    for (let i = 0; i < candidate.length; i++) {
        if (candidate[i] == 1) {
            return i;
        }
    }
    return candidate.length;
}
exports.rateCandidate = rateCandidate;
function rateCandidateBalanced(candidate) {
    let balancedZeros = rateCandidate(candidate);
    let oneMax = 0;
    for (let i = 0; i < candidate.length; i++) {
        if (candidate[i] == 1)
            oneMax++;
    }
    return Math.min(balancedZeros, oneMax);
}
exports.rateCandidateBalanced = rateCandidateBalanced;
function mutateCandidate(candidate) {
    let newCandidate = candidate.slice();
    let i = Math.floor(Math.random() * candidate.length);
    newCandidate[i] = 1 - candidate[i];
    return newCandidate;
}
exports.mutateCandidate = mutateCandidate;
function mutateCandidateProbability(candidate) {
    let newCandidate = candidate.slice();
    for (let i = 0; i < candidate.length; i++) {
        if (Math.random() < (1 / candidate.length)) {
            newCandidate[i] = 1 - candidate[i];
        }
    }
    return newCandidate;
}
exports.mutateCandidateProbability = mutateCandidateProbability;
//# sourceMappingURL=hillclimber.js.map