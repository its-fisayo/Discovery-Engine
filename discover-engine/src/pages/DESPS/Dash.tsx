import "./desps.css";
import Table from "../../components/table/table";
import { useState } from "react";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import StartScanModal from "../StartScanModal/StartScanModal";


// 1. Types and dummy data — defined OUTSIDE the component
type DeviceStatus = "active" | "inactive";

interface Device {
  id: number;
  TaskID: string;
  status: DeviceStatus;
  interfaceMethod: string;
  scanType: string;
  duration: string;
}

const dummyDevices: Device[] = [
  { id: 1, TaskID: "UUID", status: "active", interfaceMethod: "Cisco Router 2344", scanType: "Sweep", duration: "2 Hours" },
  { id: 2, TaskID: "UUID", status: "active", interfaceMethod: "IND0028", scanType: "Sweep", duration: "1 Hours" },
  { id: 3, TaskID: "UUID", status: "inactive", interfaceMethod: "WHIS83929", scanType: "Full Scan", duration: "1 Hours 20mins" },
  { id: 4, TaskID: "UUID", status: "active", interfaceMethod: "Unknown", scanType: "Sweep", duration: "2 Hours" },
  { id: 5, TaskID: "UUID", status: "inactive", interfaceMethod: "INOOE732", scanType: "Full Scan", duration: "2 Hours 5mins" },
  { id: 6, TaskID: "UUID", status: "active", interfaceMethod: "Windows Server", scanType: "Full Scan", duration: "1 Hour 3mins" },
  { id: 7, TaskID: "UUID", status: "active", interfaceMethod: "Whu377jh", scanType: "Sweep", duration: "1 Hour 3mins" },
  { id: 8, TaskID: "UUID", status: "active", interfaceMethod: "Hbfkjjh889", scanType: "Sweep", duration: "1 Hour 3mins" },
  { id: 9, TaskID: "UUID", status: "inactive", interfaceMethod: "Netgear Switch", scanType: "Sweep", duration: "45mins" },
  { id: 10, TaskID: "UUID", status: "active", interfaceMethod: "MacBook Pro 14", scanType: "Sweep", duration: "3 Hours" },
  { id: 11, TaskID: "UUID", status: "active", interfaceMethod: "MacBook Pro 14", scanType: "Sweep", duration: "3 Hours" },
  { id: 12, TaskID: "UUID", status: "active", interfaceMethod: "MacBook Pro 14", scanType: "Full Scan", duration: "3 Hours" },
  { id: 13, TaskID: "UUID", status: "active", interfaceMethod: "MacBook Pro 14", scanType: "Full Scan", duration: "3 Hours" },
  { id: 14, TaskID: "UUID", status: "active", interfaceMethod: "MacBook Pro 14", scanType: "Full Scan", duration: "3 Hours" },
  { id: 15, TaskID: "UUID", status: "active", interfaceMethod: "MacBook Pro 14", scanType: "Full Scan", duration: "3 Hours" },
  { id: 16, TaskID: "UUID", status: "active", interfaceMethod: "MacBook Pro 14", scanType: "Sweep", duration: "3 Hours" },
  { id: 17, TaskID: "UUID", status: "active", interfaceMethod: "MacBook Pro 14", scanType: "Full Scan", duration: "3 Hours" },
  { id: 18, TaskID: "UUID", status: "active", interfaceMethod: "MacBook Pro 14", scanType: "Full Scan", duration: "3 Hours" },
  { id: 19, TaskID: "UUID", status: "active", interfaceMethod: "MacBook Pro 14", scanType: "Full Scan", duration: "3 Hours" },
  { id: 20, TaskID: "UUID", status: "active", interfaceMethod: "MacBook Pro 14", scanType: "Full Scan", duration: "3 Hours" },
  { id: 21, TaskID: "UUID", status: "active", interfaceMethod: "MacBook Pro 14", scanType: "Full Scan", duration: "3 Hours" },

];

const columns = [
  { key: "TaskID" as const, label: "Task ID" },
  {
    key: "status" as const,
    label: "Status",
    render: (value: unknown) => <StatusBadge status={value as DeviceStatus} />,
  },
  { key: "interfaceMethod" as const, label: "Interface Method" },
  { key: "scanType" as const, label: "Scan Type" },
  { key: "duration" as const, label: "Duration" },
];


function Dash() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    // ADD THIS LINE — it was missing
    const [isScanModalOpen, setIsScanModalOpen] = useState(false);

    const start = (page - 1) * pageSize;
    const pageData = dummyDevices.slice(start, start + pageSize);

    return (
        <div className="ral">
            <div className="top">
                <div className="left">
                    <h1> Discovery Page </h1>
                </div>
                <div className="right">
                    <button onClick={() => setIsScanModalOpen(true)}>Start Scan</button>
                </div>
            </div>

            <div className="table-wrapper">
                <Table
                    className=""
                    data={pageData}
                    columns={columns}
                    page={page}
                    pageSize={pageSize}
                    totalItems={dummyDevices.length}
                    onPageChange={setPage}
                    onPageSizeChange={(size: number) => {
                        setPageSize(size);
                        setPage(1);
                    }}
                />
            </div>

            {/* ADD THIS BLOCK — the modal was imported but never rendered */}
            <StartScanModal
                isOpen={isScanModalOpen}
                onClose={() => setIsScanModalOpen(false)}
                onSubmit={(data) => {
                    console.log("Scan submitted:", data);
                }}
            />
        </div>
    );
}


export default Dash;