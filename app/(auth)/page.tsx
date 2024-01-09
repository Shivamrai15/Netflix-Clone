import { LandingForm } from "@/components/auth/landing-form";
import { Description } from "./_components/decription";
import { Header } from "./_components/header"

const LandingPage = () => {
    return (
        <section className="h-full bg-[url('/Background.jpg')] bg-cover bg-no-repeat bg-bottom">
            <div className="h-full w-full bg-gradient-to-b from-black/90 from-0% via-yellow-950/40 via-60% to-black/90 to-100% bg-opacity-90">
                <div className="mx-4 md:mx-40">
                    <Header/>
                    <Description/>
                    <LandingForm/>
                </div>
            </div>
        </section>
    )
}

export default LandingPage;