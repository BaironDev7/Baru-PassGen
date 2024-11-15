"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { LuCopy } from 'react-icons/lu';

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(8);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const generatePassword = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characterSet = letters;
    if (includeNumbers) characterSet += numbers;
    if (includeSymbols) characterSet += symbols;

    if (!includeNumbers && !includeSymbols) {
      characterSet = letters;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterSet.length);
      generatedPassword += characterSet[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };
  
  return (
    <div className="flex relative justify-center items-center min-h-screen">
      <div className="p-4 mx-auto md:w-[400px] sm:w-[340px] border border-gray-800 rounded-lg fixed text-white">
      <h1 className="text-4xl text-center font-black mb-4 text-blue-700">Baru <span className="text-gray-400">PassGen</span></h1>
      <div className="flex flex-col gap-3">
      <label className="block mb-2">
        <h1 className="text-center mb-4">Longitud: {length}</h1>
        <div className="flex gap-3">
          <h2 className="text-slate-400">8</h2>
          <Slider defaultValue={[length]} min={8} max={32} step={1} onValueChange={(value) => setLength(value[0])} />
          <h2 className="text-slate-400">32</h2>
        </div>
      </label>
      <label className="flex items-center gap-2"><Checkbox className="text-blue-600 ring-1 ring-white checked:ring-blue-600" checked={includeNumbers} onCheckedChange={(value) => setIncludeNumbers(value as boolean)} />Números</label>
      <label className="flex items-center gap-2"><Checkbox className="text-blue-600 ring-1 ring-white checked:ring-blue-600" checked={includeSymbols} onCheckedChange={(value) => setIncludeSymbols(value as boolean)} />Simbolos</label>
      <Button className="bg-blue-600 hover:bg-blue-700" onClick={generatePassword}>Generar</Button>
      </div>
      {password ? (
        <div className="mt-4 p-2 bg-[#18181B] rounded text-white flex items-center justify-between">
        {password}
        <button onClick={handleCopy} className="ml-2 text-white hover:text-white/70">
          <LuCopy />
        </button>
      </div>
      ) : (
        <span className="mt-4 p-2 bg-[#18181B] rounded text-white flex items-center justify-between">Tu contraseña aquí...</span>
      )
      }
    </div>
    {copySuccess && (
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 bg-green-900/50 text-white py-2 px-4 rounded shadow-lg">¡Copiado con éxito!</div>
        )}
    </div>
    
  );
};

export default PasswordGenerator;