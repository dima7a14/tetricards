export function centerAlignHorizontal(containerWidth, children) {
	let totalWidth = 0;

	children.forEach((child) => {
		totalWidth += child.width;
	});

	const isFit = totalWidth <= containerWidth;
	const offsetX = isFit ? (containerWidth - totalWidth) / 2 : 0;

	let currentX = offsetX;
	let overlap = 0;

	if (!isFit) {
		overlap = (containerWidth - totalWidth) / (children.length - 1);
	}

	children.forEach((child, index) => {
		child.position.x = currentX + overlap * index;
		currentX += child.width;
	});
}
