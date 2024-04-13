"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutateCandidate = exports.rateCandidate = exports.hillclimber = void 0;
function hillclimber(ratingFunc, bitLength, maxGens) {
    let gen = 0;
    let candidate = createCandidate(bitLength);
    let ratingPrevGen = ratingFunc(candidate);
    console.log(candidate.toString() + " - Gen: " + gen + ", Rating: " + rateCandidate(candidate));
    while (ratingPrevGen != bitLength && gen < maxGens) {
        gen++;
        ratingPrevGen = ratingFunc(candidate);
        let newCandidate = mutateCandidate(candidate);
        let ratingNewGen = ratingFunc(newCandidate);
        if (ratingNewGen > ratingPrevGen) {
            candidate = newCandidate;
            console.log(candidate.toString() + " - Gen: " + gen + ", Rating: " + rateCandidate(candidate));
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
function rateCandidate(candidate) {
    for (let i = 0; i < candidate.length; i++) {
        if (candidate[i] == 1) {
            return i;
        }
    }
    return candidate.length;
}
exports.rateCandidate = rateCandidate;
function mutateCandidate(candidate, bitFlip = true) {
    let newCandidate = candidate.slice();
    let i = Math.floor(Math.random() * candidate.length);
    newCandidate[i] = 1 - candidate[i];
    return newCandidate;
}
exports.mutateCandidate = mutateCandidate;
//# sourceMappingURL=hillclimber.js.map