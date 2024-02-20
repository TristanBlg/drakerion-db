interface PageHeaderProps {
  heading: string,
  text?: string,
}

export default function PageHeader({ heading, text } : PageHeaderProps) {
  return (
    <div className="mb-4">
    { text && <span className="mb-2 text-green-500 font-semibold">{text}</span> }
    <h2 className="text-xl lg:text-2xl font-bold font-heading">{heading}</h2>
  </div>
  );
}
