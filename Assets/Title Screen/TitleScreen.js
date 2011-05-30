// タイトル画面の制御。

var skin : GUISkin;

private var time : float; // 画面開始からの経過時間。

function Update() {
	time += Time.deltaTime;
	// キー入力によりメインシーンを開始する。
	if (Input.GetButtonDown("Fire1")) {
		SendMessage("FadeOutAndLoadLevel", "Main");
	}
}

function OnGUI() {
	GUI.skin = skin;
	GUI.depth = 1;

	GUILayout.BeginArea(Rect(0, 0, Screen.width, Screen.height));
	GUILayout.BeginVertical();
	GUILayout.FlexibleSpace();
	
	// 1.0秒後からフェードイン。
	GUI.color = Color(1, 1, 1, Mathf.Clamp01((time - 1.0) * 1.5));
	GUILayout.Label("A C H I L L E S", "message");
	
	// 1.9秒後からフェードイン。
	GUI.color = Color(1, 1, 1, Mathf.Clamp01((time - 1.9) * 1.5));
	GUILayout.Label("hit space key", "message");
	
	GUILayout.FlexibleSpace();
	GUILayout.EndVertical();
	GUILayout.EndArea();
}
