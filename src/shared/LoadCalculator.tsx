import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Input from "./util/Inputs";
import Button from "./util/Button";

const LoadCalculator = () => {
  const [power, setPower] = useState<number | string>(""); // in watts
  const [voltage, setVoltage] = useState<number | string>(""); // in volts
  const [current, setCurrent] = useState<number | string>(""); // in amps
  const [resistance, setResistance] = useState<number | string>(""); // in ohms
  
  const [calculatedPower, setCalculatedPower] = useState<number | string>("");
  const [calculatedCurrent, setCalculatedCurrent] = useState<number | string>("");
  const [calculatedVoltage, setCalculatedVoltage] = useState<number | string>("");
  const [calculatedResistance, setCalculatedResistance] = useState<number | string>("");

  const calculateLoad = () => {
    // Reset all calculated values before calculation
    setCalculatedPower("");
    setCalculatedCurrent("");
    setCalculatedVoltage("");
    setCalculatedResistance("");

    // Basic validation to ensure input values are numbers
    if (power && voltage && current && resistance) {
      alert("Please leave one field empty to calculate the value.");
      return;
    }

    // If Power is missing, calculate it using Voltage and Current
    if (!power && voltage && current) {
      const p = Number(voltage) * Number(current);
      setCalculatedPower(p);
    }

    // If Current is missing, calculate it using Power and Voltage
    if (!current && power && voltage) {
      const i = Number(power) / Number(voltage);
      setCalculatedCurrent(i);
    }

    // If Voltage is missing, calculate it using Power and Current
    if (!voltage && power && current) {
      const v = Number(power) / Number(current);
      setCalculatedVoltage(v);
    }

    // If Resistance is missing, calculate it using Voltage and Current (Ohm's Law)
    if (!resistance && voltage && current) {
      const r = Number(voltage) / Number(current);
      setCalculatedResistance(r);
    }
  };

  return (
    <div className="p-6 bg-blue-200 min-h-screen flex justify-center items-center">
      <Card className="w-[900px] p-6 bg-white shadow-lg rounded-xl">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Electrical Load Calculator</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Power (W)</label>
              <Input
                type="number"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                name="power"
                placeholder="Enter power in watts"
              />
            </div>
            <div>
              <label>Voltage (V)</label>
              <Input
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                name="voltage"
                placeholder="Enter voltage in volts"
              />
            </div>
            <div>
              <label>Current (A)</label>
              <Input
                type="number"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                name="current"
                placeholder="Enter current in amps"
              />
            </div>
            <div>
              <label>Resistance (Ω)</label>
              <Input
                type="number"
                value={resistance}
                onChange={(e) => setResistance(e.target.value)}
                name="resistance"
                placeholder="Enter resistance in ohms"
              />
            </div>
          </div>

          <Button className="mt-4" onClick={calculateLoad} title="Calculate" />

          <div className="mt-4">
            {calculatedPower && (
              <p className="text-lg font-semibold">Calculated Power: {calculatedPower} W</p>
            )}
            {calculatedCurrent && (
              <p className="text-lg font-semibold">Calculated Current: {calculatedCurrent} A</p>
            )}
            {calculatedVoltage && (
              <p className="text-lg font-semibold">Calculated Voltage: {calculatedVoltage} V</p>
            )}
            {calculatedResistance && (
              <p className="text-lg font-semibold">Calculated Resistance: {calculatedResistance} Ω</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadCalculator;
