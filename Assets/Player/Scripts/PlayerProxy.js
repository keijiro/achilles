// プレイヤーの当たり判定を代替する。

private var master : GameObject;

function Start() {
	master = GameObject.FindWithTag("Player");
}

function OnTriggerEnter(other : Collider) {
	if (master) master.SendMessage("ApplyDamage");
}
