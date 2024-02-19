import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function RichText({ text }: { text: string }) {
  return (
    <section className="rich-text">
      <Markdown children={text} remarkPlugins={[remarkGfm]} />
    </section>
  );
}
