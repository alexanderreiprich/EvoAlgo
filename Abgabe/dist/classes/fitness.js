"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcFitness = void 0;
function calcFitness(_squares) {
    let squares = _squares;
    let fitness = 0;
    for (let i = 0; i < squares.length; i++) {
        for (let k = 0; k < squares[i].length - 1; k++) {
            let similarity = getSimilarity(squares[i][k], squares[i][k + 1]);
            if (similarity) {
                fitness += similarity;
            }
        }
    }
    return fitness;
}
exports.calcFitness = calcFitness;
function hexToRGB(_hex) {
    const match = _hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!match) {
        return null;
    }
    return [
        parseInt(match[1], 16),
        parseInt(match[2], 16),
        parseInt(match[3], 16)
    ];
}
function calcColorDistance(_rgb1, _rgb2) {
    const rDiff = _rgb1[0] - _rgb2[0];
    const gDiff = _rgb1[1] - _rgb2[1];
    const bDiff = _rgb1[2] - _rgb2[2];
    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}
function getSimilarity(_hex1, _hex2) {
    const rgb1 = hexToRGB(_hex1);
    const rgb2 = hexToRGB(_hex2);
    if (!rgb1 || !rgb2) {
        return null;
    }
    return calcColorDistance(rgb1, rgb2);
}
//# sourceMappingURL=fitness.js.map