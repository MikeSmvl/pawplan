import React, { useState, useRef, useEffect } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Loader2 } from "lucide-react";

const commonDogBehaviors = [
    "Excessive barking",
    "Pulling on leash",
    "Jumping on people",
    "Not coming when called",
    "Chewing furniture",
    "Digging holes",
    "Resource guarding",
    "Reactivity to other dogs",
    "Counter surfing",
    "Separation anxiety",
    "Marking territory indoors",
    "Begging for food",
    "Aggressive behavior",
    "Not following basic commands",
    "Door dashing",
    "Chasing cars/bikes",
    "Excessive whining",
    "Poor leash manners",
    "Food aggression",
    "Nipping/mouthing",
];

interface AutocompleteInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onValueChange: (value: string) => void;
}

const AutocompleteInput = React.forwardRef<HTMLInputElement, AutocompleteInputProps>(
    ({ className, onValueChange, ...props }, ref) => {
        const [open, setOpen] = useState(false);
        const [inputValue, setInputValue] = useState("");
        const [behaviors, setBehaviors] = useState<string[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);
        const containerRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            let mounted = true;

            const loadBehaviors = async () => {
                try {
                    setLoading(true);
                    setError(null);
                    // const fetchedBehaviors = await behaviorService.getAllBehaviors();
                    if (mounted) {
                        setBehaviors(commonDogBehaviors); // Ensure we always have an array
                    }
                } catch (error) {
                    console.error('Error loading behaviors:', error);
                    if (mounted) {
                        setError('Failed to load behaviors');
                        setBehaviors([]); // Set empty array on error
                    }
                } finally {
                    if (mounted) {
                        setLoading(false);
                    }
                }
            };

            loadBehaviors();

            return () => {
                mounted = false;
            };
        }, []);

        const handleSelect = (behavior: string) => {
            setInputValue(behavior);
            onValueChange(behavior);
            setOpen(false);
        };

        const filteredBehaviors = commonDogBehaviors.filter(behavior =>
            behavior.toLowerCase().includes(inputValue.toLowerCase())
        );

        return (
            <div ref={containerRef} className="relative w-full">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <input
                            type="text"
                            ref={ref}
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                onValueChange(e.target.value);
                                setOpen(true);
                            }}
                            className={cn(
                                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                className
                            )}
                            {...props}
                        />
                    </PopoverTrigger>
                    <PopoverContent
                        className="p-0"
                        align="start"
                        style={{
                            width: containerRef.current?.offsetWidth || 'auto'
                        }}>
                        <Command>
                            {loading ? (
                                <CommandEmpty className="p-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Loading behaviors...</span>
                                    </div>
                                </CommandEmpty>
                            ) : error ? (
                                <CommandEmpty className="p-4 text-red-500">
                                    {error}
                                </CommandEmpty>
                            ) : filteredBehaviors.length === 0 ? (
                                <CommandEmpty className="p-4">
                                    No behaviors found
                                </CommandEmpty>
                            ) : (
                                <CommandGroup className="max-h-64 overflow-auto">
                                    <CommandList>
                                        {behaviors.map((behavior) => (
                                            <CommandItem
                                                key={behavior}
                                                onSelect={() => handleSelect(behavior)}
                                                className="flex items-center gap-2"
                                            >
                                                {behavior === inputValue && <Check className="h-4 w-4" />}
                                                {behavior}
                                            </CommandItem>
                                        ))}
                                    </CommandList>
                                </CommandGroup>
                            )}
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        );
    }
);

AutocompleteInput.displayName = "AutocompleteInput";

export { AutocompleteInput };