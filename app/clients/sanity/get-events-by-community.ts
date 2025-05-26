import { sanityClient } from './sanity-client';
import { Event } from '../../api/print/showcase/poster/types';
import { CommunityDTOcoreQueryFields, CommunityDTOdetailQueryFields } from './CommunityDTO';


// Define basic Community type for internal use
interface Community {
  _id: string;
  slug: string;
  name: string;
  municipality: {
    _id: string;
  };
  geoLocation: {
    point: {
      lat: number;
      lng: number;
    };
  };
}

interface CommunityExcerpt {
  _id: string;
  slug: string;
  name: string;
}

// Define scope types
export type Scope = 'community' | 'municipality' | 'surrounding' | 'region';

// Query fields for community data - remove custom definitions and use imported ones
// Custom query fields for geo-based queries that need geolocation
const CommunityDTOcoreWithGeoQueryFields = `_id, "slug": slug.current, name, municipality->{_id}, geolocation`;

// Query fields for event data
const EventDTOdetailQueryFields = `
  _id,
  name,
  "start": start,
  "end": end,
  allday,
  location,
  cancelled,
  calendar->{
    _id,
    scope
  }
`;

/**
 * Get scope id list by scope identifier.
 * @param scope
 * @returns
 */
const scopeId = (scope: Scope): number => {
  switch (scope) {
    case 'community':
      return 0;
    case 'municipality':
      return 1;
    case 'surrounding':
      return 2;
    case 'region':
      return 3;
    default:
      return 1;
  }
};

/**
 * Fetch community data by slug or ID
 */
const fetchCommunity = async (identifier: string): Promise<Community | null> => {
  console.time('fetchCommunity');

  // Check if identifier is an ID (starts with underscore) or slug
  const isId = identifier.startsWith('_');
  const query = isId 
    ? `*[_type == "community" && _id == $identifier]{ ${CommunityDTOdetailQueryFields} }`
    : `*[_type == "community" && slug.current == $identifier]{ ${CommunityDTOdetailQueryFields} }`;
  
  const queryParams = {
    identifier: identifier,
  };

  try {
    const response = await sanityClient.fetch(query, queryParams);
    const communityData = response?.[0];
    
    if (!communityData) {
      console.warn(`Community with identifier '${identifier}' not found.`);
      return null;
    }

    console.log('Raw community data from Sanity:', JSON.stringify(communityData, null, 2));

    console.timeEnd('fetchCommunity');
    return {
      _id: communityData._id,
      slug: communityData.slug,
      name: communityData.name,
      municipality: {
        _id: communityData.municipality?._id || '',
      },
      geoLocation: {
        point: communityData.geolocation || { lat: 0, lng: 0 }
      }
    };
  } catch (err) {
    console.warn(`The query to lookup the community '${identifier}' failed:`, err);
    console.timeEnd('fetchCommunity');
    return null;
  }
};

/**
 * Fetch all other communities of the same municipality, exclude the current one.
 */
const fetchCommunitiesInMunicipality = async (
  currentCommunity: Community
): Promise<CommunityExcerpt[]> => {
  console.time('fetchCommunitiesInMunicipality');
  
  const query = `*[_type == "community" && references($municipalityId)]{ ${CommunityDTOcoreQueryFields} }`;
  const queryParams = {
    municipalityId: currentCommunity.municipality._id,
  };

  try {
    const response = await sanityClient.fetch(query, queryParams);
    const communities: CommunityExcerpt[] = (response || []).map((community: any) => ({
      _id: community._id,
      slug: community.slug,
      name: community.name,
    }));
    console.log("Fetched communities in municipality");
    
    console.timeEnd('fetchCommunitiesInMunicipality');
    return communities;
  } catch (err) {
    console.warn(
      `The query to lookup communities of the same municipality '${queryParams.municipalityId}' failed:`,
      err
    );
    console.timeEnd('fetchCommunitiesInMunicipality');
    return [];
  }
};

/**
 * Fetch communities nearby by geosearch
 */
const fetchCommunitiesNearby = async (currentCommunity: Community): Promise<CommunityExcerpt[]> => {
  console.time('fetchCommunitiesNearby');
  console.log('Searching for communities nearby:', {
    communityId: currentCommunity._id,
    geoLocation: currentCommunity.geoLocation,
    searchRadius: 7500
  });

  const query = `*[_type == "community" && geo::distance(geolocation, $currentCommunityGeopoint) < 7500]{ ${CommunityDTOcoreWithGeoQueryFields} }`;
  const queryParams = {
    currentCommunityGeopoint: currentCommunity.geoLocation.point,
  };

  try {
    const response = await sanityClient.fetch(query, queryParams);
    const communities: CommunityExcerpt[] = (response || []).map((community: any) => ({
      _id: community._id,
      slug: community.slug,
      name: community.name,
    }));
    
    console.log(`Found ${communities.length} communities nearby`);
    console.timeEnd('fetchCommunitiesNearby');
    return communities;
  } catch (err) {
    console.warn(
      `The query to lookup communities nearby '${currentCommunity._id}' failed:`,
      err
    );
    console.timeEnd('fetchCommunitiesNearby');
    return [];
  }
};

/**
 * Fetch communities in the broader region by geosearch
 */
const fetchCommunitiesInRegion = async (
  currentCommunity: Community
): Promise<CommunityExcerpt[]> => {
  console.time('fetchCommunitiesInRegion');
  console.log('Searching for communities in region:', {
    communityId: currentCommunity._id,
    geoLocation: currentCommunity.geoLocation,
    searchRadius: 15000
  });

  const query = `*[_type == "community" && geo::distance(geolocation, $currentCommunityGeopoint) < 15000]{ ${CommunityDTOcoreWithGeoQueryFields} }`;
  const queryParams = {
    currentCommunityGeopoint: currentCommunity.geoLocation.point,
  };

  try {
    const response = await sanityClient.fetch(query, queryParams);
    const communities: CommunityExcerpt[] = (response || []).map((community: any) => ({
      _id: community._id,
      slug: community.slug,
      name: community.name,
    }));
    
    console.log(`Found ${communities.length} communities in region`);
    console.timeEnd('fetchCommunitiesInRegion');
    return communities;
  } catch (err) {
    console.warn(
      `The query to lookup communities in region '${currentCommunity._id}' failed:`,
      err
    );
    console.timeEnd('fetchCommunitiesInRegion');
    return [];
  }
};

/**
 * Fetch events of communities with specified scopes.
 */
const fetchEventsByCommunityList = async (
  communityIdList: string[],
  excludeCommunityIdList: string[],
  scopes: Scope[]
): Promise<Event[]> => {
  console.time('fetchEventsByCommunityList-' + scopes.join('-'));
  
  if (communityIdList?.length <= 0) {
    console.timeEnd('fetchEventsByCommunityList-' + scopes.join('-'));
    return [];
  }

  // Compose a query part to match all given communities
  const communitiesMatchQueryPart = communityIdList
    .filter(cid => !excludeCommunityIdList.includes(cid))
    .map(cid => `references("${cid}")`)
    .join(' || ')
    .trim();
    
  if (communitiesMatchQueryPart?.length <= 0) {
    console.timeEnd('fetchEventsByCommunityList-' + scopes.join('-'));
    return [];
  }

  // Compose a query part for the correct scopes
  const eventsScopeQueryPart: string =
    'calendar->scope in [' + scopes.map(scope => `"${scopeId(scope).toString()}"`).join(',') + ']';
  
  const query = `*[_type == "event" && (${communitiesMatchQueryPart}) && !cancelled && ${eventsScopeQueryPart}]{ ${EventDTOdetailQueryFields} }`;
  const queryParams = {};

  try {
    const response = await sanityClient.fetch(query, queryParams);

    
    
    const events: Event[] = (response || []).map((event: any) => ({        
      date: event.start ? new Date(event.start).toISOString().split('T')[0] : '',
      time: event.start ? new Date(event.start).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : undefined,
      title: event.name || '',
      location: event.location ? event.location.split(',')[0].trim() || event.location : '',
      start: event.start,
      allday: event.allday,
    }));
    
    console.timeEnd('fetchEventsByCommunityList-' + scopes.join('-'));
    return events;
  } catch (err) {
    console.warn(
      `The query to lookup events for communities [${communityIdList.join(', ')}] failed:`,
      err
    );
    console.timeEnd('fetchEventsByCommunityList-' + scopes.join('-'));
    return [];
  }
};

/**
 * Get events by community identifier (slug or ID)
 * This function retrieves events based on the given community and its surrounding areas,
 * similar to the logic used in the legacy [...slug].tsx file.
 * 
 * @param identifier - Community slug or ID
 * @returns Promise<Event[]> - Array of events for the community and surrounding areas
 */
export const getEventsByCommunity = async (identifier: string): Promise<Event[]> => {
  console.time('getEventsByCommunity');

  try {
    // Fetch the main community data
    const community = await fetchCommunity(identifier);
    console.log(`Fetched community data for identifier '${identifier}':`);
    
    if (!community) {
      console.warn(`Community with identifier '${identifier}' not found.`);
      console.timeEnd('getEventsByCommunity');
      return [];
    }

    // Fetch related communities in parallel
    const [communitiesOfMunicipality, communitiesNearby, communitiesInRegion] = await Promise.all([
      fetchCommunitiesInMunicipality(community),
      fetchCommunitiesNearby(community),
      fetchCommunitiesInRegion(community),
    ]);

    
    // Fetch events from different scopes in parallel
    const [communityEvents, municipalityEvents, nearbyEvents, regionEvents] = await Promise.all([
      fetchEventsByCommunityList(
        [community._id],
        [],
        ['community', 'municipality', 'surrounding', 'region']
      ),
      fetchEventsByCommunityList(
        communitiesOfMunicipality.map(c => c._id),
        [community._id],
        ['municipality', 'surrounding', 'region']
      ),
      fetchEventsByCommunityList(
        communitiesNearby.map(c => c._id),
        communitiesOfMunicipality.map(c => c._id),
        ['surrounding', 'region']
      ),
      fetchEventsByCommunityList(
        communitiesInRegion.map(c => c._id),
        [...communitiesNearby.map(c => c._id), ...communitiesOfMunicipality.map(c => c._id)],
        ['region']
      ),
    ]);

    // Combine and sort all events
    const allEvents = [
      ...communityEvents,
      ...municipalityEvents,
      ...nearbyEvents,
      ...regionEvents
    ];

    // Sort events by start and allday
    const sortedEvents = allEvents.sort((a, b) => {
      // Primary sort by start date
      const startA = new Date(a.start || a.date);
      const startB = new Date(b.start || b.date);
      const startComparison = startA.getTime() - startB.getTime();
      
      if (startComparison !== 0) {
        return startComparison;
      }
      
      // Secondary sort by allday (all-day events first)
      if (a.allday && !b.allday) return -1;
      if (!a.allday && b.allday) return 1;
      return 0;
    });

    console.log(`Fetched ${sortedEvents.length} events for community '${community.slug}'.`);
    console.timeEnd('getEventsByCommunity');
    
    return sortedEvents;
  } catch (error) {
    console.error('Error while retrieving events by community:', error);
    console.timeEnd('getEventsByCommunity');
    return [];
  }
};
