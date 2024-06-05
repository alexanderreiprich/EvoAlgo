export class Field {

	constructor(_squares?: string[][]) {
		if (_squares) {
			this.setSquares(_squares);
		}
		else {
			this.createSquares();
		}
		
	}

	private squares: string[][] = [];

	public getSquares(): string[][] {
		return this.squares;
	}

	public setSquares(_squares: string[][]): void {
		this.squares = _squares;
	}

	public createSquares() {
		for (let i = 0; i < 10; i++) {
			this.squares[i] = new Array();
			for (let k = 0; k < 10; k++) {
				let randomColor = Math.floor(Math.random() * 16777215).toString(16);
				this.squares[i][k] = randomColor;
			}
		}
		return this.squares;
	}

	public swapSquares(_square1: {x: number, y: number}, _square2: {x: number, y: number}): string[][] {
		const tempTile = this.squares[_square1.x][_square1.y];
		let newSquares: string[][] = this.squares.slice();
		//console.log(newSquares[_square1.x][_square1.y], newSquares[_square2.x][_square2.y], newSquares);
		newSquares[_square1.x][_square1.y] = newSquares[_square2.x][_square2.y];
		newSquares[_square2.x][_square2.y] = tempTile;
		//console.log(newSquares[_square1.x][_square1.y], newSquares[_square2.x][_square2.y], newSquares);
		this.setSquares(newSquares);
		return this.squares;
	}

}