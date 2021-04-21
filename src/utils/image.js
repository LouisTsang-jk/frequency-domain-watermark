export const image2grey = function (imageData) {
	const { data } = imageData;
	for (let i = 0; i < data.length; i += 4) {
		const grey = (data[i] + data[i + 1] + data[i + 2]) / 3;
		data[i] = grey;
		data[i + 1] = grey;
		data[i + 2] = grey;
	}
	return data
};
