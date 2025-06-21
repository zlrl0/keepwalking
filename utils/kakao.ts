// utils/kakao.ts
import { Linking } from 'react-native';

const REST_API_KEY = '5117c6cd170beddf46b84fe33d1e0fe8';

export async function searchAddress(address: string) {
  const response = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
    {
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
    }
  );
  const data = await response.json();
  if (!data.documents || data.documents.length === 0) throw new Error('주소 없음');
  return data.documents[0]; // x: 경도, y: 위도
}

export function launchKakaoNavi(x: string, y: string, name: string) {
  const url = `kakaonavi://navigate?name=${encodeURIComponent(name)}&x=${x}&y=${y}&coord_type=wgs84`;
  Linking.openURL(url).catch(() => {
    alert('카카오내비 앱이 설치되어 있어야 실행됩니다.');
  });
}
