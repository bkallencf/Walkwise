// Scans in a ~1.5 mile radius for groceries, parks, schools, and shopping centers
export async function POST(request) {
    const { lat, lng } = await request.json();
    const queryLocations = ["grocery_store", "park", "school", "shopping_mall"];
    const nearbyLocations = {};

    for (let i = 0; i < queryLocations.length; i++) {
        const response = await fetch(
            "https://places.googleapis.com/v1/places:searchNearby",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": process.env.GOOGLE_SERVER_KEY,
                    "X-Goog-FieldMask": "places.id,places.displayName,places.location,places.types",
                },
                body: JSON.stringify({
                    includedTypes: queryLocations[i],
                    maxResultCount: 20,
                    locationRestriction: {
                        circle: {
                            center: { latitude: lat, longitude: lng },
                            radius: 2400, // A little over 1.5 miles = ~2400 m
                        },
                    },
                    rankPreference: "DISTANCE",
                }),
            }
        );
        const data = await response.json();
        nearbyLocations[queryLocations[i]] = data.places || [];
    }

    return Response.json(nearbyLocations);
}