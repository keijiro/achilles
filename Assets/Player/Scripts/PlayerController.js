// プレイヤーの制御。

var xBound : float;			// 横方向の移動限界。

var xVelMax : float;		// 横方向最大速度。
var xAccel : float;			// 横方向加速度。

var yVelJump : float;		// ジャンプ初速。
var yAccel : float;			// 重力加速度。

var dashLength : float;		// ダッシュの長さ（秒）。
var dashAccel : float;		// ダッシュの加速度。

var jumpEnergy : float;		// ジャンプに必要なエネルギー量。
var dashEnergy : float;		// ダッシュに必要なエネルギー量。
var energyRegain : float;	// エネルギーの毎秒回復量。

private var xPos : float;		// 横座標
private var yPos : float;		// 縦座標
private var xVel : float;		// 横速度
private var yVel : float;		// 縦速度
private var yaw : float;		// Ｙ軸回転角
private var dashTime : float;	// ダッシュの残り時間

// 外部コンポーネントへの参照。
private var playerState : PlayerState;
private var dashFx : ParticleEmitter;
private var jumpFx : ParticleEmitter;

// 横方向の動きの処理。
private function ProcessXMove() {
	// 入力に応じた加速処理。
	var xInput : float = Input.GetAxis("Horizontal");
	var xVelAdd = xAccel * Time.deltaTime;
	if (xInput > 0) {
		xVel = Mathf.MoveTowards(xVel, xVelMax, xVelAdd);
	} else if (xInput < 0) {
		xVel = Mathf.MoveTowards(xVel, -xVelMax, xVelAdd);
	} else {
		xVel = Mathf.MoveTowards(xVel, 0, xVelAdd);
	}
	// 位置の更新。
	xPos += xVel * Time.deltaTime;
	// 移動範囲の制限。
	if (xPos < -xBound) {
		xPos = -xBound;
		xVel = Mathf.Max(xVel, 0.0);
	} else if (xPos > xBound) {
		xPos = xBound;
		xVel = Mathf.Min(xVel, 0.0);
	}
}

// 縦方向の動き（ジャンプ）の処理。
private function ProcessYMove() {
	if (yPos > 0) {
		// 滞空中の処理：落下するのみ。
		yVel += yAccel * Time.deltaTime;
		yPos += yVel * Time.deltaTime;
		if (yPos <= 0) {
			// ジャンプ終了。
			yPos = yVel = 0;
			animation.Play("mounted");
			animation.CrossFade("run", 0.1);
			jumpFx.Emit();
		}
	} else {
		// ジャンプ判定。
		if (Input.GetAxis("Jump") > 0 && playerState.energy > jumpEnergy) {
   			// ジャンプ開始。
   			yVel = yVelJump;
   			yPos += yVel * Time.deltaTime;
   			animation.Play("jump");
   			jumpFx.Emit();
   			playerState.energy -= jumpEnergy;
		}
	}
}

// ヨー角度の更新。
private function UpdateYaw() {
	// この計算式はわりと適当。
    yaw = Mathf.Rad2Deg * Mathf.Asin(xVel * 0.6 / xVelMax);
}

// ダッシュの処理。
private function ProcessDash() {
	if (dashTime == 0.0) {
		if (Input.GetButtonDown("Fire1") && playerState.energy > dashEnergy) {
    		// ダッシュ起動。
    		dashTime = dashLength;
    		playerState.dash = true;
    		dashFx.emit = true;
   			playerState.energy = 0;
		}
	} else {
		// 時間経過。
		dashTime -= Time.deltaTime;
		if (dashTime <= 0.0) {
			// ダッシュ終了。
			dashTime = 0.0;
			playerState.dash = false;
			dashFx.emit = false;
		}
	}
}

// 速度変化の処理。
private function ProcessVelocityChange() {
	// ダッシュ速度：初期速度の２倍。
	var dashVelocity = 2.0 * playerState.initialVelocity;
	if (dashTime > 0.0) {
		if (playerState.velocity < dashVelocity) {
			// 加速中。
			playerState.velocity += dashAccel * Time.deltaTime;
			Physics.gravity.z = -dashAccel;
		} else {
			// 加速完了。
			playerState.velocity = dashVelocity;
			Physics.gravity.z = 0.0;
		}
	} else {
		if (playerState.velocity > playerState.initialVelocity) {
			// 減速中
			playerState.velocity -= dashAccel * Time.deltaTime;
			Physics.gravity.z = dashAccel;
		} else {
			// 減速運転中。
			playerState.velocity = playerState.initialVelocity;
			Physics.gravity.z = 0.0;
		}
	}
}

// ダメージメッセージの処理。
function ApplyDamage() {
	// ダッシュ中は無効。
	if (playerState.dash) return;
	// 自分自身とGame Controllerに死亡メッセージを送信する。
	SendMessage("OnPlayerDeath");
	GameObject.FindWithTag("GameController").SendMessage("OnPlayerDeath");
	// キャラクター表示関連と自分自身を破棄する。
	Destroy(transform.Find("character").gameObject);
	Destroy(transform.Find("root").gameObject);
	Destroy(this);
}

function Start() {
	playerState = GetComponent(PlayerState) as PlayerState;
	dashFx = transform.Find("Dash Effect").particleEmitter;
	jumpFx = transform.Find("Jump Effect").particleEmitter;
	// 走りアニメーションで開始。
	animation["run"].speed = 1.5;
	animation.Play("run");
}

function Update() {
	ProcessXMove();
	ProcessYMove();
	UpdateYaw();
	ProcessDash();
	ProcessVelocityChange();
	// トランスフォームへの反映。
	transform.localPosition = Vector3(xPos, yPos, 0);
	transform.localRotation = Quaternion.AngleAxis(yaw, Vector3.up);
	// エネルギーの回復。
	if (!playerState.dash) {
    	playerState.energy =
    	  Mathf.Clamp01(playerState.energy + energyRegain * Time.deltaTime);
	}
}
