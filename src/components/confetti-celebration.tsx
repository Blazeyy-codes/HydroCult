"use client"

import { useEffect, useState } from "react";

const confettiColors = [
    "bg-yellow-400",
    "bg-red-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-pink-400",
    "bg-purple-400",
];

const ConfettiCelebration = () => {
    const [pieces, setPieces] = useState<any[]>([]);

    useEffect(() => {
        const newPieces = Array.from({ length: 100 }).map((_, i) => ({
            id: i,
            style: {
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
            },
            color: confettiColors[i % confettiColors.length],
        }));
        setPieces(newPieces);
    }, []);


    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            {pieces.map((piece) => (
                <div
                    key={piece.id}
                    className={`absolute top-0 w-2 h-2 rounded-full animate-fall ${piece.color}`}
                    style={piece.style}
                />
            ))}
        </div>
    );
};

export default ConfettiCelebration;

// Add this to your globals.css or a relevant stylesheet:
/*
@keyframes fall {
  0% {
    transform: translateY(-10vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(110vh) rotate(720deg);
    opacity: 0;
  }
}
.animate-fall {
  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
*/
