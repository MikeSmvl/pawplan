import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import "@/styles/glow.css"; // Custom CSS file for animation

interface GlowButtonProps {
    children: ReactNode;
    onClick?: () => void;
}

export default function GlowButton({ children, ...props }: GlowButtonProps) {
    return (
        <div className="relative inline-flex group">
            <div
                className="glow-effect absolute -inset-px opacity-70 rounded-xl blur-sm group-hover:opacity-100 group-hover:-inset-px group-hover:duration-1000"
            ></div>
            <Button
                className="relative inline-flex items-center justify-center focus:ring-gray-900 bg-background duration-200 rounded-xl"
                variant="ghost"
                {...props}
            >
                {children}
            </Button>
        </div>
    );
}