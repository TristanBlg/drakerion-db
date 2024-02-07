export default async function CategoryRoute({ params }: { params: { category: string } }) {
  return (
    <div>
      {/* <PageHeader heading={name} text={""} /> */}
      {/* <div>{name}</div> */}
      <div className="container mx-auto p-8">
        Settings
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}
