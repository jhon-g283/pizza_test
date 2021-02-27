/**
 * mainクラス
 *
 *
 */

import "./styles.css";
import React from "react";
import Doughfnc from "./Dough_sheet";
import ToppingList from "./Topping";
import ToppingView from "./Show_Topping";
import OrderDetail from "./Order_detail";
import Editpanel from "./Edit_panel";
import { getpriceobj } from "./PriceList";
import ReviewPizza from "./ReviewPizza";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("const --App--");
    // 関数をこのクラスで使用できるようにバインド
    this.click_selection_tag = this.click_selection_tag.bind(this);
    this.change_gzai_img = this.change_gzai_img.bind(this);
    this.update_main_state = this.update_main_state.bind(this);
    this.change_index_cnt = this.change_index_cnt.bind(this);
    this.change_img_index = this.change_img_index.bind(this);
    this.PreviewCanvas = this.PreviewCanvas.bind(this);
    this.Change_To_Edit = this.Change_To_Edit.bind(this);

    this.state = {
      flg: false, //サイドバーの表示用フラグ
      flg_review: false, //レビューモードへの切り替えフラグ
      topping_type: "veg", //現在選択してるトッピングの種類
      topping_img_index: 1,
      cnt: 0, //注文具材の配列インデックス
      max_index: 0,
      // add_topping_fnc: this.update_main_state, //具材クローンに渡す移動用関数
      add_index_fnc: this.change_index_cnt, //戻る進むボタンに渡す関数
      Toppingimage_index_fnc: this.change_img_index,
      range_obj: {}, //判定範囲用のオブジェクト
      range_obj2: {},
      Ingredients_obj: [
        //具材ごとの注文詳細用オブジェクト
        {
          name: "", //具材名
          price: "" //値段
        }
      ],

      Ingredients_imgs: Array().fill(null)
    };
  }

  // マウント後にIDから要素の大きさを取得
  componentDidMount() {
    let dough_node = document.getElementById("Dough_img2");

    //生地画像の位置情報や大きさを取得してトッピングの範囲を設定
    console.log("componentDidMount:App");
    var Dom_dough = dough_node.getBoundingClientRect(); //情報取得
    let dough_x = Dom_dough.x; //横位置
    let dough_y = Dom_dough.y; //縦位置
    let dough_width = Dom_dough.width; //長さ
    let dough_height = Dom_dough.height; //高さ
    let width_quart = dough_width / 8; //範囲調節用に画像の長さの８分の１の値を取得
    let height_quart = dough_height / 8; //範囲調節用に画像の長さの８分の１の値を取得

    if (dough_height < 100) {
      console.log("dough_height + 300 ");
      dough_height += 300;
    }

    let dough_x_end = dough_x + dough_width; //横範囲のの最大値
    let dough_y_end = dough_y + dough_height; //縦範囲の最大値
    console.log(dough_node.getBoundingClientRect());
    console.log("dough_x:" + dough_x); //
    console.log("dough_y:" + dough_y);
    console.log("dough_width:" + dough_width);
    console.log("dough_height:" + dough_height);
    console.log("width_quart:" + width_quart);
    console.log("height_quart:" + height_quart);

    console.log("dough_x_end:" + dough_x_end);
    console.log("dough_y_end:" + dough_y_end);
    dough_x = dough_x + width_quart; //範囲開始地点を延長
    // dough_width = dough_width - width_quart;
    dough_y = dough_y + height_quart; //範囲開始地点を延長
    dough_x = Math.round(dough_x); //四捨五入
    dough_y = Math.round(dough_y); //四捨五入

    // dough_height = dough_height - height_quart;
    dough_x_end = dough_x_end - width_quart; //範囲の終了地点を縮小
    dough_y_end = dough_y_end - height_quart; //範囲の終了地点を縮小

    // 生地の範囲情報をオブジェクトにセット
    let doug_range = {
      dough_x: dough_x,
      dough_y: dough_y,
      dough_x_end: dough_x_end,
      dough_y_end: dough_y_end
    };

    // canvasの位置情報を取得
    // 未使用
    let canvas_node = document.getElementById("review_wcanvas"); //canvas要素取得
    let canvas_rect = canvas_node.getBoundingClientRect(); //要素情報を取得
    let canvas_x = canvas_rect.x; //
    let canvas_y = canvas_rect.y; //

    // 生地画像の位置情報を取得
    // ※かぶっている処理があるので要修正
    // let Dough_img_node = document.getElementById("Dough_img2"); //画像の要素取得
    // let dough_img_rect = Dough_img_node.getBoundingClientRect(); //要素の位置情報取得
    // let d_img_x = dough_img_rect.x;
    // let d_img_y = dough_img_rect.y;

    // console.log(canvas_rect);
    // console.log(dough_img_rect);
    // console.log("canvas_x:" + canvas_x);
    // console.log("canvas_y:" + canvas_y);
    // console.log("d_img_x:" + d_img_x);
    // console.log("d_img_y:" + d_img_y);

    // let canvas_node2 = document.getElementById("review_wcanvas2"); //canvas要素取得
    let guide_length_x = dough_width - width_quart * 2;
    let guide_length_y = dough_height - height_quart * 2;
    // canvas_node2.style.left=""
    // canvas_node2.style.top = dough_y + "px";
    // canvas_node2.style.left = dough_x + "px";
    // canvas_node2.style.position = "absolute";
    // canvas_node2.width = guide_length_x;
    // canvas_node2.height = guide_length_y;

    console.log("dough_x:" + dough_x);
    console.log("dough_y:" + dough_y);

    // canvas_node2.style.zIndex = 1000;

    // 生地の範囲を取得
    let d_img_range = {
      d_img_x: Dom_dough.x, //画像の位置：横
      d_img_y: Dom_dough.y, //画像の位置：縦
      guide_range_xposi: dough_x + "px", //範囲の開始位置
      guide_range_yposi: dough_y + "px", //範囲の開始位置
      guide_length_x: guide_length_x, //範囲の長さ
      guide_length_y: guide_length_y //範囲の高さ
    };

    // ステート更新
    this.setState({ range_obj: doug_range, range_obj2: d_img_range });
    //
  }

  // 具材の配列やインデックス状態を更新する。
  // node:追加具材のノード
  update_main_state(node) {
    console.log("---update_state----");
    let crrent_cnt = this.state.cnt; //現在のインデックス数
    let tmp = this.state.cnt + 1; //インデックスをインクリメント
    let current_tag_push = this.state.Ingredients_imgs.slice(0, crrent_cnt); //インデックス数に応じて要素数を変更した、現在の注文具材の配列を

    let tmp2 = current_tag_push.concat(node); //現在の配列に新たに画像を配列に追加する。
    // console.log(tmp2);
    // （要改修）画像名から具材を把握する------
    let src = node.src;
    // console.log(src);
    // let n = src.lastIndexOf("/");
    // let tmp_src = src.slice(n + 1, src.length);
    let tmp_obj = getpriceobj(src);

    var tmp_ing_name = tmp_obj["name"];
    var tmp_ing_price = tmp_obj["price"];
    // console.log(tmp_obj);
    // console.log(tmp_ing_name);
    // console.log(tmp_ing_price);
    // getpriceobj

    let current_tag_history = this.state.Ingredients_obj.slice(0, crrent_cnt);
    let add_history = { name: tmp_ing_name, price: tmp_ing_price };
    let tmp_array = current_tag_history.concat(add_history);
    // ---------------------

    // state更新
    this.setState({
      Ingredients_obj: tmp_array, //具材の注文状況
      cnt: tmp, //インデックス数
      Ingredients_imgs: tmp2 //具材の画像配列
    });
  }

  // これおそらく使用されてない
  // 具材の配列のインデックスを操作する
  // flg ture:デクリメント ,false:インクリメント
  //
  change_cnt(flg) {
    let tmp = this.state.cnt; //現在のインデックス値取得

    if (flg) {
      //デクリメント
      // ０以上ならデクリメント実行
      if (tmp > 0) {
        console.log("click back");
        tmp = tmp - 1;
      } else {
        console.log("no more back");
        return;
      }
    } else {
      // （要修正）インデックス数の上限を超えてインクリメントしないようにする
      // ステートmax_indexを仕様
      console.log("click forward");
      tmp = tmp + 1;
    }
    this.setState({ cnt: tmp }); //state更新

    console.log("click forward");
  }

  //具材の選択タグをクリックした時に表示させる処理
  click_selection_tag(event) {
    // 現在のフラグの値を反転させる。
    let tmp_flg = !this.state.flg;
    this.setState({
      flg: tmp_flg
    });
  }

  //クローンした具材オブジェクトにつけるイベント(引数でコンポーネントに関数を渡す)
  //マウスムーブに合わせて移動する機能
  onMouseMove_add(event, range) {
    var target = event.target; //ターゲットオブジェクト取得
    var move_check = target.className; //クラス名取得

    // クラス名で動かすかどうかを判断、クラス名がnot_movingなら動かさない
    if (move_check === "not_moving") {
      console.log("can not move");
      return;
    }

    console.log("main-add-function");
    // console.log(range);
    //(要修正)------------
    //カーソルの位置を取得し画像の位置を変更
    var x = event.clientX;
    var y = event.clientY;
    x = x - 50;
    y = y - 50;
    var move_obj = event.target;
    var width = move_obj.offsetWidth;
    var height = move_obj.offsetHeight;

    let clone_x = x - width / 2 + "px";
    let hight_tmp = y - height / 2;

    let clone_y = hight_tmp + "px";

    let x_posi_tmp = x - width / 2 + "px";
    let y_posi_tmp = hight_tmp + "px";

    // 範囲外の時の処理（スタイル変更で知らせるとか何か考える）
    if (x > range.dough_x_end || x < range.dough_x) {
      console.log("x out of range!:" + x);
    }

    if (y > range.dough_y_end || y < range.dough_y) {
      console.log("y out of range!:" + y);
    }

    // --------------
    // マウスカーソルの位置に画像の位置を変更させる。
    target.style.top = y + "px";
    target.style.left = x + "px";
    target.style.position = "absolute";
    target.style.zIndex = 1000;
  }

  //クローンしたトッピングオブジェクトにつけるイベント(引数でコンポーネントに関数を渡す)
  //クリックでマウスムーブのON／OFFの切り替え機能
  onClick_add(event, range) {
    var target = event.target; //ターゲット取得
    var c_name = target.className; //クラス名

    var x = event.clientX;
    var y = event.clientY;

    var flg = true; //判定用のフラグ

    // ターゲットが指定の範囲外で固定されないように、引数で受け取った生地の有効範囲内かチェック
    if (x > range.dough_x_end || x < range.dough_x) {
      flg = false;
      console.log("can not paste bocause of x out of range!:" + x);
    }

    if (y > range.dough_y_end || y < range.dough_y) {
      flg = false;
      console.log("can not paste bocause of y out of range!:" + y);
    }

    //範囲内ならクラス名の切り替えを行う
    //not_movingだとmovingへ
    if (c_name === "moving" && flg === true) {
      target.className = "not_moving";
      target.width = "50";
      console.log("new_className:" + target.className);
    } else if (flg === true) {
      target.className = "moving";
      target.width = "100";
      console.log("new_className:" + target.className);
    }
  }

  // サイドバーの具材の切り替え
  //サイドバーでstateを変更して操作して外部コンポーネントに渡す
  change_gzai_img(str) {
    var tmp = 1; //画像インデックス初期値
    // トッピングの種類と、画像インデックスを初期値にしてステート更新
    this.setState({ topping_type: str, topping_img_index: tmp });
    console.log("topping type:" + str + "  -> " + this.state["topping_type"]);
  }

  // 画像のindex変更用（要修正インクリメントとデクリメントの切り替え）
  change_img_index(flg) {
    // インクリメントするが、１か２にする
    var current_index = this.state.topping_img_index;
    var tmp = current_index + 1;

    if (tmp > 2) {
      tmp = 1;
    }

    this.setState({ topping_img_index: tmp });
    console.log("topping type:" + current_index + "  -> " + tmp);
  }

  // （要修正）インデックス数の上限を超えてインクリメントしないようにする
  // 画像配列のインデックスの操作を行う関数
  change_index_cnt(opt) {
    let tmp = this.state.cnt;
    console.log("-- change_index_cnt--");
    if (opt === "back") {
      if (tmp > 0) {
        console.log("click back");
        tmp = tmp - 1;
      } else {
        console.log("no more back");
        return;
      }
    } else if (opt === "forward") {
      console.log("click forward");
      tmp = tmp + 1;
    } else if (opt === "reset") {
    }
    this.setState({ cnt: tmp });

    // （要修正）インデックス数の上限を超えてインクリメントしないようにする
    // ステートmax_indexを仕様
    console.log("operation:" + opt + "tmp" + tmp + "");
  }

  // 完成図の表示機能、Canvasに生地画像とトッピングの画像を複製して描画させる
  PreviewCanvas() {
    console.log("--previewcanvas--");
    var all_topping = document.querySelectorAll(".not_moving"); //固定されている（クラス名から判断）トッピング取得

    var canvas = document.getElementById("review_wcanvas"); //canvas作成

    var context = canvas.getContext("2d"); //コンテキスト取得
    var img_dough = document.getElementById("Dough_img2"); //画像の要素取得
    var imd_dough_w = img_dough.width; //画像の幅取得
    var imd_dough_h = img_dough.height; //画像の高さ取得

    canvas.width = imd_dough_w; //canvasの幅を生地画像と同じに
    canvas.height = imd_dough_h; //canvasの高さを生地画像と同じに

    // console.log(img_dough);
    context.drawImage(img_dough, 0, 0, imd_dough_w, imd_dough_h); //生地画像を描画

    console.log(all_topping);

    // 生地の位置情報セット
    var img_x = parseInt(this.state.range_obj2.d_img_x, 10); //
    var img_y = parseInt(this.state.range_obj2.d_img_y, 10); //

    // トッピングの数だけループしてCanvasに描画
    for (const i of all_topping.values()) {
      let x = i.style.left;
      // 横情報計算
      x = x.replace("px", "");
      x = parseInt(x, 10);

      x = x - img_x;
      // console.log("x:" + x);
      // 縦情報取得
      let y = i.style.top;
      y = y.replace("px", "");
      y = parseInt(y, 10);

      y = y - img_y;

      // console.log("y:" + y);
      // 描画実施
      context.drawImage(i, x, y, i.width, i.height);
    }
    // ステートのレビューモード用のフラグをTrueに更新
    this.setState({ flg_review: true });
  }

  //編集モードへ戻るための関数
  Change_To_Edit() {
    console.log("--cahge_to_edit--");
    //キャンバスを初期化する。
    var canvas = document.getElementById("review_wcanvas"); //canvas取得
    var canvas_x = canvas.width; //canvasの幅
    var canvas_y = canvas.height; //canvasの高さ

    var context = canvas.getContext("2d"); //コンテキスト取得
    context.clearRect(0, 0, canvas_x, canvas_y); //canvasの指定の範囲を初期化
    canvas.width = 0; //canvasの幅を初期化
    canvas.height = 0; //canvasの高さを初期化
    this.setState({ flg_review: false }); //ステート内のレビューフラグをFalseへ更新
  }

  render() {
    console.log("render ---App----");
    const Ingredients = (
      <div className="opt_menu">
        <ul>
          <li onClick={() => this.change_gzai_img("meat")}>肉</li>
          <li onClick={() => this.change_gzai_img("veg")}>野菜</li>
          <li onClick={() => this.change_gzai_img("cheese")}>チーズ類</li>
          <li onClick={() => this.change_gzai_img("")}>そのほか</li>
        </ul>
      </div>
    );

    // サイドメニュー作成
    const side_list_edit_mode = (
      <div className="sidelist test_border_1">
        <p id="menubtn">menu</p>
        <p id="createbtn">作成</p>
        <p> チラシから選ぶ</p>
        <p id="selectbtn" onClick={this.click_selection_tag}>
          トッピングを選ぶ
        </p>
        <div>{this.state.flg ? "" : Ingredients}</div>

        <p id="reviewbtn" onClick={this.PreviewCanvas}>
          出来上がりを見る
        </p>
        <p id="ordderbtn">注文へ</p>
      </div>
    );

    // 編集モード時のサイドメニュー
    const side_list_review_mode = (
      <div className="sidelist test_border_1">
        <p id="continue_edit" onClick={this.Change_To_Edit}>
          戻る
        </p>
        <p id="ordderbtn">注文へ</p>
      </div>
    );

    // レビューモード時のサイドメニュー
    var style_guide_canvas = {
      top: this.state.range_obj2.guide_range_yposi,
      left: this.state.range_obj2.guide_range_xposi,

      position: "absolute"
    };

    // サイドメニュー
    const sidelist = this.state.flg_review
      ? side_list_review_mode
      : side_list_edit_mode;

    return (
      <div className="App">
        <h1 id="Pizza_id">Pizza</h1>
        <div>
          {this.state.flg_review ? (
            ""
          ) : (
            <ToppingView
              img_array={this.state.Ingredients_imgs} //トッピング画像の入った配列
              move_fnc={this.onMouseMove_add} //マウスムーブ用の関数
              click_fnc={this.onClick_add} //クリック用の関数
              viewing_index={this.state.cnt} //表示する画像配列のインデックス数
              range={this.state.range_obj} //トッピングの可否を判定する範囲オブジェクト
            />
          )}
        </div>
        <div className="topping_list">
          {this.state.flg_review ? (
            ""
          ) : (
            <ToppingList
              guzai_img={this.state.topping_type}
              update_fnc={this.update_main_state}
              img_index_fnc={this.change_img_index} //画像インデックスの変更用関数
              img_index={this.state.topping_img_index} //現在の画像インデックス
              range={this.state.range_obj}
            />
          )}
        </div>
        <div className="">
          <div>{sidelist}</div>
          <div id="Doughfnc_id" className="test_border_1">
            {/* <Doughfnc /> */}
            {this.state.flg_review ? "" : <Doughfnc />}
          </div>
        </div>
        <div className="buttomside test_border_1">
          {this.state.flg_review ? (
            ""
          ) : (
            <Editpanel click_fnc={this.state.add_index_fnc} />
          )}
        </div>
        <div className="ing_detail">
          <OrderDetail Ingredients_info={this.state.Ingredients_obj} />
        </div>
        <div>
          <canvas
            id="review_wcanvas"
            className="review_canvas test_border_1"
          ></canvas>
          {this.state.flg_review ? (
            ""
          ) : (
            <canvas
              id="review_wcanvas2"
              className=" test_border_1"
              style={style_guide_canvas}
              width={this.state.range_obj2.guide_length_x + "px"}
              height={this.state.range_obj2.guide_length_y + "px"}
            ></canvas>
          )}
          {this.state.flg_review ? "" : <ReviewPizza />}
        </div>
      </div>
    );
  }
}
