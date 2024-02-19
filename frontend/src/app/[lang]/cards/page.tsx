import { fetchAPI } from '@/app/[lang]/utils/fetch-api';
import Image from 'next/image';
import CardWithDialog from '../components/CardWithDialog';
import { Card } from '@/type';

async function fetchPostsByCategory(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/cards`;
    const urlParamsObject = {
      // filters: {
      //   category: {
      //     slug: filter,
      //   },
      // },
      populate: {
        image: "*"
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
      <PageHeader heading={name} text={""} />
      {/* <div>{name}</div> */}
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          <>
            {data.map((item: any) => {
              const card: Card = item.attributes
              return (
                <CardWithDialog
                  key={card.image.data.id}
                  card={card}
                  className="w-full rounded-xl shadow-md"
                  src={"http://localhost:1337" + card.image.data.attributes.url}
                  alt="Picture of the author" />
              )
            })}
          </>
          <Image className="w-full rounded-xl shadow-md" src={"http://localhost:1337" + data[0]?.attributes.image.data.attributes.url} width={500}
            height={500}
            alt="Picture of the author" />
          <Image className="w-full rounded-xl shadow-md" src={"http://localhost:1337" + data[0]?.attributes.image.data.attributes.url} width={500}
            height={500}
            alt="Picture of the author" />
          <Image className="w-full rounded-xl shadow-md" src={"http://localhost:1337" + data[0]?.attributes.image.data.attributes.url} width={500}
            height={500}
            alt="Picture of the author" />
          <Image className="w-full rounded-xl shadow-md" src={"http://localhost:1337" + data[0]?.attributes.image.data.attributes.url} width={500}
            height={500}
            alt="Picture of the author" />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}
