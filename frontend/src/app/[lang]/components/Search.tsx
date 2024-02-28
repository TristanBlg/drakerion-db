"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import classNames from "../utils/classNames";

let mount = false;
export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [keyword, setKeyword] = useState(query || "");

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    router.push(`${pathname}${keyword && `?query=${keyword}`}`);
  };

  useEffect(() => {
    if (mount) {
      console.log("submit", keyword);
      handleSubmit();
    } else {
      mount = true;
    }
    // const regex = /f:(gilestel|lokmar|tyraslin)(?!\w)/;
    // const found = keyword.match(regex);
    // if (!found && cardFaction !== factionOptions[0]) {
    //   setCardFaction(factionOptions[0])
    // } else if (found && found[1] && findItemById(factionOptions, found[1]) !== null) {
    //   const option = findItemById(factionOptions, found[1]) as Option
    //   setCardFaction(option)
    // }
  }, [keyword]);

  const handleButton = (type: string, query: string) => {
    const regex = new RegExp(`${type}:((\\w|,)+)`, "g");

    const matchs = keyword.match(regex);
    if (matchs) {
      const keys = matchs[0]
        .replace(`${type}:`, "")
        .replace(` `, "")
        .split(",");
      if (new RegExp(`(?<=${type}:(?:\\w*,)*)${query}(?!\\w)`).test(keyword)) {
        const newKeys = keys.filter((el) => {
          return !new RegExp(el).test(query);
        });
        if (newKeys.length) {
          setKeyword(
            keyword.replace(regex, `${type}:${newKeys.join(",")}`).trim()
          );
        } else {
          setKeyword(keyword.replace(regex, ``).trim());
        }
      } else {
        // new query item
        setKeyword(
          keyword.replace(regex, `${type}:${[...keys, query].join(",")}`).trim()
        );
      }
    } else {
      setKeyword(`${type}:${query} ${keyword}`);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="search-cards"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Your Email
        </label>
        <div className="relative w-full sm:max-w-sm">
          <input
            id="search-cards"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search..."
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-0 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-green-500"
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-green-500 rounded-e-md border border-green-500 hover:bg-green-400 focus:outline-none"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <button
            type="button"
            className={classNames(
              new RegExp(/(?<=f:(?:\w*,)*)tyraslin(?!\w)/).test(keyword)
                ? "bg-green-500"
                : "bg-slate-500",
              "rounded-sm text-white flex items-center gap-1 px-2 py-1 hover:bg-green-900 focus:outline-none"
            )}
            onClick={() => handleButton("f", "tyraslin")}
          >
            <span className="leading-tight text-sm">Tyraslin</span>
          </button>
          <button
            type="button"
            className={classNames(
              new RegExp(/(?<=f:(?:\w*,)*)neutral(?!\w)/).test(keyword)
                ? "bg-green-500"
                : "bg-slate-500",
              "rounded-sm text-white flex items-center gap-1 px-2 py-1 hover:bg-green-900 focus:outline-none"
            )}
            onClick={() => handleButton("f", "neutral")}
          >
            <span className="leading-tight text-sm">Neutral</span>
          </button>
          <button
            type="button"
            className={classNames(
              new RegExp(/(?<=t:(?:\w*,)*)city,banner(?!\w)/).test(keyword)
                ? "bg-green-500"
                : "bg-slate-500",
              "rounded-sm text-white flex items-center gap-1 px-2 py-1 hover:bg-green-900 focus:outline-none"
            )}
            onClick={() => handleButton("t", "city,banner")}
          >
            <span className="leading-tight text-sm">City & Banner</span>
          </button>
          <button
            type="button"
            className={classNames(
              new RegExp(/(?<=t:(?:\w*,)*)character,spell(?!\w)/).test(keyword)
                ? "bg-green-500"
                : "bg-slate-500",
              "rounded-sm text-white flex items-center gap-1 px-2 py-1 hover:bg-green-900 focus:outline-none"
            )}
            onClick={() => handleButton("t", "character,spell")}
          >
            <span className="leading-tight text-sm">Maindeck</span>
          </button>
          <button
            type="button"
            className={classNames(
              new RegExp(/(?<=t:(?:\w*,)*)maneuver(?!\w)/).test(keyword)
                ? "bg-green-500"
                : "bg-slate-500",
              "rounded-sm text-white flex items-center gap-1 px-2 py-1 hover:bg-green-900 focus:outline-none"
            )}
            onClick={() => handleButton("t", "maneuver")}
          >
            <span className="leading-tight text-sm">Maneuver</span>
          </button>
        </div>
      </form>
    </div>
  );
}
