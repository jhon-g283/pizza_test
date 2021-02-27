import React from "react";

export default function PreviewCanvas(props) {
  console.log("--ReviewPizza--");
  var all_topping = document.querySelectorAll(".not_moving");

  console.log(all_topping);

  for (const i of all_topping.values()) {
    console.log(i);
  }

  var result = <canvas id="canvas_id"></canvas>;
  var ele = document.getElementById("canvas_id");
  console.log(ele);
  // var context = ele.getContext("2d");
  // context.fillSt

  return result;
}
