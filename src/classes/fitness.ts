import { Field } from "./Field";

export class Fitness {

  // Calculates fitness from the given field and updates the HTML
  public calcFitness(_field: Field): number {
    let fitness: number = 0;
    let squares: string[][] = _field.getSquares();
    for (let i = 0; i < squares.length; i++) {
      for (let k = 0; k < squares[i].length - 1; k++) {
        let similarity = this.averageColorDistance(squares, i, k);
        fitness += similarity;
      }
    }
    return fitness;
  }

  // Splits the hex value to array of RGB values
  private hexToRGB(_hex: string): [number, number, number] {
    let bigint = parseInt(_hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return [r, g, b];
  }

  // Calculates the distance between two given RGB values 
  private calcColorDistance(_rgb1: [number, number, number], _rgb2: [number, number, number]): number {
    const rDiff = _rgb1[0] - _rgb2[0];
    const gDiff = _rgb1[1] - _rgb2[1];
    const bDiff = _rgb1[2] - _rgb2[2];
    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
  }

  // Sums up the color distance between all neighbors of a given tile 
  private averageColorDistance(_squares: string[][], _tileX: number, _tileY: number): number {
    const neighbors = [
      [0, 1], [1, 0], [0, -1], [-1, 0],  // direct neighbors (top, bottom, left, right)
      [-1, -1], [-1, 1], [1, -1], [1, 1] // diagonal neighbors (top-left, top-right, bottom-left, bottom-right)
    ];

    let centralColor = this.hexToRGB(_squares[_tileX][_tileY]);
    let totalDistance = 0;
    let count = 0;

    for (let [dx, dy] of neighbors) {
      let nx = _tileX + dx;
      let ny = _tileY + dy;

      if (nx >= 0 && nx < _squares.length && ny >= 0 && ny < _squares[0].length) {
        let neighborColor = this.hexToRGB(_squares[nx][ny]);
        totalDistance += this.calcColorDistance(centralColor, neighborColor);
        count++;
      }
    }
    return count === 0 ? 0 : totalDistance / count;
  }
}
