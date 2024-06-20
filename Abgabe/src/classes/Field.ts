export class Field {

	constructor(_squares?: string[][], _bw?: boolean) {
		if (_squares) {
			this.setSquares(_squares);
		}
		else {
			_bw ? this.createSquares(true) : this.createSquares();

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

	public createSquares(bw?: boolean) {
		for (let i = 0; i < 10; i++) {
			this.squares[i] = new Array();
			for (let k = 0; k < 10; k++) {
				if (bw) {
				let color = Math.random() > 0.5 ? "000000" : "ffffff";
				this.squares[i][k] = color;
				}
				else {
					let randomColor = Math.floor(Math.random() * 16777215).toString(16);
					this.squares[i][k] = randomColor;
				}
			}
		}
		console.log(this.squares);
		return this.squares;
	}

	public swapSquares(_square1: { x: number, y: number }, _square2: { x: number, y: number }): string[][] {
		const tempTile: string[][] = this.squares.map((row) => {
			return row.slice();
		});
		this.squares[_square1.x][_square1.y] = this.squares[_square2.x][_square2.y].slice();
		this.squares[_square2.x][_square2.y] = tempTile[_square1.x][_square1.y].slice();

		return this.squares;
	}
}
