#pragma strict

// 画面遷移エフェクト（フェードイン・フェードアウト）
//
// 開始と同時に自動的にフェードインを開始する。
// FadeOutAndLoadLevelが呼ばれるとフェードアウトを開始し、
// フェードアウトしきった時点で指定されたシーンに遷移する。

var blackTexture : Texture2D;	// 塗りつぶし用の真っ黒テクスチャ

private var alpha : float;		// アルファ値

static private var nextLevel : String;	// 遷移先のレベル（シーン）

// フェードアウトの開始とシーンの切り替え。
static function FadeOutAndLoadLevel(levelName : String) {
	nextLevel = levelName;
}

function Awake() {
	alpha = 1.0;
}

function Update() {
	// nextLevelが設定されていればフェードアウト、それ以外はフェードイン。
	if (nextLevel) {
		// 既にフェードアウトしきっている？
		if (alpha >= 1.0) {
			// nextLevelはstaticなので、そのままにしておくと
			// 切り替え先で副作用が生じる。故に切り替え前にクリアしておく。
			var temp = nextLevel;
			nextLevel = null;
			Application.LoadLevel(temp);
		} else {
			alpha += Time.deltaTime * 2.0;
		}
	} else {
		alpha = Mathf.Max(alpha - Time.deltaTime * 2.0, 0.0);
	}
}

function OnGUI() {
	if (alpha > 0.0) {
		// 画面全体を真っ黒に塗り潰す。
    	GUI.color = Color(1, 1, 1, Mathf.Min(alpha, 1.0));
    	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), blackTexture);
	}
}
