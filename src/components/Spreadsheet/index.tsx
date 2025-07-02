import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import data from '../../data/data.json';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import type { SpreadsheetRow } from './SpreadsheetRow';
import LinkImg from '../../assets/table/link.svg';
import ArrowSync from '../../assets/table/arrow-sync.svg';

const columns: ColumnDef<SpreadsheetRow>[] = [
  {
    id: 'serial',
    header: () => (
      <div className="bg-[#EEEEEE]  text-[#AFAFAF] font-semibold">#</div>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-text-light text-center">{row.index + 1}</div>
    ),
    size: 30,
    enableResizing: false,
  },
  {
    id: 'financialOverview',
    header: () => (
      <div className="bg-[#E2E2E2] text-[#545454] p-1 pl-2 flex gap-2 items-center  font-semibold text-xs text-left">
        <div className="bg-[#EEEEEE] flex items-center p-2 rounded-[4px] gap-1">
          <img src={LinkImg} alt="link-img" />
          <span>Q3 Financial Overview</span>
        </div>
        <img src={ArrowSync} alt="arrow-sync" />
      </div>
    ),
    columns: [
      {
        accessorKey: 'jobRequest',
        header: () => (
          <div className="px-2 py-1 font-medium bg-[#EEEEEE] text-xs text-text-light text-left">
            Job Request
          </div>
        ),
        cell: (info) => (
          <div className="px-2 text-xs">{info.getValue() as string}</div>
        ),
        size: 220,
      },
      {
        accessorKey: 'submitted',
        header: () => (
          <div className="px-2 py-1 font-medium bg-[#EEEEEE] text-xs text-text-light text-left">
            Submitted
          </div>
        ),
        cell: (info) => (
          <div className="px-2 text-xs">{info.getValue() as string}</div>
        ),
        size: 110,
      },
      {
        accessorKey: 'status',
        header: () => (
          <div className="px-2 py-1 font-medium bg-[#EEEEEE] text-xs text-text-light text-left">
            Status
          </div>
        ),
        cell: (info) => (
          <div className="px-2">
            <StatusBadge status={info.getValue() as any} />
          </div>
        ),
        size: 110,
      },
      {
        accessorKey: 'submitter',
        header: () => (
          <div className="px-2 py-1 font-medium bg-[#EEEEEE] text-xs text-text-light text-left">
            Submitter
          </div>
        ),
        cell: (info) => (
          <div className="px-2 text-xs">{info.getValue() as string}</div>
        ),
        size: 130,
      },
    ],
  },
  {
    id: 'urlGroup',
    header: () => <div className="p-2" />,
    columns: [
      {
        accessorKey: 'url',
        header: () => (
          <div className="px-2 py-1 font-medium bg-[#EEEEEE] text-xs text-text-light text-left">
            URL
          </div>
        ),
        cell: (info) => (
          <a
            href={`https://${info.getValue()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 text-text underline text-xs"
          >
            {info.getValue() as string}
          </a>
        ),
        size: 160,
      },
    ],
  },
  {
    id: 'abc',
    header: () => (
      <div className="bg-light-green text-[#505450] p-2 font-semibold text-sm">
        ABC
      </div>
    ),
    columns: [
      {
        accessorKey: 'assigned',
        header: () => (
          <div className="px-2 py-1 font-medium bg-[#E8F0E9] text-xs text-[#666C66] text-left">
            Assigned
          </div>
        ),
        cell: (info) => (
          <div className="px-2 text-xs">{info.getValue() as string}</div>
        ),
        size: 130,
      },
    ],
  },
  {
    id: 'answer',
    header: () => (
      <div className="bg-purple text-[#463E59] p-2 font-semibold text-sm">
        Answer a question
      </div>
    ),
    columns: [
      {
        accessorKey: 'priority',
        header: () => (
          <div className="px-2 py-1 font-medium bg-[#EAE3FC] text-xs text-[#655C80] text-left">
            Priority
          </div>
        ),
        cell: (info) => (
          <div className="px-2 text-xs">
            <PriorityBadge priority={info.getValue() as any} />
          </div>
        ),
        size: 90,
      },
      {
        accessorKey: 'dueDate',
        header: () => (
          <div className="px-2 py-1 font-medium bg-[#EAE3FC] text-xs text-[#655C80] text-left">
            Due Date
          </div>
        ),
        cell: (info) => (
          <div className="px-2 text-xs">{info.getValue() as string}</div>
        ),
        size: 110,
      },
    ],
  },
  {
    id: 'extract',
    header: () => (
      <div className="bg-orange text-[#695149] p-2 font-semibold text-sm">
        Extract
      </div>
    ),
    columns: [
      {
        accessorKey: 'estValue',
        header: () => (
          <div className="px-2 py-1 font-medium bg-[#FFE9E0] text-xs text-[#8C6C62] text-left">
            Est. Value
          </div>
        ),
        cell: (info) => (
          <div className="px-2 text-xs">
            {Number(info.getValue()).toLocaleString('en-IN')}
          </div>
        ),
        size: 120,
      },
    ],
  },
];

const SpreadsheetTable: React.FC = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
  });

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-max border-collapse w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: header.getSize(), position: 'relative' }}
                  className="border border-white bg-white align-left"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none ${header.column.getIsResizing() ? 'bg-blue-400' : ''}`}
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border border-[#EEEEEE]">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                  className="border border-[#EEEEEE] px-2 py-1 align-middle bg-white"
                  tabIndex={0}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpreadsheetTable;
