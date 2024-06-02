import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { PixiPlugin } from 'gsap/PixiPlugin';

import { screenRatio } from './config';
import { Tetris } from './Tetris';
import { Cards } from './Cards';

gsap.registerPlugin(CustomEase, PixiPlugin);

PixiPlugin.registerPIXI(PIXI);

export async function createApplication(root) {
	const app = new PIXI.Application();

	globalThis.__PIXI_APP__ = app;

	await app.init({
		resizeTo: window,
		antialias: true,
		autoDensity: true,
		resolution: window.devicePixelRatio || 1,
	});

	root.appendChild(app.canvas);

	const cards = new Cards({
		x: ((100 - screenRatio.cards[0]) / 100) * app.canvas.width,
		y: ((100 - screenRatio.cards[1]) / 100) * app.canvas.height,
		width: (screenRatio.cards[0] / 100) * app.canvas.width,
		height: (screenRatio.cards[1] / 100) * app.canvas.height,
	});

	const tetris = new Tetris({
		x: ((100 - screenRatio.tetris[0]) / 100) * app.canvas.width,
		y: ((100 - screenRatio.tetris[1]) / 100) * app.canvas.height,
		width: (screenRatio.tetris[0] / 100) * app.canvas.width,
		height: (screenRatio.tetris[1] / 100) * app.canvas.height,
	});

	app.stage.addChild(tetris);
	app.stage.addChild(cards);

	app.ticker.add(() => {});
}
