import { useState } from 'react';

export default function Create() {
    const [deck, setDeck] = useState({
        title: '',
        description: '',
        isPublic: false,
    });

    const handleGenerateFlashCard = () => {}

    return (
        <div className="min-h-screen p-[30px] flex flex-col items-stretch box-border w-full text-left">
            <h1 className="text-[30px] font-medium text-primary justify-self-start mt-5 mb-5">Create</h1>

            <div className="bg-surface rounded-xl p-[40px_50px] w-full box-border shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex flex-col gap-10">
                <div className="flex flex-row gap-[60px] w-full">
                    {/* Left column */}
                    <div className="flex flex-col flex-[1.2] gap-5">
                        <div className="flex flex-col gap-1 mb-[10px]">
                            <p className="text-base text-[#111] m-0 font-medium">Upload File</p>
                            <p className="text-sm text-[#555] m-0">Supported formats: PDF, PPTX, Google Slides</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[15px] text-[#111]">Title</label>
                            <input
                                type="text"
                                className="bg-gray-100 border-none rounded-lg px-[14px] py-3 text-base text-[#333] w-full box-border outline-none"
                                value={deck.title}
                                onChange={(e) => setDeck({ ...deck, title: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[15px] text-[#111]">Description</label>
                            <textarea
                                className="bg-gray-100 border-none rounded-lg px-[14px] py-3 text-base text-[#333] w-full box-border min-h-[110px] resize-y outline-none font-[inherit]"
                                value={deck.description}
                                onChange={(e) => setDeck({ ...deck, description: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="flex flex-col flex-1 gap-[30px]">
                        <label htmlFor="file-upload" className="w-full border-2 border-dashed border-[#dcdcdc] rounded-xl flex justify-center items-center flex-1 min-h-[220px] bg-surface cursor-pointer box-border">
                            <input type="file" id="file-upload" accept=".pdf,.pptx" className="hidden" />
                            <div className="flex flex-col items-center gap-3">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8a8a9e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                                <span className="text-[15px] text-[#333]">Upload here</span>
                            </div>
                        </label>

                        <div className="flex flex-row items-center justify-center gap-3">
                            <span className="text-[15px] text-[#111]">Make public</span>

                            <div className="relative inline-block w-[46px] h-[24px] cursor-pointer" onClick={() => setDeck({ ...deck, isPublic: !deck.isPublic })}>
                                <div className={`absolute inset-0 transition-colors duration-300 rounded-[24px] ${deck.isPublic ? 'bg-primary' : 'bg-[#dcdcdc]'}`}>
                                    <div className={`absolute h-5 w-5 bottom-0.5 bg-white transition-[left] duration-300 rounded-full shadow-sm ${deck.isPublic ? 'left-[24px]' : 'left-0.5'}`}></div>
                                </div>
                            </div>

                            <span className="flex items-center justify-center">
                                {deck.isPublic ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a8a9e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a8a9e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                <button className="bg-primary text-white border-none rounded-lg p-4 text-base font-semibold cursor-pointer w-full box-border" onClick={handleGenerateFlashCard}>
                    Generate Flashcards
                </button>
            </div>
        </div>
    );
}
