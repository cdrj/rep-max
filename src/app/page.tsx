'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RMResult {
  avg: number;
  lom: number;
  brz: number;
  epl: number;
  may: number;
  oco: number;
  wat: number;
  lan: number;
}

interface InputState {
  weight: number;
  reps: number;
}

const RMCalculator = () => {
  const [rmResults, setRmResults] = useState<RMResult[]>([]);
  const [input, setInput] = useState<InputState>({ weight: 0, reps: 1 });

  const calculateOneRM = (n: InputState): RMResult[] => {
    if (isNaN(n.weight) || n.weight < 0 || isNaN(n.reps) || n.reps < 1) {
      setRmResults([]);
      return [];
    }

    // 当重复次数为1时，所有公式结果都应该等于输入重量
    if (n.reps === 1) {
      return [{
        avg: n.weight,
        lom: n.weight,
        brz: n.weight,
        epl: n.weight,
        may: n.weight,
        oco: n.weight,
        wat: n.weight,
        lan: n.weight
      }];
    }
    
    const result: RMResult = {
      brz: n.weight * (36 / (37 - n.reps)),
      epl: n.weight * (1 + n.reps / 30),
      lan: n.weight / (1.013 - 0.0267123 * n.reps),
      lom: n.weight * Math.pow(n.reps, 0.10),
      may: n.weight / (0.522 + 0.419 * Math.exp(-0.055 * n.reps)),
      oco: n.weight * (1 + 0.025 * n.reps),
      wat: n.weight / (0.4880 + 0.538 * Math.exp(-0.075 * n.reps)),
      avg: 0
    };
    
    result.avg = (
      result.brz + result.epl + result.lan + result.lom + 
      result.may + result.oco + result.wat
    ) / 7;

    return [result];
  };

  const calculateRMs = useCallback((oneRMResults: RMResult[], inputWeight: string, inputReps: number): RMResult[] => {
    if (!oneRMResults?.length) return [];
    
    const results = [...oneRMResults];
    const weight = parseFloat(inputWeight);
    const currentReps = inputReps;

    for (let e = 2; e <= 10; e++) {
      const rm: RMResult = {
        avg: 0,
        brz: 0,
        epl: 0,
        lan: 0,
        lom: 0,
        may: 0,
        oco: 0,
        wat: 0
      };
      
      if (currentReps === 1) {
        const oneRM = weight;
        
        rm.brz = oneRM * (37 - e) / 36;
        rm.epl = oneRM / (1 + e / 30);
        rm.lan = oneRM * (1.013 - 0.0267123 * e);
        rm.lom = oneRM / Math.pow(e, 0.10);
        rm.may = oneRM * (0.522 + 0.419 * Math.exp(-0.055 * e));
        rm.oco = oneRM / (1 + 0.025 * e);
        rm.wat = oneRM * (0.4880 + 0.538 * Math.exp(-0.075 * e));
      } else {
        rm.brz = results[0].brz * (37 - e) / 36;
        rm.epl = results[0].epl / (1 + e / 30);
        rm.lan = results[0].lan * (1.013 - 0.0267123 * e);
        rm.lom = results[0].lom / Math.pow(e, 0.10);
        rm.may = results[0].may * (0.522 + 0.419 * Math.exp(-0.055 * e));
        rm.oco = results[0].oco / (1 + 0.025 * e);
        rm.wat = results[0].wat * (0.4880 + 0.538 * Math.exp(-0.075 * e));
      }
      
      rm.avg = (
        rm.brz + rm.epl + rm.lan + rm.lom + 
        rm.may + rm.oco + rm.wat
      ) / 7;
      
      results.push(rm);
    }
    return results;
  }, []);

  const calculate = useCallback(() => {
    const oneRMResults = calculateOneRM(input);
    const allRMs = calculateRMs(oneRMResults, input.weight.toString(), input.reps);
    setRmResults(allRMs);
  }, [input, calculateRMs]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">1RM计算器</h1>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                重量 (kg)
              </label>
              <Input
                id="weight"
                type="number"
                placeholder="输入重量"
                value={isNaN(input.weight) ? '' : input.weight.toString()} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const rawValue = e.target.value;
                  if (rawValue === '') {
                    setInput(prev => ({ ...prev, weight: NaN }));
                  } else {
                    const value = parseFloat(rawValue);
                    setInput(prev => ({ ...prev, weight: isNaN(value) ? NaN : (value < 0 ? 0 : value) }));
                  }
                }}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reps">
                重复次数
              </label>
              <Select
                value={isNaN(input.reps) ? '' : input.reps.toString()} // Handle NaN for placeholder
                onValueChange={(selectedValue: string) => {
                  if (selectedValue === '') { // Should not happen with current Select setup but good practice
                    setInput(prev => ({ ...prev, reps: NaN }));
                  } else {
                    setInput(prev => ({ ...prev, reps: parseInt(selectedValue, 10) }));
                  }
                }}
              >
                <SelectTrigger id="reps" className="w-full">
                  <SelectValue placeholder="选择次数" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {rmResults.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>不同公式计算的重复最大重量 (RM) 结果。</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">RM</TableHead>
                  <TableHead className="font-semibold text-right">平均值</TableHead>
                  <TableHead className="font-semibold text-right">Epley*</TableHead>
                  <TableHead className="font-semibold text-right">Brzycki*</TableHead>
                  <TableHead className="font-semibold text-right">Lander</TableHead>
                  <TableHead className="font-semibold text-right">Lombardi</TableHead>
                  <TableHead className="font-semibold text-right">Mayhew</TableHead>
                  <TableHead className="font-semibold text-right">O&apos;Conner</TableHead>
                  <TableHead className="font-semibold text-right">Wathan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rmResults.map((rm, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {index + 1}RM
                    </TableCell>
                    <TableCell className="text-right font-medium">{Math.floor(rm.avg)}</TableCell>
                    <TableCell className="text-right">{Math.floor(rm.epl)}</TableCell>
                    <TableCell className="text-right">{Math.floor(rm.brz)}</TableCell>
                    <TableCell className="text-right">{Math.floor(rm.lan)}</TableCell>
                    <TableCell className="text-right">{Math.floor(rm.lom)}</TableCell>
                    <TableCell className="text-right">{Math.floor(rm.may)}</TableCell>
                    <TableCell className="text-right">{Math.floor(rm.oco)}</TableCell>
                    <TableCell className="text-right">{Math.floor(rm.wat)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </main>
  );
};

export default RMCalculator;