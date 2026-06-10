// Test file to verify Google Places API functionality
// Run this with: node test-places-api.js

const { GetPhotoRef, GetPhotoUrl } = require('./services/GooglePlaceApi');

// Test places
const testPlaces = [
  'Taj Mahal',
  'Eiffel Tower',
  'Times Square Hotel',
  'Central Park',
  'Golden Gate Bridge'
];

async function testPlacesAPI() {
  console.log('Testing Google Places API...\n');
  
  for (const place of testPlaces) {
    console.log(`Testing: ${place}`);
    
    try {
      const photoRef = await GetPhotoRef(place);
      
      if (photoRef) {
        const photoUrl = GetPhotoUrl(photoRef);
        console.log(`✅ Photo found: ${photoUrl}`);
      } else {
        console.log(`❌ No photo found for: ${place}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
    
    console.log('---');
  }
}

// Run the test
testPlacesAPI();