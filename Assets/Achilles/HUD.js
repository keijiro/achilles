// ゲームの状態表示（いわゆるHUD）を制御するスクリプト。

var barTexture : Texture2D; // バー表示のための白テクスチャ

private var playerState : PlayerState;

function Start() {
	playerState = FindObjectOfType(PlayerState) as PlayerState;
}

function OnGUI() {
	// エネルギー・バーの色の変化。
	if (playerState.energy > 0.6) {
		GUI.color = Color(0.0, 1.0, 1.0, 0.4);
	} else if (playerState.energy > 0.3) {
		GUI.color = Color(1.0, 1.0, 0.0, 0.4);
	} else {
		GUI.color = Color(1.0, 0.0, 0.0, 0.4);
	}
	// エネルギー・バーの表示。
	var bw : float = playerState.energy * Screen.width;
	var sh : float = Screen.height;
	GUI.DrawTexture(Rect(0, 0.98 * sh, bw, 0.02 * sh), barTexture);
}
