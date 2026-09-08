import { useState, type KeyboardEvent } from "react";
import Modal from "../../components/Modal/Modal";
import "./StartScanModal.css";

type ScanFormData = {
  username: string;
  password: string;
  interfaceMethod: string;
  depth: string;
  range: string[];
  scanType: string;
};

type StartScanModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ScanFormData) => void;
};

const INTERFACE_METHODS = ["WMI", "SLMP"];
const SCAN_TYPES = ["Full Scan", "Sweep Scan"];

export default function StartScanModal({
  isOpen,
  onClose,
  onSubmit,
}: StartScanModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [interfaceMethod, setInterfaceMethod] = useState("");
  const [depth, setDepth] = useState("");
  const [range, setRange] = useState<string[]>([]);
  const [rangeInput, setRangeInput] = useState("");
  const [scanType, setScanType] = useState("");

  const addRangeEntry = () => {
    const trimmed = rangeInput.trim();
    if (trimmed && !range.includes(trimmed)) {
      setRange((prev) => [...prev, trimmed]);
    }
    setRangeInput("");
  };

  const handleRangeKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addRangeEntry();
    }
  };

  const removeRangeEntry = (entry: string) => {
    setRange((prev) => prev.filter((r) => r !== entry));
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setInterfaceMethod("");
    setDepth("");
    setRange([]);
    setRangeInput("");
    setScanType("");
  };

  const handleCreate = () => {
    onSubmit({ username, password, interfaceMethod, depth, range, scanType });
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="scan-title">Start scan</h2>
      <p className="scan-subtitle">
        Narrow down report by status, date range, sort,
      </p>

      <div className="scan-grid">
        <div className="scan-field">
          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="scan-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="scan-field">
          <label>Interface Method</label>
          <select
            value={interfaceMethod}
            onChange={(e) => setInterfaceMethod(e.target.value)}
          >
            <option value="" disabled>Select</option>
            {INTERFACE_METHODS.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>

        <div className="scan-field">
          <label>Depth</label>
          <input value={depth} onChange={(e) => setDepth(e.target.value)} />
        </div>
      </div>

      <div className="scan-field scan-field-full">
        <label>Range</label>
        <div className="range-box">
          {range.map((entry) => (
            <span key={entry} className="range-chip">
              {entry}
              <button
                type="button"
                onClick={() => removeRangeEntry(entry)}
                aria-label={`Remove ${entry}`}
              >
                ×
              </button>
            </span>
          ))}
          <input
            className="range-text-input"
            value={rangeInput}
            onChange={(e) => setRangeInput(e.target.value)}
            onKeyDown={handleRangeKeyDown}
            onBlur={addRangeEntry}
            placeholder={range.length === 0 ? "Enter IP and press Enter" : ""}
          />
        </div>
      </div>

      <div className="scan-field scan-field-full">
        <label>Scan Type</label>
        <select value={scanType} onChange={(e) => setScanType(e.target.value)}>
          <option value="" disabled>Select</option>
          {SCAN_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="scan-actions">
        <button className="scan-create-btn" onClick={handleCreate}>
          Create
        </button>
      </div>
    </Modal>
  );
}