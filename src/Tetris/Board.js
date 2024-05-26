import { Graphics } from 'pixi.js';

import { randomInt } from '@/utils/randomInt';
import { Block } from './Block';
import { schemes } from './schemes';

export class Board extends Graphics {
	#columnsLength = 10;
	#rowsLength = 0;
	#tileLength = 0;

	constructor({ width, height }) {
		super();
		this.roundRect(0, 0, width, height, 8).fill(0xededed).stroke({
			color: 0x303030,
			width: 2,
			alignment: 0,
		});

		this.#tileLength = width / this.#columnsLength;
		this.#rowsLength = Math.floor(height / this.#tileLength);

		const blocksCount = randomInt(1, 6);

		for (let i = 0; i < blocksCount; i++) {
			const scheme = schemes[randomInt(0, schemes.length - 1)];
			const blockWidth = scheme[0].length;
			const blockHeight = scheme.length;
			let offsetX = randomInt(0, this.#columnsLength - 1);
			let offsetY = randomInt(0, this.#rowsLength - 1);

			if (offsetX + blockWidth > this.#columnsLength) {
				offsetX = this.#columnsLength - blockWidth;
			}

			if (offsetY + blockHeight > this.#rowsLength) {
				offsetY = this.#rowsLength - blockHeight;
			}

			const block = new Block({
				offsetX,
				offsetY,
				tileLength: this.#tileLength,
				scheme,
			});

			this.addChild(block);
		}
	}
}
