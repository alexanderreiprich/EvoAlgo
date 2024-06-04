import { field } from "../main";

export class Fitness {
  public calcFitness(): number {
    let fitness: number = 0;
    let squares: string[][] = field.getSquares();
    for (let i = 0; i < squares.length; i++) {
      for (let k = 0; k < squares[i].length - 1; k++) {
        let similarity = this.averageColorDistance(squares, i, k);
        fitness += similarity;
      }
    }
    document.getElementById("fitness")!.innerHTML = "Fitness: " + fitness.toFixed(4);
    return fitness;
  }

  private hexToRGB(_hex: string): [number, number, number] {
    
    let bigint = parseInt(_hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return [r, g, b];
  }

  private calcColorDistance(_rgb1: [number, number, number], _rgb2: [number, number, number]): number {
    const rDiff = _rgb1[0] - _rgb2[0];
    const gDiff = _rgb1[1] - _rgb2[1];
    const bDiff = _rgb1[2] - _rgb2[2];
    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
  }

  private averageColorDistance(squares: string[][], tileX: number, tileY: number): number {
    const neighbors = [
      [0, 1], [1, 0], [0, -1], [-1, 0],  // direkte Nachbarn (oben, rechts, unten, links)
      [-1, -1], [-1, 1], [1, -1], [1, 1] // diagonale Nachbarn (oben-links, oben-rechts, unten-links, unten-rechts)
    ];

    let centralColor = this.hexToRGB(squares[tileX][tileY]);
    let totalDistance = 0;
    let count = 0;

    for (let [dx, dy] of neighbors) {
      let nx = tileX + dx;
      let ny = tileY + dy;

      if (nx >= 0 && nx < squares.length && ny >= 0 && ny < squares[0].length) {
        let neighborColor = this.hexToRGB(squares[nx][ny]);
        totalDistance += this.calcColorDistance(centralColor, neighborColor);
        count++;
      }
    }

    return count === 0 ? 0 : totalDistance / count;
  }

}

