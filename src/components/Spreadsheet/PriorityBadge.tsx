import React from 'react';
import type { Priority } from './SpreadsheetRow';

const priorityStyles: Record<Priority, string> = {
  High: 'text-[#EF4D44]',
  Medium: 'text-[#C29210]',
  Low: 'text-[#1A8CFF]',
};

const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => (
  <span className={`font-medium ${priorityStyles[priority]}`}>{priority}</span>
);

export default PriorityBadge;
