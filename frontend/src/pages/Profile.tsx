import { Info } from "lucide-react";
import { useParams } from "react-router-dom";

import FlashcardSetCard from "@/components/FlashcardSetCard";
import { useAuth, useUserProfile } from "@/hooks/useAuth";
import { useOwnFlashcardSets, usePublicFlashcardSetsByUser } from "@/hooks/useFlashcards";

export default function Profile() {
  const { username } = useParams<{ username?: string }>();
  const { user: currentUser } = useAuth();

  // If no username param, we're viewing our own profile
  const isOwnProfile = !username || username === currentUser?.username;
  const targetUsername = username || currentUser?.username || "";

  // Data fetching for the target profile
  const { data: profileData, isLoading: isProfileLoading } = useUserProfile(
    isOwnProfile ? "" : targetUsername,
  );
  const { data: ownSets, isLoading: isOwnSetsLoading } = useOwnFlashcardSets();
  const { data: publicSetsByUser, isLoading: isPublicSetsLoading } = usePublicFlashcardSetsByUser(
    isOwnProfile ? "" : targetUsername,
  );

  // Derived data based on whether it's our own profile or someone else's
  const user = isOwnProfile ? currentUser : profileData;
  const sets = isOwnProfile ? ownSets || [] : publicSetsByUser || [];
  const isLoading = isOwnProfile ? isOwnSetsLoading : isProfileLoading || isPublicSetsLoading;
  const isPrivate = !isOwnProfile && profileData === null && !isProfileLoading;
  const isNotFound = !isOwnProfile && !profileData && !isProfileLoading && !isPrivate;

  const publicSets = sets.filter((set) => set.visibility === "PUBLIC");
  const privateSets = sets.filter((set) => set.visibility === "PRIVATE");
  const totalCards = sets.reduce((acc, set) => acc + (set.flashcards?.length || 0), 0);

  if (isNotFound && !isLoading) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <h1 className="text-heading text-3xl font-bold">User Not Found</h1>
        <p className="text-text text-lg">The user @{targetUsername} does not exist.</p>
      </div>
    );
  }

  if (isPrivate && !isLoading) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <h1 className="text-heading text-3xl font-bold">@{targetUsername}</h1>
        <p className="text-text text-lg">This profile is private.</p>
      </div>
    );
  }

  if (!targetUsername && !isLoading) {
    return <div className="p-10 text-center">Please log in to view your profile.</div>;
  }

  return (
    <div className="flex flex-col gap-8 px-6 py-10">
      <h1 className="text-heading text-left text-3xl font-bold">
        {isOwnProfile ? "My Profile" : `@${targetUsername}'s Profile`}
      </h1>

      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-3">
        {/* Left: Profile Info Card */}
        <div className="bg-surface border-border flex w-full flex-col rounded-xl border p-8 text-left shadow-sm md:col-span-1">
          <div className="mb-8">
            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <label className="text-heading text-xs font-bold tracking-wider uppercase">
                  Handle
                </label>
                <div className="text-text text-xl font-bold">
                  @{user?.username || targetUsername}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-heading text-xs font-bold tracking-wider uppercase">
                  Join Date
                </label>
                <div className="text-text text-lg">
                  {user?.createdAt
                    ? new Intl.DateTimeFormat(undefined, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(user.createdAt))
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>

          <div className="border-border grid grid-cols-2 gap-4 border-t pt-6">
            <div className="flex flex-col gap-1">
              <label className="text-heading text-xs font-bold tracking-wider uppercase">
                {isOwnProfile ? "Total Sets" : "Public Sets"}
              </label>
              <div className="text-text text-xl font-bold">
                {isOwnProfile ? sets.length : publicSets.length}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-heading text-xs font-bold tracking-wider uppercase">
                Total Cards
              </label>
              <div className="text-text text-xl font-bold">{totalCards}</div>
            </div>
          </div>
        </div>

        {/* Right: Public Sets */}
        <div className="space-y-12 md:col-span-2">
          <div>
            <div className="group relative mb-6 flex items-center gap-2">
              <h3 className="text-heading m-0 text-xl font-bold tracking-wide whitespace-nowrap uppercase">
                {isOwnProfile ? "My Public Sets" : "Public Sets"}
              </h3>
              {isOwnProfile && (
                <>
                  <div className="text-text hover:text-primary cursor-help transition-colors">
                    <Info size={16} />
                  </div>
                  <div className="bg-primary text-surface absolute bottom-full left-0 mb-2 hidden w-64 rounded-md px-3 py-2 text-xs font-medium shadow-lg group-hover:block">
                    Your profile is only visible to other users if you have at least one public
                    flashcard set.
                    <div className="bg-primary absolute top-full left-4 h-2 w-2 -translate-y-1/2 rotate-45" />
                  </div>
                </>
              )}
            </div>

            {isLoading ? (
              <div className="text-text animate-pulse">Loading sets...</div>
            ) : publicSets.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {publicSets.map((set) => (
                  <FlashcardSetCard key={set.id} {...set} />
                ))}
              </div>
            ) : (
              <div className="text-text border-border bg-surface rounded-xl border border-dashed p-12 text-center">
                {isOwnProfile
                  ? "You haven't made any of your sets public yet."
                  : `${targetUsername} hasn't made any sets public yet.`}
              </div>
            )}
          </div>

          {isOwnProfile && privateSets.length > 0 && (
            <div>
              <h3 className="text-heading mb-6 text-xl font-bold tracking-wide uppercase">
                My Private Sets
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {privateSets.map((set) => (
                  <FlashcardSetCard key={set.id} {...set} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
