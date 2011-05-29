#pragma strict

// マキビシの制御
// 左右に揺れつつ、スクロール速度に合わせて手前に動かす。

private var initialPosition : Vector3;	// 初期位置
private var theta : float;				// 左右への揺れ位相

function Start() {
	initialPosition = rigidbody.position;
	theta = Mathf.PI * Random.value;
}

function FixedUpdate() {
	// 左右の揺れ。
	theta += Time.fixedDeltaTime * 2.5; 
	var x = initialPosition.x + Mathf.Sin(theta) * 1.5;
	// スクロールに合わせた移動。
	var z = rigidbody.position.z - GameState.scrollVelocity * Time.fixedDeltaTime;
	// 剛体を動かす。
	rigidbody.MovePosition(Vector3(x, 0, z));
}
