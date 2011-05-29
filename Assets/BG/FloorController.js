// 床をまとめてコントロールするスクリプト。

private var playerState : PlayerState;

function Start () {
	playerState = FindObjectOfType(PlayerState) as PlayerState;
}

function FixedUpdate () {
	// 移動量を算出する。
	var delta : Vector3 = Vector3.forward *
						  (playerState.velocity * Time.fixedDeltaTime);
	// 階層構造の子供にある床をまとめて処理する。
	for (var object : Object in transform) {
		var child : Transform = object as Transform;
		var position : Vector3 = child.localPosition - delta;
		// ロールオーバーのチェック。
		if (position.z > -10.0) {
			// 普通に移動。
			child.rigidbody.MovePosition(position);
		} else {
			// ロールオーバー処理。
			// 物理干渉を無視するためMovePositionは使わない。
			position.z += 60.0;
			child.localPosition = position;
		}
	}
}
