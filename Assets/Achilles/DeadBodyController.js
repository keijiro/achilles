// 死んだ後のAchillesの制御

var ragdoll : GameObject; // 死体用ラグドール

function Start() {
	// ラグドールの生成とトランスフォームのコピー。
	var go = Instantiate(ragdoll) as GameObject;
	CopyTransformsRecursively(transform, go.transform);
	// クラッシュエフェクトの生成。
	go.transform.Find("Crash").particleEmitter.Emit();
	// 不要になったオブジェクトの削除。
	Destroy(transform.Find("root").gameObject);
	Destroy(transform.Find("character").gameObject);
	Destroy(transform.Find("Dash Effect").gameObject);
}

// 再帰的にトランスフォームをコピーする関数。
// ついでにこの中で吹っ飛びのための力を与える。
private function CopyTransformsRecursively(src : Transform,  dst : Transform) {
	var playerState : PlayerState = FindObjectOfType(PlayerState) as PlayerState;

	dst.position = src.position;
	dst.rotation = src.rotation;
	
	if (dst.rigidbody) {
		dst.rigidbody.velocity = Vector3(Random.Range(-5.0, 5.0),
										 Random.Range(0.0, 8.0),
										 0.1 * playerState.velocity);
	}
	
	for (var object in dst) {
		var child : Transform = object as Transform;
		var curSrc = src.Find(child.name);
		if (curSrc) CopyTransformsRecursively(curSrc, child);
	}
}
