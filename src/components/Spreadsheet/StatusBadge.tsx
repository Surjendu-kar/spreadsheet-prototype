import React from 'react';
import type { Status } from './SpreadsheetRow';

const statusStyles: Record<Status, string> = {
  'In-process': 'bg-[#FFF3D6] text-[#85640B]',
  'Need to start': 'bg-[#E2E8F0] text-[#475569]',
  Complete: 'bg-[#D3F2E3] text-[#0A6E3D]',
  Blocked: 'bg-[#FFE1DE] text-[#C22219]',
};

const StatusBadge: React.FC<{ status: Status }> = ({ status }) => (
  <span
    className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}
  >
    {status}
  </span>
);  

export default StatusBadge;
