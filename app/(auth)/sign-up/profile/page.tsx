import { ProfileForm } from "@/components/auth/profile-form";

const ProfilePage = () => {
    return (
        <div className="max-w-md px-6 space-y-4 my-10">
            <h2 className="text-xs font-semibold text-zinc-800">STEP 3 OF 3</h2>
            <p className="text-3xl font-bold text-zinc-700">Create your profile to complete paper work</p>
            <ProfileForm/>
        </div>
    );
}

export default ProfilePage;