import { fetchAPI } from '@/app/[lang]/utils/fetch-api';
import AsyncSelect from 'react-select/async';
import CardWithDialog from '../../components/CardWithDialog';

async function fetchDeck(id: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/decks/findWithCards`;
    const urlParamsObject = {
      // filters: {
      //   category: {
      //     slug: filter,
      //   },
      // },
      // populate: {
      //   cards: {
      //     card: {
      //       image: "*"
      //     }
      //   }
      // },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);

    return responseData;
  } catch (error) {
    console.error(error);
  }
}

async function fetchCards(name: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/cards`;
    const urlParamsObject = {
      filters: {
        name: { $containsi: name }
      },
      // populate: {
      //   cards: {
      //     card: {
      //       image: "*"
      //     }
      //   }
      // },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);

    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export default async function CategoryRoute({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const responseData = await fetchDeck(slug);
  const handleFetchCards = (search: string) => {
    return fetchCards(search)
  }

  //TODO: CREATE A COMPONENT FOR THIS
  if (responseData.length === 0) return <div>Not Posts In this category</div>;

  return (
    <div>
      {/* <PageHeader heading={name} text={""} /> */}
      {/* <div>{name}</div> */}
      <div className="container mx-auto p-8">
        {/* <AsyncSelect cacheOptions defaultOptions loadOptions={handleFetchCards} /> */}
        <div className="grid grid-cols-6 gap-4">
          {Object.values(responseData[0].cards).map((card: any) => (
            <div key={card.card.image.id} className="relative">
              <CardWithDialog
                className="w-full rounded-xl shadow-md"
                card={card.card}
                src={"http://localhost:1337" + card.card.image.url}
                alt="Picture of the author" />
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white dark:text-black bg-slate-900 dark:bg-slate-50 rounded -top-2 -end-2">{card.quantity}</div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}

export async function generateStaticParams() {
  return [];
}
