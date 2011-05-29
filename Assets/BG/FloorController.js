#pragma strict

// 床のコントロールを統合的に行うオブジェクト。
//
// 物理演算との干渉があるため、FixedUpdateで処理する必要がある。

function FixedUpdate() {
	var delta = Vector3(0, 0, -GameState.scrollVelocity * Time.fixedDeltaTime);
	for (var obj : Object in GameObject.FindGameObjectsWithTag("Floor")) {
		var go = obj as GameObject;
		var pos = go.transform.localPosition + delta;
		if (pos.z > -10.0) {
			go.rigidbody.MovePosition(pos);
		} else {
			// ロールオーバー処理。物理干渉を無視するためMovePositionは使わない。
			pos.z += 60.0;
			go.transform.localPosition = pos;
		}
	}
}