import { hillclimber, rateCandidate, mutateCandidate, rateCandidateBalanced, mutateCandidateProbability } from "./classes/hillclimber";

hillclimber(rateCandidateBalanced, mutateCandidateProbability, 20, 1000);