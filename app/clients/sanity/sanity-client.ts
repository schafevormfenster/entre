import SanityClientConstructor from '@sanity/client';

// use a cdn client for fetching data
// put it outside to be used in staticProps and staticPaths
export const sanityClient = SanityClientConstructor({
  apiVersion: process.env.SANITY_APIVERSION,
  projectId: process.env.SANITY_PROJECTID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
});