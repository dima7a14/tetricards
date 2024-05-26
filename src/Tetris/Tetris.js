import { Container } from 'pixi.js';
import { Board } from './Board';

export class Tetris extends Container {
	constructor({ x, y, width, height }) {
		super({ x, y, width, height, isRenderGroup: true });
		const board = new Board({ width, height });

		this.addChild(board);
	}
}
