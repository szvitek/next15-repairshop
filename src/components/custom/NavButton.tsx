import React from 'react';
import {Button} from "@/components/ui/button";
import {LucideIcon} from "lucide-react";
import Link from "next/link";

type Props = {
    icon: LucideIcon,
    label: string,
    href?: string,
}

function NavButton({icon: Icon, label, href}: Props) {
    return (
        <Button
            variant="ghost"
            size="icon"
            aria-label={label}
            title={label}
            className="rounded-full"
            asChild
        >
            {href ? (
                <Link href={href}>
                    <Icon/>
                </Link>
            ) : (
                <Icon/>
            )}
        </Button>
    );
}

export default NavButton;