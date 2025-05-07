'use client';

import { useState, useEffect, useCallback } from 'react';

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
  const [input, setInput] = useState<InputState>({ weight: 0, reps: 0 });

  const calculateOneRM = (n: InputState): RMResult[] => {
    if (!n.weight || isNaN(n.weight)) {
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
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="weight"
                type="number"
                value={input.weight || ''}
                onChange={(e) => setInput(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reps">
                重复次数
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="reps"
                type="number"
                value={input.reps || ''}
                onChange={(e) => setInput(prev => ({ ...prev, reps: parseInt(e.target.value) || 0 }))}
              />
            </div>
          </div>
        </div>

        {rmResults.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="p-4 bg-gray-100 text-gray-900 font-semibold border border-gray-200">RM</th>
                  <th className="p-4 bg-blue-100 text-gray-900 font-semibold border border-gray-200">平均值</th>
                  <th className="p-4 bg-green-100 text-gray-900 font-semibold border border-gray-200">Epley*</th>
                  <th className="p-4 bg-green-100 text-gray-900 font-semibold border border-gray-200">Brzycki*</th>
                  <th className="p-4 bg-gray-100 text-gray-900 font-semibold border border-gray-200">Lander</th>
                  <th className="p-4 bg-gray-100 text-gray-900 font-semibold border border-gray-200">Lombardi</th>
                  <th className="p-4 bg-gray-100 text-gray-900 font-semibold border border-gray-200">Mayhew</th>
                  <th className="p-4 bg-gray-100 text-gray-900 font-semibold border border-gray-200">O&apos;Conner</th>
                  <th className="p-4 bg-gray-100 text-gray-900 font-semibold border border-gray-200">Wathan</th>
                </tr>
              </thead>
              <tbody>
                {rmResults.map((rm, index) => (
                  <tr key={index}>
                    <td className="p-4 text-center font-bold border border-gray-200 text-gray-900">
                      {index + 1}RM
                    </td>
                    <td className="p-4 text-center font-bold bg-blue-100 text-gray-900 border border-gray-200">
                      {Math.floor(rm.avg)}
                    </td>
                    <td className="p-4 text-center font-bold bg-green-100 text-gray-900 border border-gray-200">
                      {Math.floor(rm.epl)}
                    </td>
                    <td className="p-4 text-center font-bold bg-green-100 text-gray-900 border border-gray-200">
                      {Math.floor(rm.brz)}
                    </td>
                    <td className="p-4 text-center border border-gray-200 text-gray-900">{Math.floor(rm.lan)}</td>
                    <td className="p-4 text-center border border-gray-200 text-gray-900">{Math.floor(rm.lom)}</td>
                    <td className="p-4 text-center border border-gray-200 text-gray-900">{Math.floor(rm.may)}</td>
                    <td className="p-4 text-center border border-gray-200 text-gray-900">{Math.floor(rm.oco)}</td>
                    <td className="p-4 text-center border border-gray-200 text-gray-900">{Math.floor(rm.wat)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default RMCalculator;