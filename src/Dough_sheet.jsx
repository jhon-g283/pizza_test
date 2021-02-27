import React from "react";
import Icon_dough from "./img/dough/dough.png";

export default function Dough_fnc(props) {
  //（要修正）propsで画像を変更する

  console.log("--function-- Dough_fnc");
  const dough_img = (
    <div id="Dough_img">
      <img
        src={Icon_dough}
        alt=""
        width="70%"
        id="Dough_img2"
        className="test_border_1"
      ></img>
    </div>
  );

  return dough_img;
}
