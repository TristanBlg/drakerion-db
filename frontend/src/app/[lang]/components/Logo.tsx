import Link from "next/link";
import Image from "next/image";

export default function Logo({
  src,
  to,
  children,
}: {
  src: string | null;
  to: string,
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={to}
      aria-label="Back to homepage"
      className="flex items-center"
    >
      {src && <Image src={src} alt="logo" width={179} height={32} />}
    </Link>
  );
}
