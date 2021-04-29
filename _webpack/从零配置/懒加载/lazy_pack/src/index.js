let button = document.createElement("button");
button.innerHTML = "按钮";
button.addEventListener("click", function () {
  import("./hello").then((result) => {
    console.log(result.default);
  });
});

console.log("index");
document.body.appendChild(button)