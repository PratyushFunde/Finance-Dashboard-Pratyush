import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface Props {
    title?: string;
    value?: string | number;   // ✅ ADD THIS
    children?: React.ReactNode;
    className?: string;
    animate?: boolean;
    animateKey?: string | number;
}

const Card = ({ title, value, children, className, animate, animateKey }: Props) => {
    return (
        <div className={`bg-(--card) border border-(--border) rounded-2xl p-4 shadow-sm ${className}`} >
            {title && (
                <p className="text-sm text-(--text-muted) mb-1">
                    {title}
                </p>
            )}

            {/* Value (for summary cards) */}
            {value && (
                <AnimatePresence mode="wait">
                    <motion.h2
                        key={value} // 🔥 important for re-animation
                        initial={animate ? { opacity: 0, y: 20 } : false}
                        animate={animate ? { opacity: 1, y: 0 } : {}}
                        exit={animate ? { opacity: 0, y: -10 } : {}}
                        transition={{ duration: 0.3 }}
                        className="text-2xl font-bold"
                    >
                        {value}
                    </motion.h2>
                </AnimatePresence>
            )}


            {!value && children && (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={animateKey ?? title}
                        initial={animate ? { opacity: 0, y: 20 } : false}
                        animate={animate ? { opacity: 1, y: 0 } : {}}
                        exit={animate ? { opacity: 0, y: -10 } : {}}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
};

export default Card;