"use client";

import Link from "next/link";
import { CustomButton } from "@/components/atoms/CustomButton";
import { useState } from "react";

interface ModalButtonProps {
    /** Button text */
    label: string;
    /** Optional link — if provided, will navigate instead of open modal */
    href?: string;
    /** Optional modal component — if provided, will render it when clicked */
    modalComponent?: React.ReactNode;
    /** Optional extra className for styling */
  className?: string;
}

export function ModalButton({
    label,
    href,
    modalComponent,
    className,
    }: ModalButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    // handle button click
    const handleClick = () => {
        if (modalComponent) {
        setIsOpen(true);
        }
    };

    // Case 1 — if href exists, render link button
    if (href) {
        return (
        <Link href={href}>
            <CustomButton className={className}>{label}</CustomButton>
        </Link>
        );
    }

    // Case 2 — if modalComponent exists, render button + modal
    return (
        <>
        <CustomButton onClick={handleClick} className={className}>
            {label}
        </CustomButton>

        {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl p-6 shadow-lg relative w-[90%] max-w-md">
                {/* Modal content */}
                {modalComponent}

                <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                ✕
                </button>
            </div>
            </div>
        )}
        </>
    );
}
