// 障害物の生成。

var randomWidth : float;	// 生成位置のランダム幅。

// 各障害物のプレハブ。
var cratePrefab : GameObject;
var boxPrefab : GameObject;
var ballPrefab : GameObject;
var crawlerPrefab : GameObject;

private var playerState : PlayerState;

// ランダムな生成位置を求める。
private function RandomPosition() : Vector3 {
	return transform.position +
		   Vector3.right * Random.Range(-randomWidth, randomWidth);
}

// 床の高さでランダムな生成位置を求める。
private function RandomPositionOnFloor() : Vector3 {
	var pos = RandomPosition();
	pos.y = 0;
	return pos;
}

// Crate障害物の生成。
private function CreateCrate() : GameObject {
	var go : GameObject =
	  Instantiate(cratePrefab, RandomPositionOnFloor(),
	              cratePrefab.transform.rotation);
	go.rigidbody.velocity = Vector3.forward * -playerState.velocity;
	return go;
}

// Box障害物の生成。
private function CreateBox() : GameObject {
	var go : GameObject =
	  Instantiate(boxPrefab, RandomPosition(), Random.rotation);
	go.rigidbody.velocity =
	  Vector3(Random.Range(-0.5, 0.5), 0, -0.5) * playerState.velocity;
	return go;
}

// Ball障害物の生成。
private function CreateBall() : GameObject {
	var go : GameObject =
	  Instantiate(ballPrefab, transform.position, transform.rotation);
	go.rigidbody.velocity = Vector3.forward * (-0.5 * playerState.velocity);
	return go;
}

// Crawler障害物の生成。
private function CreateCrawler() : GameObject {
	return Instantiate(crawlerPrefab, RandomPositionOnFloor(),
	                   crawlerPrefab.transform.rotation);
}

function Start() {
	playerState = FindObjectOfType(PlayerState);
	// 最初のフェーズ：簡単な障害物だけ。
	for (var i = 14; i > 0; --i) {
		CreateCrate();
		yield WaitForSeconds(0.05 * i);
		CreateBox();
		yield WaitForSeconds(0.05 * i);
	}
	yield WaitForSeconds(2.0);
	// 第2フェーズ：誘導弾登場。
	for (i = 14; i > 0; --i) {
		CreateCrate();
		yield WaitForSeconds(0.05 * i);
		CreateBall();
		yield WaitForSeconds(0.05 * i);
	}
	yield WaitForSeconds(3.0);
	// 第3フェーズ：クローラーだけ。
	for (i = 20; i > 0; --i) {
		CreateCrawler();
		yield WaitForSeconds(0.5);
	}
	yield WaitForSeconds(3.0);
	// 第4フェーズ：組み合わせ攻撃。
	for (i = 14; i > 0; --i) {
		CreateCrate();
		yield WaitForSeconds(0.03 * i);
		CreateBall();
		yield WaitForSeconds(0.03 * i);
		CreateBox();
		yield WaitForSeconds(0.03 * i);
	}
	yield WaitForSeconds(3.0);
	// 第5フェーズ：誘導弾だけ。
	for (i = 60; i > 0; --i) {
		CreateBall();
		yield WaitForSeconds(0.03 * Mathf.Max(1, i - 30));
	}
	yield WaitForSeconds(3.0);
	// 最終フェーズ：すべての組み合わせ。
	while (true) {
		switch (Random.Range(0, 4)) {
			case 0: CreateBall(); break;
			case 1: CreateCrate(); break;
			case 2: CreateCrawler(); break;
			default: CreateBox(); break;
		}
		yield WaitForSeconds(Random.Range(0.03, 0.8));
	}
}
