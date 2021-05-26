import { image2grey, Fourier } from "Utils";

function fft2d() {
  console.log("transformAction");
  const fourier = new Fourier();
  // compute the h hat values
  let h_hats = [];
  fourier.transform(h(), h_hats);
  h_hats = fourier.shift(h_hats, dims);

  // get the largest magnitude
  let maxMagnitude = 0;
  for (const ai = 0; ai < h_hats.length; ai++) {
    const mag = h_hats[ai].magnitude();
    if (mag > maxMagnitude) {
      maxMagnitude = mag;
    }
  }

  // apply a low or high pass filter
  const lowPassRadius = parseInt($s("#low-freq-radius").value); // low pass radius
  const highPassRadius = parseInt($s("#high-freq-radius").value); // high pass radius
  fourier.filter(h_hats, dims, lowPassRadius, highPassRadius);

  // store them in a nice function to match the math
  $h = function (k, l) {
    if (arguments.length === 0) return h_hats;
    const idx = k * dims[0] + l;
    return h_hats[idx];
  };

  // draw the pixels
  const currImageData = ctxs[1].getImageData(0, 0, dims[0], dims[1]);
  const logOfMaxMag = Math.log(cc * maxMagnitude + 1);
  for (var k = 0; k < dims[1]; k++) {
    for (var l = 0; l < dims[0]; l++) {
      var idxInPixels = 4 * (dims[0] * k + l);
      currImageData.data[idxInPixels + 3] = 255; // full alpha
      var color = Math.log(cc * $h(l, k).magnitude() + 1);
      color = Math.round(255 * (color / logOfMaxMag));
      // RGB are the same -> gray
      for (var c = 0; c < 3; c++) {
        // lol c++
        currImageData.data[idxInPixels + c] = color;
      }
    }
  }
  ctxs[1].putImageData(currImageData, 0, 0);

  enableButtons();

  const duration = +new Date() - start;
  console.log("It took " + duration + "ms to compute the FT.");
}

document.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const beforeCanvas = document.querySelector("#before");
  const afterCanvas = document.querySelector("#after");
  const beforeCtx = beforeCanvas.getContext("2d");
  const afterCtx = afterCanvas.getContext("2d");
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    beforeCanvas.width = 200;
    beforeCanvas.height = 200;
    afterCanvas.width = 200;
    afterCanvas.height = 200;
    const img = new Image();
    img.src = e.target.result;
    img.onload = function () {
      beforeCtx.drawImage(img, 0, 0, 200, 200);
      // const loadBase64 = beforeCanvas.toDataURL();
      // 2gery
      const imageData = beforeCtx.getImageData(0, 0, 200, 200);
      // image2grey(imageData)

      afterCtx.putImageData(imageData, 0, 0);
    };
  };
});
