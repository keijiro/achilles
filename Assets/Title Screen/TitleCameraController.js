// タイトル画面のカメラの制御。

function Update() {
	// 秒間30度で回転する。
	transform.parent.rotation =
	  Quaternion.AngleAxis(30.0 * Time.deltaTime, Vector3.up) *
	  transform.parent.rotation;
}
