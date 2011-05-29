// ゲームオーバー画面を制御するスクリプト。

var skin : GUISkin;

private var time : float; // 画面開始からの経過時間

function Update() {
	time += Time.deltaTime;
	// キー入力によりタイトルシーンへ戻る。
	// ただし、1.0秒経過するまでは無効期間とする。
	if (time > 1.0 && Input.GetButtonDown("Fire1")) {
		var transition : Transition = FindObjectOfType(Transition) as Transition;
		transition.FadeOutAndLoadLevel("Title");
	}
}

function OnGUI() {
	GUI.skin = skin;
	GUILayout.BeginArea(Rect(0, 0, Screen.width, Screen.height));
	GUILayout.BeginVertical();
	GUILayout.FlexibleSpace();
	
	// 1.0秒後からフェードイン。
	GUI.color = Color(1, 1, 1, Mathf.Clamp01((time - 1.0) * 2.0));
	GUILayout.Label("GAME OVER", "message");
	
	// 1.5秒後からフェードイン。
	GUI.color = Color(1, 1, 1, Mathf.Clamp01((time - 1.5) * 2.0));
	GUILayout.Label("hit space key", "message");
	
	GUILayout.FlexibleSpace();
	GUILayout.EndVertical();
	GUILayout.EndArea();
}
