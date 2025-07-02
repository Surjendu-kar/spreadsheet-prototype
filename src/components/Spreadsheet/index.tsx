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
import ArrowSplitIcon from '../../assets/table/arrow-split.svg';
import ArrowSplit from '../../assets/toolbar/arrow-split.svg';
import BriefCase from '../../assets/table/briefcase.svg';
import Chevron from '../../assets/table/chevron.svg';
import Calender from '../../assets/table/calender.svg';
import ChevronCycle from '../../assets/table/chevron-circle.svg';
import Emoji from '../../assets/table/emoji.svg';
import Person from '../../assets/table/person.svg';
import Globe from '../../assets/table/globe.svg';

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
      <div className="bg-[#E2E2E2] text-[#545454] p-[4px] pl-2 flex gap-2 items-center  font-semibold text-xs text-left">
        <div className="bg-[#EEEEEE] flex items-center p-1.5 rounded-[4px] gap-1">
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
          <div className="px-2 py-1 flex items-center justify-between font-medium bg-[#EEEEEE] text-xs text-text-light text-left">
            <div className="flex items-center gap-1">
              <img src={BriefCase} alt="brief-case" />
              <span>Job Request</span>
            </div>
            <img src={Chevron} alt="arrow" />
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
          <div className="px-2 py-1 flex items-center justify-between  font-medium bg-[#EEEEEE] text-xs text-text-light text-left">
            <div className="flex items-center gap-1">
              <img src={Calender} alt="calender" />
              <span>Submitted</span>
            </div>
            <img src={Chevron} alt="arrow" />
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
          <div className="px-2 py-1 flex items-center justify-between font-medium bg-[#EEEEEE] text-xs text-text-light text-left">
            <div className="flex items-center gap-1">
              <img src={ChevronCycle} alt="chevron-cycle" />
              <span>Status</span>
            </div>
            <img src={Chevron} alt="arrow" />
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
          <div className="px-2 py-1 flex items-center justify-between font-medium bg-[#EEEEEE] text-xs text-text-light text-left">
            <div className="flex items-center gap-1">
              <img src={Person} alt="person" />
              <span>Submitter</span>
            </div>
            <img src={Chevron} alt="arrow" />
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
          <div className="px-2 py-1 flex items-center justify-between font-medium bg-[#EEEEEE] text-xs text-text-light text-left">
            <div className="flex items-center gap-1">
              <img src={Globe} alt="globe" />
              <span>URL</span>
            </div>
            <img src={Chevron} alt="arrow" />
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
      <div className="bg-light-green flex justify-center items-center gap-1  p-2 font-semibold text-sm">
        <img
          src={ArrowSplitIcon}
          alt="arrow-split"
          className="text-[#A3ACA3]"
        />
        <span className="text-[#505450]">ABC</span>
        <span className="flex items-center justify-center gap-0.5 pt-0.5 pl-2">
          <span className="w-[3px] h-[3px] bg-[#AFAFAF] rounded-full"></span>
          <span className="w-[3px] h-[3px] bg-[#AFAFAF] rounded-full"></span>
          <span className="w-[3px] h-[3px] bg-[#AFAFAF] rounded-full"></span>
        </span>
      </div>
    ),
    columns: [
      {
        accessorKey: 'assigned',
        header: () => (
          <div className="px-2 py-1 flex items-center gap-1 font-medium bg-[#E8F0E9] text-xs text-[#666C66] text-left">
            <img src={Emoji} alt="Emoji" />
            <span>Assigned</span>
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
      <div className="bg-[#DCCFFC] flex justify-center items-center gap-1  p-2 font-semibold text-sm">
        <img src={ArrowSplit} alt="arrow-split" className="text-[#A3ACA3]" />
        <span className="text-[#463E59]">Answer a question</span>
        <span className="flex items-center justify-center gap-0.5 pt-0.5 pl-2">
          <span className="w-[3px] h-[3px] bg-[#AFAFAF] rounded-full"></span>
          <span className="w-[3px] h-[3px] bg-[#AFAFAF] rounded-full"></span>
          <span className="w-[3px] h-[3px] bg-[#AFAFAF] rounded-full"></span>
        </span>
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
      <div className="bg-[#FAC2AF]  flex justify-center items-center gap-1 p-2 font-semibold text-sm">
        <img src={ArrowSplit} alt="arrow-split" className="text-[#A3ACA3]" />
        <span className="text-[#695149]">Extract</span>
        <span className="flex items-center justify-center gap-0.5 pt-0.5 pl-2">
          <span className="w-[3px] h-[3px] bg-[#AFAFAF] rounded-full"></span>
          <span className="w-[3px] h-[3px] bg-[#AFAFAF] rounded-full"></span>
          <span className="w-[3px] h-[3px] bg-[#AFAFAF] rounded-full"></span>
        </span>
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
