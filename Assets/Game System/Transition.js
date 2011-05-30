// 画面遷移の制御。
// 次のシーンを読み込む役割も兼ねる。
// 
// 開始と同時に自動的にフェードインを開始する。
// FadeOutAndLoadLevelが呼ばれるとフェードアウトを開始し、
// フェードアウトしきった時点で指定されたシーンに遷移する。

var blackTexture : Texture2D;	// 塗りつぶし用の黒テクスチャ。

private var alpha : float;		// アルファ値。
private var nextLevel : String;	// 遷移先のレベル（シーン）。

// フェードアウトの開始とシーンの切り替え。
function FadeOutAndLoadLevel(levelName : String) {
	nextLevel = levelName;
}

function Start() {
	alpha = 1.0;
}

function Update() {
	// nextLevelが設定されていればフェードアウト、それ以外はフェードイン。
	if (nextLevel) {
		// 既にフェードアウトしきっている？
		if (alpha >= 1.0) {
			Application.LoadLevel(nextLevel);
		} else {
			alpha = Mathf.Clamp01(alpha + Time.deltaTime * 2.0);
		}
	} else {
		alpha = Mathf.Clamp01(alpha - Time.deltaTime * 2.0);
	}
}

function OnGUI() {
	if (alpha > 0.0) {
		// 画面全体を黒テクスチャで塗る。
		GUI.depth = 0;
    	GUI.color = Color(1, 1, 1, alpha);
    	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), blackTexture);
	}
}
