import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import "./IpAddressModal.css";

type DeviceStatus = "active" | "inactive";

export type IpAddressDetail = {
  name: string;
  address: string;
  type: string;
  status: DeviceStatus;
  nodes: string;
  scanDuration: string;
  openPorts: string[];
};

type IpAddressModalProps = {
  isOpen: boolean;
  onClose: () => void;
  detail: IpAddressDetail | null | undefined;
};

const NODE_OPTIONS = [
  "192.168.9439.2",
  "192.168.94.22",
  "192.168.94.0",
  "192.162.24.0",
  "192.128.44.0",
];

const PORT_OPTIONS = ["448", "84", "1263", "15", "8080"];

type DeviceDriveMode = "Port" | "Type" | null;

export default function IpAddressModal({
  isOpen,
  onClose,
  detail,
}: IpAddressModalProps) {
  const [selectedNode, setSelectedNode] = useState(NODE_OPTIONS[0]);
  const [selectedPort, setSelectedPort] = useState(PORT_OPTIONS[0]);

  const [isDriveOpen, setIsDriveOpen] = useState(false);
  const [driveMode, setDriveMode] = useState<DeviceDriveMode>(null);

  useEffect(() => {
    if (detail) {
      setSelectedNode(detail.nodes || NODE_OPTIONS[0]);
      setSelectedPort(detail.openPorts[0] || PORT_OPTIONS[0]);
      setDriveMode(null);
      setIsDriveOpen(false);
    }
  }, [detail]);

  if (!detail) return null;

  const handleDriveModeSelect = (mode: DeviceDriveMode) => {
    setDriveMode(mode);
    setIsDriveOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <h2 className="ip-modal-title">Ip Address Details</h2>
      <p className="ip-modal-subtitle">
        Narrow down report by status, nodes, type, port,
      </p>

      <div className="ip-modal-grid">
        <div className="ip-modal-field">
          <label>Name</label>
          <p>{detail.name}</p>
        </div>

        <div className="ip-modal-field">
          <label>Address</label>
          <p>{detail.address}</p>
        </div>

        <div className="ip-modal-field">
          <label>Type</label>
          <p>{detail.type}</p>
        </div>

        <div className="ip-modal-field">
          <label>Status</label>
          <span className={`ip-status-pill ${detail.status}`}>
            {detail.status === "active" ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="ip-modal-field">
          <label>Nodes</label>
          <select
            className="ip-modal-select"
            value={selectedNode}
            onChange={(e) => setSelectedNode(e.target.value)}
          >
            {NODE_OPTIONS.map((node) => (
              <option key={node} value={node}>
                {node}
              </option>
            ))}
          </select>
        </div>

        <div className="ip-modal-field">
          <label>Open Ports</label>
          <select
            className="ip-modal-select"
            value={selectedPort}
            onChange={(e) => setSelectedPort(e.target.value)}
          >
            {PORT_OPTIONS.map((port) => (
              <option key={port} value={port}>
                {port}
              </option>
            ))}
          </select>
        </div>

        <div className="ip-modal-field">
          <label>Scan Duration</label>
          <p>{detail.scanDuration}</p>
        </div>

        <div className="ip-modal-field ip-modal-field-full">
          <label>Device Drive</label>
          <div className="device-drive-wrapper">
            <button
              type="button"
              className="device-drive-toggle"
              onClick={() => setIsDriveOpen((open) => !open)}
            >
              <span>{driveMode ?? "Select"}</span>
              <span
                className={`device-drive-arrow ${isDriveOpen ? "open" : ""}`}
              >
                ▾
              </span>
            </button>

            {isDriveOpen && (
              <div className="device-drive-menu">
                <button
                  type="button"
                  className={`device-drive-option ${
                    driveMode === "Port" ? "selected" : ""
                  }`}
                  onClick={() => handleDriveModeSelect("Port")}
                >
                  Port
                </button>
                <button
                  type="button"
                  className={`device-drive-option ${
                    driveMode === "Type" ? "selected" : ""
                  }`}
                  onClick={() => handleDriveModeSelect("Type")}
                >
                  Type
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}