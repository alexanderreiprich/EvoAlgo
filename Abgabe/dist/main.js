"use strict";
// import { hillclimber, rateCandidate, mutateCandidate, rateCandidateBalanced, mutateCandidateProbability } from "./classes/hillclimber";
// hillclimber(rateCandidateBalanced, mutateCandidateProbability, 20, 1000);
function getId(_id) {
    return document.getElementById(_id);
}
let selectedTile = null;
// function swapTiles(_tile: HTMLDivElement): void {
// 	if (selectedTile == null) {
// 		selectedTile = _tile;
// 	}
// 	else {
// 		let secondTile = _tile;
// 		let selectedTileParent = selectedTile.parentElement?.children;
// 		let secondTileParent = secondTile.parentElement?.children;
// 		let selectedTileRowNumber = selectedTile.parentElement.val
// 	}
// }
let squares = [];
const squaresDiv = getId("squares");
function createSquares() {
    for (let i = 0; i < 10; i++) {
        squares[i] = new Array();
        for (let k = 0; k < 10; k++) {
            let randomColor = Math.floor(Math.random() * 16777215).toString(16);
            squares[i][k] = randomColor;
        }
    }
    console.log(squares);
}
function visualizeSquares() {
    squaresDiv.innerHTML = "";
    for (let i = 0; i < squares.length; i++) {
        let newOuterDiv = document.createElement("div");
        squaresDiv === null || squaresDiv === void 0 ? void 0 : squaresDiv.appendChild(newOuterDiv);
        for (let k = 0; k < squares[i].length; k++) {
            let newInnerDiv = document.createElement("div");
            newInnerDiv.id = i + "" + k;
            newInnerDiv.style.backgroundColor = "#" + squares[i][k];
            newInnerDiv.addEventListener("click", function () { });
            squaresDiv === null || squaresDiv === void 0 ? void 0 : squaresDiv.children[i].appendChild(newInnerDiv);
        }
    }
}
createSquares();
visualizeSquares();
//# sourceMappingURL=main.js.map