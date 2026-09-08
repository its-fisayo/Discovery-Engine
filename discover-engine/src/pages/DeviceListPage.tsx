// import { useState } from "react";
// import Table, { Column } from "../components/table/Table";
// import Table, {Column} from "../components/table/table";
// import StatusBadge from "../../components/statusbadge/StatusBadge";


// type DeviceStatus = "active" | "inactive";

// interface Device {
//   id: number;
//   ip: string;
//   status: DeviceStatus;
//   deviceName: string;
//   duration: string;
// }

// // Dummy data shaped like the future API response.
// // When you wire up the real API, this array (and the pagination below)
// // gets replaced by data + totalItems from your fetch call.
// const dummyDevices: Device[] = [
//   { id: 1, ip: "192.168.94.0", status: "active", deviceName: "Cisco Router 2344", duration: "2 Hours" },
//   { id: 2, ip: "192.168.94.0", status: "active", deviceName: "IND0028", duration: "1 Hours" },
//   { id: 3, ip: "192.168.94.0", status: "inactive", deviceName: "WHIS83929", duration: "1 Hours 20mins" },
//   { id: 4, ip: "192.168.94.0", status: "active", deviceName: "Unknown", duration: "2 Hours" },
//   { id: 5, ip: "192.168.94.0", status: "inactive", deviceName: "INOOE732", duration: "2 Hours 5mins" },
//   { id: 6, ip: "192.168.94.0", status: "active", deviceName: "Windows Server", duration: "1 Hour 3mins" },
//   { id: 7, ip: "192.168.94.0", status: "active", deviceName: "Whu377jh", duration: "1 Hour 3mins" },
//   { id: 8, ip: "192.168.94.0", status: "active", deviceName: "Hbfkjjh889", duration: "1 Hour 3mins" },
//   { id: 9, ip: "192.168.94.0", status: "inactive", deviceName: "Netgear Switch", duration: "45mins" },
//   { id: 10, ip: "192.168.94.0", status: "active", deviceName: "MacBook Pro 14", duration: "3 Hours" },
//   { id: 11, ip: "192.168.94.0", status: "active", deviceName: "Ubuntu Server 02", duration: "2 Hours 10mins" },
//   { id: 12, ip: "192.168.94.0", status: "inactive", deviceName: "TP-Link Router", duration: "1 Hour" },
//   { id: 13, ip: "192.168.94.0", status: "active", deviceName: "Dell Latitude", duration: "50mins" },
//   { id: 14, ip: "192.168.94.0", status: "active", deviceName: "Printer HP402", duration: "1 Hour 15mins" },
//   { id: 15, ip: "192.168.94.0", status: "inactive", deviceName: "Firewall Node A", duration: "2 Hours 30mins" },
//   { id: 16, ip: "192.168.94.0", status: "active", deviceName: "IOT Sensor 04", duration: "20mins" },
//   { id: 17, ip: "192.168.94.0", status: "active", deviceName: "VM-Host-03", duration: "4 Hours" },
//   { id: 18, ip: "192.168.94.0", status: "inactive", deviceName: "Backup Server", duration: "1 Hour 40mins" },
// ];

// const columns: Column<Device>[] = [
//   { key: "ip", label: "IP addresses" },
//   {
//     key: "status",
//     label: "Status",
//     render: (value) => <StatusBadge status={value as DeviceStatus} />,
//   },
//   { key: "deviceName", label: "Device Name" },
//   { key: "duration", label: "Duration" },
// ];

// export default function DeviceListPage() {
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);

//   // Client-side slice, only needed because dummyDevices is the FULL list.
//   // Once the real API is wired up, it should already return just the
//   // current page's rows — delete this slice and pass the API data straight in.
//   const start = (page - 1) * pageSize;
//   const pageData = dummyDevices.slice(start, start + pageSize);

//   return (
//     <Table
//       data={pageData}
//       columns={columns}
//       page={page}
//       pageSize={pageSize}
//       totalItems={dummyDevices.length}
//       onPageChange={setPage}
//       onPageSizeChange={(size) => {
//         setPageSize(size);
//         setPage(1);
//       }}
//     />
//   );
// }