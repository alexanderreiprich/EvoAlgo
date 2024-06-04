export class Field {

	constructor() {
		this.createSquares();
	}

	private squares: string[][] = [];

	public getSquares(): string[][] {
		return this.squares;
	}

	public createSquares() {
		for (let i = 0; i < 10; i++) {
			this.squares[i] = new Array();
			for (let k = 0; k < 10; k++) {
				let randomColor = Math.floor(Math.random() * 16777215).toString(16);
				this.squares[i][k] = randomColor;
			}
		}
		console.log(this.squares);
		return this.squares;
	}

	public swapSquares(_square1: {x: number, y: number}, _square2: {x: number, y: number}): void {
		const tempTile = this.squares[_square1.x][_square1.y];
		this.squares[_square1.x][_square1.y] = this.squares[_square2.x][_square2.y];
		this.squares[_square2.x][_square2.y] = tempTile;
	}

}