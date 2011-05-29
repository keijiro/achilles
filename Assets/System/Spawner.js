#pragma strict

var width : float;

var caltropPrefab : GameObject;
var boxPrefab : GameObject;
var spherePrefab : GameObject;
var cratePrefab : GameObject;

private function RandomPosition() : Vector3 {
	return transform.position + Vector3(Random.Range(-width, width), 0, 0);
}

private function RandomPositionOnFloor() : Vector3 {
	var pos = transform.position + Vector3(Random.Range(-width, width), 0, 0);
	pos.y = 0;
	return pos;
}

private function SpawnBox() : GameObject {
	var go = Instantiate(boxPrefab, RandomPosition(), transform.rotation) as GameObject;
	var vx : float = Random.Range(-0.5, 0.5) * GameState.scrollVelocity;
	go.rigidbody.velocity = Vector3(vx, 0, -0.5 * GameState.scrollVelocity);
	go.rigidbody.rotation = Random.rotation;
	return go;
}

private function SpawnSphere() : GameObject {
	var go = Instantiate(spherePrefab, transform.position, transform.rotation) as GameObject;
	go.rigidbody.velocity = Vector3(0, 0, -0.5 * GameState.scrollVelocity);
	return go;
}

private function SpawnCaltrop() : GameObject {
	return Instantiate(caltropPrefab, RandomPositionOnFloor(), caltropPrefab.transform.rotation) as GameObject;
}

private function SpawnCrate() : GameObject {
	var go = Instantiate(cratePrefab, RandomPositionOnFloor(), cratePrefab.transform.rotation) as GameObject;
	go.rigidbody.velocity = Vector3(0, 0, -1.0 * GameState.scrollVelocity);
	return go;
}

function Start() {
	for (var i = 14; i > 0; --i) {
		SpawnCrate();
		yield WaitForSeconds(0.05 * i);
		SpawnBox();
		yield WaitForSeconds(0.05 * i);
	}

	yield WaitForSeconds(2.0);

	for (i = 14; i > 0; --i) {
		SpawnCrate();
		yield WaitForSeconds(0.05 * i);
		SpawnSphere();
		yield WaitForSeconds(0.05 * i);
	}

	yield WaitForSeconds(3.0);

	for (i = 20; i > 0; --i) {
		SpawnCaltrop();
		yield WaitForSeconds(0.5);
	}

	yield WaitForSeconds(3.0);

	for (i = 14; i > 0; --i) {
		SpawnCrate();
		yield WaitForSeconds(0.03 * i);
		SpawnSphere();
		yield WaitForSeconds(0.03 * i);
		SpawnBox();
		yield WaitForSeconds(0.03 * i);
	}

	yield WaitForSeconds(3.0);

	for (i = 60; i > 0; --i) {
		SpawnSphere();
		yield WaitForSeconds(0.03 * Mathf.Max(1, i - 30));
	}

	yield WaitForSeconds(3.0);

	while (true) {
		switch (Random.Range(0, 4)) {
			case 0: SpawnSphere(); break;
			case 1: SpawnCrate(); break;
			case 2: SpawnCaltrop(); break;
			default: SpawnBox(); break;
		}
		yield WaitForSeconds(Random.Range(0.03, 0.8));
	}
}
