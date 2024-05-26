import { Graphics } from 'pixi.js';

import { randomHexColor } from '@/utils/randomHexColor';
import { Tile } from './Tile';

export class Block extends Graphics {
	#tileLength = 0;
	#offsetX = 0;
	#offsetY = 0;

	constructor({ offsetX, offsetY, tileLength, scheme }) {
		super();
		this.#offsetX = offsetX;
		this.#offsetY = offsetY;
		this.#tileLength = tileLength;
		const color = randomHexColor();

		for (let i = 0; i < scheme.length; i++) {
			for (let j = 0; j < scheme[i].length; j++) {
				if (scheme[i][j] === 1) {
					this.addChild(
						new Tile({
							x: this.left + j * this.#tileLength,
							y: this.top + i * this.#tileLength,
							width: this.#tileLength,
							height: this.#tileLength,
							color,
						}),
					);
				}
			}
		}
	}

	get left() {
		return this.#offsetX * this.#tileLength;
	}

	get top() {
		return this.#offsetY * this.#tileLength;
	}
}
