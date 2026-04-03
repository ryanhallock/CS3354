import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';

export default function Profile() {
    const [profile, setProfile] = useState({
        email: '',
        firstName: '',
        lastName: '',
        profilePicture: null,
    });

    useEffect(() => {
        /* Fetch the user information and set it to the useState */
    }, [])

    const handleLogout = () => { };

    return (
        <div style={styles.page}>
            <h1 className="title-blue">Profile</h1>

            <div style={styles.card}>
                <div style={styles.leftColumn}>
                    <div style={styles.profilePic}>
                        {profile.profilePicture ? (
                            <img
                                src={profile.profilePicture}
                                alt="Profile"
                                style={styles.profileImg}
                            />
                        ) : (
                            <span style={styles.picLabel}>Profile<br />Picture</span>
                        )}
                    </div>
                    <button style={styles.logoutBtn} onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                {/* Profile Info */}
                <div style={styles.infoSection}>
                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Email</label>
                        <div style={styles.field}>{profile.email}</div>
                    </div>

                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>First Name</label>
                        <div style={styles.field}>{profile.firstName}</div>
                    </div>

                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Last Name</label>
                        <div style={styles.field}>{profile.lastName}</div>
                    </div>
                </div>
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
        flexDirection: 'row',
        gap: '80px',
        minHeight: '400px',
    },
    leftColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    profilePic: {
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        backgroundColor: '#f2f2f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px',
    },
    profileImg: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    picLabel: {
        fontSize: '15px',
        color: '#111',
        textAlign: 'center',
        lineHeight: '1.4',
    },
    infoSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        flex: 1,
        marginTop: '20px',
        maxWidth: '800px', // prevent the form fields from being overly long on ultrawide screens
    },
    fieldGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        fontSize: '16px',
        color: '#111',
        fontWeight: '400',
    },
    field: {
        backgroundColor: '#f2f2f2',
        borderRadius: '8px',
        padding: '12px 14px',
        fontSize: '16px',
        color: '#333',
        minHeight: '24px',
        width: '100%',
        boxSizing: 'border-box',
    },
    logoutBtn: {
        backgroundColor: '#2a2a8c',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 24px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
    },
};