let originalImageData;

document.getElementById("fileInput").addEventListener("change", function(e) {
	var file = e.target.files[0];
	if(file) {
		var reader = new FileReader();
		reader.onload = function(e) {
			var img = new Image();
			img.onload = function() {
				var canvas = document.getElementById("canvas");
				var ctx = canvas.getContext("2d");
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0);
				originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			};
			img.src = e.target.result;
		};
		reader.readAsDataURL(file);
	}
});

document.getElementById("originalBtn").addEventListener("click", function() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.putImageData(originalImageData, 0, 0);
});

document.getElementById("erodeBtn").addEventListener("click", function() {
	applyMorphologicalOperation(cv.MORPH_ERODE);
});

document.getElementById("dilateBtn").addEventListener("click", function() {
	applyMorphologicalOperation(cv.MORPH_DILATE);
});

document.getElementById("openBtn").addEventListener("click", function() {
	applyMorphologicalOperation(cv.MORPH_OPEN);
});

document.getElementById("closeBtn").addEventListener("click", function() {
	applyMorphologicalOperation(cv.MORPH_CLOSE);
});

document.getElementById("gradientBtn").addEventListener("click", function() {
	applyMorphologicalOperation(cv.MORPH_GRADIENT);
});

function applyMorphologicalOperation(operation) {
	var canvas = document.getElementById("canvas");
	var src = cv.imread(canvas);
	var dst = new cv.Mat();
	var kernel = cv.Mat.ones(3, 3, cv.CV_8U);
        
	cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
	cv.imshow("canvas", src);

	cv.morphologyEx(src, dst, operation, kernel);
	cv.imshow("canvas", dst);

	src.delete();
	dst.delete();
	kernel.delete();
}