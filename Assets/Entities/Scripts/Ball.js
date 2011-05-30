// Ball障害物の制御。
// プレイヤーに向かって軽く誘導がかかる。

private var target : GameObject;

function Start() {
	target = GameObject.FindWithTag("Player") as GameObject;
}

function FixedUpdate() {
	if (target == null) return;
	// プレイヤーとの距離に応じて加速度をかけつつ、少し浮力も与える。
   	var relx : float = target.transform.position.x - transform.position.x;
   	rigidbody.AddForce(Vector3(relx, 4.3, 0), ForceMode.Acceleration);
}
