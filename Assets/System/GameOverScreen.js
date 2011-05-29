#pragma strict

// ゲームオーバー画面

var skin : GUISkin;

private var time : float;

function Update() {
	time += Time.deltaTime;
	// キー入力によりタイトルシーンへ戻る（受け付けまで少し遅延を設けてある）。
	if (time > 1.0 && Input.GetButtonDown("Fire1")) {
		Transition.FadeOutAndLoadLevel("Title Scene");
	}
}

function OnGUI() {
	// GUILayoutを使って文字を自動配置する。
	GUI.skin = skin;
	GUILayout.BeginArea(Rect(0, 0, Screen.width, Screen.height));
	GUILayout.BeginVertical();
	GUILayout.FlexibleSpace();
	
	GUI.color = Color(1, 1, 1, Mathf.Clamp((time - 1.0) * 2.0, 0.0, 1.0));
	GUILayout.Label("GAME OVER");
	
	GUI.color = Color(1, 1, 1, Mathf.Clamp((time - 1.5) * 2.0, 0.0, 1.0));
	GUILayout.Label("hit space key");
	
	GUILayout.FlexibleSpace();
	GUILayout.EndVertical();
	GUILayout.EndArea();
}
