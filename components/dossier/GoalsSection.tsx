
import React from 'react';
import { OBJETIVOS_LIST } from '../../constants';
import { Card } from '../common/Card';

const GoalIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.992 5.992 0 0 0-1.925 3.546 5.973 5.973 0 0 0-2.275 3.91B3.748 3.748 0 0 0 12 18Z" />
</svg>
);

const GoalsContent: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
      {OBJETIVOS_LIST.map((objetivo, index) => (
        <Card 
          key={index} 
          title={`Objetivo ${index + 1}`} 
          icon={<GoalIcon/>}
          contentClassName="text-center"
        >
          <p>{objetivo}</p>
        </Card>
      ))}
    </div>
  );
};

export default GoalsContent;