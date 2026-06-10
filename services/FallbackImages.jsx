import { getFallbackImageUrl } from './GooglePlaceApi';

export const getFallbackImage = (placeName = '') => getFallbackImageUrl(placeName);
