

Shader "Hidden/EdgeApply" {
Properties {
	_MainTex ("Base (RGB)", 2D) = "white" {}
	_EdgeTex ("_EdgeTex", 2D) = "white" {}
}

SubShader {
	Pass {
		ZTest Always Cull Off ZWrite Off
		Fog { Mode off }

CGPROGRAM

#pragma fragmentoption ARB_precision_hint_fastest
#pragma vertex vert
#pragma fragment frag

#include "UnityCG.cginc"

uniform sampler2D _MainTex;
uniform sampler2D _EdgeTex;

uniform float4 _MainTex_TexelSize;
 
float edgesIntensity;

struct v2f {
	float4 pos : POSITION;
	float2 uv : TEXCOORD0;
};

v2f vert( appdata_img v )
{
	v2f o;
	o.pos = mul (UNITY_MATRIX_MVP, v.vertex);
	o.uv.xy = v.texcoord.xy;
	
	return o;
}

half4 frag (v2f i) : COLOR
{
	half4 color = tex2D(_MainTex, i.uv);
	half4 edges = tex2D(_EdgeTex, i.uv);
	return color * pow(edges.a, edgesIntensity);
}
ENDCG
	}
}

Fallback off

}