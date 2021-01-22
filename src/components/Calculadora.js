import React, { useState, useEffect } from "react";
import CalculadoraKey from "./CalculadoraKey";
import "./Calculadora.css";

function Calculadora() {
  const [prevValue, setPrevValue] = useState(null);
  const [nextValue, setNextValue] = useState("0");
  const [op, setOp] = useState(null);

  useEffect(() => {}, [op, nextValue, prevValue]);

  const CalculadoraOperaciones = {
    "/": (firstValue, secondValue) => firstValue / secondValue,
    "*": (firstValue, secondValue) => firstValue * secondValue,
    "+": (firstValue, secondValue) => firstValue + secondValue,
    "-": (firstValue, secondValue) => firstValue - secondValue,
    "=": (firstValue, secondValue) => secondValue,
  };

  const performOperation = () => {
    let temp = CalculadoraOperaciones[op](
      parseFloat(prevValue),
      parseFloat(nextValue)
    );
    setOp(null);
    setNextValue(String(temp));
    setPrevValue(null);
  };

  const handleNum = (number) => {
    setNextValue(nextValue === "0" ? String(number) : nextValue + number);
  };

  const insertarPunto = () => {
    if (!/\./.test(nextValue)) {
      setNextValue(nextValue + ".");
    }
  };
  const porcentaje = () => {
    setNextValue(parseFloat(nextValue) / 100);
    if (prevValue && nextValue === "") {
      setPrevValue(parseFloat(prevValue) / 100);
    }
  };
  const cambiarSigno = () => {
    setNextValue(parseFloat(nextValue) * -1);
  };
  const limpiarDatos = () => {
    setNextValue("0");
    setPrevValue(0);
  };

  const handleOperation = (value) => {
    if (Number.isInteger(value)) {
      handleNum(parseInt(value, 10));
    } else if (value in CalculadoraOperaciones) {
      if (op === null) {
        setOp(value);
        setPrevValue(nextValue);
        setNextValue("");
      }
      if (op) {
        setOp(value);
      }
      if (prevValue && op && nextValue) {
        performOperation();
      }
    } else if (value === "c") {
      limpiarDatos();
    } else if (value === "\xB1") {
      cambiarSigno();
    } else if (value === ".") {
      insertarPunto();
    } else if (value === "%") {
      porcentaje();
    }
  };

  return (
    <div className="calculadora">
      <div className="calculadora-input">
        <div className="result">{nextValue} </div>
      </div>
      <div className="calculadora-keypad">
        <div className="keys-funciones">
          <CalculadoraKey keyValue={"c"} onClick={handleOperation} />
          <CalculadoraKey keyValue={"\xB1"} onClick={handleOperation} />
          <CalculadoraKey keyValue={"%"} onClick={handleOperation} />
        </div>
        <div className="keys-operaciones">
          <CalculadoraKey keyValue={"+"} onClick={handleOperation} />
          <CalculadoraKey keyValue={"-"} onClick={handleOperation} />
          <CalculadoraKey keyValue={"*"} onClick={handleOperation} />
          <CalculadoraKey keyValue={"/"} onClick={handleOperation} />
          <CalculadoraKey keyValue={"="} onClick={handleOperation} />
        </div>
        <div className="keys-numeros">
          <CalculadoraKey keyValue={9} onClick={handleOperation} />
          <CalculadoraKey keyValue={8} onClick={handleOperation} />
          <CalculadoraKey keyValue={7} onClick={handleOperation} />
          <CalculadoraKey keyValue={6} onClick={handleOperation} />
          <CalculadoraKey keyValue={5} onClick={handleOperation} />
          <CalculadoraKey keyValue={4} onClick={handleOperation} />
          <CalculadoraKey keyValue={3} onClick={handleOperation} />
          <CalculadoraKey keyValue={2} onClick={handleOperation} />
          <CalculadoraKey keyValue={1} onClick={handleOperation} />
          <CalculadoraKey className="key-punto" keyValue={"."}  onClick={handleOperation} />
          <CalculadoraKey className="key-cero" keyValue={0} onClick={handleOperation} />
        </div>
      </div>
    </div>
  );
}

export default Calculadora;