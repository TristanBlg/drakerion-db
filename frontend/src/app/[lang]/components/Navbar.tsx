"use client";
import Logo from "./Logo";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from '@heroicons/react/20/solid'
import { useState, Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}

function NavLink({ url, text }: NavLink) {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`flex items-center text-slate-700 px-4 -mb-1 ${path === url && "text-violet-400"
          }`}
      >
        {text}
      </Link>
    </li>
  );
}

function MobileNavLink({ url, text, closeMenu }: MobileNavLink) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  };
  return (
    <a className="flex">
      <Link
        href={url}
        onClick={handleClick}
        className={`block px-3 py-4 text-lg font-semibold text-slate-700 ${path === url && "text-violet-400"
          }`}
      >
        {text}
      </Link>
    </a>
  );
}

export default function Navbar({
  links,
  lang,
  profileLinks,
  logoUrl,
  logoText,
}: {
  links: Array<NavLink>;
  lang: string,
  profileLinks: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };
  return (
    <div className="flex py-2 px-4 bg-slate-50 dark:bg-black dark:text-slate-100 shadow shadow-slate-300">
      <div className="container flex h-16 mx-auto px-0 sm:px-6">
        <Logo src={logoUrl} to={`/${lang}/`} />
        <div className="ml-12 items-center flex-shrink-0 hidden lg:flex">
          <ul className="items-stretch hidden lg:flex">
            {links.map((item: NavLink) => (
              <NavLink key={item.id} {...item} />
            ))}
          </ul>
        </div>
        <div className="ml-auto items-center gap-4 flex-shrink-0 hidden lg:flex">
          <button
            type="button"
            className="p-2"
            onClick={() => console.log('new deck')}
          >
            <span className="sr-only">New deck</span>
            <PlusIcon className="h-6 w-6 fill-slate-900" aria-hidden="true" />
          </button>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex items-center text-slate-900 focus:outline-none">
                <img
                  className="inline-block h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <p className="ml-1">Eleandre</p>
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 divide-y divide-gray-400 divide-opacity-50">
                  <ul>
                    {profileLinks.map((link) => (
                      <li>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              key={link.id}
                              href={link.url}
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block w-full px-4 py-2 text-left text-sm'
                              )}
                            >
                              {link.text}
                            </Link>
                          )}
                        </Menu.Item>
                      </li>
                    ))}
                  </ul>

                  <form method="POST" action="#">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="submit"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block w-full px-4 py-2 text-left text-sm text-red-600'
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </form>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog
            as="div"
            className="lg:hidden"
            onClose={setMobileMenuOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 z-40 bg-slate-600 bg-opacity-75" />
            </Transition.Child>
            {/* Overlay */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-x-0 sm:-translate-x-8"
              enterTo="opacity-100 translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-0 sm:-translate-x-8"
            >
              <Dialog.Panel className="fixed inset-y-0 rtl:left-0 ltr:right-0 z-50 w-full overflow-y-auto bg-white px-4 py-6 sm:max-w-sm sm:ring-1 sm:ring-inset sm:ring-white/10">
                <div className="flex items-center justify-between">
                  <Logo src={logoUrl} to={`/${lang}/`} />
                  <button
                    type="button"
                    className="-my-2.5 mr-2 rounded-md p-2.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-12 divide-y divide-gray-400 divide-opacity-50">
                  <div>
                    {links.map((item) => (
                      <MobileNavLink
                        key={item.id}
                        closeMenu={closeMenu}
                        {...item}
                      />
                    ))}
                  </div>
                  <div>
                    {profileLinks.map((item) => (
                      <MobileNavLink
                        key={item.id}
                        closeMenu={closeMenu}
                        {...item}
                      />
                    ))}
                  </div>
                  <form method="POST" action="#">
                    <button
                      type="submit"
                      className="block px-3 py-4 text-lg font-semibold text-left text-red-600"
                    >
                      Sign out
                    </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
        <button
          className="ml-auto p-4 lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="h-7 w-7 text-slate-700" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
