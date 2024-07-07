import { Container, Graphics } from 'pixi.js';
import { DropShadowFilter, GlowFilter } from 'pixi-filters';
import { gsap } from 'gsap';
import { randomInt } from '../../utils/randomInt';

const RARITY_COLORS = [0x131313, 0x4912e7, 0x32a822, 0x9c158f, 0xe7cb2a];

export class Card extends Container {
	static SIZE_RATIO = 3 / 2;

	#width = 0;
	#height = 0;
	#bg = new Graphics();
	#rarityColor;
	#rarity = new Graphics();
	#shadowFilter = new DropShadowFilter({
		color: 0x000000,
		blur: 1,
		offsetX: 0,
	});

	constructor({ x, y, width, height }) {
		super({ x, y });

		this.#width = width;
		this.#height = height;

		this.filters = [this.#shadowFilter];
		this.cursor = 'pointer';

		this.#rarityColor =
			RARITY_COLORS[randomInt(0, RARITY_COLORS.length - 1)];

		this.#drawBackground();
		this.#drawRarity();

		this.addChild(this.#bg, this.#rarity);

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

	#drawRarity() {
		const width = 5;

		this.#rarity
			.roundRect(
				width,
				width,
				this.#width - 2 * width,
				this.#height - 2 * width,
				Math.min(16, this.#height / 24),
			)
			.fill({
				color: this.#rarityColor,
			});
	}

	#handlePointerEnter() {
		this.zIndex = 1;
		gsap.to(this, {
			duration: 0.1,
			pixi: { y: -20 },
			ease: 'power3.out',
		});

		const glowFilter = new GlowFilter({
			color: 0x62b0fd,
			distance: 4,
			innerStrength: 4,
			outerStrength: 2,
		});

		this.filters = [this.#shadowFilter, glowFilter];
	}

	#handlePointerLeave() {
		this.zIndex = 0;
		gsap.to(this, {
			duration: 0.1,
			pixi: { y: 0, rotation: 0 },
			ease: 'power3.out',
		});
		this.filters = [this.#shadowFilter];
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
		this.#rarity.destroy();
		this.#clearListeners();

		super.destroy();
	}
}
