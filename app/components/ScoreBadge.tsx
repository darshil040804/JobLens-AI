import React from 'react';

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  // Determine badge style and text based on score
  let badgeColor = '';
  let textColor = '';
  let badgeText = '';

  if (score > 74) {
    badgeColor = 'bg-badge-green';
    textColor = 'text-green-600';
    badgeText = 'Strong';
  } else if (score > 49) {
    badgeColor = 'bg-badge-yellow';
    textColor = 'text-yellow-600';
    badgeText = 'Good Start';
  } else {
    badgeColor = 'bg-badge-red';
    textColor = 'text-red-600';
    badgeText = 'Needs Work';
  }

  return (
    <div className={`px-2 py-1 rounded-md ${badgeColor}`}>
      <p className={`text-sm font-medium ${textColor}`}>{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;