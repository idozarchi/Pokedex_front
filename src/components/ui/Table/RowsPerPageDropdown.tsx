type RowsPerPageDropdownProps = {
  value: number;
  onChange: (val: number) => void;
  options: number[];
  label?: string;
};

export function RowsPerPageDropdown({
  value,
  onChange,
  options,
  label = "Rows per page",
}: RowsPerPageDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <select
        className="border rounded px-2 py-1 text-sm"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
