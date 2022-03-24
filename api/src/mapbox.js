const fetch = require("node-fetch");
const URI = require("urijs");
const { MAPBOX_API_TOKEN } = require("./config");

async function execute({ baseUrl, method = "GET", path, query = {}, body = null }) {
  const options = {
    method,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  };

  const url = new URI(baseUrl + path).setSearch({ ...query, access_token: MAPBOX_API_TOKEN }).toString();
  const response = await fetch(url, options).then((res) => res.json());

  return response;
}

/*




MAPBOX PLACES





*/

const MAPBOX_PLACES_BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
exports.getPlace = async (args) => execute({ baseUrl: MAPBOX_PLACES_BASE_URL, ...args }).then(({ features }) => features);

exports.fetchByExpression = async ({ expression, proximity = "", language = "en", limit = "5", bbox = "", autocomplete = true }) => {
  const options = { proximity, language, limit, bbox, autocomplete, country: "LB" };
  return this.getPlace({ path: `${encodeURI(expression)}.json?`, query: options });
};

exports.fetchByCoordinates = async ([longitude, latitude], options = {}) => {
  /* @Options
    {
      language = '',
      limit = '1',
      reverseMode = 'distance', // or 'score'
    }
    */
  return this.getPlace({ path: `${longitude},${latitude}.json?`, query: options });
};

// example feature
/*
{
    "id": "neighborhood.4374851316572690",
    "type": "Feature",
    "place_type": [
      "neighborhood"
    ],
    "relevance": 1,
    "properties": {
      "wikidata": "Q387285"
    },
    "text_en": "Halles",
    "language_en": "en",
    "place_name_en": "Halles, 75001, 1st arrondissement of Paris, Paris, France",
    "text": "Halles",
    "language": "en",
    "place_name": "Halles, 75001, 1st arrondissement of Paris, Paris, France",
    "bbox": [
      2.33912346022976,
      48.8585164210008,
      2.35094910520772,
      48.8657496341309
    ],
    "center": [
      2.34474,
      48.8625
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        2.34474,
        48.8625
      ]
    },
    "context": [
      {
        "id": "postcode.7163023860411110",
        "text_en": "75001",
        "text": "75001"
      },
      {
        "id": "locality.5543940947374360",
        "wikidata": "Q161741",
        "text_en": "1st arrondissement of Paris",
        "language_en": "en",
        "text": "1st arrondissement of Paris",
        "language": "en"
      },
      {
        "id": "place.14749210607497330",
        "wikidata": "Q90",
        "short_code": "FR-75",
        "text_en": "Paris",
        "language_en": "en",
        "text": "Paris",
        "language": "en"
      },
      {
        "id": "country.19008108158641660",
        "wikidata": "Q142",
        "short_code": "fr",
        "text_en": "France",
        "language_en": "en",
        "text": "France",
        "language": "en"
      }
    ]
  },

*/

/*




MAPBOX DIRECTIONS





*/

const MAPBOX_DIRECTION_BASE_URL = "https://api.mapbox.com/directions/v5/";
exports.getDirections = async (args) => execute({ baseUrl: MAPBOX_DIRECTION_BASE_URL, ...args });

// https://docs.mapbox.com/api/navigation/directions/#retrieve-directions
exports.getItinerary = async ({ profile = "mapbox/walking", coordinates }) => {
  /* profile: mapbox/driving-traffic, mapbox/driving, mapbox/walking, or mapbox/cycling. */
  /* coordinates: A semicolon-separated list of between two and 25 {longitude},{latitude} coordinate pairs to visit in order. */
  /* example: "https://api.mapbox.com/directions/v5/mapbox/cycling/-122.42,37.78;-77.03,38.91?access_token=YOUR_MAPBOX_ACCESS_TOKEN" */

  return this.getDirections({ path: `${profile}/${coordinates.map((c) => c.join(",")).join(";")}` });
};

// example route
/*
  "routes": [
    {
      "weight_name": "pedestrian",
      "weight": 0,
      "duration": 0,
      "distance": 0,
      "legs": [
        {
          "via_waypoints": [],
          "admins": [
            {
              "iso_3166_1_alpha3": "NLD",
              "iso_3166_1": "NL"
            }
          ],
          "weight": 0,
          "duration": 0,
          "steps": [],
          "distance": 0,
          "summary": "Herengracht"
        }
      ],
      "geometry": "abt~Hiqy\\??"
    }
  ],
  "waypoints": [
    {
      "distance": 7.972,
      "name": "Herengracht",
      "location": [
        4.887407,
        52.372966
      ]
    },
    {
      "distance": 7.972,
      "name": "Herengracht",
      "location": [
        4.887407,
        52.372966
      ]
    }
  ],
  "code": "Ok",
  "uuid": "gKLXwXm6YAO2YudI5saJQ4nGTdgHLkfBmuiSRASd_Xw4vLtbwyZIew=="
*/
