import { Metadata } from "next";
import { Navbar } from "@/components/browse/navbar";

interface BrowseLayoutProps {
    children : React.ReactNode
}

export const metadata: Metadata = {
    title: 'Home | Netflix Official Site',
    description: 'Generated by create next app',
}

const BrowseLayout = ({
    children
} : BrowseLayoutProps) => {
    return (
        <div className="min-h-full bg-neutral-900">
            <Navbar/>
            {children}
        </div>
    );
}

export default BrowseLayout;