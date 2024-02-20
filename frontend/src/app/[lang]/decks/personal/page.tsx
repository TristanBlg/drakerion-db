import { fetchAPI } from '@/app/[lang]/utils/fetch-api';
import Link from 'next/link';
import { formatDate } from '../../utils/api-helpers';
import PageHeader from '../../components/PageHeader';

async function fetchPostsByCategory(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/decks`;
    const urlParamsObject = {
      // filters: {
      //   category: {
      //     slug: filter,
      //   },
      // },
      populate: {
        thumbnail: "*",
        author: "*"
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export default async function CategoryRoute({ params }: { params: { category: string } }) {
  const filter = params.category;
  const { data } = await fetchPostsByCategory(filter);

  //TODO: CREATE A COMPONENT FOR THIS
  if (data.length === 0) return <div>Not Posts In this category</div>;

  return (
    <div>
      <PageHeader heading={"Deck personal"} text={""} />
      {/* <div>{name}</div> */}
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <>
            {data.map((deck: any) => (
              <Link key={deck.id} href={`/decks/${deck.id}`}>
                <div
                  className="bg-cover rounded shadow-md flex flex-col flex-1 px-6 py-4"
                  style={{
                    backgroundImage: `radial-gradient(transparent, #000), url(http://localhost:1337${deck.attributes.thumbnail.data.attributes.url})`,
                    height: '200px'
                  }}>
                  <div className="text-white font-bold text-xl">{deck.attributes.name}</div>
                  <div className="text-white">{deck.attributes.faction}</div>
                </div>
                <div className="flex px-6 py-2">
                  <p className="flex-1 text-slate-900 text-sm">
                    {/* {deck.attributes.author.data.attributes.displayname} */}
                    Author
                  </p>
                  <p className="text-slate-900 text-sm italic">
                    {formatDate(deck.attributes.publishedAt)}
                  </p>
                </div>
              </Link>
            ))}
          </>
        </div>
      </div>
    </div >
  );
}

export async function generateStaticParams() {
  return [];
}
