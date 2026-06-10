export const SelectTrvelersList=[
  {
    id:1,
    title:'Just Me',
    desc:'A sole traveles in exploration',
    icon:'✈️',
    prople:'1'
  },

  {
    id:2,
    title:'A Couple',
    desc:'Two travels in tendem',
    icon:'🍻',
    people:'2'
  },

  {
    id:3,
    title:'Family',
    desc:'A group of fun loving adv',
    icon:'🏡',
    people:'3 to 5'
  },

  {
    id:4,
    title:'Friends',
    desc:'A bunch of thrill-seekes',
    icon:'🚤',
    people:'5 to 10'
  }
]
 

export const SelectBudgetOptions=[
  {
      id:1,
      title:'Cheap',
      desc:'Stay conscious of costs',
      icon:'💵',
  },
  {
      id:2,
      title:'Moderate',
      desc:'Keep cost on the average',
      icon:'💰',
  },
  {
      id:3,
      title:'Luxury',
      desc:'Do not worry about costs',
      icon:'🤑',
  },

]


export const SelectTransportOptions = [
  {
    id: 1,
    title: 'Flight',
    desc: 'Fastest way to travel',
    icon: '✈️',
    tag: 'flight',
  },
  {
    id: 2,
    title: 'Train',
    desc: 'Comfortable & scenic',
    icon: '🚆',
    tag: 'train',
  },
  {
    id: 3,
    title: 'Bus',
    desc: 'Budget-friendly option',
    icon: '🚌',
    tag: 'bus',
  },
  {
    id: 4,
    title: 'Self / Personal Car',
    desc: 'Drive yourself, stop anywhere',
    icon: '🚙',
    tag: 'self_car',
  },
  {
    id: 5,
    title: 'Car / Travels',
    desc: 'Private hired vehicle',
    icon: '🚗',
    tag: 'car',
  },
  {
    id: 6,
    title: 'Ola / Uber',
    desc: 'Cab on demand',
    icon: '🚕',
    tag: 'cab',
  },
  {
    id: 7,
    title: 'Auto',
    desc: 'Quick local rides',
    icon: '🛺',
    tag: 'auto',
  },
];

export const AI_PROMPT = `You are a smart travel planner. Generate a day-wise travel plan from {currentLocation} to {destination} for {totalDays} days, {totalNights} nights, {traveler}, {budget} budget, transport: {transportMode}.

Return ONLY raw valid JSON. No markdown, no explanation.

{
  "tripDetails": {
    "destination": "{destination}",
    "origin": "{currentLocation}",
    "duration": { "days": {totalDays}, "nights": {totalNights} },
    "travelerCount": "{traveler}",
    "budget": "{budget}",
    "transportMode": "{transportMode}",
    "travelRoute": {
      "summary": "string",
      "totalDistance": "string",
      "totalDuration": "string",
      "steps": [ { "step": "string", "mode": "string", "duration": "string", "cost": "string" } ]
    },
    "middleSpots": [
      {
        "name": "string",
        "description": "string",
        "distanceFromOrigin": "string",
        "distanceFromDestination": "string",
        "stopDuration": "string",
        "category": "string",
        "coordinates": { "latitude": 0.0, "longitude": 0.0 },
        "bestFor": "string",
        "tip": "string"
      }
    ],
    "transportDetails": {
      "mode": "string", "provider": "string", "departureTime": "string",
      "arrivalTime": "string", "price": "string", "bookingUrl": "string",
      "tips": "string", "fuelCost": "string", "tollCost": "string", "parkingTips": "string"
    },
    "localTransport": [ { "mode": "string", "use": "string", "avgCost": "string", "appLink": "string" } ],
    "hotelOptions": [
      { "name": "string", "address": "string", "price": "string", "coordinates": { "latitude": 0.0, "longitude": 0.0 }, "rating": 0.0, "description": "string" }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "string",
        "theme": "string",
        "description": "string",
        "travelStops": [
          {
            "time": "string",
            "name": "string",
            "type": "Visit|Travel|Food|Hotel|Activity|Rest Stop",
            "details": "string",
            "duration": "string",
            "transport": "string",
            "transportCost": "string",
            "ticketPrice": "string",
            "bestTime": "string",
            "tip": "string",
            "coordinates": { "latitude": 0.0, "longitude": 0.0 }
          }
        ],
        "meals": { "breakfast": "string", "lunch": "string", "dinner": "string" },
        "estimatedDayCost": "string",
        "dayTip": "string"
      }
    ]
  }
}

RULES:
- CRITICAL: Use EXACT place names as they appear on Google Maps. Examples of correct names:
  * "Karad Pritisangam Ghat" (NOT Prayag Sangam Ghat) - confluence of Krishna & Koyna at Karad
  * "Sajjangad Fort" (NOT Sajjangad Hill)
  * "Thoseghar Waterfalls" (NOT Thoseghar Falls)
  * "Ajinkyatara Fort" (NOT Ajinkyatara Hill)
  * "Kaas Plateau" (NOT Kaas Valley)
  * "Venna Lake" (NOT Venna Talav)
  * Use the most commonly searched Google Maps name for every place.
- middleSpots: 3-5 real verified places geographically on the road between {currentLocation} and {destination}. Use exact Google Maps names.
- Each day: 4-6 travelStops max.
- Day 1 road trip: travelStops = depart + middleSpots as stops + arrive + check-in.
- Day 1 flight/train: depart station/airport + arrive + check-in + 1 evening spot.
- Last day: morning spot + checkout + return journey.
- Max 4 hotels.
- All days must have travelStops, meals, estimatedDayCost, dayTip.` 

// export const AI_SCHOOL_PROMPT = `
// You are an expert in Indian education directories.

// Find up to 10 real, existing schools (preferably CBSE board) in or near {location} that are suitable for a {age}-year-old {gender} student with {disability}.
// 78
// For each school, return the following information in a JSON array format:
// [
//   {
//     "name": "",
//     "address": "",
//     "board": "",
//     "age_group_supported": "",
//     "annual_fee": "",
//     "contact_number": "",
//     "website_url": "",
//     "rating": 0-5,
//     "image_url": "",
//     "location": { "lat": 0.0, "lng": 0.0 },
//     "reviews": [
//       {
//         "reviewer_name": "",
//         "review_text": "",
//         "rating": 0-5
//       }
//     ]
//   }
// ]

// Important:
// - Use real Indian school names (avoid placeholders like "School 1").
// - Do not add explanations, just return the JSON.
// - Keep the response under 1500 words.
// `;

 