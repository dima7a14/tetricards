import { Application } from 'pixi.js';
import { Tetris } from './Tetris';

export async function createApplication(root) {
	const app = new Application();

	globalThis.__PIXI_APP__ = app;

	await app.init({ width: window.innerWidth, height: window.innerHeight });

	root.appendChild(app.canvas);

	const tetris = new Tetris({
		x: 0.6 * app.canvas.width,
		y: 0,
		width: 0.4 * app.canvas.width,
		height: 0.6 * app.canvas.height,
	});

	app.stage.addChild(tetris);

	app.ticker.add(() => {});
}
