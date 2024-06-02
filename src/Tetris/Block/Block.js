import { Container, Graphics } from 'pixi.js';
import { DropShadowFilter } from 'pixi-filters';

import { randomHexColor } from '@/utils/randomHexColor';
import { Tile } from './Tile';

export class Block extends Container {
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

		const dropShadowFilter = new DropShadowFilter({
			color: 0x000000,
			blur: 2,
			offsetX: 0,
		});

		this.filters = [dropShadowFilter];
	}

	get left() {
		return this.#offsetX * this.#tileLength;
	}

	get top() {
		return this.#offsetY * this.#tileLength;
	}
}
