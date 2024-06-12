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
		let copyOfSquares: string[][] = this.squares.map(row => {
			return row.slice();
		})
		return copyOfSquares;
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
		const tempTile: string[][] = this.squares.map((row) => {
			return row.slice();
		});
		this.squares[_square1.x][_square1.y] = this.squares[_square2.x][_square2.y].slice();
		this.squares[_square2.x][_square2.y] = tempTile[_square1.x][_square2.y];
		return this.squares;
	}
}