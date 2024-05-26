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
			const block = new Block({
				offsetX: randomInt(0, this.#columnsLength - 1),
				offsetY: randomInt(0, this.#rowsLength - 1),
				tileLength: this.#tileLength,
				scheme,
			});

			this.addChild(block);
		}
	}
}
