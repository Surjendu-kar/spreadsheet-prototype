import StatusBadge from "./StatusBadge";

function SpreadsheetTable() {
  return (
    <div>
      <StatusBadge status="In-process" />
      <StatusBadge status="Need to start" />
      <StatusBadge status="Complete" />
      <StatusBadge status="Blocked" />
    </div>
  );
}

export default SpreadsheetTable;
