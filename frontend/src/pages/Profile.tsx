import { useState } from "react";

export default function Profile() {
  const [profile] = useState({
    email: "",
    firstName: "",
    lastName: "",
    profilePicture: null,
  });

  const handleLogout = () => {};

  return (
    <div className="box-border flex min-h-screen w-full flex-col items-stretch p-7.5 text-left">
      <h1 className="text-primary mt-5 mb-5 justify-self-start text-[30px] font-medium">Profile</h1>

      <div className="bg-surface box-border flex min-h-100 w-full flex-row gap-20 rounded-xl p-[40px_50px] shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-start justify-between">
          <div className="mt-2.5 flex h-45 w-45 items-center justify-center rounded-full bg-gray-200">
            {profile.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span className="text-center text-[15px] leading-[1.4] text-[#111]">
                Profile
                <br />
                Picture
              </span>
            )}
          </div>
          <button
            className="bg-primary cursor-pointer rounded-lg border-none px-6 py-2 text-sm font-semibold text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Profile Info */}
        <div className="mt-5 flex max-w-200 flex-1 flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-base font-normal text-[#111]">Email</label>
            <div className="box-border min-h-6 w-full rounded-lg bg-gray-100 px-3.5 py-3 text-base text-[#333]">
              {profile.email}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base font-normal text-[#111]">First Name</label>
            <div className="box-border min-h-6 w-full rounded-lg bg-gray-100 px-3.5 py-3 text-base text-[#333]">
              {profile.firstName}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base font-normal text-[#111]">Last Name</label>
            <div className="box-border min-h-6 w-full rounded-lg bg-gray-100 px-3.5 py-3 text-base text-[#333]">
              {profile.lastName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
