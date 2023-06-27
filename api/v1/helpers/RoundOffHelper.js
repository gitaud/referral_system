const roundToZero = (num) => {
	return +(Math.round(num + "e+0")  + "e-0");
}

module.exports = {
	roundToZero
}