import { Client, Databases, Query, ID } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);

const databases = new Databases(client);

const Updatecnt = async (search, movieData) => {
  try {
    if (!search) return;

    const result = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("searchterm", search)]
    );

    if (result.documents.length > 0) {
      const existingDoc = result.documents[0];

      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingDoc.$id,
        {
          count: existingDoc.count + 1,
        }
      );
    } else {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchterm: search,
          count: 1,
          poster:
            "https://image.tmdb.org/t/p/w500" +
            movieData.poster_path,
        }
      );
    }
  } catch (error) {
    console.error("Appwrite update error:", error);
  }
};

export const getTrendingSearches = async () => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.orderDesc("count"),
        Query.limit(5)
      ]
    );

    return result.documents;
  } catch (error) {
    console.error("Error fetching trending:", error);
    return [];
  }
};
export default Updatecnt;
