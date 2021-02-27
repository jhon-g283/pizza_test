import React from "react";

export default function Edit_panel(props) {
  console.log("--function-- Editp_anel");
  // console.log(props);
  const edit_node = (
    <div>
      <li onClick={() => props.click_fnc("back")}>back</li>
      <li onClick={() => props.click_fnc("forward")}>forward</li>
      <li>reset</li>
    </div>
  );

  return edit_node;
}
