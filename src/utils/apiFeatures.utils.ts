const nodeGeoCoder = require('node-geocoder');
import { Location } from "src/restaurants/schemas/restaurants.schema";

export default class APIFeatures {
  static async getRestaurantLocation(address) {
    try {
      const options = {
        provider: process.env.GEOCODER_PROVIDER,
        httpAdapter: 'https',
        apiKey: process.env.GEOCODER_MAPQUEST_API_KEY,
        Formatter: null,
      };
      const geocoder = nodeGeoCoder(options);

      const loc = await geocoder.geocode(address);

      const location:Location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        city: loc[0].city,
        countryCode: loc[0].countryCode,
        zipCode: loc[0].zipcode,
        country: loc[0].country,
      };

      return location;
    } catch (error) {
      console.log(error.message);
    }
  }
}
