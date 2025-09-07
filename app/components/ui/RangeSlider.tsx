"use client";

import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface RangeSliderProps {
  min: number;
  max: number;
  initialMin: number;
  initialMax: number;
  onChange: (value: { min: number; max: number }) => void;
  step?: number; // <-- LA MIRA HA SIDO AÑADIDA A LOS PLANOS
  prefix?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, initialMin, initialMax, onChange, step = 1, prefix = '' }) => {
  const [values, setValues] = useState([initialMin, initialMax]);

  useEffect(() => {
    setValues([initialMin, initialMax]);
  }, [initialMin, initialMax]);

  const handleSliderChange = (newValues: number | number[]) => {
    if (Array.isArray(newValues)) {
      setValues(newValues);
      onChange({ min: newValues[0], max: newValues[1] });
    }
  };

  return (
    <div className="w-full">
      <Slider
        range
        min={min}
        max={max}
        step={step}
        value={values}
        onChange={handleSliderChange}
        allowCross={false}
        styles={{
          rail: { backgroundColor: '#3a3a3a', height: 4 },
          track: { backgroundColor: '#a88b57', height: 4 },
          handle: {
            borderColor: '#a88b57',
            backgroundColor: '#1a1a1a',
            opacity: 1,
            borderWidth: 2,
            height: 16,
            width: 16,
            marginTop: -6,
          },
        }}
      />
      <div className="flex justify-between text-xs text-bodega-stone mt-2">
        <span>{prefix}{values[0]}</span>
        <span>{prefix}{values[1]}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
