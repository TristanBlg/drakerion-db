'use client';
import { useEffect, useState } from "react";
import { useRouter, usePathname } from 'next/navigation'
import Select, { Option } from "./Select";

function findItemById(array: Option[], id: string) {
  for (const element of array) {
    if (element.value === id) {
      return element
    }
  }
  return null; // Not found
}

const factionOptions = [{ id: 1, name: 'Toutes', value: 'all' }, { id: 2, name: 'Gil Estel', value: 'gilestel' }, { id: 3, name: 'Lokmar', value: 'lokmar' }, { id: 4, name: 'Tyraslin', value: 'tyraslin' }]
const typeOptions = [{ id: 1, name: 'Tous', value: 'all' }, { id: 2, name: 'Personnage', value: 'character' }, { id: 3, name: 'Banner', value: 'banner' }, { id: 4, name: 'City', value: 'city' }]

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [cardFaction, setCardFaction] = useState(factionOptions[0])
  const [cardType, setCardType] = useState(typeOptions[0])

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    router.push(`${pathname}${keyword && `?query=${keyword}`}`);
  };

  useEffect(() => {
    // const regex = /f:(gilestel|lokmar|tyraslin)(?!\w)/;
    // const found = keyword.match(regex);
    // if (!found && cardFaction !== factionOptions[0]) {
    //   setCardFaction(factionOptions[0])
    // } else if (found && found[1] && findItemById(factionOptions, found[1]) !== null) {
    //   const option = findItemById(factionOptions, found[1]) as Option
    //   setCardFaction(option)
    // }

    handleSubmit()
  }, [keyword])

  const handleSelectChange = (value: Option, filter: 't' | 'f') => {
    if (filter === 't') {
      setCardType(value)
    } else if (filter === 'f') {
      setCardFaction(value)
    }

    const regex = new RegExp(`${filter}:(\\w*)`, 'g');
    const newKeyword = keyword.replace(regex, "").replace(/\s+/g, " ").trim()

    if (value.value === 'all') {
      setKeyword(newKeyword)
    } else {
      const formattedKeyword = `${filter}:${value.value} `.concat(newKeyword).trim();
      setKeyword(formattedKeyword)
    }
  }

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search-cards" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
        <div className="relative w-full sm:max-w-sm">
          <input
            id="search-cards"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search..."
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-0 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-green-500"
          />
          <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-green-500 rounded-e-md border border-green-500 hover:bg-green-400 focus:outline-none">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <div className="flex-1 sm:flex-initial">
            <Select
              label="Faction"
              selected={cardFaction}
              onChange={(value) => handleSelectChange(value, 'f')}
              options={factionOptions}
            />
          </div>
          <div className="flex-1 sm:flex-initial">
            <Select
              label="Type"
              selected={cardType}
              onChange={(value) => handleSelectChange(value, 't')}
              options={typeOptions}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
