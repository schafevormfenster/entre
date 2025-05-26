import { GeoLocation } from "./types/geo-location.types";
import { getLogger } from "../../logging/logger";

import { getGeoApiConfig } from "./helpers/config";
// import { cacheLife } from "next/dist/server/use-cache/cache-life";

type GetGeoLocationResponse = GeoLocation | null;

/**
 * geocode location using the svf geoapi
 * @param communitySlug: string
 * @returns GeoLocation
 */
export const getGeoLocation = async (
  communitySlug: string,
  
): Promise<GetGeoLocationResponse> => {
  // "use cache";
  // cacheLife("geo");

  const log = getLogger("geo-api.getGeoLocation");

  log.trace(
    {
      query: {
        communitySlug,
      },
    },
    "getGeoLocation called"
  );

  try {
    const config = getGeoApiConfig();
    const url = new URL(`/api/community/${communitySlug}`, config.host);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Sheep-Token": config.token,
        Accept: "application/json",
      },
      cache: "force-cache",
      next: {
        revalidate: 86400 // Cache for 24 hours
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data && data.data) {
      log.debug(
        {
          data: {
            hasData: true,
            locationFound: !!data,
          },
        },
        "Geo location retrieved successfully"
      );
      return data.data as GeoLocation;
    } else {
      log.warn(
        {
          data: {
            communitySlug,
            result: "empty response",
          },
        },
        "Geo location retrieval returned no data"
      );
      return null;
    }
  } catch (error) {
    log.error(error, "Error while retrieving geo location");
    return null;
  }
};
