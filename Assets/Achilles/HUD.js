#pragma strict

// ゲームの状態表示（いわゆるHUD）

var skin : GUISkin;
var barTexture : Texture2D;

function OnGUI() {
	if (GameState.energy > 0.6) {
		GUI.color = Color(0.0, 1.0, 1.0, 0.4);
	} else if (GameState.energy > 0.3) {
		GUI.color = Color(1.0, 1.0, 0.0, 0.4);
	} else {
		GUI.color = Color(1.0, 0.0, 0.0, 0.4);
	}
	var h = Screen.height;
	GUI.DrawTexture(Rect(0, 0.98 * h, GameState.energy * Screen.width, 0.02 * h), barTexture);
}
