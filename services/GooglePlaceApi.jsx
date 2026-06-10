const API_KEY         = process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY;
const WIKI_API        = 'https://en.wikipedia.org/w/api.php';
const COMMONS_API     = 'https://commons.wikimedia.org/w/api.php';
const TEXT_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
const FIND_PLACE_URL  = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
const DETAILS_URL     = 'https://maps.googleapis.com/maps/api/place/details/json';
const PHOTO_URL       = 'https://maps.googleapis.com/maps/api/place/photo';

export const buildPhotoUrl = (photoRef, maxWidth = 1200) => {
  if (!photoRef || !API_KEY) return null;
  return `${PHOTO_URL}?maxwidth=${maxWidth}&photo_reference=${photoRef}&key=${API_KEY}`;
};

// Verified Wikipedia article titles for Indian places
// Key = lowercase place name (or part of it), Value = exact Wikipedia article title
const WIKI_TITLE_MAP = {
  'pritisangam':                'Karad',
  'karad pritisangam':           'Karad',
  'karad prayag':                'Karad',
  'karad sangam':                'Karad',
  'sajjangad':                   'Sajjangad',
  'koyna dam':                   'Koyna Dam',
  'koyna':                       'Koyna Dam',
  'thoseghar':                   'Thoseghar Waterfalls',
  'ajinkyatara':                 'Ajinkyatara',
  'kaas plateau':                'Kaas Plateau',
  'kaas':                        'Kaas Plateau',
  'venna lake':                  'Venna Lake',
  'mahabaleshwar temple':        'Mahabaleshwar temple',
  'pratapgad':                   'Pratapgad',
  'lingmala':                    'Lingmala Waterfall',
  'elephant head point':         'Mahabaleshwar',
  'arthur seat':                 'Mahabaleshwar',
  'arthur\'s seat':              'Mahabaleshwar',
  'wilson point':                'Mahabaleshwar',
  'sunrise point':               'Mahabaleshwar',
  'kate\'s point':               'Mahabaleshwar',
  'needle hole':                 'Mahabaleshwar',
  'parsi point':                 'Panchgani',
  'mapro garden':                'Mahabaleshwar',
  'strawberry farm':             'Mahabaleshwar',
  'mahabaleshwar market':        'Mahabaleshwar',
  'mahabaleshwar':               'Mahabaleshwar',
  'panchgani':                   'Panchgani',
  'tableland':                   'Panchgani',
  'wai ganpati':                 'Dholeshwar',
  'dholya ganpati':              'Dholeshwar',
  'wai':                         'Wai, Maharashtra',
  'sinhagad':                    'Sinhagad',
  'shaniwar wada':               'Shaniwar Wada',
  'aga khan palace':             'Aga Khan Palace, Pune',
  'dagdusheth':                  'Dagdusheth Halwai Ganapati Temple',
  'osho':                        'Osho International Meditation Resort',
  'lonavala':                    'Lonavala',
  'khandala':                    'Khandala',
  'bhushi dam':                  'Bhushi Dam',
  'rajmachi':                    'Rajmachi Fort',
  'lohagad':                     'Lohagad',
  'kolhapur':                    'Kolhapur',
  'mahalaxmi temple':            'Mahalakshmi Temple, Kolhapur',
  'panhala':                     'Panhala',
  'ratnagiri':                   'Ratnagiri',
  'ganpatipule':                 'Ganpatipule',
  'tarkarli':                    'Tarkarli',
  'sindhudurg':                  'Sindhudurg fort',
  'nashik':                      'Nashik',
  'trimbakeshwar':               'Trimbakeshwar Shiva Temple',
  'shirdi':                      'Shirdi',
  'aurangabad':                  'Aurangabad, Maharashtra',
  'ajanta':                      'Ajanta Caves',
  'ellora':                      'Ellora Caves',
  'bibi ka maqbara':             'Bibi Ka Maqbara',
  'daulatabad':                  'Daulatabad Fort',
  'pune':                        'Pune',
  'mumbai':                      'Mumbai',
  'delhi':                       'Delhi',
  'agra':                        'Agra',
  'taj mahal':                   'Taj Mahal',
  'red fort':                    'Red Fort',
  'india gate':                  'India Gate',
  'qutub minar':                 'Qutb Minar',
  'humayun':                     "Humayun's Tomb",
  'jaipur':                      'Jaipur',
  'amber fort':                  'Amber Fort',
  'hawa mahal':                  'Hawa Mahal',
  'udaipur':                     'Udaipur',
  'city palace udaipur':         'City Palace, Udaipur',
  'goa':                         'Goa',
  'baga beach':                  'Baga Beach',
  'calangute':                   'Calangute Beach',
  'dudhsagar':                   'Dudhsagar Falls',
  'mysore':                      'Mysore',
  'mysore palace':               'Mysore Palace',
  'coorg':                       'Kodagu',
  'ooty':                        'Ooty',
  'munnar':                      'Munnar',
  'kerala backwaters':           'Kerala backwaters',
  'alleppey':                    'Alappuzha',
  'varanasi':                    'Varanasi',
  'rishikesh':                   'Rishikesh',
  'haridwar':                    'Haridwar',
  'shimla':                      'Shimla',
  'manali':                      'Manali, Himachal Pradesh',
  'leh':                         'Leh',
  'ladakh':                      'Ladakh',
  'darjeeling':                  'Darjeeling',
};

// Resolve correct Wikipedia title from place name
const resolveWikiTitle = (placeName) => {
  const lower = placeName.toLowerCase();
  // Check map for known places
  for (const [key, title] of Object.entries(WIKI_TITLE_MAP)) {
    if (lower.includes(key)) return title;
  }
  return null;
};

// ─── Strategy 1: Wikipedia pageimages (most reliable) ────────────────────────
const getWikiPageImage = async (title) => {
  try {
    const url  = `${WIKI_API}?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=1200&format=json&origin=*`;
    const res  = await fetch(url);
    const data = await res.json();
    const pages = data?.query?.pages;
    if (!pages) return null;
    for (const page of Object.values(pages)) {
      if (page.missing !== undefined) continue;
      const src = page?.thumbnail?.source;
      if (src) return src;
    }
  } catch (e) {}
  return null;
};

// ─── Strategy 2: Wikipedia search → pageimages on top result ─────────────────
const searchWikiImage = async (query) => {
  try {
    // Search for matching articles
    const searchUrl = `${WIKI_API}?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=3`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    const results = searchData?.query?.search || [];

    for (const result of results) {
      const img = await getWikiPageImage(result.title);
      if (img) return img;
    }
  } catch (e) {}
  return null;
};

// ─── Strategy 3: Wikimedia Commons search ────────────────────────────────────
const getCommonsImage = async (placeName) => {
  try {
    const base = placeName.replace(/\s*\(.*?\)/g, '').split(',')[0].trim();
    const url  = `${COMMONS_API}?action=query&generator=search&gsrsearch=${encodeURIComponent(base)}&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json&origin=*&gsrlimit=5`;
    const res  = await fetch(url);
    const data = await res.json();
    const pages = data?.query?.pages;
    if (!pages) return null;
    for (const page of Object.values(pages)) {
      const imgUrl = page?.imageinfo?.[0]?.thumburl || page?.imageinfo?.[0]?.url;
      if (imgUrl && /\.(jpg|jpeg|png)$/i.test(imgUrl)) return imgUrl;
    }
  } catch (e) {}
  return null;
};

// ─── Strategy 4: Google Places (works when billing enabled) ──────────────────
const getGooglePlacesImage = async (placeName, locationContext) => {
  if (!API_KEY) return null;
  try {
    const city    = locationContext?.city    || '';
    const country = locationContext?.country || 'India';
    const query   = city ? `${placeName} ${city} ${country}` : `${placeName} ${country}`;

    const findRes  = await fetch(`${FIND_PLACE_URL}?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,photos&key=${API_KEY}`);
    const findData = await findRes.json();

    if (findData.status === 'OK' && findData.candidates?.[0]) {
      const c = findData.candidates[0];
      if (c.photos?.[0]?.photo_reference) return buildPhotoUrl(c.photos[0].photo_reference);
      if (c.place_id) {
        const detRes  = await fetch(`${DETAILS_URL}?place_id=${c.place_id}&fields=photos&key=${API_KEY}`);
        const detData = await detRes.json();
        if (detData.status === 'OK' && detData.result?.photos?.[0])
          return buildPhotoUrl(detData.result.photos[0].photo_reference);
      }
    }
    const tsRes  = await fetch(`${TEXT_SEARCH_URL}?query=${encodeURIComponent(query)}&key=${API_KEY}`);
    const tsData = await tsRes.json();
    if (tsData.status === 'OK') {
      for (const r of tsData.results) {
        if (r.photos?.[0]?.photo_reference) return buildPhotoUrl(r.photos[0].photo_reference);
      }
    }
  } catch (e) {}
  return null;
};

// ─── Category fallback ────────────────────────────────────────────────────────
const CATEGORY_PATTERNS = {
  temple:    ['temple','mandir','gurudwara','church','mosque','masjid','shrine','dargah','ashram','ganpati','shiva','hanuman','devasthan'],
  ghat:      ['ghat','sangam','confluence','riverfront','teerth','prayag'],
  fort:      ['fort','killa','qila','citadel','fortress','gadh'],
  palace:    ['palace','mahal','haveli','wada'],
  waterfall: ['waterfall','falls','dhara','cascade'],
  dam:       ['dam','reservoir','backwater','sagar','bandh'],
  lake:      ['lake','pond','talav','sarovar','taal'],
  beach:     ['beach','shore','coast','bay'],
  cave:      ['cave','caves','gufa','leni','ajanta','ellora'],
  mountain:  ['mountain','hill','peak','summit','valley','plateau','dongar','range','point','seat'],
  museum:    ['museum','gallery','memorial','monument','smarak'],
  park:      ['park','garden','udyan','botanical','wildlife','sanctuary','jungle'],
  market:    ['market','bazaar','bazar','chowk','shopping'],
  hotel:     ['hotel','resort','lodge','inn','villa','guesthouse'],
  restaurant:['restaurant','cafe','dhaba','food','dining'],
};

const CATEGORY_IMAGES = {
  temple:    ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Dagdusheth_Halwai_Ganapati_Temple.jpg/1200px-Dagdusheth_Halwai_Ganapati_Temple.jpg',
              'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&h=800&fit=crop',
              'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=800&fit=crop'],
  ghat:      ['https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Varanasi_Ghats.jpg/1200px-Varanasi_Ghats.jpg',
              'https://images.unsplash.com/photo-1561361058-c24e01238a46?w=1200&h=800&fit=crop'],
  fort:      ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Sinhagad_Fort.jpg/1200px-Sinhagad_Fort.jpg',
              'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&h=800&fit=crop'],
  palace:    ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Mysore_Palace_Morning.jpg/1200px-Mysore_Palace_Morning.jpg',
              'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&h=800&fit=crop'],
  waterfall: ['https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200&h=800&fit=crop',
              'https://images.unsplash.com/photo-1467890947394-8171244e5410?w=1200&h=800&fit=crop'],
  dam:       ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Koyna_Dam.jpg/1200px-Koyna_Dam.jpg',
              'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=800&fit=crop'],
  lake:      ['https://upload.wikimedia.org/wikipedia/commons/7/75/Boats_On_Venna_Lake.jpg',
              'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&h=800&fit=crop'],
  beach:     ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop',
              'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&h=800&fit=crop'],
  cave:      ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Ajanta_cave9.jpg/1200px-Ajanta_cave9.jpg',
              'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=1200&h=800&fit=crop'],
  mountain:  ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=800&fit=crop',
              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop'],
  museum:    ['https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1200&h=800&fit=crop'],
  park:      ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop'],
  market:    ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=800&fit=crop'],
  hotel:     ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop',
              'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&h=800&fit=crop',
              'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop'],
  restaurant:['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop',
              'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop'],
  travel:    ['https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop',
              'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
              'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=800&fit=crop'],
};

const hashStr = (s = '') => {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; }
  return Math.abs(h);
};

export const getFallbackImageUrl = (name = '') => {
  const lower = name.toLowerCase();
  let cat = 'travel';
  for (const [c, kws] of Object.entries(CATEGORY_PATTERNS)) {
    if (kws.some(k => lower.includes(k))) { cat = c; break; }
  }
  const imgs = CATEGORY_IMAGES[cat] || CATEGORY_IMAGES.travel;
  return imgs[hashStr(name) % imgs.length];
};

// ─── PRIMARY EXPORT ───────────────────────────────────────────────────────────
export const GetExactPlaceImage = async (placeName, locationContext = null) => {
  if (!placeName) return getFallbackImageUrl('');
  const clean = placeName.trim();
  const city  = locationContext?.city || '';

  // Clean variations for Wikipedia
  const base        = clean.replace(/\s*\(.*?\)/g, '').trim();
  const beforeComma = base.split(',')[0].trim();

  // 1. Google Places (if billing enabled)
  const googleUrl = await getGooglePlacesImage(clean, locationContext);
  if (googleUrl) { console.log(`✅ Google: ${clean}`); return googleUrl; }

  // 2. Known Wikipedia title map (most accurate for Indian places)
  const knownTitle = resolveWikiTitle(clean);
  if (knownTitle) {
    const img = await getWikiPageImage(knownTitle);
    if (img) { console.log(`✅ Wiki known: ${clean} -> ${knownTitle}`); return img; }
  }

  // 3. Wikipedia pageimages with cleaned title variations
  for (const title of [...new Set([base, beforeComma])]) {
    const img = await getWikiPageImage(title);
    if (img) { console.log(`✅ Wiki pageimage: ${clean}`); return img; }
  }

  // 4. Wikipedia search with location hint
  for (const q of [city ? `${beforeComma} ${city}` : beforeComma, beforeComma]) {
    const img = await searchWikiImage(q);
    if (img) { console.log(`✅ Wiki search: ${clean}`); return img; }
  }

  // 5. Wikimedia Commons
  const commonsImg = await getCommonsImage(clean);
  if (commonsImg) { console.log(`✅ Commons: ${clean}`); return commonsImg; }

  // 6. Category fallback
  console.log(`⚠️ Fallback: ${clean}`);
  return getFallbackImageUrl(clean);
};

export const GetHotelImage = async (hotelName, locationContext = null) => {
  if (!hotelName) return getFallbackImageUrl('hotel');
  const clean = hotelName.trim();

  const googleUrl = await getGooglePlacesImage(clean, locationContext);
  if (googleUrl) return googleUrl;

  // Try known title map
  const knownTitle = resolveWikiTitle(clean);
  if (knownTitle) {
    const img = await getWikiPageImage(knownTitle);
    if (img) return img;
  }

  // Try cleaned name directly
  const base = clean.replace(/\s*\(.*?\)/g, '').split(',')[0].trim();
  const img = await getWikiPageImage(base);
  if (img) return img;

  return getFallbackImageUrl('hotel');
};

// ─── Legacy exports ───────────────────────────────────────────────────────────
export const GetPhotoRef = async (placeName) => {
  if (!placeName?.trim() || !API_KEY) return null;
  try {
    const res  = await fetch(`${TEXT_SEARCH_URL}?query=${encodeURIComponent(placeName.trim())}&key=${API_KEY}`);
    const data = await res.json();
    return data?.results?.[0]?.photos?.[0]?.photo_reference || null;
  } catch (e) { return null; }
};
export const GetPhotoUrl       = (ref, w = 1200) => buildPhotoUrl(ref, w);
export const getGooglePhotoUrl = buildPhotoUrl;
