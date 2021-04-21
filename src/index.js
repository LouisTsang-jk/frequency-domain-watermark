import { image2grey } from 'Utils'
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
      image2grey(imageData)
      afterCtx.putImageData(imageData, 0, 0);
    };
  };
});
