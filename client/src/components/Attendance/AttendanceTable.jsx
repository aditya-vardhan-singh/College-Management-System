import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import axios from "axios";
import { baseURL } from "../AllComponents";
import { Toaster, toast } from "sonner";

export default function AttendanceTable({ dateFrom, dateTo }) {
  /* Constants */
  const today = new Date().toISOString().split("T")[0];
  const columns = [
    {
      key: "rollNo",
      label: "ROLL NUMBER",
    },
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "date",
      label: "DATE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];
  const [rows, setRows] = useState([]);

  /* Effects */
  useEffect(() => {
    setRows([]);
    console.log(
      "dateFrom: " +
        (dateFrom ? dateFrom : today) +
        " dateTo: " +
        (dateTo ? dateTo : today)
    );
    axios
      .get(baseURL + "/students/attendance", {
        params: {
          dateFrom: dateFrom ? dateFrom : today,
          dateTo: dateTo ? dateTo : today,
        },
      })
      .then((response) => {
        setRows(response.data["attendance"]);
      })
      .catch((error) => toast.error(error.response.data.message));
  }, [dateFrom, dateTo, today]);

  /* Render */
  return (
    <div className="min-w-full">
      <Toaster richColors />
      <div className="mx-8">
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
