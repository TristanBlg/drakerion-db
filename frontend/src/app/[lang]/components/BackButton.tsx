"use client";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      className="rounded-sm bg-green-500 text-white flex items-center gap-1 px-2 py-1 hover:bg-green-400 focus:outline-none"
      type="button"
      onClick={() => router.back()}
    >
      <ChevronLeftIcon className="h-4 w-4 inline-block" aria-hidden="true" />
      <span className="leading-tight text-sm">Retour aux decks</span>
    </button>
  );
}
