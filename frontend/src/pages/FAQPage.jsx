import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/style';

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <Faq />
      <Footer />
    </div>
  );
};

const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className={`${styles.section} my-8`}>
      <h2 className="text-3xl font-bold text-[#171203] mb-8">FAQ</h2>
      <div className="mx-auto space-y-4">
        {/* Tab 1 */}
        <div className="border-b border-[#b19b56] pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(1)}
          >
            <span className="text-lg font-medium text-[#171203]">
              How to order?
            </span>
            {activeTab === 1 ? (
              <svg
                className="h-6 w-6 text-[#534723]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-[#534723]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 1 && (
            <div className="mt-4">
              <p className="text-base text-[#534723] text-justify">
                Just choose your desired item, click the add to cart button or
                the cart icon. Then pay to be process
              </p>
            </div>
          )}
        </div>

        {/* Tab 2 */}
        <div className="border-b border-[#b19b56] pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(2)}
          >
            <span className="text-lg font-medium text-[#171203]">
              How to order?
            </span>
            {activeTab === 2 ? (
              <svg
                className="h-6 w-6 text-[#534723]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-[#534723]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 2 && (
            <div className="mt-4">
              <p className="text-base text-[#534723] text-justify">
                Just choose your desired item, click the add to cart button or
                the cart icon. Then pay to be process
              </p>
            </div>
          )}
        </div>

        {/* Tab 3 */}
        <div className="border-b border-[#b19b56] pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(3)}
          >
            <span className="text-lg font-medium text-[#171203]">
              How to order?
            </span>
            {activeTab === 3 ? (
              <svg
                className="h-6 w-6 text-[#534723]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-[#534723]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 3 && (
            <div className="mt-4">
              <p className="text-base text-[#534723] text-justify">
                Just choose your desired item, click the add to cart button or
                the cart icon. Then pay to be process
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
