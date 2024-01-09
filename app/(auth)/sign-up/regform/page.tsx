import { RegistrationForm } from "@/components/auth/registration-form";

const RegistrationPage = () => {
    return (
        <div className="max-w-md px-6 space-y-3 my-10">
            <h2 className="text-xs font-semibold text-zinc-800">STEP 2 OF 3</h2>
            <p className="text-3xl font-bold text-zinc-700">Create a password to start your membership</p>
            <div>
                <p className="text-lg text-zinc-800">Just a few more steps and you're done!</p>
                <p className="text-lg text-zinc-800">We hate paperwork, too.</p>
            </div>
            <RegistrationForm/>
        </div>
    );
}

export default RegistrationPage;