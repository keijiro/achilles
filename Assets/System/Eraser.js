#pragma strict

// ステージ外に漏れたエンティティを削除するためのスクリプト。

function OnTriggerEnter(other : Collider) {
	Destroy(other.gameObject);
}
