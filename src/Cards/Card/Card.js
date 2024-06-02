import { Container, Graphics } from 'pixi.js';
import { DropShadowFilter } from 'pixi-filters';
import { gsap } from 'gsap';

export class Card extends Container {
	static SIZE_RATIO = 3 / 2;

	#width = 0;
	#height = 0;
	#bg = new Graphics();

	constructor({ x, y, width, height }) {
		super({ x, y });

		this.#width = width;
		this.#height = height;

		const dropShadowFilter = new DropShadowFilter({
			color: 0x000000,
			blur: 1,
			offsetX: 0,
		});

		this.filters = [dropShadowFilter];

		this.#drawBackground();

		this.addChild(this.#bg);

		this.#setListeners();
	}

	#drawBackground() {
		this.#bg
			.roundRect(
				0,
				0,
				this.#width,
				this.#height,
				Math.min(16, this.#height / 24),
			)
			.fill({
				color: 0xffffff,
			});
	}

	#handlePointerEnter() {
		this.zIndex = 1;
		gsap.to(this, {
			duration: 0.1,
			pixi: { y: -20 },
			ease: 'power3.out',
		});
	}

	#handlePointerLeave() {
		this.zIndex = 0;
		gsap.to(this, {
			duration: 0.1,
			pixi: { y: 0, rotation: 0 },
			ease: 'power3.out',
		});
	}

	#handlePointerMove(event) {
		const localPos = this.toLocal({ x: event.x, y: event.y });

		gsap.to(this, {
			duration: 0.1,
			pixi: {
				rotation: 0.02 * (localPos.x - this.#width / 2),
			},
			ease: 'power3.out',
		});
	}

	#setListeners() {
		this.eventMode = 'dynamic';
		this.on('pointerenter', this.#handlePointerEnter.bind(this));
		this.on('pointerleave', this.#handlePointerLeave.bind(this));
		this.on('pointermove', this.#handlePointerMove.bind(this));
	}

	#clearListeners() {
		this.off('pointerEnter', this.#handlePointerEnter.bind(this));
		this.off('pointerleave', this.#handlePointerLeave.bind(this));
		this.off('pointermove', this.#handlePointerMove.bind(this));
	}

	destroy() {
		this.#bg.destroy();
		this.#clearListeners();

		super.destroy();
	}
}
