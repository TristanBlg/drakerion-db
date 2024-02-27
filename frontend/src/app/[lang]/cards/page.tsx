import { fetchAPI } from "@/app/[lang]/utils/fetch-api";
import CardWithDialog from "../components/CardWithDialog";
import PageHeader from "../components/PageHeader";
import Search from "../components/Search";
import { Card } from "@/type";

type FILTERS_KEY = "t" | "f";
const FILTERS_MATCHS: { [key in FILTERS_KEY]: string } = {
  t: "type",
  f: "faction",
};

async function fetchPostsByCategory(query: string) {
  let filters: { [key in FILTERS_KEY | "name"]: any } | {} = {};

  if (query) {
    // Filter by other properties than name
    const regex = new RegExp(`(t|f):(\\w*)`, "g");
    const matchs = query.match(regex);
    if (matchs) {
      for (const match of matchs) {
        const value = match.replace(/(t|f):/, "");
        const key = match.replace(/:\w*/, "");
        if (key in FILTERS_MATCHS) {
          const foundKey = FILTERS_MATCHS[key];
          filters[foundKey] = {
            $containsi: value,
          };
        }
      }
    }

    // Filter by name
    const formattedQuery = query.replace(regex, "").trim();
    if (formattedQuery) {
      filters.name = {
        $containsi: formattedQuery,
      };
    }
  }
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/cards`;
    const urlParamsObject = {
      filters,
      populate: {
        image: "*",
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export default async function CategoryRoute({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const query = searchParams.query;
  const { data } = await fetchPostsByCategory(query);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <PageHeader heading="Cards" text={""} />
      <Search />
      <div>
        {data.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
            {data.map((item: any) => {
              const card: Card = item.attributes;
              return (
                <CardWithDialog
                  key={card.image.data.id}
                  card={card}
                  className="w-full rounded-xl shadow-md"
                  src={"http://localhost:1337" + card.image.data.attributes.url}
                  alt="Picture of the author"
                />
              );
            })}
          </div>
        ) : (
          <div>
            <p className="mt-8 text-xl font-bold tracking-tight text-green-500 sm:text-3xl">
              No cards found
            </p>
            <p className="mt-2 text-base leading-7 text-gray-600">
              <b>Le guide de syntaxe</b> peut vous aider à trouver les cartes
              que vous cherchez !
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}
