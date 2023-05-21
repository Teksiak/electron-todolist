import React, { useEffect, useRef, useState } from "react";

export default function Timer({ setTasks, reloadList }) {
    const workTime = 10 * 1000; // in ms
    const breakTime = 5 * 1000; // in ms

    const [startDate, setStartDate] = useState()
    const [running, setRunning] = useState(false);
    const [stopped, setStopped] = useState(false);
    const [pause, setPause] = useState(false);
    const [remainingTime, setRemainingTime] = useState(workTime);
    const [autoStart, setAutoStart] = useState(false);
    const timerInterval = useRef();

    function msToMS(ms) {
        let seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return (
            (minutes < 10 ? "0" + minutes : minutes) +
            ":" +
            (seconds < 10 ? "0" + seconds : seconds)
        );
    }

    useEffect(() => {
        if (remainingTime <= 0) {
            clearInterval(timerInterval.current);
            setRemainingTime(pause ? workTime : breakTime);
            if (autoStart) {
                startTimer();
            } else {
                setStopped(true);
            }
            if (!pause) {
                setTasks((prev) => {
                    // return prev.map((el) => {
                    //     if (!el.finished) {
                    //         el.finished = true;
                    //     }
                    //     return el;
                    // });
                    return prev.slice(1)
                });
            }
            setPause((prev) => !prev);
        }
    }, [remainingTime]);

    const startTimer = () => {
        setRunning(true);
        setStopped(false);
        setStartDate(Date.now())
    };

    useEffect(() => {
        if(running) {
            timerInterval.current = setInterval(() => {
                setRemainingTime(pause ? breakTime-(Date.now()-startDate) : workTime-(Date.now()-startDate));
            }, 1);
        }
    }, [startDate])

    const stopTimer = () => {
        setStopped(true);
        clearInterval(timerInterval.current);
    };

    const resetTimer = () => {
        setRunning(false);
        setStopped(false);
        setPause(false);
        setRemainingTime(workTime);
        clearInterval(timerInterval.current);
    };

    return (
        <div className="d-flex justify-content-center">
            <div
                className={`d-flex flex-column align-items-center ${
                    pause ? "bg-danger" : "bg-secondary"
                } rounded m-2`}
                style={{ height: 200, width: "75%" }}
            >
                <h2 className="display-3 mt-3">{msToMS(remainingTime)}</h2>
                <div className="form-check mt-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="auto-start"
                        checked={autoStart}
                        onChange={() => {
                            setAutoStart((prev) => !prev);
                        }}
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
