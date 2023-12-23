import React, { useEffect, useState } from 'react';
import './Progressbar.css';

const Progressbar = ({index, activeIndex, duration}) => {
    const isActive = index === activeIndex;
    const [progress, setProgress] = useState(0); // Initialize progress state

    useEffect(() => {
        if (isActive) {
            const intervalId = setInterval(() => {
                setProgress(prev => {
                    if (prev < 100) {
                        return prev + 1;
                    } else {
                        clearInterval(intervalId);
                        return prev;
                    }
                });
            }, duration / 100);

            return () => clearInterval(intervalId); // Clear interval on unmount
        }
    }, [duration, isActive]);

    useEffect(() => {
        if (!isActive) {
            setProgress(0); // Reset progress when becoming inactive
        }
    }, [isActive]);

    return (
        <div className={`progress-bar-container ${isActive ? "active" : ""}`}>
            <div className={`progress-bar ${isActive ? "" : "hidden"}`} style={{ width: `${progress}%` }}>
            </div>
        </div>
    );
}

export default Progressbar;
