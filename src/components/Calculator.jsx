import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";

function Calculator() {
    const [preState, setPreState] = useState("")
    const [curState, setCurState] = useState("")
    const [input, setInput] = useState("0")
    const [operator, setOperator] = useState(null)
    const [total, setTotal] = useState(false)

    function inputNum(event) {
        if (curState.includes(".") && event.target.innerText === ".") return;

        if (total) {
            setPreState("")
        }

        curState ? setCurState(pre => pre + event.target.innerText) : setCurState(event.target.innerText)
        setTotal(false);
    }

    useEffect(() => {
        setInput(curState);
    }, [curState]);

    useEffect(() => {
        setInput("0");
    }, []);

    function operatorType(event) {
        setTotal(false);
        setOperator(event.target.innerText)
        if (curState === "") return;
        if (preState !== "") {
            equals();
        } else {
            setPreState(curState);
            setCurState("");
        }
    }

    function equals(event) {
        if (event.target.innerText === "=") {
            setTotal(true);
        }

        let cal
        switch (operator) {
            case "/":
                cal = String(parseFloat(preState) / parseFloat(curState));
                break;

            case "+":
                cal = String(parseFloat(preState) + parseFloat(curState));
                break;

            case "x":
                cal = String(parseFloat(preState) * parseFloat(curState));
                break;

            case "-":
                cal = String(parseFloat(preState) - parseFloat(curState));
                break;

            default:
                break;
        }
        setInput("");
        setPreState(cal);
        setCurState("");
    }


    function minusPlus() {
        if (curState.charAt(0) === "-") {
            setCurState(curState.substring(1));
        } else {
            setCurState("-" + curState);
        }
    }

    function percent() {
        preState
            ? setCurState(String((parseFloat(curState) / 100) * preState))
            : setCurState(String(parseFloat(curState) / 100));
    }

    function reset() {
        setInput("0");
        setPreState("");
        setCurState("");
    }

    return (
        <div className="container">
            <div className="wrapper">
                <div className="screen">
                    {
                        input !== "" || input === "0" ? (
                            <NumberFormat
                                value={input}
                                displayType={'text'}
                                thousandSeparator={true}
                            />) : (
                            <NumberFormat
                                value={preState}
                                displayType={'text'}
                                thousandSeparator={true}
                            />)
                    }
                </div>
                <div className="btn light-gray" onClick={reset}>AC</div>
                <div className="btn light-gray" onClick={percent}>%</div>
                <div className="btn light-gray" onClick={minusPlus}>+/-</div>
                <div className="btn orange" onClick={operatorType}>/</div>
                <div className="btn " onClick={inputNum}>7</div>
                <div className="btn " onClick={inputNum}>8</div>
                <div className="btn " onClick={inputNum}>9</div>
                <div className="btn orange" onClick={operatorType}>x</div>
                <div className="btn " onClick={inputNum}>4</div>
                <div className="btn " onClick={inputNum}>5</div>
                <div className="btn " onClick={inputNum}>6</div>
                <div className="btn orange" onClick={operatorType}>+</div>
                <div className="btn " onClick={inputNum}>1</div>
                <div className="btn " onClick={inputNum}>2</div>
                <div className="btn " onClick={inputNum}>3</div>
                <div className="btn orange" onClick={operatorType}>-</div>
                <div className="btn zero" onClick={inputNum}>0</div>
                <div className="btn " onClick={inputNum}>.</div>
                <div className="btn " onClick={equals}>=</div>
            </div>
        </div>
    );
}

export default Calculator;