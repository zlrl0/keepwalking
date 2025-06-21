import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

type Building = {
  name: string;
  lat: number;
  lng: number;
};


type Props = {
  from: Building;
  to: Building;
  type: string;
};

export default function KakaoMapWebView({ from, to, type }: Props) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=f420d9389b496ecc57457c07ca32db47&libraries=services"></script>
      <style>
        html, body { height: 100%; margin: 0; padding: 0; }
        #map { width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = new kakao.maps.Map(document.getElementById('map'), {
          center: new kakao.maps.LatLng(${from.lat}, ${from.lng}),
          level: 4
        });

        const start = new kakao.maps.LatLng(${from.lat}, ${from.lng});
        const end = new kakao.maps.LatLng(${to.lat}, ${to.lng});

        new kakao.maps.Marker({ map, position: start });
        new kakao.maps.Marker({ map, position: end });

        new kakao.maps.Polyline({
          map,
          path: [start, end],
          strokeWeight: 5,
          strokeColor: '#FF6B81',
          strokeOpacity: 0.9,
          strokeStyle: 'solid',
        });

        map.setCenter(start);
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.webviewContainer}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  webviewContainer: {
    height: 400,
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  webview: {
    flex: 1,
  },
});