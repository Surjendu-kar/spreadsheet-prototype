import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import rawData from '../../data/data.json';
const data = rawData as SpreadsheetRow[];
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
import PlusIcon from '../../assets/tab/plus.svg';

const MIN_ROWS = 1000;

function makeEmptyRow(index: number): SpreadsheetRow {
  return {
    id: 10000 + index,
    jobRequest: '',
    submitted: '',
    status: '',
    submitter: '',
    url: '',
    assigned: '',
    priority: '',
    dueDate: '',
    estValue: 0,
  };
}

const paddedData: SpreadsheetRow[] = [
  ...data,
  ...Array.from({ length: Math.max(0, MIN_ROWS - data.length) }, (_, i) =>
    makeEmptyRow(i),
  ),
];

function truncateText(text: string, maxLength: number) {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

const columns: ColumnDef<SpreadsheetRow>[] = [
  {
    id: 'serial',
    header: () => (
      <div className="bg-[#EEEEEE]  text-[#AFAFAF] font-semibold">#</div>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-text-light text-center">{row.index + 1}</div>
    ),
    size: 10,
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
          <div
            className="px-2 text-xs overflow-hidden text-ellipsis whitespace-nowrap"
            title={info.getValue() as string}
          >
            {truncateText(info.getValue() as string, 36)}
          </div>
        ),
        size: 100,
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
          <div className="px-2 text-xs text-right">
            {info.getValue() as string}
          </div>
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
          <div className="px-2 text-center">
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
        cell: (info) => {
          const value = info.getValue() as string;
          const maxLength = 15;
          const isTruncated = value.length > maxLength;
          const visibleText = isTruncated ? value.slice(0, maxLength) : value;
          return (
            <a
              href={`https://${value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 text-xs"
              title={value}
            >
              <span className="text-text underline">{visibleText}</span>
              {isTruncated && (
                <span className="text-text no-underline">...</span>
              )}
            </a>
          );
        },
        size: 120,
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
          <div className="px-2 text-xs text-center">
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
          <div className="px-2 text-xs text-right">
            {info.getValue() as string}
          </div>
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
        cell: (info) => {
          const value = info.getValue() as number;
          return value > 0 ? (
            <div className="flex items-center gap-1 px-2 text-xs justify-end">
              {Number(value).toLocaleString('en-IN')}
              <span className="text-[#AFAFAF]">₹</span>
            </div>
          ) : null;
        },
        size: 120,
      },
    ],
  },
  {
    id: 'addColumnGroup',
    header: () => (
      <div className="flex items-center p-2 justify-center h-full bg-[#F8F8F8] border-l-[2px] border-r-[2px]  border-dashed border-[#CBCBCB] min-w-[40px]">
        <img src={PlusIcon} alt="add-column" className="w-5 h-5" />
      </div>
    ),
    columns: [
      {
        id: 'addColumnChild',
        header: () => (
          <div className=" min-w-[40px] border-dashed border-[#CBCBCB] border-l-[2px] border-r-[2px] p-2 py-3  " />
        ),
        cell: () => (
          <div className="h-[25px]  border-dashed border-[#CBCBCB] border-l-[2px] border-r-[2px]  " />
        ),
        size: 140,
        enableResizing: false,
      },
    ],
  },
];

const SpreadsheetTable: React.FC = () => {
  const table = useReactTable<SpreadsheetRow>({
    data: paddedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
  });

  return (
    <div className="overflow-x-scroll overflow-y-hidden w-full">
      <table className="w-full md:w-[98%] border-collapse table-fixed">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: header.getSize(), position: 'relative' }}
                  className={
                    header.column.id === 'addColumnChild'
                      ? 'bg-white align-left'
                      : 'border-l border-t border-b border-white bg-white align-left'
                  }
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                  className={
                    cell.column.id === 'estValue'
                      ? 'border-t border-b border-l border-[#EEEEEE] align-middle bg-white'
                      : cell.column.id === 'addColumnChild'
                        ? 'align-middle bg-white border-t border-[#EEEEEE]'
                        : 'border border-[#EEEEEE] align-middle bg-white'
                  }
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
