#pragma strict

// ボールの制御
// 軽くプレイヤーに向かって誘導をかける。

private var target : Transform; // 誘導対象

function Start() {
	target = (GameObject.FindWithTag("Player") as GameObject).transform;
}

function FixedUpdate() {
	if (target) {
		// プレイヤーとの距離に応じて加速度をかけつつ、少し浮力も与える。
    	var rx = target.position.x - transform.position.x;
    	rigidbody.AddForce(Vector3(rx, 4.3, 0), ForceMode.Acceleration);
	}
}
