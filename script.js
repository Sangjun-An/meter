const startInput = document.getElementById('start');
const endInput = document.getElementById('end');
const calculateBtn = document.getElementById('calculateBtn');
const statusEl = document.getElementById('status');
const distanceEl = document.getElementById('distance');
const mapLink = document.getElementById('mapLink');
const resultCard = document.querySelector('.result-card');

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org/search';

async function geocode(query) {
  const params = new URLSearchParams({ q: query, format: 'json', limit: '1', addressdetails: '0' });
  const response = await fetch(`${NOMINATIM_BASE}?${params}`);
  if (!response.ok) {
    throw new Error('검색 요청에 실패했습니다.');
  }
  const places = await response.json();
  if (!places.length) {
    return null;
  }
  const [place] = places;
  return {
    name: place.display_name,
    lat: parseFloat(place.lat),
    lon: parseFloat(place.lon),
  };
}

function haversineDistance([lat1, lon1], [lat2, lon2]) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? '#fecaca' : '#c7d2fe';
}

function showResult(distanceKm, start, end) {
  distanceEl.textContent = `총 거리: ${distanceKm.toFixed(2)} km`;
  mapLink.href = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${start.lat},${start.lon};${end.lat},${end.lon}`;
  mapLink.textContent = '지도에서 보기';
  resultCard.hidden = false;
}

function resetResult() {
  resultCard.hidden = true;
  statusEl.textContent = '';
  distanceEl.textContent = '';
  mapLink.href = '#';
}

calculateBtn.addEventListener('click', async () => {
  const startValue = startInput.value.trim();
  const endValue = endInput.value.trim();
  resetResult();

  if (!startValue || !endValue) {
    setStatus('출발지와 도착지를 모두 입력해주세요.', true);
    resultCard.hidden = false;
    return;
  }

  setStatus('검색 중입니다...');
  resultCard.hidden = false;

  try {
    const [startPlace, endPlace] = await Promise.all([geocode(startValue), geocode(endValue)]);

    if (!startPlace || !endPlace) {
      setStatus('출발지 또는 도착지를 찾을 수 없습니다. 정확한 지명을 입력해주세요.', true);
      return;
    }

    setStatus(`출발지: ${startPlace.name}\n도착지: ${endPlace.name}`);
    const distance = haversineDistance([startPlace.lat, startPlace.lon], [endPlace.lat, endPlace.lon]);
    showResult(distance, startPlace, endPlace);
  } catch (error) {
    console.error(error);
    setStatus('거리 계산 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', true);
  }
});
