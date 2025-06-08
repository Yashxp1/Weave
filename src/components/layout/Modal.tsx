'use client';

import { useModal } from '@/contexts/ModalContext';
import React from 'react';

const Modal = () => {
  const { isOpen, toggleModal } = useModal();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#000000] w-full max-w-xl rounded-2xl border dark:border-[#2D2D2D] border-gray-300 shadow-xl">
            <div className="flex justify-end p-4">
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-red-500 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="flex px-6 pb-6">
              <div className="mr-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
              </div>

              <div className="flex-1">
                <textarea
                  placeholder="What’s happening?"
                  className="w-full resize-none bg-transparent text-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none"
                  rows={4}
                />

                <div className="flex justify-end mt-4">
                  <button className="bg-white hover:bg-gray-200 text-black px-5 py-2 rounded-full font-semibold disabled:opacity-50">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
