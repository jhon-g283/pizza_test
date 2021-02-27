function GetPrice(img_name) {
  console.log("--function GetPrice--");

  // console.log("img_name:" + img_name);
  if (img_name === "") {
    // console.log(test);
    return;
  }

  // アップ環境の画像のソースの仕様に対する文字列の処理を行い、画像名を取得
  var priod_index = img_name.lastIndexOf(".");

  var haifun_index = img_name.lastIndexOf("-");
  var name_length = img_name.length;
  var length_to_end = name_length - priod_index;
  var get_length = name_length - length_to_end;

  // console.log("priod_index:" + priod_index);
  // console.log("haifun_index:" + haifun_index);
  // console.log("name_length" + name_length);
  // console.log("get_length:" + get_length);
  // console.log(n);

  var name = img_name.slice(haifun_index + 1, get_length);
  // console.log("img_name:" + img_name);
  // console.log("name:" + name);

  // 計算用
  //
  //
  //
  //
  var Price_list = {
    circle: {
      name: "veg1",
      price: 100,
      type1: "veg",
      sortid: 1,
      type: 1,
      type2: 2
    },
    triangle: {
      name: "meat1",
      price: 100,
      type1: "meat",
      sortid: 2,
      type: 1,
      type2: 2
    }
  };

  var result = Price_list[name];

  // console.log(result);

  if (result === undefined) {
    var test = {
      name: "test",
      price: 100,
      type1: "test",
      sortid: 1,
      type: 1,
      type2: 2
    };

    return test;
  }

  // console.log(result);

  return result;
}

export { GetPrice as getpriceobj };
