// 死亡時に登場するラグドールの制御。

var ragdollPrefab : GameObject;

private var playerState : PlayerState;

function Awake() {
	playerState = FindObjectOfType(PlayerState) as PlayerState;
}

function OnPlayerDeath() {
	// ラグドールをインスタンス化し、現在のプレイヤーのポーズをコピーする。
	var ragdoll : GameObject = Instantiate(ragdollPrefab) as GameObject;
	CopyTransformsRecursively(transform, ragdoll.transform);
}

// 再帰的にトランスフォームをコピーする。
// ついでにこの中で吹っ飛びのための力を与える。
private function CopyTransformsRecursively(source : Transform, dest : Transform) {
	// トランスフォームのコピー（スケールは無視）。
	dest.position = source.position;
	dest.rotation = source.rotation;
	// 軽く吹き飛ばす。
	if (dest.rigidbody) {
		var vx : float = Random.Range(-5.0, 5.0);
		var vy : float = Random.Range(0.0, 8.0);
		dest.rigidbody.velocity = Vector3(vx, vy, 0.1 * playerState.velocity);
	}
	// 子供の構造を再帰的にたどる。
	for (var object : Object in dest) {
		var destChild : Transform = object as Transform;
		var sourceChild = source.Find(destChild.name);
		if (sourceChild) CopyTransformsRecursively(sourceChild, destChild);
	}
}
