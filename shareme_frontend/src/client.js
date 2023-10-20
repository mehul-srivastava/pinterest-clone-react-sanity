import { createClient } from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-10-20",
  useCdn: true,
  token: import.meta.env.VITE_SANITY_API_TOKEN,
});

const builder = createImageUrlBuilder(client);

export default client;
export const urlFor = (source) => builder.image(source);
