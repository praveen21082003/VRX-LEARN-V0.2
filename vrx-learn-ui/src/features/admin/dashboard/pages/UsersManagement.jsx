import React, { useState } from "react";

import {
  Icon,
  Input,
  Button,
  DataTable,
  Avatar,
  StatusPill,
  Select,
  Modal,
} from "@/components/ui";

import formatDateTime from "@/utils/formatDateTime";
import CreateUser from "../../dialogs/CreateUser";

function UsersManagement() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [selectedRows, setSelectedRows] = useState([]);

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(data.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setOpen(true);
  };

  const data = [
    {
      id: 21,
      name: "Heaven Kane",
      email: "heavenkane@gmail.com",
      role: "ADMIN",
      last_login: "10 min ago",
      created_at: "2026-02-14T09:15:00",
      status: "ACTIVE",
    },
    {
      id: 22,
      name: "Arul S",
      email: "arul@gmail.com",
      role: "SUB_ADMIN",
      last_login: "1 min ago",
      created_at: "2026-02-14T09:15:00",
      status: "PENDING",
    },
    {
      id: 23,
      name: "Praveen kumar",
      email: "praveen@gmail.com",
      role: "TRAINEE",
      last_login: "2 hours ago",
      created_at: "2026-02-14T09:15:00",
      status: "INACTIVE",
    },
  ];

  const allRoles = ["ADMIN", "SUB_ADMIN", "TRAINER", "TRAINEE"];
  const allStatuses = ["ACTIVE", "INACTIVE", "PENDING"];

  const usersManagementColumns = [
    {
      key: "check_box",
      label: (
        <div className="flex justify-center">
          <input
            type="checkbox"
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="accent-primary dark:accent-transparent"
          />
        </div>
      ),
      align: "left",
      width: "5%",
      render: (row) => (
        <div className="flex justify-center">
          <input
            type="checkbox"
            checked={selectedRows.includes(row.id)}
            onChange={(e) => handleSelectRow(row.id, e.target.checked)}
            className="accent-primary dark:accent-transparent"
          />
        </div>
      ),
    },
    {
      key: "profile",
      label: "Profile",
      width: "8%",
      align: "center",
      render: (row) => (
        <span className="flex justify-center items-center">
          <Avatar name={row.name} />
        </span>
      ),
    },
    {
      key: "name",
      label: "Name",
      width: "15%",
      align: "left",
      render: (row) => <p className="text-body">{row.name}</p>,
    },
    {
      key: "email",
      label: "Email",
      align: "left",
      width: "25%",
    },
    {
      key: "role",
      label: "Role",
      width: "12%",
      render: (row) => <StatusPill status={row.role} />,
    },
    {
      key: "last_login",
      label: "Last Login",
      width: "15%",
    },
    {
      key: "date",
      label: "Created At",
      width: "20%",
      render: (row) => (
        <span className="text-body">{formatDateTime(row.created_at)}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "12%",
      render: (row) => <StatusPill status={row.status} />,
    },
    {
      key: "actions",
      label: "Actions",
      width: "12%",
      render: (row) => {
        const actions = ["mingcute:pencil-line", "ic:baseline-delete"];
        return (
          <div className="flex items-center justify-center gap-3">
            {actions.map((icon, index) => (
              <Button
                key={index}
                frontIconName={icon}
                frontIconHeight="18"
                frontIconWidth="18"
                bgClass=""
                textClass=""
                onClick={() => {
                  if (icon === "mingcute:pencil-line") handleOpenEdit(row);
                }}
              />
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full p-4 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-h3 font-semibold">User Management</h3>
        {selectedRows.length === 0 && (
          <div className="hidden md:flex items-center gap-3">
            <Button
              buttonName="Export as CSV"
              frontIconName="material-symbols:download"
              frontIconWidth="26"
              frontIconHeght="26"
              className="px-3 py-1.5 text-sm rounded-md"
              bgClass=""
              textClass="text-body"
            />

            <Button
              buttonName="Add New User"
              frontIconName="mdi:plus"
              frontIconWidth="26"
              frontIconHeght="26"
              className="px-3 py-1.5 text-sm rounded-md"
              bgClass="bg-primary"
              textClass="text-white"
              onClick={() => {
                setOpen(true);
                setEditingUser(null); // 1. Clear any previous edit data
                setOpen(true);
              }}
            />
          </div>
        )}
      </div>

      {selectedRows.length === 0 ? (
        <div className="flex flex-col md:flex-row gap-4 mb-4 ">
          <div className="md:w-96">
            <Input
              icon="ic:twotone-search"
              border="border-default"
              paddingClass="py-2"
              widthClass="w-full md:w-96"
              placeholder="Search by name or email..."
            />
          </div>

          <div className="grid grid-cols-2 md:flex md:items-center gap-3">
            <div className="col-span-1">
              <Select
                label="Users:"
                options={[
                  { label: "All Users", value: "all" },
                  { label: "Admin", value: "admin" },
                  { label: "Sub Admin", value: "sub_admin" },
                  { label: "Trainer", value: "trainer" },
                  { label: "Trainee", value: "trainee" },
                ]}
              />
            </div>
            <div className="col-span-1">
              <Select
                label="Sort by:"
                options={[
                  { label: "Newest First", value: "newest" },
                  { label: "Oldest First", value: "oldest" },
                  { label: "Name (A - Z)", value: "name_asc" },
                  { label: "Name (Z - A)", value: "name_desc" },
                  { label: "Last Active", value: "last_active" },
                ]}
              />
            </div>
            <div className="col-span-1 md:col-span-1">
              <Select
                label="Status:"
                options={[
                  { label: "All", value: "all" },
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                  { label: "Pending", value: "pending" },
                ]}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center py-5 gap-3  whitespace-nowrap">
          <div className="flex gap-8 px-2">
            <span>{selectedRows.length} Rows selected</span>
            <Button
              frontIconName="maki:cross"
              frontIconHeght="16"
              frontIconWidth="16"
              bgClass=""
              textClass=""
              onClick={() => setSelectedRows([])}
            />
          </div>
          <div className="flex items-center gap-3  whitespace-nowrap">
            <p className="text-caption">Bulk Actions:</p>
            <Select
              label="Change Status:"
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
            <Button
              buttonName="Delete"
              frontIconName="ic:baseline-delete"
              frontIconWidth="20"
              frontIconHeght="20"
              className="px-4 py-2 rounded-sm"
              bgClass=""
              textClass="text-body"
            />
          </div>
        </div>
      )}
      <div>
        <div className="w-full overflow-x-auto">
          <DataTable
            selectedRows={selectedRows}
            columns={usersManagementColumns}
            data={data}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            total={data.length}
            renderMobileCard={(row) => (
              <div className="shrink-0 flex flex-col items-end gap-2 pt-0.5">
                <div className="flex gap-3">
                  <StatusPill status={row.role} />
                  <StatusPill status={row.status} />
                </div>
                <div className="flex gap-3 mt-1">
                  <Button
                    frontIconName="mingcute:pencil-line"
                    frontIconHeight="18"
                    frontIconWidth="18"
                    bgClass=""
                    textClass=""
                    onClick={() => handleOpenEdit(row)}
                  />
                  <Button
                    frontIconName="ic:baseline-delete"
                    frontIconHeight="18"
                    frontIconWidth="18"
                    bgClass=""
                    textClass=""
                  />
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {open && (
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title={editingUser ? "Edit User" : "Create New User"}
        >
          <CreateUser
            isEdit={!!editingUser}
            userData={editingUser}
            onClose={() => setOpen(false)}
            roles={allRoles}
            statuses={allStatuses}
          />
        </Modal>
      )}
    </div>
  );
}

export default UsersManagement;
