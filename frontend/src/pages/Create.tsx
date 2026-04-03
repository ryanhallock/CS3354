import { useState } from 'react';
import type { CSSProperties } from 'react';

export default function Create() {
    const [deck, setDeck] = useState({
        title: '',
        description: '',
        isPublic: false,
    });

    const handleGenerateFlashCard = () => {}
    
    return (
        <div style={styles.page}>
            <h1 className="title-blue">Create</h1>

            <div style={styles.card}>
                <div style={styles.contentRow}>
                    {/* Left column */}
                    <div style={styles.leftColumn}>
                        <div style={styles.headerTextGroup}>
                            <p style={styles.uploadFileTitle}>Upload File</p>
                            <p style={styles.supportedFormats}>Supported formats: PDF, PPTX, Google Slides</p>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Title</label>
                            <input
                                type="text"
                                style={styles.inputField}
                                value={deck.title}
                                onChange={(e) => setDeck({ ...deck, title: e.target.value })}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Description</label>
                            <textarea
                                style={styles.textareaField}
                                value={deck.description}
                                onChange={(e) => setDeck({ ...deck, description: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Right column */}
                    <div style={styles.rightColumn}>
                        <label htmlFor="file-upload" style={styles.uploadBox}>
                            <input type="file" id="file-upload" accept=".pdf,.pptx" style={{ display: 'none' }} />
                            <div style={styles.uploadLabel}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8a8a9e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                                <span style={styles.uploadText}>Upload here</span>
                            </div>
                        </label>

                        <div style={styles.publicToggleRow}>
                            <span style={styles.publicLabel}>Make public</span>
                            
                            <div style={styles.switch} onClick={() => setDeck({ ...deck, isPublic: !deck.isPublic })}>
                                <div style={deck.isPublic ? styles.sliderChecked : styles.slider}>
                                    <div style={deck.isPublic ? styles.sliderThumbChecked : styles.sliderThumb}></div>
                                </div>
                            </div>
                            
                            <span style={styles.lockIcon}>
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

                <button style={styles.generateBtn} onClick={handleGenerateFlashCard}>
                    Generate Flashcards
                </button>
            </div>
        </div>
    );
}

const styles: { [key: string]: CSSProperties } = {
    page: {
        minHeight: '100vh',
        padding: '30px',
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        boxSizing: 'border-box',
        width: '100%',
        textAlign: 'left',
    },
    heading: {
        color: '#2a2a8c',
        fontSize: '24px',
        fontWeight: '700',
        marginBottom: '20px',
        textAlign: 'left',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '40px 50px',
        width: '100%',
        boxSizing: 'border-box',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
    },
    contentRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: '60px',
        width: '100%',
    },
    leftColumn: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1.2,
        gap: '20px',
    },
    rightColumn: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: '30px',
    },
    headerTextGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        marginBottom: '10px',
    },
    uploadFileTitle: {
        fontSize: '16px',
        color: '#111',
        margin: 0,
        fontWeight: '500',
    },
    supportedFormats: {
        fontSize: '14px',
        color: '#555',
        margin: 0,
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        fontSize: '15px',
        color: '#111',
    },
    inputField: {
        backgroundColor: '#f2f2f2',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 14px',
        fontSize: '16px',
        color: '#333',
        width: '100%',
        boxSizing: 'border-box',
        outline: 'none',
    },
    textareaField: {
        backgroundColor: '#f2f2f2',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 14px',
        fontSize: '16px',
        color: '#333',
        width: '100%',
        boxSizing: 'border-box',
        minHeight: '110px',
        resize: 'vertical',
        outline: 'none',
        fontFamily: 'inherit',
    },
    uploadBox: {
        width: '100%',
        border: '2px dashed #dcdcdc',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        minHeight: '220px',
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        boxSizing: 'border-box',
    },
    uploadLabel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
    },
    uploadText: {
        fontSize: '15px',
        color: '#333',
    },
    publicToggleRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
    },
    publicLabel: {
        fontSize: '15px',
        color: '#111',
    },
    switch: {
        position: 'relative',
        display: 'inline-block',
        width: '46px',
        height: '24px',
        cursor: 'pointer',
    },
    slider: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#dcdcdc',
        transition: '.3s',
        borderRadius: '24px',
    },
    sliderChecked: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#2a2a8c',
        transition: '.3s',
        borderRadius: '24px',
    },
    sliderThumb: {
        position: 'absolute',
        height: '20px',
        width: '20px',
        left: '2px',
        bottom: '2px',
        backgroundColor: 'white',
        transition: '.3s',
        borderRadius: '50%',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    sliderThumbChecked: {
        position: 'absolute',
        height: '20px',
        width: '20px',
        left: '24px',
        bottom: '2px',
        backgroundColor: 'white',
        transition: '.3s',
        borderRadius: '50%',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    lockIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    generateBtn: {
        backgroundColor: '#2a2a8c',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '16px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        width: '100%',
        boxSizing: 'border-box',
    },
};