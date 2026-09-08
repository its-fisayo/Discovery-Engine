import "./StatusBadge.css";

type DeviceStatus = "active" | "inactive";

export default function StatusBadge({ status }: { status: DeviceStatus }) {
  return (
    <span className={`status-badge ${status}`}>
      {status === "active" ? "Active" : "Inactive"}
    </span>
  );
}