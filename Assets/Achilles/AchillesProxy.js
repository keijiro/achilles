#pragma strict

// プロクシーオブジェクト
//
// プレイヤーの当たり判定を代替する。

private var master : AchillesController;

function Start() {
	master = GameObject.Find("Achilles").GetComponent(AchillesController) as AchillesController;
}

function OnTriggerEnter(other : Collider) {
	if (master) master.OnDamage();
}
