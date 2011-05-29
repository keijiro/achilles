#pragma strict

var xBound : float;			// 横方向の移動限界

var xVelMax : float;		// 横方向最大速度
var xAccel : float;			// 横方向加速度

var yVelJump : float;		// ジャンプ初速
var yAccel : float;			// 重力加速度

var dashLength : float;		// ダッシュの長さ（秒）
var dashAccel : float;		// ダッシュの加速度

var jumpEnergy : float;		// ジャンプに必要なエネルギー量
var dashEnergy : float;		// ダッシュに必要なエネルギー量
var energyRegain : float;	// エネルギーの毎秒回復量

private var gameState : GameState; // ゲームステートへの直接参照

private var dashFx : ParticleEmitter;	// ダッシュエフェクトへの参照
private var jumpFx : ParticleEmitter;	// ジャンプエフェクトへの参照

private var xPos : float;		// 横座標
private var yPos : float;		// 縦座標
private var xVel : float;		// 横速度
private var yVel : float;		// 縦速度
private var yaw : float;		// Ｙ軸回転角
private var dashTime : float;	// ダッシュの残り時間

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
		xVel = Mathf.Min(xVel, xBound);
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
		if (Input.GetAxis("Jump") > 0) {
			if (GameState.energy > jumpEnergy) {
    			// ジャンプ開始。
    			yVel = yVelJump;
    			yPos += yVel * Time.deltaTime;
    			animation.Play("jump");
    			jumpFx.Emit();
    			GameState.energy -= jumpEnergy;
			} else {
				// エネルギーが足りない演出。
			}
		}
	}
}

// ヨー角度の更新。
private function UpdateYaw() {
	// この計算式はわりと適当。
    yaw = Mathf.Rad2Deg * Mathf.Asin(xVel * 0.6 / xVelMax);
}

// ダッシュの起動と時間経過。
private function ProcessDash() {
	if (Input.GetButtonDown("Fire1") && dashTime == 0.0) {
		if (GameState.energy > dashEnergy) {
    		// ダッシュ起動。
    		dashTime = dashLength;
    		gameState.dash = true;
    		dashFx.emit = true;
   			GameState.energy = 0;
		} else {
			// エネルギーが足りない演出。
		}
	} else if (dashTime > 0.0) {
		// 時間経過。
		dashTime -= Time.deltaTime;
		if (dashTime <= 0.0) {
			// ダッシュ終了。
			dashTime = 0.0;
			gameState.dash = false;
			dashFx.emit = false;
		}
	}
}

// ダッシュによる加速とワールド物理の干渉の処理。
private function ApplyDashToWorld() {
	// 目標速度：初期速度の２倍。
	var targetVelocity = 2.0 * gameState.initialScrollVelocity;
	if (dashTime > 0.0 && gameState.scrollVelocity < targetVelocity) {
		// 加速中。
		Physics.gravity.z = -dashAccel;
		gameState.scrollVelocity += dashAccel * Time.deltaTime;
	} else if (dashTime == 0.0 && gameState.scrollVelocity > gameState.initialScrollVelocity) {
		// 減速中。
		Physics.gravity.z = dashAccel;
		gameState.scrollVelocity -= dashAccel * Time.deltaTime;
	} else {
		// 定常運転中。
		Physics.gravity.z = 0.0;
		gameState.scrollVelocity = gameState.initialScrollVelocity;
	}
}

function OnDamage() {
	// ダッシュ中は無効。
	if (GameState.dash) return;
	// DeadBodyControllerとGameOverScreenをアクティブにして、HUDと自分は停止する。
	(GetComponent(DeadBodyController) as DeadBodyController).enabled = true;
	(GetComponent(GameOverScreen) as GameOverScreen).enabled = true;
	(GetComponent(HUD) as HUD).enabled = false;
	enabled = false;
}

function Awake() {
	gameState = GetComponent(GameState) as GameState;
	dashFx = transform.Find("Dash Effect").particleEmitter;
	jumpFx = transform.Find("Jump Effect").particleEmitter;
}

function Start() {
	animation["run"].speed = 1.5;
	animation.Play("run");
}

function Update() {
	ProcessXMove();
	ProcessYMove();
	UpdateYaw();
	ProcessDash();
	ApplyDashToWorld();
	// トランスフォームへの反映。
	transform.localPosition = Vector3(xPos, yPos, 0);
	transform.localRotation = Quaternion.AngleAxis(yaw, Vector3.up);
	// エネルギーの回復。
	if (!GameState.dash) {
    	GameState.energy = Mathf.Min(GameState.energy + energyRegain * Time.deltaTime, 1.0);
	}
}
