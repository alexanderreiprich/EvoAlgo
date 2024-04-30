
// hillclimber(rateCandidateBalanced, mutateCandidateProbability, 20, 1000);

function getId(_id: string): HTMLElement {
	return <HTMLElement>document.getElementById(_id);
}

let squares: string[][] = [];
const squaresDiv: HTMLElement = getId("squares");
function createSquares() {
	for (let i = 0; i < 10; i++) {
		squares[i] = new Array();
		for (let k = 0; k < 10; k++) {
			let randomColor = Math.floor(Math.random()*16777215).toString(16);
			squares[i][k] = randomColor;
		}
	}
	console.log(squares);
}

function visualizeSquares() {
	squaresDiv.innerHTML = "";
	for (let i = 0; i < squares.length; i++) {
		let newOuterDiv = document.createElement("div");
		squaresDiv?.appendChild(newOuterDiv);
		for (let k = 0; k < squares[i].length; k++) {
			let newInnerDiv = document.createElement("div");
			newInnerDiv.id = i + "" + k; 
			newInnerDiv.style.backgroundColor = "#" + squares[i][k];
			newInnerDiv.addEventListener("click", function() {swapTiles((this.id));});
			squaresDiv?.children[i].appendChild(newInnerDiv);
		}
	}
}

let selectedTile: string | undefined = undefined; 
function swapTiles(_tileId: string): void {
	if (selectedTile == undefined) {
		selectedTile = _tileId;
		getId(selectedTile).className = "selected";
	}
	else {
		let secondTile = _tileId;
		let selectedTileCol = Number(selectedTile.charAt(0));
		let selectedTileRow = Number(selectedTile.charAt(1));
		let secondTileCol = Number(secondTile.charAt(0));
		let secondTileRow = Number(secondTile.charAt(1));
		getId(secondTileCol.toString() + "" + secondTileRow.toString()).className = "";
		getId(selectedTileCol.toString() + "" + selectedTileRow.toString()).className = "";

		const tempTile = squares[selectedTileCol][selectedTileRow];
		squares[selectedTileCol][selectedTileRow] = squares[secondTileCol][secondTileRow];
		squares[secondTileCol][secondTileRow] = tempTile;

		selectedTile = undefined;
		visualizeSquares();
	}
}

function simulateSwapping(): void {
	setInterval(() => {
		let a: string = (Math.floor(Math.random() * 10) + "" + (Math.floor(Math.random() * 10))).toString();
		let b: string = (Math.floor(Math.random() * 10) + "" + (Math.floor(Math.random() * 10))).toString();
		getId(a).click();
		getId(b).click();
	}, 100);
}

function main(): void {
	createSquares()
	visualizeSquares();
	console.log(calcFitness(squares));
	// simulateSwapping();
}

export function calcFitness(_squares: string[][]): number {
  let squares = _squares;
  let fitness: number = 0;
  for (let i = 0; i < squares.length; i++) {
    for (let k = 0; k < squares[i].length - 1; k++) {
      let similarity = getSimilarity(squares[i][k], squares[i][k+1])
      if(similarity) {
        fitness += similarity;
      }
    }
  }
  return fitness; 
}

function hexToRGB(_hex: string): [number, number, number] | null {
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

function calcColorDistance(_rgb1: [number, number, number], _rgb2: [number, number, number]): number {
  const rDiff = _rgb1[0] - _rgb2[0];
  const gDiff = _rgb1[1] - _rgb2[1];
  const bDiff = _rgb1[2] - _rgb2[2];
  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

function getSimilarity(_hex1: string, _hex2: string) {
  const rgb1 = hexToRGB(_hex1);
  const rgb2 = hexToRGB(_hex2);

  if (!rgb1 || !rgb2) {
    return null;
  }

  return calcColorDistance(rgb1, rgb2);
}

main();