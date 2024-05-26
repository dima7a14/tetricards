import { Graphics } from 'pixi.js';

export class Tile extends Graphics {
	constructor({ x, y, width, height, color }) {
		super();
		this.roundRect(x, y, width, height, 8).fill({ color }).stroke({
			color: 0x303030,
			width: 2,
		});
	}
}
