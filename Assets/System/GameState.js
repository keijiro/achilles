#pragma strict

// ゲームの状態を全体で共有するためのクラス。

// 共有情報
static var scrollVelocity : float;	// スクロール速度
static var dash : boolean;			// ダッシュ中を表すフラグ
static var energy : float;			// 現在のエネルギー量

// 初期設定
var initialScrollVelocity : float;	// スクロール速度の初期値

function Awake() {
	scrollVelocity = initialScrollVelocity;
	dash = false;
	energy = 1.0;
}
