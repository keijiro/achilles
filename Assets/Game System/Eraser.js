// ステージ外に漏れたエンティティを削除する。

function OnTriggerEnter(other : Collider) {
	Destroy(other.gameObject);
}
