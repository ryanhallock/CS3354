import { useState } from "react";

export default function Create() {
  const [deck, setDeck] = useState({
    title: "",
    description: "",
    isPublic: false,
  });

  const handleGenerateFlashCard = () => {};

  return (
    <div className="box-border flex min-h-screen w-full flex-col items-stretch p-7.5 text-left">
      <h1 className="text-primary mt-5 mb-5 justify-self-start text-[30px] font-medium">Create</h1>

      <div className="bg-surface box-border flex w-full flex-col gap-10 rounded-xl p-[40px_50px] shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
        <div className="flex w-full flex-row gap-15">
          {/* Left column */}
          <div className="flex flex-[1.2] flex-col gap-5">
            <div className="mb-2.5 flex flex-col gap-1">
              <p className="m-0 text-base font-medium text-[#111]">Upload File</p>
              <p className="m-0 text-sm text-[#555]">Supported formats: PDF, PPTX, Google Slides</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#111]">Title</label>
              <input
                type="text"
                className="box-border w-full rounded-lg border-none bg-gray-100 px-3.5 py-3 text-base text-[#333] outline-none"
                value={deck.title}
                onChange={(e) => setDeck({ ...deck, title: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[15px] text-[#111]">Description</label>
              <textarea
                className="box-border min-h-27.5 w-full resize-y rounded-lg border-none bg-gray-100 px-3.5 py-3 font-[inherit] text-base text-[#333] outline-none"
                value={deck.description}
                onChange={(e) => setDeck({ ...deck, description: e.target.value })}
              />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-1 flex-col gap-7.5">
            <label
              htmlFor="file-upload"
              className="bg-surface box-border flex min-h-55 w-full flex-1 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[#dcdcdc]"
            >
              <input type="file" id="file-upload" accept=".pdf,.pptx" className="hidden" />
              <div className="flex flex-col items-center gap-3">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8a8a9e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span className="text-[15px] text-[#333]">Upload here</span>
              </div>
            </label>

            <div className="flex flex-row items-center justify-center gap-3">
              <span className="text-[15px] text-[#111]">Make public</span>

              <div
                className="relative inline-block h-6 w-11.5 cursor-pointer"
                onClick={() => setDeck({ ...deck, isPublic: !deck.isPublic })}
              >
                <div
                  className={`absolute inset-0 rounded-3xl transition-colors duration-300 ${deck.isPublic ? "bg-primary" : "bg-[#dcdcdc]"}`}
                >
                  <div
                    className={`absolute bottom-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-[left] duration-300 ${deck.isPublic ? "left-6" : "left-0.5"}`}
                  ></div>
                </div>
              </div>

              <span className="flex items-center justify-center">
                {deck.isPublic ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8a8a9e"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8a8a9e"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                )}
              </span>
            </div>
          </div>
        </div>

        <button
          className="bg-primary box-border w-full cursor-pointer rounded-lg border-none p-4 text-base font-semibold text-white"
          onClick={handleGenerateFlashCard}
        >
          Generate Flashcards
        </button>
      </div>
    </div>
  );
}
