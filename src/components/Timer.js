import React, { useEffect, useRef, useState } from "react";

export default function Timer() {
    const [running, setRunning] = useState(false);
    const [stopped, setStopped] = useState(false);
    const [pause, setPause] = useState(false);
    const [workTime, setWorkTime] = useState(10 * 1000);
    const [breakTime, setBreakTime] = useState(5 * 1000);
    const [remainingTime, setRemainingTime] = useState(workTime);
    const timerInterval = useRef();

    function msToMS(ms) {
        let seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    }

    useEffect(() => {
        if (remainingTime <= 0) {
            clearInterval(timerInterval.current);
            setRemainingTime(pause ? workTime : breakTime)
            startTimer()
            setPause(prev => !prev)
        }
    }, [remainingTime]);

    const startTimer = () => {
        setRunning(true);
        setStopped(false)
        timerInterval.current = setInterval(() => {
            setRemainingTime((prev) => (prev -= 10));
        }, 10);
    };

    const stopTimer = () => {
        setStopped(true);
        clearInterval(timerInterval.current);
    };

    const resetTimer = () => {};

    return (
        <div className="d-flex justify-content-center">
            <div
                className={`d-flex flex-column align-items-center ${pause ? 'bg-danger' : 'bg-secondary'} rounded m-2`}
                style={{ height: 200, width: "75%" }}
            >
                <h2 className="display-3 mt-3">{msToMS(remainingTime)}</h2>
                <div className="form-check mt-3">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="auto-start"
                    />
                    <label className="form-check-label text-light">
                        Enable cycle auto-start
                    </label>
                </div>
                <div>
                    {running ? (
                        <div className="d-flex flex-row gap-3">
                            {stopped ? (
                                <button
                                    onClick={startTimer}
                                    className="btn btn-outline-light btn-lg"
                                    style={{ width: 150 }}
                                >
                                    Resume
                                </button>
                            ) : (
                                <button
                                    onClick={stopTimer}
                                    className="btn btn-outline-light btn-lg"
                                    style={{ width: 150 }}
                                >
                                    Stop
                                </button>
                            )}
                            <button
                                onClick={resetTimer}
                                className="btn btn-outline-light btn-lg"
                                style={{ width: 150 }}
                            >
                                Reset
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={startTimer}
                            className="btn btn-outline-light btn-lg"
                            style={{ width: 300 }}
                        >
                            Start
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
