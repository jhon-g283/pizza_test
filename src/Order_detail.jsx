import React from "react";
import { getpriceobj } from "./PriceList";

//合計と具材の内訳の一覧よう
export default function OrderDetail(props) {
  let sum_price = 0;
  var ing_obj = props.Ingredients_info;
  let array_ing = [];
  let array_ing_total = [];
  let tmp;

  console.log("--function--- OrderDetail");
  console.log(ing_obj);

  for (let v in ing_obj) {
    console.log("index:" + v);
    console.log("val1:" + ing_obj[v]["price"]);
    sum_price += ing_obj[v]["price"];
    tmp = ing_obj[v]["name"];
    // console.log(getpriceobj);

    let tmp_ayyay = array_ing.find((element) => element === tmp);

    if (tmp_ayyay === undefined) {
      console.log("push---");
      let tmp_insert = { name: tmp, total_price: ing_obj[v]["price"] };
      array_ing.push(ing_obj[v]["name"]);
      array_ing_total.push(tmp_insert);
      console.log(array_ing);
      console.log(array_ing_total);
    } else {
      for (const i of array_ing_total.keys()) {
        if (array_ing_total[i]["name"] === tmp) {
          array_ing_total[i]["total_price"] += ing_obj[v]["price"];
        }
      }
    }
  }

  var result = <div>合計：{sum_price}</div>;

  var details;

  console.log("--");
  const result_map = array_ing_total.map((element, index) => {
    var returnelement = (
      <li>
        {element.name} : {element.total_price}
      </li>
    );

    return returnelement;
  });

  // console.log(details);
  details = <div>{details}</div>;

  result = (
    <div>
      <div className="ing_detail_sum">{result}</div>

      {result_map}
    </div>
  );

  return result;
}
