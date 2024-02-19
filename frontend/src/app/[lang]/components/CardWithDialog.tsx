'use client';
import Image from 'next/image';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import RichText from './RichText';
import { Card } from '@/type';

export default function CardWithDialog({ src, card, className, alt }: { src: string, card: Card, className: string, alt: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Image onClick={() => setOpen(true)} className={className + " cursor-pointer"} src={src} width={500}
        height={500}
        alt={alt} />
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-md bg-white px-4 md:px-8 py-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-screen-sm md:max-w-screen-md">
                  <div className='border-b mb-2 pb-2 flex justify-end'>
                    {/* <Dialog.Title as="h3" className="text-xl font-light	leading-6 text-gray-700 flex-1">
                      XXX
                    </Dialog.Title> */}
                    <button
                      type="button"
                      className="rounded-sm bg-green-500 text-white flex items-center gap-1 px-2 py-1 hover:bg-green-400 focus:outline-none"
                      onClick={() => setOpen(false)}
                    >
                      <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                      <span className="leading-tight text-sm">Close</span>
                    </button>
                  </div>
                  <div className="flex-col sm:flex-row sm:flex sm:items-start">
                    <Image className="rounded-xl w-full sm:w-60" src={src} width={500}
                      height={500}
                      alt={alt} />
                    <div className="sm:flex-1 mt-8 sm:mt-0 sm:ml-8">
                      <div className="flex">
                        <p className="flex-1 text-slate-900">
                          <span className="font-bold text-2xl">{card.name}</span>
                          {card.subheading && (<span className="italic text-sm">, {card.subheading}</span>)}
                        </p>
                        <img
                          className="h-8 w-8"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <p className="text-sm text-slate-700">
                        {card.type}
                      </p>
                      <p className="italic text-sm text-slate-900">
                        {card.trait}
                      </p>
                      <p className="mt-6 font-semibold text-slate-900">
                        Interceptor
                      </p>
                      <div className="mt-6 text-slate-900">
                        <RichText text={card.abilities} />
                      </div>
                      {card.cost !== null && (
                        <p className="mt-6 text-slate-900">
                          <span className="font-semibold">Cost: </span>
                          {card.cost}
                        </p>
                      )}
                      {card.draw !== null && (
                        <p className="mt-6 text-slate-900">
                          <span className="font-semibold">Draw: </span>
                          {card.draw}
                        </p>
                      )}
                      {card.gold !== null && (
                        <p className="mt-6 text-slate-900">
                          <span className="font-semibold">Gold: </span>
                          {card.gold}
                        </p>
                      )}
                      {card.health !== null && (
                        <p className="mt-6 text-slate-900">
                          <span className="font-semibold">Health: </span>
                          {card.health}
                        </p>
                      )}
                      {card.initiative !== null && (
                        <p className="mt-6 text-slate-900">
                          <span className="font-semibold">Initiative: </span>
                          {card.initiative}
                        </p>
                      )}
                      {card.melee_attack !== null && (
                        <p className="mt-6 text-slate-900">
                          <span className="font-semibold">Melee Attack: </span>
                          {card.melee_attack}
                        </p>
                      )}
                      {card.ranged_attack !== null && (
                        <p className="mt-6 text-slate-900">
                          <span className="font-semibold">Ranged Attack: </span>
                          {card.ranged_attack}
                        </p>
                      )}
                      {card.prestige !== null && (
                        <p className="mt-6 text-slate-900">
                          <span className="font-semibold">Prestige: </span>
                          {card.prestige}
                        </p>
                      )}
                      {card.riposte !== null && (
                        <p className="mt-6 text-slate-900">
                          <span className="font-semibold">Riposte: </span>
                          {card.riposte}
                        </p>
                      )}
                      <div className="mt-6">
                        <img
                          className="inline-block h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                        <a className="ml-2 text-slate-900" href="">Core set</a>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
