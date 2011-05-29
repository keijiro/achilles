#pragma strict

// タイトル画面

var skin : GUISkin;

private var time : float;

function Update() {
	time += Time.deltaTime;
	// キー入力によりメインシーンを開始する。
	if (Input.GetButtonDown("Fire1")) {
		Transition.FadeOutAndLoadLevel("Main Scene");
	}
}

function OnGUI() {
	// GUILayoutを使って文字を自動配置する。
	GUI.skin = skin;
	GUILayout.BeginArea(Rect(0, 0, Screen.width, Screen.height));
	GUILayout.BeginVertical();
	GUILayout.FlexibleSpace();
	
	GUI.color = Color(1, 1, 1, Mathf.Clamp((time - 1.0) * 1.5, 0.0, 1.0));
	GUILayout.Label("A C H I L L E S");
	
	GUI.color = Color(1, 1, 1, Mathf.Clamp((time - 1.9) * 1.5, 0.0, 1.0));
	GUILayout.Label("hit space key");
	
	GUILayout.FlexibleSpace();
	GUILayout.EndVertical();
	GUILayout.EndArea();
}
