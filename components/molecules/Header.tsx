import { motion } from 'framer-motion';
import React from 'react';
import {Bell, UserCircle, Landmark} from 'lucide-react';

export default function Header() {
    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
            {/* Logo on the far left */}
            <div className="flex items-center gap-2">
                <Landmark className="w-7 h-7 text-teal-400" />
                <span className="text-lg font-bold">Expensave</span>
            </div>
            {/* Notification and Profile on the far right */}
            <div className="flex items-center gap-4">
                <button className="p-2 rounded-xl hover:bg-teal-50/10 transition-colors relative">
                    <Bell className="w-5 h-5 text-white" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
                </button>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-sm font-semibold text-white">John Doe</p>
                        <p className="text-xs text-slate-300">john@example.com</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-xl flex items-center justify-center text-white font-semibold">
                        JD
                    </div>
                </div>
            </div>
        </header>
    );
}
