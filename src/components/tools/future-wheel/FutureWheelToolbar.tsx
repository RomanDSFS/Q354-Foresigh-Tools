import React from 'react';
import type { Wheel } from '@/types/futures';

type Props = {
  wheel: Wheel;
  setWheel: (w: Wheel) => void;
  onGenerate: () => void;
  loading?: boolean;
};

export default function FutureWheelToolbar({ wheel, setWheel, onGenerate, loading }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <button
        className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200"
        onClick={() => {
          const blob = new Blob([JSON.stringify(wheel, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a'); a.href = url; a.download = 'futures-wheel.json'; a.click();
          URL.revokeObjectURL(url);
        }}
      >
        Экспорт JSON
      </button>

      <label className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer">
        Импорт JSON
        <input
          type="file"
          accept="application/json"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0]; if (!f) return;
            const text = await f.text(); setWheel(JSON.parse(text));
          }}
        />
      </label>

      <button
        onClick={onGenerate}
        disabled={loading}
        className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Генерация…' : 'Сгенерировать от ИИ'}
      </button>
    </div>
  );
}
