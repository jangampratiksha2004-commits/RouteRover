const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const generationConfig = {
  temperature: 0.7,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 65536,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [{
        text: "Generate a detailed travel plan from Kadegaon to Satara for 3 days and 2 nights for a Couple with a Moderate budget. Transport mode: Self / Personal Car. Use exact Google Maps place names. The correct name for the ghat at Karad is Karad Pritisangam Ghat (confluence of Krishna and Koyna rivers). Include middleSpots on the route, and for each day provide travelStops with time, name, type, details, transport, ticketPrice, tip. Return raw JSON only."
      }]
    },
    {
      role: "model",
      parts: [{
        text: JSON.stringify({
          tripDetails: {
            destination: "Satara",
            origin: "Kadegaon",
            duration: { days: 3, nights: 2 },
            travelerCount: "A Couple",
            budget: "Moderate",
            transportMode: "Self / Personal Car",
            travelRoute: {
              summary: "Kadegaon → Karad → Satara via NH48, ~80 km, ~2 hrs",
              totalDistance: "80 km",
              totalDuration: "2 hours",
              steps: [
                { step: "Kadegaon to Karad", mode: "Self Car", duration: "45 min", cost: "₹80 fuel" },
                { step: "Karad to Satara", mode: "Self Car", duration: "1 hr", cost: "₹120 fuel" }
              ]
            },
            middleSpots: [
              {
                name: "Karad Pritisangam Ghat",
                description: "Sacred confluence of Krishna and Koyna rivers at Karad. Beautiful ghat with spiritual significance and scenic views.",
                distanceFromOrigin: "35 km from Kadegaon",
                distanceFromDestination: "45 km from Satara",
                stopDuration: "45 min",
                category: "Ghat / Spiritual",
                coordinates: { latitude: 17.2875, longitude: 74.1843 },
                bestFor: "Photography, spirituality, morning walks",
                tip: "Visit early morning for best light and peaceful atmosphere"
              },
              {
                name: "Koyna Dam Viewpoint",
                description: "One of Maharashtra's largest dams with stunning reservoir views and lush green surroundings.",
                distanceFromOrigin: "55 km from Kadegaon",
                distanceFromDestination: "25 km from Satara",
                stopDuration: "1 hr",
                category: "Dam / Viewpoint",
                coordinates: { latitude: 17.3967, longitude: 73.7511 },
                bestFor: "Nature, photography, picnic",
                tip: "Carry water and snacks. Entry may require permission."
              },
              {
                name: "Sajjangad Fort",
                description: "Historic fort and samadhi of Saint Ramdas Swami. Offers panoramic views of Satara valley.",
                distanceFromOrigin: "72 km from Kadegaon",
                distanceFromDestination: "8 km from Satara",
                stopDuration: "1.5 hrs",
                category: "Fort / Temple",
                coordinates: { latitude: 17.6833, longitude: 74.0167 },
                bestFor: "History, spirituality, trekking",
                tip: "Wear comfortable shoes. Steps can be steep."
              }
            ],
            transportDetails: {
              mode: "Self / Personal Car",
              provider: "Self-Drive",
              departureTime: "07:00 AM",
              arrivalTime: "11:00 AM (with stops)",
              price: "₹400-500 total fuel",
              bookingUrl: "",
              tips: "Start early to avoid traffic. NH48 is well-maintained.",
              fuelCost: "₹400-500 (approx 80 km, petrol car)",
              tollCost: "₹60-80 (Karad toll)",
              parkingTips: "Free parking at Sajjangad and Karad Ghat. Paid parking near Satara city center."
            },
            localTransport: [
              { mode: "Auto Rickshaw", use: "City sightseeing in Satara", avgCost: "₹50-150", appLink: "" },
              { mode: "Ola/Uber", use: "Airport or station transfers", avgCost: "₹100-300", appLink: "https://www.olacabs.com" }
            ],
            hotelOptions: [
              {
                name: "Hotel Nisarg Satara",
                address: "Station Road, Satara",
                price: "₹1200-1800/night",
                coordinates: { latitude: 17.6805, longitude: 74.0183 },
                rating: 3.8,
                description: "Clean, comfortable hotel near Satara city center with good amenities."
              },
              {
                name: "Hotel Pratap Satara",
                address: "Powai Naka, Satara",
                price: "₹900-1400/night",
                coordinates: { latitude: 17.6820, longitude: 74.0150 },
                rating: 3.5,
                description: "Budget-friendly option with decent rooms and restaurant."
              }
            ],
            itinerary: [
              {
                day: 1,
                title: "Road Trip with Scenic Stops",
                theme: "Road Trip & Ghats",
                description: "Drive from Kadegaon to Satara with beautiful stops at Karad Sangam, Koyna Dam, and Sajjangad Fort.",
                travelStops: [
                  {
                    time: "07:00 AM",
                    name: "Depart from Kadegaon",
                    type: "Travel",
                    details: "Start your road trip early. Fill fuel and grab breakfast before leaving.",
                    duration: "15 min",
                    transport: "Self Car",
                    transportCost: "",
                    ticketPrice: "",
                    bestTime: "Early morning",
                    tip: "Check tyre pressure and fuel before starting",
                    coordinates: { latitude: 17.1833, longitude: 74.3667 }
                  },
                  {
                    time: "07:45 AM",
                    name: "Karad Pritisangam Ghat",
                    type: "Visit",
                    details: "Sacred confluence of Krishna and Koyna rivers at Karad. Walk along the ghat, watch the sunrise over the water, and soak in the spiritual atmosphere.",
                    duration: "45 min",
                    transport: "Self Car from Kadegaon (~35 km)",
                    transportCost: "₹80 fuel",
                    ticketPrice: "Free",
                    bestTime: "Early morning",
                    tip: "Remove footwear near the ghat. Great spot for photos.",
                    coordinates: { latitude: 17.2875, longitude: 74.1843 }
                  },
                  {
                    time: "09:00 AM",
                    name: "Breakfast at Karad",
                    type: "Food",
                    details: "Try local Misal Pav or Poha at a roadside dhaba near Karad bus stand.",
                    duration: "30 min",
                    transport: "Walk from Sangam Ghat",
                    transportCost: "Free",
                    ticketPrice: "",
                    bestTime: "Morning",
                    tip: "Shri Swami Samarth Hotel near Karad is popular for breakfast",
                    coordinates: { latitude: 17.2900, longitude: 74.1850 }
                  },
                  {
                    time: "10:00 AM",
                    name: "Koyna Dam Viewpoint",
                    type: "Visit",
                    details: "Drive to Koyna Dam viewpoint. Enjoy the massive reservoir, lush green hills, and the engineering marvel of the dam.",
                    duration: "1 hr",
                    transport: "Self Car from Karad (~20 km)",
                    transportCost: "₹60 fuel",
                    ticketPrice: "₹20/person",
                    bestTime: "Morning",
                    tip: "Photography is allowed at the viewpoint. Carry water.",
                    coordinates: { latitude: 17.3967, longitude: 73.7511 }
                  },
                  {
                    time: "11:30 AM",
                    name: "Sajjangad Fort",
                    type: "Visit",
                    details: "Visit the historic fort and samadhi of Saint Ramdas Swami. Climb the steps for panoramic views of Satara valley. The fort has a beautiful temple inside.",
                    duration: "1.5 hrs",
                    transport: "Self Car from Koyna (~25 km)",
                    transportCost: "₹80 fuel",
                    ticketPrice: "Free",
                    bestTime: "Morning to afternoon",
                    tip: "Wear comfortable shoes. Steps are steep but worth it.",
                    coordinates: { latitude: 17.6833, longitude: 74.0167 }
                  },
                  {
                    time: "01:30 PM",
                    name: "Lunch in Satara",
                    type: "Food",
                    details: "Arrive in Satara and have lunch at a local restaurant. Try Satara's famous Kanda Bhaji and Zunka Bhakar.",
                    duration: "1 hr",
                    transport: "Self Car to Satara city (~8 km)",
                    transportCost: "₹30 fuel",
                    ticketPrice: "",
                    bestTime: "Afternoon",
                    tip: "Hotel Nisarg restaurant is good for local Maharashtrian thali",
                    coordinates: { latitude: 17.6805, longitude: 74.0183 }
                  },
                  {
                    time: "03:00 PM",
                    name: "Hotel Check-in & Rest",
                    type: "Hotel",
                    details: "Check into your hotel, freshen up and rest after the road trip.",
                    duration: "1.5 hrs",
                    transport: "Walk or auto",
                    transportCost: "₹50",
                    ticketPrice: "",
                    bestTime: "Afternoon",
                    tip: "Ask hotel for early check-in if available",
                    coordinates: { latitude: 17.6805, longitude: 74.0183 }
                  },
                  {
                    time: "05:00 PM",
                    name: "Satara City Walk & Market",
                    type: "Activity",
                    details: "Explore Satara's local market, buy local sweets like Kaju Katli and Chikki. Visit the old city area.",
                    duration: "2 hrs",
                    transport: "Walk from hotel",
                    transportCost: "Free",
                    ticketPrice: "",
                    bestTime: "Evening",
                    tip: "Satara is famous for its Chikki and dry fruits. Great for shopping.",
                    coordinates: { latitude: 17.6820, longitude: 74.0150 }
                  }
                ],
                meals: {
                  breakfast: "Karad dhaba - Misal Pav / Poha - ₹80-120",
                  lunch: "Hotel Nisarg Satara - Maharashtrian Thali - ₹200-300",
                  dinner: "Satara local restaurant - Chicken/Veg dinner - ₹300-400"
                },
                estimatedDayCost: "₹1500-2000",
                dayTip: "Start by 7 AM to cover all stops comfortably before lunch."
              },
              {
                day: 2,
                title: "Satara Sightseeing & Nature",
                theme: "Heritage & Nature",
                description: "Explore Satara's forts, waterfalls, and natural beauty.",
                travelStops: [
                  {
                    time: "08:00 AM",
                    name: "Breakfast at Hotel",
                    type: "Food",
                    details: "Have breakfast at the hotel before heading out for the day.",
                    duration: "45 min",
                    transport: "",
                    transportCost: "",
                    ticketPrice: "",
                    bestTime: "Morning",
                    tip: "Carry water bottles for the day",
                    coordinates: { latitude: 17.6805, longitude: 74.0183 }
                  },
                  {
                    time: "09:00 AM",
                    name: "Ajinkyatara Fort",
                    type: "Visit",
                    details: "Historic fort with stunning 360° views of Satara city and surrounding valleys. The fort has ancient temples and bastions.",
                    duration: "2 hrs",
                    transport: "Auto from hotel (~2 km)",
                    transportCost: "₹60",
                    ticketPrice: "Free",
                    bestTime: "Morning",
                    tip: "Best views from the top. Carry water and wear good shoes.",
                    coordinates: { latitude: 17.6900, longitude: 74.0100 }
                  },
                  {
                    time: "11:30 AM",
                    name: "Thoseghar Waterfalls",
                    type: "Visit",
                    details: "One of Maharashtra's most beautiful waterfalls, especially stunning during and after monsoon. Multiple cascades through dense forest.",
                    duration: "2 hrs",
                    transport: "Self Car from Satara (~20 km)",
                    transportCost: "₹80 fuel",
                    ticketPrice: "₹30/person",
                    bestTime: "Morning to afternoon",
                    tip: "Best visited July-October. Slippery paths, wear grip shoes.",
                    coordinates: { latitude: 17.5500, longitude: 73.9167 }
                  },
                  {
                    time: "02:00 PM",
                    name: "Lunch near Thoseghar",
                    type: "Food",
                    details: "Local dhabas near Thoseghar serve fresh Bhakri, Pitla, and Chicken curry.",
                    duration: "1 hr",
                    transport: "Walk",
                    transportCost: "Free",
                    ticketPrice: "",
                    bestTime: "Afternoon",
                    tip: "Try the local Kombdi Vade (chicken with fried bread)",
                    coordinates: { latitude: 17.5500, longitude: 73.9167 }
                  },
                  {
                    time: "04:00 PM",
                    name: "Kaas Plateau (Flower Valley)",
                    type: "Visit",
                    details: "UNESCO World Heritage Site known as the Valley of Flowers of Maharashtra. Hundreds of wildflower species bloom here (best Sept-Oct).",
                    duration: "2 hrs",
                    transport: "Self Car from Thoseghar (~15 km)",
                    transportCost: "₹60 fuel",
                    ticketPrice: "₹100/person",
                    bestTime: "September-October",
                    tip: "Book entry tickets online in advance during peak season.",
                    coordinates: { latitude: 17.7167, longitude: 73.8167 }
                  },
                  {
                    time: "07:00 PM",
                    name: "Return to Hotel & Dinner",
                    type: "Hotel",
                    details: "Return to hotel, freshen up and have dinner at a local restaurant.",
                    duration: "2 hrs",
                    transport: "Self Car back to Satara",
                    transportCost: "₹100 fuel",
                    ticketPrice: "",
                    bestTime: "Evening",
                    tip: "Try Satara's famous Kaju Katli for dessert",
                    coordinates: { latitude: 17.6805, longitude: 74.0183 }
                  }
                ],
                meals: {
                  breakfast: "Hotel breakfast - Poha/Upma - ₹100-150",
                  lunch: "Thoseghar dhaba - Bhakri + Pitla + Chicken - ₹250-350",
                  dinner: "Satara restaurant - Dinner thali - ₹300-400"
                },
                estimatedDayCost: "₹1800-2500",
                dayTip: "Kaas Plateau requires advance online booking in peak season (Sept-Oct)."
              },
              {
                day: 3,
                title: "Morning Exploration & Return",
                theme: "Leisure & Departure",
                description: "Light morning sightseeing and drive back to Kadegaon.",
                travelStops: [
                  {
                    time: "08:00 AM",
                    name: "Breakfast & Hotel Checkout",
                    type: "Hotel",
                    details: "Have breakfast and check out from the hotel.",
                    duration: "1 hr",
                    transport: "",
                    transportCost: "",
                    ticketPrice: "",
                    bestTime: "Morning",
                    tip: "Keep luggage in car before exploring",
                    coordinates: { latitude: 17.6805, longitude: 74.0183 }
                  },
                  {
                    time: "09:30 AM",
                    name: "Chhatrapati Shivaji Maharaj Museum",
                    type: "Visit",
                    details: "Museum dedicated to Chhatrapati Shivaji Maharaj with historical artifacts, weapons, and paintings from the Maratha era.",
                    duration: "1.5 hrs",
                    transport: "Auto from hotel",
                    transportCost: "₹60",
                    ticketPrice: "₹20/person",
                    bestTime: "Morning",
                    tip: "Great for history lovers. Photography allowed inside.",
                    coordinates: { latitude: 17.6810, longitude: 74.0190 }
                  },
                  {
                    time: "11:30 AM",
                    name: "Satara Local Market Shopping",
                    type: "Activity",
                    details: "Buy local specialties — Satara Chikki, Kaju Katli, dry fruits, and local handicrafts as souvenirs.",
                    duration: "1 hr",
                    transport: "Walk",
                    transportCost: "Free",
                    ticketPrice: "",
                    bestTime: "Morning",
                    tip: "Bargain at local shops. Chikki makes a great gift.",
                    coordinates: { latitude: 17.6820, longitude: 74.0150 }
                  },
                  {
                    time: "01:00 PM",
                    name: "Lunch before Departure",
                    type: "Food",
                    details: "Have a final Maharashtrian meal before heading back.",
                    duration: "1 hr",
                    transport: "Walk",
                    transportCost: "Free",
                    ticketPrice: "",
                    bestTime: "Afternoon",
                    tip: "Try Vada Pav and Shrikhand for a quick satisfying meal",
                    coordinates: { latitude: 17.6805, longitude: 74.0183 }
                  },
                  {
                    time: "02:30 PM",
                    name: "Drive Back to Kadegaon",
                    type: "Travel",
                    details: "Return drive from Satara to Kadegaon via NH48. Stop at Karad if time permits.",
                    duration: "2 hrs",
                    transport: "Self Car",
                    transportCost: "₹400-500 fuel",
                    ticketPrice: "",
                    bestTime: "Afternoon",
                    tip: "Avoid driving after sunset on highway. Start by 2:30 PM.",
                    coordinates: { latitude: 17.1833, longitude: 74.3667 }
                  }
                ],
                meals: {
                  breakfast: "Hotel breakfast - ₹100-150",
                  lunch: "Satara restaurant - Final thali - ₹200-300",
                  dinner: "Home / Kadegaon on arrival"
                },
                estimatedDayCost: "₹1200-1500",
                dayTip: "Leave Satara by 2:30 PM to reach Kadegaon before sunset."
              }
            ]
          }
        })
      }]
    }
  ]
});
