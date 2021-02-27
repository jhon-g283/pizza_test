import Icon_circle from "./img/circle.png";
import Icon_triangle from "./img/triangle.png";
import Icon_square from "./img/square.png";

export default function Getimage_src(obj) {
  // console.log(obj);
  // var n = obj.IndexOf(".png");
  // 文字列が画像かどうかチェック

  // 文字列を加工

  // サイドメニュー画像の変更用
  var Img_list = {
    veg: {
      1: { 1: Icon_circle, 2: Icon_circle, 3: Icon_circle },
      2: { 1: Icon_circle, 2: Icon_triangle, 3: Icon_square }
    },
    meat: {
      1: { 1: Icon_triangle, 2: Icon_triangle, 3: Icon_triangle },
      2: { 1: Icon_circle, 2: Icon_triangle, 3: Icon_square }
    },

    cheese: {
      1: { 1: Icon_square, 2: Icon_square, 3: Icon_square },
      2: { 1: Icon_circle, 2: Icon_triangle, 3: Icon_square }
    }
  };

  var type = obj["type"];
  var n = obj["num"];

  var result = Img_list[type][n];

  return result;
}
