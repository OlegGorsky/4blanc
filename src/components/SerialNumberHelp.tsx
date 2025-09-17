import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export const SerialNumberHelp: React.FC = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <button
      type="button"
      className="inline-flex items-center px-2 border-2 border-l-0 border-[#00be00] h-[42px] text-gray-400 hover:text-gray-600 focus:outline-none relative rounded-r-md"
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
      onClick={() => setIsTooltipVisible(!isTooltipVisible)}
    >
      <HelpCircle className="h-5 w-5" />
      
      {isTooltipVisible && (
        <div className="absolute z-50 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200 right-0 top-full mt-2">
          <div className="relative">
            <div className="absolute w-3 h-3 bg-white border-t border-l border-gray-200 -top-2 right-2 transform rotate-45"></div>
            <p className="text-sm text-gray-600 mb-2">Пример штрихкода и серийного номера (вы найдете его на двигателе или на корпусе вытяжки, а также он продублирован на коробке):</p>
            <img 
              src="https://gorskybase.ru/media/user_files/uF03K1O6AhZFMmyGH6qiNVh7f62cB3bJ_8294da08313ff3cb07840390969a3c1e3849c1ebad7a7a2b7577ff82242faf6e.jpg" 
              alt="Пример штрихкода" 
              className="w-full rounded"
            />
          </div>
        </div>
      )}
    </button>
  );
};