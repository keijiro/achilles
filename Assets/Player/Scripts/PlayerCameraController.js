// プレイヤー専用カメラの制御。

var zOrigin : float;	// 基準点のZ座標。
var smoothTime : float;	// 補間パラメーター。
var dashFOV : float;	// ダッシュ中の画角。

private var playerState : PlayerState;
private var targetObject : GameObject;	// 注視対象となるオブジェクト。
private var initialPosition : Vector3;	// 初期座標。
private var velocity : Vector3;			// 移動速度。
private var initialFOV : float;			// 画角の初期値。

function Start() {
	playerState = FindObjectOfType(PlayerState);
	initialPosition = transform.position;
	initialFOV = camera.fieldOfView;
}

function Update() {
	// ターゲットが定まっていない場合、ターゲットを検索する。
	if (!targetObject) {
		targetObject = GameObject.FindWithTag("Player");
		if (!targetObject) return;
	}
	// 基準座標からターゲットに向かうベクトル。
	var relative : Vector3 =
	  targetObject.transform.position - Vector3.forward * zOrigin;
	// カメラが初期配置されていたZ平面に合わせる。
	relative *= ((zOrigin - initialPosition.z) / zOrigin);
	// 移動目標座標の決定。
	var moveTo : Vector3 = Vector3(0, initialPosition.y, zOrigin)  + relative;
	// 移動目標への補間はSmoothDamp関数に任せる。
	transform.localPosition =
	  Vector3.SmoothDamp(transform.localPosition, moveTo, velocity, smoothTime);
	// ダッシュ中の画角変化アニメーション。
	if (playerState.dash) {
		camera.fieldOfView =
		  Mathf.Min(camera.fieldOfView + 18.0 * Time.deltaTime, dashFOV);
	} else {
		camera.fieldOfView =
		  Mathf.Max(camera.fieldOfView - 30.0 * Time.deltaTime, initialFOV);
	}
}
