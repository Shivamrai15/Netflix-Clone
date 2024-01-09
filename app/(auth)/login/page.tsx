import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
    return (
        <div className="h-full w-full bg-black md:bg-[url('/Background.jpg')] bg-cover bg-no-repeat bg-bottom">
            <div className="h-full w-full md:bg-gradient-to-b md:from-black/90 md:from-0% md:via-yellow-950/40 md:via-60% md:to-black/90 md:to-100% md:bg-opacity-90">
                <header className="px-4 py-2">
                    <Link
                        href="/"
                    >
                        <Image
                            src="/Netflix-Logo.svg"
                            alt="Logo"
                            height={200}
                            width={200}
                            className="w-28 h-20 md:w-48"
                        />
                    </Link>
                </header>
                <LoginForm/>
            </div>
        </div>
    )
}

export default LoginPage;