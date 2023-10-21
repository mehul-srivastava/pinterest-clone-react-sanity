import { createClient } from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-10-20",
  useCdn: false,
  token: import.meta.env.VITE_SANITY_API_TOKEN,
});

// To allow some parts of application to use CDN, setup another client with useCdn: true and use that client object to perform queries

const builder = createImageUrlBuilder(client);

export default client;
export const urlFor = (source) => builder.image(source);
