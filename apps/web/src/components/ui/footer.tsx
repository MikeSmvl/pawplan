import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="flex-1 min-w-0 pr-4"> {/* Add min-w-0 to allow truncation and pr-4 for spacing */}
                    <p className="pl-6 font-bold text-sm text-muted-foreground truncate">
                        Built with Next.js, Tailwind CSS, and shadcn/ui
                    </p>
                </div>
                <div className="flex items-center space-x-4 flex-shrink-0"> {/* Add flex-shrink-0 to prevent button shrinking */}
                    <Button variant="ghost" size="icon" asChild>
                        <a
                            href="https://github.com/mikesmvl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-75 hover:opacity-100 transition-opacity"
                        >
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a
                            href="https://www.linkedin.com/in/mikaelsamvelian/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-75 hover:opacity-100 transition-opacity"
                        >
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                    </Button>
                </div>
            </div >
        </footer >
    );
};

export default Footer;