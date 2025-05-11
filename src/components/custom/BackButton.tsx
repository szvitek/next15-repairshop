"use client"
import React, {ButtonHTMLAttributes} from 'react';
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

type Props = {
    title: string,
    className?: string,
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
} & ButtonHTMLAttributes<HTMLButtonElement>

function BackButton({title, className, variant, ...props}: Props) {
    const router = useRouter();
    return (
        <Button
            variant={variant}
            className={className}
            onClick={() => router.back()}
            title={title}
        >
            {title}
        </Button>
    );
}

export default BackButton;