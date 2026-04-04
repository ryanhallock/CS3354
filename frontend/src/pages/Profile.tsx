import { useState, useEffect } from 'react';

export default function Profile() {
    const [profile, _setProfile] = useState({
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
        <div className="min-h-screen p-[30px] flex flex-col items-stretch box-border w-full text-left">
            <h1 className="text-[30px] font-medium text-primary justify-self-start mt-5 mb-5">Profile</h1>

            <div className="bg-surface rounded-xl p-[40px_50px] w-full box-border shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex flex-row gap-20 min-h-[400px]">
                <div className="flex flex-col justify-between items-start">
                    <div className="w-[180px] h-[180px] rounded-full bg-gray-200 flex items-center justify-center mt-[10px]">
                        {profile.profilePicture ? (
                            <img
                                src={profile.profilePicture}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <span className="text-[15px] text-[#111] text-center leading-[1.4]">Profile<br />Picture</span>
                        )}
                    </div>
                    <button className="bg-primary text-white border-none rounded-lg px-6 py-2 text-sm font-semibold cursor-pointer" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                {/* Profile Info */}
                <div className="flex flex-col gap-6 flex-1 mt-5 max-w-[800px]">
                    <div className="flex flex-col gap-2">
                        <label className="text-base text-[#111] font-normal">Email</label>
                        <div className="bg-gray-100 rounded-lg px-[14px] py-3 text-base text-[#333] min-h-6 w-full box-border">{profile.email}</div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-base text-[#111] font-normal">First Name</label>
                        <div className="bg-gray-100 rounded-lg px-[14px] py-3 text-base text-[#333] min-h-6 w-full box-border">{profile.firstName}</div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-base text-[#111] font-normal">Last Name</label>
                        <div className="bg-gray-100 rounded-lg px-[14px] py-3 text-base text-[#333] min-h-6 w-full box-border">{profile.lastName}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
