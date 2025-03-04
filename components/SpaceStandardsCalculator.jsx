"use client"

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';

const SpaceStandardsCalculator = () => {
  // State management
  const [bedrooms, setBedrooms] = useState(1);
  const [bedSpaces, setBedSpaces] = useState(2);
  const [storeys, setStoreys] = useState(1);
  const [percentageModifier, setPercentageModifier] = useState(100);
  const [useMetric, setUseMetric] = useState(true);

  // Space standards data (m²)
  const spaceStandards = {
    1: {
      1: { 1: 39 },
      2: { 1: 50, 2: 58 }
    },
    2: {
      3: { 1: 61, 2: 70 },
      4: { 1: 70, 2: 79 }
    },
    3: {
      4: { 1: 74, 2: 84, 3: 90 },
      5: { 1: 86, 2: 93, 3: 99 },
      6: { 1: 95, 2: 102, 3: 108 }
    },
    4: {
      5: { 1: 90, 2: 97, 3: 103 },
      6: { 1: 99, 2: 106, 3: 112 },
      7: { 1: 108, 2: 115, 3: 121 },
      8: { 1: 117, 2: 124, 3: 130 }
    },
    5: {
      6: { 1: 103, 2: 110, 3: 116 },
      7: { 1: 112, 2: 119, 3: 125 },
      8: { 1: 121, 2: 128, 3: 134 }
    },
    6: {
      7: { 1: 116, 2: 123, 3: 129 },
      8: { 1: 125, 2: 132, 3: 138 }
    }
  };

  // Storage requirements (m²)
  const storageRequirements = {
    1: { 1: 1.0, 2: 1.5 },
    2: 2.0,
    3: 2.5,
    4: 3.0,
    5: 3.5,
    6: 4.0
  };

  // Calculate valid bed spaces for selected number of bedrooms
  const validBedSpaces = useMemo(() => {
    const spaces = [];
    if (bedrooms === 1) spaces.push(1, 2);
    else if (bedrooms === 2) spaces.push(3, 4);
    else if (bedrooms === 3) spaces.push(4, 5, 6);
    else if (bedrooms === 4) spaces.push(5, 6, 7, 8);
    else if (bedrooms === 5) spaces.push(6, 7, 8);
    else if (bedrooms === 6) spaces.push(7, 8);
    return spaces;
  }, [bedrooms]);

  // Calculate valid storeys for selected configuration
  const validStoreys = useMemo(() => {
    try {
      return Object.keys(spaceStandards[bedrooms][bedSpaces]).map(Number);
    } catch (e) {
      return [1];
    }
  }, [bedrooms, bedSpaces]);

  // Calculate required space and storage
  const calculations = useMemo(() => {
    try {
      const baseSpace = spaceStandards[bedrooms][bedSpaces][storeys];
      const storage = bedrooms === 1 ? storageRequirements[1][bedSpaces] : storageRequirements[bedrooms];
      const adjustedSpace = baseSpace * (percentageModifier / 100);

      if (useMetric) {
        return {
          totalSpace: adjustedSpace.toFixed(1),
          storageSpace: storage.toFixed(1)
        };
      } else {
        return {
          totalSpace: (adjustedSpace * 10.764).toFixed(1),
          storageSpace: (storage * 10.764).toFixed(1)
        };
      }
    } catch (e) {
      return {
        totalSpace: "N/A",
        storageSpace: "N/A"
      };
    }
  }, [bedrooms, bedSpaces, storeys, percentageModifier, useMetric]);

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>UK Nationally Described Space Standards Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Number of Bedrooms */}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="bedrooms">Number of Bedrooms</label>
            <select 
              id="bedrooms"
              className="w-full p-2 rounded-md border border-gray-300 bg-white text-black text-sm" 
              value={bedrooms}
              onChange={(e) => setBedrooms(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Bedroom' : 'Bedrooms'}
                </option>
              ))}
            </select>
          </div>

          {/* Number of Bed Spaces */}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="bedSpaces">Number of Bed Spaces</label>
            <select
              id="bedSpaces"
              className="w-full p-2 rounded-md border border-gray-300 bg-white text-black text-sm"
              value={bedSpaces}
              onChange={(e) => setBedSpaces(parseInt(e.target.value))}
            >
              {validBedSpaces.map((num) => (
                <option key={num} value={num}>
                  {num} Bed Spaces
                </option>
              ))}
            </select>
          </div>

          {/* Number of Storeys */}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="storeys">Number of Storeys</label>
            <select
              id="storeys"
              className="w-full p-2 rounded-md border border-gray-300 bg-white text-black text-sm"
              value={storeys}
              onChange={(e) => setStoreys(parseInt(e.target.value))}
            >
              {validStoreys.map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Storey' : 'Storeys'}
                </option>
              ))}
            </select>
          </div>

          {/* Size Adjustment Slider */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Size Adjustment: {percentageModifier}%</label>
            <Slider
              min={85}
              max={115}
              step={5}
              value={[percentageModifier]}
              onValueChange={(value) => setPercentageModifier(value[0])}
              className="w-full"
            />
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              checked={useMetric}
              onCheckedChange={setUseMetric}
            />
            <label className="text-sm font-medium">
              {useMetric ? 'Square Meters (m²)' : 'Square Feet (ft²)'}
            </label>
          </div>

          {/* Results */}
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">Gross Internal Area (GIA):</h3>
              <p className="text-3xl font-bold mt-2">
                {calculations.totalSpace} {useMetric ? 'm²' : 'ft²'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Includes built-in storage area
              </p>
            </div>
            
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">Built-in Storage Requirement:</h3>
              <p className="text-xl font-bold mt-2">
                {calculations.storageSpace} {useMetric ? 'm²' : 'ft²'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                This area is included within the GIA requirement above
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpaceStandardsCalculator;