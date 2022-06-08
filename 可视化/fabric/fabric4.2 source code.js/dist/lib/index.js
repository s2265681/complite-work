/*eslint quotes: ["error", "double"]*/
window.onload = function () {
  console.log(document.getElementById("el"));
  var mycanvas = new fabric.Canvas("el", {
    perPixelTargetFind: false,
    targetFindTolerance: 10,
    preserveObjectStacking: true,
    selection: true,
    defaultCursor: "default",
    backgroundColor: "#f3f3f3",
    uniScaleKey: null,
    hudArr: [],
    marshallingControl: {},
    width: 600,
    height: 600,
  });
  console.log(mycanvas, "mycanvas");

  var rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: "red",
    width: 20,
    height: 20,
    angle: 45,
  });

  console.log(rect, "rect");
  mycanvas.add(rect);
};
