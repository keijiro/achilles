#pragma strict

function Update () {
	// 秒間３０度の速さでぐるぐる回転する。
	var spin = Quaternion.AngleAxis(30.0 * Time.deltaTime, Vector3.up);
	transform.parent.rotation = spin * transform.parent.rotation;
}
