"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-primary text-primaryText min-h-screen p-4">
            <h1 className="text-xl font-bold mb-6">Combining metadata and image in AI model for diagnostic imaging</h1>
            <nav>
                <ul className="flex flex-col gap-4">
                    <li className="">
                        <Link
                            href="/"
                            className={`block p-2 rounded ${pathname === "/" ? "bg-secondary text-primary font-bold" : "bg-button font-normal hover:text-primary  hover:bg-secondary"
                                }`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/imageSection"
                            className={`block p-2 rounded ${pathname === "/image" ? "bg-secondary text-primary font-bold" : "bg-button font-normal hover:text-primary  hover:bg-secondary"
                                }`}
                        >
                            Image
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/metadataSection"
                            className={`block p-2 rounded ${pathname === "/metadata" ? "bg-secondary text-primary font-bold" : "bg-button font-normal hover:text-primary  hover:bg-secondary"
                                }`}
                        >
                            Patient Metadata
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/prediction"
                            className={`block p-2 rounded ${pathname === "/prediction" ? "bg-secondary text-primary font-bold" : "bg-button font-normal hover:text-primary hover:bg-secondary"
                                }`}
                        >
                            Prediction
                        </Link>
                    </li>
                </ul>
            </nav >
        </div >
    );
}
