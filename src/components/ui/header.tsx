"use client"

import * as React from "react"
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
    return (
        <header className="top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex flex-1">
                    <Link href="/hero" className="-m-1.5 p-1.5">
                        <span className="sr-only">PawPlan</span>
                        <Image
                            alt="logo"
                            src="/pawplan-high-resolution-logo-transparent.svg"
                            width={32} // equivalent to h-8 (8 * 4 = 32px)
                            height={32}
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>
                <div className="flex items-center justify-end space-x-2">
                </div>
            </div>
        </header>
    );
};

export default Header;