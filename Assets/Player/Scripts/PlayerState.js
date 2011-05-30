// プレイヤーの状態を保持するスクリプト。

var initialVelocity : float;	// 移動速度の初期値。

@HideInInspector var velocity : float;	// 移動速度。
@HideInInspector var dash : boolean;	// ダッシュ中を表す。
@HideInInspector var energy : float;	// 現在のエネルギー量。

function Start () {
	velocity = initialVelocity;
	dash = false;
	energy = 1.0;
}
