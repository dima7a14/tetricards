import { randomInt } from './randomInt';

export function randomHexColor() {
	const r = randomInt(0, 255);
	const g = randomInt(0, 255);
	const b = randomInt(0, 255);

	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
