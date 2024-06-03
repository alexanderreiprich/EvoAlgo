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