// Achilles専用カメラコントローラー

var zOrigin : float;	// 基準点のZ座標
var smoothTime : float;	// 補間パラメーター
var dashFOV : float;	// ダッシュ中の画角

private var playerState : PlayerState;
private var targetObject : GameObject;	// 注視対象となるオブジェクト
private var initialPosition : Vector3;	// 初期座標
private var velocity : Vector3;			// 移動速度
private var initialFOV : float;			// 画角の初期値

function Awake() {
	playerState = FindObjectOfType(PlayerState);
	initialPosition = transform.position;
	initialFOV = camera.fieldOfView;
}

function Update() {
	// ターゲットが定まっていない場合、ターゲットを検索する。
	if (!targetObject) targetObject = GameObject.FindWithTag("Player");
	// 基準座標からターゲットに向かうベクトル。
	var tvector = targetObject.transform.position - Vector3(0, 0, zOrigin);
	// カメラが初期配置されていたZ平面に合わせる。
	tvector *= ((zOrigin - initialPosition.z) / zOrigin);
	// 移動目標座標の決定。
	var moveTo = Vector3(0, initialPosition.y, zOrigin)  + tvector;
	// 移動目標への補間はSmoothDamp関数に任せる。
	transform.localPosition = Vector3.SmoothDamp(transform.localPosition, moveTo, velocity, smoothTime);
	// ダッシュ中の画角変化アニメーション。
	if (playerState.dash) {
		camera.fieldOfView = Mathf.Min(camera.fieldOfView + 18.0 * Time.deltaTime, dashFOV);
	} else {
		camera.fieldOfView = Mathf.Max(camera.fieldOfView - 30.0 * Time.deltaTime, initialFOV);
	}
}
