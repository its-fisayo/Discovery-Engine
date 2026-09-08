import "./desp.css";
import ProgressBar from "../../components/ProgressBar";
import Button from "../../components/button/button";
import Table from "../../components/table/table";
import { useState } from "react";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import IpAddressModal from "../../components/IpAddressModal/IpAddressModal";

// Device status type
type DeviceStatus = "active" | "inactive";

// Device interface
interface Device {
  id: number;
  ip: string;
  status: DeviceStatus;
  deviceName: string;
  duration: string;

  // Fields used by the IP Address Modal
  type: string;
  nodes: string;
  scanDuration: string;
  openPorts: string[];
}

// Dummy device data
const dummyDevices: Device[] = [
  {
    id: 1,
    ip: "192.168.94.0",
    status: "active",
    deviceName: "Cisco Router 2344",
    duration: "2 Hours",
    type: "Router",
    nodes: "Node 1",
    scanDuration: "2 Hours",
    openPorts: ["80", "443"],
  },

  {
    id: 2,
    ip: "192.168.94.0",
    status: "active",
    deviceName: "IND0028",
    duration: "1 Hours",
    type: "Server",
    nodes: "Node 2",
    scanDuration: "1 Hour",
    openPorts: ["80"],
  },

  {
    id: 3,
    ip: "192.168.94.0",
    status: "inactive",
    deviceName: "WHIS83929",
    duration: "1 Hours 20mins",
    type: "Computer",
    nodes: "Node 3",
    scanDuration: "1 Hour 20mins",
    openPorts: [],
  },

  {
    id: 4,
    ip: "192.168.94.0",
    status: "active",
    deviceName: "Unknown",
    duration: "2 Hours",
    type: "Unknown",
    nodes: "Node 4",
    scanDuration: "2 Hours",
    openPorts: ["443"],
  },

  {
    id: 5,
    ip: "192.168.94.0",
    status: "inactive",
    deviceName: "INOOE732",
    duration: "2 Hours 5mins",
    type: "Computer",
    nodes: "Node 5",
    scanDuration: "2 Hours 5mins",
    openPorts: [],
  },

  {
    id: 6,
    ip: "192.168.94.0",
    status: "active",
    deviceName: "Windows Server",
    duration: "1 Hour 3mins",
    type: "Server",
    nodes: "Node 6",
    scanDuration: "1 Hour 3mins",
    openPorts: ["80", "443"],
  },

  {
    id: 7,
    ip: "192.168.94.0",
    status: "active",
    deviceName: "Whu377jh",
    duration: "1 Hour 3mins",
    type: "Computer",
    nodes: "Node 7",
    scanDuration: "1 Hour 3mins",
    openPorts: [],
  },

  {
    id: 8,
    ip: "192.168.94.0",
    status: "active",
    deviceName: "Hbfkjjh889",
    duration: "1 Hour 3mins",
    type: "Computer",
    nodes: "Node 8",
    scanDuration: "1 Hour 3mins",
    openPorts: [],
  },

  {
    id: 9,
    ip: "192.168.94.0",
    status: "inactive",
    deviceName: "Netgear Switch",
    duration: "45mins",
    type: "Switch",
    nodes: "Node 9",
    scanDuration: "45mins",
    openPorts: [],
  },

  {
    id: 10,
    ip: "192.168.94.0",
    status: "active",
    deviceName: "MacBook Pro 14",
    duration: "3 Hours",
    type: "Computer",
    nodes: "Node 10",
    scanDuration: "3 Hours",
    openPorts: ["443"],
  },
];

// Table columns
const columns = [
  {
    key: "ip" as const,
    label: "IP addresses",
  },

  {
    key: "status" as const,
    label: "Status",
    render: (value: unknown) => (
      <StatusBadge status={value as DeviceStatus} />
    ),
  },

  {
    key: "deviceName" as const,
    label: "Device Name",
  },

  {
    key: "duration" as const,
    label: "Duration",
  },
];

// Main component
function DiscoveryPage() {
  // Selected device for the modal
  const [selectedDevice, setSelectedDevice] =
    useState<Device | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Calculate which devices should appear on the current page
  const start = (page - 1) * pageSize;

  const pageData = dummyDevices.slice(
    start,
    start + pageSize
  );

  return (
    <div className="gen">

      {/* Page heading */}
      <div className="toop">
        <div className="topo">
          <h1>Discovery Engine Page</h1>
        </div>

        <div className="topo-btn">
          <button>Cancel Scan</button>
        </div>
      </div>


      {/* Task details */}
      <div className="hero">

        <h2>Task Details</h2>

        <p className="tsk">
          <span>
            <strong>TASK DETAILS</strong>
          </span>{" "}
          (Pre filled from approved discovery list)
        </p>


        {/* Task information grid */}
        <div className="details-grid">

          {/* Task ID */}
          <div className="detail-item">
            <h2>Task ID</h2>
            <p>
              8f2gdgvyyg-7hfg-gdhh-v72gdhhd72bv
            </p>
          </div>


          {/* Discovery Type */}
          <div className="detail-item">
            <h2>Discovery Type</h2>
            <p>Sweep Scan</p>
          </div>


          {/* Scan Duration */}
          <div className="detail-item">
            <h2>Scan Duration</h2>
            <p>1 hour, 30min</p>
          </div>


          {/* Total Count */}
          <div className="detail-item">
            <h2>Total Count</h2>
            <p>37</p>
          </div>


          {/* Progress */}
          <div className="detail-item">
            <h2>Progress</h2>
            <ProgressBar percent={59} />
          </div>


          {/* Created By */}
          <div className="detail-item">
            <h2>Created By</h2>
            <p>Favour Chukuwdi</p>
          </div>


          {/* Status */}
          <div className="detail-item">
            <h2>Status</h2>
            <p>Running</p>
          </div>


          {/* Staff ID */}
          <div className="detail-item">
            <h2>Staff ID</h2>
            <p>IND 772</p>

            <Button variant="success">
              Approved
            </Button>
          </div>

        </div>
      </div>


      {/* Device table */}
      <div className="table-wrapper">

        <Table
          data={pageData}
          columns={columns}
          page={page}
          pageSize={pageSize}
          totalItems={dummyDevices.length}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
          onRowClick={(row) => setSelectedDevice(row)}
        />


        {/* IP Address Modal */}
        <IpAddressModal
          isOpen={selectedDevice !== null}
          onClose={() => setSelectedDevice(null)}
          detail={
            selectedDevice
              ? {
                  name: selectedDevice.deviceName,
                  address: selectedDevice.ip,
                  type: selectedDevice.type,
                  status: selectedDevice.status,
                  nodes: selectedDevice.nodes,
                  scanDuration: selectedDevice.scanDuration,
                  openPorts: selectedDevice.openPorts,
                }
              : undefined
          }
        />

      </div>

    </div>
  );
}

export default DiscoveryPage;