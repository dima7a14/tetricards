import { Container, Graphics } from 'pixi.js';

import { centerAlignHorizontal } from '@/utils/alignment';
import { Card } from './Card';

export class Cards extends Container {
	#width = 0;
	#height = 0;
	#padding = 20;
	#bg = new Graphics();
	#hand = null;

	constructor({ width, height }) {
		super({ isRenderGroup: true });
		this.#width = width;
		this.#height = height;

		this.#drawBackground();
		this.addChild(this.#bg);
		const cardsWidth = this.#width - 2 * this.#padding;
		const cardsHeight = 200;
		this.#hand = new Hand({
			x: this.#padding,
			y: this.#height - (this.#padding + cardsHeight),
			width: cardsWidth,
			height: cardsHeight,
		});
		this.addChild(this.#hand);
	}

	#drawBackground() {
		this.#bg.setSize({ width: this.#width, height: this.#height });
		this.#bg
			.rect(0, 0, this.#width, this.#height)
			.fill({
				color: 0xac9baa,
			})
			.rect(this.#width - 2, 0, 2, this.#height)
			.fill({ color: 0x303030 });
	}
}

export class Hand extends Container {
	width = 0;
	height = 0;
	#cards = [];

	constructor({ x, y, width, height }) {
		super({ x, y });
		this.setSize({ width, height });
		this.width = width;
		this.height = height;

		const cardsNum = 10;

		const cardHeight = this.height;
		const cardWidth = cardHeight / Card.SIZE_RATIO;

		for (let i = 0; i < cardsNum; i++) {
			const card = new Card({
				x: 0,
				y: 0,
				width: cardWidth,
				height: cardHeight,
			});
			this.#cards.push(card);
			centerAlignHorizontal(this.width, this.#cards);
			this.addChild(card);
		}
	}
}
