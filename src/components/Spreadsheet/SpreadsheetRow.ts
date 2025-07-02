export type Status = 'In-process' | 'Need to start' | 'Complete' | 'Blocked';
export type Priority = 'High' | 'Medium' | 'Low';

export interface SpreadsheetRow {
  id: number;
  jobRequest: string;
  submitted: string;
  status: string;
  submitter: string;
  url: string;
  assigned: string;
  priority: string;
  dueDate: string;
  estValue: number;
}

export interface Column {
  key: keyof SpreadsheetRow;
  name: string;
  resizable?: boolean;
  sortable?: boolean;
  width?: number;
}
