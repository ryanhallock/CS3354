import { useNavigate } from 'react-router-dom';

export default function MyFlashcards() {
    const navigate = useNavigate();

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <h1 className="title-blue">My Flashcards</h1>

            <div className="dropdown">
                <h1 className="title">All Sets</h1>
                <h1 className="title">{'>'}</h1>
            </div>
            <div className="dropdown">
                <h1 className="title">By Class</h1>
                <h1 className="title">{'>'}</h1>
            </div>
            <button
                className="add-btn"
                onClick={() => navigate('/create')}>
                +
            </button>
        </div>
    );
}