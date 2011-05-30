// Crawler障害物の制御。
// 左右に揺れつつ、スクロール速度に合わせて手前に動かす。

private var playerState : PlayerState;
private var initialPosition : Vector3;	// 初期位置。
private var theta : float;				// 左右への揺れの位相。

function Start() {
	playerState = FindObjectOfType(PlayerState);
	initialPosition = rigidbody.position;
	theta = Mathf.PI * 2.0 * Random.value; // ランダムな位相から始まる。
}

function FixedUpdate() {
	// 左右の揺れ。
	theta += Time.fixedDeltaTime * 2.5; 
	var x : float = initialPosition.x + Mathf.Sin(theta) * 1.5;
	// スクロールに合わせた移動。
	var dz : float = playerState.velocity * Time.fixedDeltaTime;
	// 剛体を動かす。
	rigidbody.MovePosition(Vector3(x, 0, rigidbody.position.z - dz));
}
