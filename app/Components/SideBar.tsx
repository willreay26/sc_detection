"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-primary text-primaryText h-screen p-4">
            <h1 className="text-xl font-bold mb-6">Combining metadata and image in AI model for diagnostic imaging</h1>
            <nav>
                <ul>
                    <li className="mb-4">
                        <Link
                            href="/"
                            className={`block p-2 rounded ${pathname === "/" ? "bg-button font-bold" : "hover:bg-primaryText hover:text-white"
                                }`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/image"
                            className={`block p-2 rounded ${pathname === "/image" ? "bg-button font-bold" : "hover:bg-primaryText hover:text-white"
                                }`}
                        >
                            Image
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/metadata"
                            className={`block p-2 rounded ${pathname === "/metadata" ? "bg-button font-bold" : "hover:bg-primaryText hover:text-white"
                                }`}
                        >
                            Patient Metadata
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/prediction"
                            className={`block p-2 rounded ${pathname === "/prediction" ? "bg-button" : "hover:bg-primaryText hover:text-white"
                                }`}
                        >
                            Image
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
