import React, { useState, useEffect, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import type {
  ColumnDef,
  Cell,
  Column,
  Row,
  Table,
  TableMeta,
} from '@tanstack/react-table';
import rawData from '../../data/data.json';
const data = rawData as SpreadsheetRow[];
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import type { Priority, SpreadsheetRow, Status } from './SpreadsheetRow';
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

interface MyTableMeta extends TableMeta<SpreadsheetRow> {
  updateData: (
    rowIndex: number,
    columnId: keyof SpreadsheetRow,
    value: string | number,
  ) => void;
}

const EditableCell = ({
  getValue,
  row,
  column,
  table,
  alignEnd,
}: {
  getValue: () => string;
  row: Row<SpreadsheetRow>;
  column: Column<SpreadsheetRow, string>;
  table: Table<SpreadsheetRow>;
  alignEnd?: boolean;
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const columnWidth = column.getSize();
  // Approximate character width for text-xs (12px font-size). This is a heuristic.
  const estimatedCharWidth = 3;
  const calculatedMaxLength = Math.floor(columnWidth / estimatedCharWidth);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const onBlur = () => {
    (table.options.meta as MyTableMeta)?.updateData(
      row.index,
      column.id as keyof SpreadsheetRow,
      value,
    );
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      if (isEditing) {
        inputRef.current?.blur();
      } else {
        setIsEditing(true);
      }
    } else if (e.key === 'Escape') {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  return isEditing ? (
    <input
      ref={inputRef}
      value={value as string}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      className="w-full h-full px-2 py-1 text-xs border-[2px] outline-none"
    />
  ) : (
    <div
      className={`px-2 text-xs h-full w-full min-h-[25px] flex items-center ${alignEnd ? ' justify-end' : ''}`}
      title={value as string}
      onClick={() => setIsEditing(true)}
      onKeyDown={handleKeyDown}
    >
      <span className="overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
        {truncateText(value, calculatedMaxLength)}
      </span>
    </div>
  );
};

const EditableStatusCell = ({
  getValue,
  row,
  column,
  table,
}: {
  getValue: () => Status;
  row: Row<SpreadsheetRow>;
  column: Column<SpreadsheetRow, Status>;
  table: Table<SpreadsheetRow>;
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const onBlur = () => {
    (table.options.meta as MyTableMeta)?.updateData(
      row.index,
      column.id as keyof SpreadsheetRow,
      value,
    );
    setIsEditing(false);
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value as Status);
    (table.options.meta as MyTableMeta)?.updateData(
      row.index,
      column.id as keyof SpreadsheetRow,
      e.target.value,
    );
    setIsEditing(false);
  };

  return isEditing ? (
    <select
      value={value}
      onChange={onSelectChange}
      onBlur={onBlur}
      className="w-full h-full px-2 py-1 text-xs border-[2px] outline-none"
      autoFocus
    >
      <option value="In-process">In-process</option>
      <option value="Need to start">Need to start</option>
      <option value="Complete">Complete</option>
      <option value="Blocked">Blocked</option>
    </select>
  ) : (
    <div onClick={() => setIsEditing(true)} className="px-2 text-center">
      <StatusBadge status={value as Status} />
    </div>
  );
};

const EditablePriorityCell = ({
  getValue,
  row,
  column,
  table,
}: {
  getValue: () => Priority;
  row: Row<SpreadsheetRow>;
  column: Column<SpreadsheetRow, Priority>;
  table: Table<SpreadsheetRow>;
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const onBlur = () => {
    (table.options.meta as MyTableMeta)?.updateData(
      row.index,
      column.id as keyof SpreadsheetRow,
      value,
    );
    setIsEditing(false);
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value as Priority);
    (table.options.meta as MyTableMeta)?.updateData(
      row.index,
      column.id as keyof SpreadsheetRow,
      e.target.value,
    );
    setIsEditing(false);
  };

  return isEditing ? (
    <select
      value={value}
      onChange={onSelectChange}
      onBlur={onBlur}
      className="w-full h-full px-2 py-1 text-xs border-[2px] outline-none"
      autoFocus
    >
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
  ) : (
    <div
      onClick={() => setIsEditing(true)}
      className="px-2 text-xs text-center min-h-[25px]"
    >
      <PriorityBadge priority={value as Priority} />
    </div>
  );
};

const EditableDateCell = ({
  getValue,
  row,
  column,
  table,
  alignEnd,
}: {
  getValue: () => string;
  row: Row<SpreadsheetRow>;
  column: Column<SpreadsheetRow, string>;
  table: Table<SpreadsheetRow>;
  alignEnd?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to convert any recognized date format to DD-MM-YYYY for internal state and display
  const normalizeDateToDDMMYYYY = (dateString: string) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        // Assumes YYYY-MM-DD
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      } else if (parts[0].length <= 2) {
        // Assumes DD-MM-YYYY
        return dateString;
      }
    }
    // Fallback: try to parse as a Date object and then format
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return dateString; // As a last resort, return the original string
  };

  const initialValue = normalizeDateToDDMMYYYY(getValue()); // Normalize initial value to DD-MM-YYYY
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setValue(normalizeDateToDDMMYYYY(getValue())); // Re-normalize on initialValue change (due to external data change)
  }, [getValue]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const onBlur = () => {
    (table.options.meta as MyTableMeta)?.updateData(
      row.index,
      column.id as keyof SpreadsheetRow,
      value,
    );
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      if (isEditing) {
        inputRef.current?.blur();
      } else {
        setIsEditing(true);
      }
    } else if (e.key === 'Escape') {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  // Converts DD-MM-YYYY (from state) to YYYY-MM-DD (for input type="date")
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    const parts = dateString.split('-'); // Expected DD-MM-YYYY
    if (parts.length === 3 && parts[0].length <= 2) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert to YYYY-MM-DD
    }
    // Fallback for initial strange values not normalized by normalizeDateToDDMMYYYY
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    }
    return '';
  };

  return isEditing ? (
    <input
      ref={inputRef}
      type="date"
      value={formatDateForInput(value)} // Input expects YYYY-MM-DD
      onChange={(e) => setValue(normalizeDateToDDMMYYYY(e.target.value))} // Input provides YYYY-MM-DD, convert to DD-MM-YYYY for state
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      className="w-full h-full px-2 py-1 text-xs border-[2px] outline-none"
    />
  ) : (
    <div
      className={`px-2 text-xs h-full w-full min-h-[25px] flex items-center ${alignEnd ? ' justify-end' : ''}`}
      title={value} // Display DD-MM-YYYY
      onClick={() => setIsEditing(true)}
      onKeyDown={handleKeyDown}
    >
      <span className="overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
        {value} {/* Display DD-MM-YYYY */}
      </span>
    </div>
  );
};

const EditableNumericCell = ({
  getValue,
  row,
  column,
  table,
}: {
  getValue: () => number;
  row: Row<SpreadsheetRow>;
  column: Column<SpreadsheetRow, number>;
  table: Table<SpreadsheetRow>;
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const onBlur = () => {
    (table.options.meta as MyTableMeta)?.updateData(
      row.index,
      column.id as keyof SpreadsheetRow,
      value,
    );
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      if (isEditing) {
        inputRef.current?.blur();
      } else {
        setIsEditing(true);
      }
    } else if (e.key === 'Escape') {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  return isEditing ? (
    <input
      ref={inputRef}
      type="number"
      value={value as number}
      onChange={(e) => setValue(Number(e.target.value))}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      className="w-full h-full px-2 py-1 text-xs border-[2px] outline-none"
    />
  ) : (
    <div
      className="px-2 text-xs overflow-hidden text-ellipsis whitespace-nowrap h-full w-full min-h-[25px] flex items-center justify-end gap-1"
      title={String(value)}
      onClick={() => setIsEditing(true)}
      onKeyDown={handleKeyDown}
    >
      {value ? (
        <>
          {Number(value).toLocaleString('en-IN')}
          <span className="text-[#AFAFAF]">₹</span>
        </>
      ) : null}
    </div>
  );
};

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
        cell: (info) => <EditableCell {...info} alignEnd={false} />,
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
        cell: (info) => <EditableDateCell {...info} alignEnd={true} />,
        size: 130,
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
        cell: (info) => <EditableStatusCell {...info} />,
        size: 150,
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
        cell: (info) => <EditableCell {...info} />,
        size: 140,
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
        cell: (info) => <EditableCell {...info} />,
        size: 50,
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
        cell: (info) => <EditableCell {...info} />,
        size: 140,
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
        cell: (info) => <EditablePriorityCell {...info} />,
        size: 130,
      },
      {
        accessorKey: 'dueDate',
        header: () => (
          <div className="px-2 py-1 font-medium bg-[#EAE3FC] text-xs text-[#655C80] text-left">
            Due Date
          </div>
        ),
        cell: (info) => <EditableDateCell {...info} alignEnd={true} />,
        size: 130,
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
        cell: (info) => <EditableNumericCell {...info} />,
        size: 130,
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
        size: 120,
        enableResizing: false,
      },
    ],
  },
];

const SpreadsheetTable: React.FC = () => {
  const [data, setData] = useState(paddedData);

  const table = useReactTable<SpreadsheetRow>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
    meta: {
      updateData: (
        rowIndex: number,
        columnId: keyof SpreadsheetRow,
        value: string | number,
      ) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    } as MyTableMeta,
  });

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    cell: Cell<SpreadsheetRow, string | number>,
  ) => {
    const { key } = e;
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      return;
    }
    e.preventDefault();

    const rows = table.getRowModel().rows;
    const visibleColumns = table.getVisibleLeafColumns();
    const currentColumnIndex = visibleColumns.findIndex(
      (c) => c.id === cell.column.id,
    );

    let nextRow = cell.row.index;
    let nextCol = currentColumnIndex;

    switch (key) {
      case 'ArrowUp':
        nextRow = Math.max(0, cell.row.index - 1);
        break;
      case 'ArrowDown':
        nextRow = Math.min(rows.length - 1, cell.row.index + 1);
        break;
      case 'ArrowLeft':
        nextCol = Math.max(0, currentColumnIndex - 1);
        break;
      case 'ArrowRight':
        nextCol = Math.min(visibleColumns.length - 1, currentColumnIndex + 1);
        break;
    }

    const nextColumnId = visibleColumns[nextCol]?.id;
    if (nextColumnId) {
      const nextCellEl = document.querySelector(
        `[data-row-index='${nextRow}'][data-column-id='${nextColumnId}']`,
      );
      if (nextCellEl) {
        (nextCellEl as HTMLElement).focus();
      }
    }
  };

  return (
    <div className="block max-w-full overflow-x-auto overflow-y-hidden">
      <table className="w-full md:w-[98%] border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{
                    width: header.getSize(),
                    position: 'relative',
                  }}
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
                      className={`resizer ${
                        header.column.getIsResizing() ? 'isResizing' : ''
                      }`}
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        height: '100%',
                        width: '5px',
                        background: 'rgba(0, 0, 0, 0.5)',
                        cursor: 'col-resize',
                        userSelect: 'none',
                        touchAction: 'none',
                        opacity: header.column.getIsResizing() ? 1 : 0,
                      }}
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
                      ? 'border-t border-b border-l border-[#EEEEEE] align-middle bg-white '
                      : cell.column.id === 'addColumnChild'
                        ? 'align-middle bg-white border-t border-[#EEEEEE] '
                        : 'border border-[#EEEEEE] align-middle bg-white focus:border-[2px] focus:border-black focus:outline-none'
                  }
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, cell)}
                  data-row-index={row.index}
                  data-column-id={cell.column.id}
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
