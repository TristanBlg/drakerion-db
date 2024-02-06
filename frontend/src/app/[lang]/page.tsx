import LangRedirect from './components/LangRedirect';


export default async function RootRoute({ params }: { params: { lang: string } }) {
  return (
    <div>
      <div className="container mx-auto px-4">home</div>
    </div >
  )
}
