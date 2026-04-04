import React, { useState, useEffect } from "react";
import { useUsersData } from "../../hooks/useUsersData";

import {
  Icon,
  Input,
  Button,
  DataTable,
  Avatar,
  StatusPill,
  Select,
  Modal,
  UserCard,
} from "@/components/ui";

import formatDateTime from "@/utils/formatDateTime";
import CreateUser from "../../dialogs/CreateUser";

function UsersManagement() {
  const isMobile = window.innerWidth < 768;

  const { users, fetchUsers, loading, total } = useUsersData();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [selectedRows, setSelectedRows] = useState([]);

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);


  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");

  const [debouncedSearch, setDebouncedSearch] = useState("");


  // console.log("Current Page:", page, "Users Count:", users.length);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);


  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(users.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setOpen(true);
  };


  useEffect(() => {

    const sortMapping = {
      create_asc: { sortByCreatedAt: "asc" },
      create_desc: { sortByCreatedAt: "desc" },
      user_asc: { sortByUsername: "asc" },
      user_desc: { sortByUsername: "desc" },
    };

    fetchUsers({
      page,
      limit: pageSize,
      nameOrEmail: debouncedSearch || undefined,
      role: role !== "all" ? role : undefined,
      status: status !== "all" ? status : undefined,
      ...(sortMapping[sort] || {}),
    });
  }, [page, pageSize, debouncedSearch, role, status, sort]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, role, status, sort]);


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
      key: "lastLogin",
      label: "Last Login",
      width: "15%",
      render: (row) => (
        <span className="text-caption">{formatDateTime(row.lastLogin)}</span>
      ),
    },
    {
      key: "createdAt",
      label: "Created At",
      width: "20%",
      render: (row) => (
        <span className="text-caption">{formatDateTime(row.createdAt)}</span>
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
        const actions = ["mingcute:pencil-line", "mdi:delete-outline"];
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
    <div className="w-full p-4 bg-transparent text-main border-b border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-h3 font-semibold">User Management</h3>
        {selectedRows.length === 0 && (
          <div className="flex items-center lg:gap-3">
            <Button
              buttonName="Export as CSV"
              frontIconName="material-symbols:download"
              frontIconWidth="26"
              frontIconHeght="26"
              className="lg:p-3 lg:py-1.5 text-sm rounded-md"
              bgClass=""
              textClass="lg:text-body"
              isMobile={isMobile}
            />

            <Button
              buttonName="Add New User"
              frontIconName="mdi:plus"
              frontIconWidth="26"
              frontIconHeght="26"
              className="lg:p-3 lg:py-1.5 text-sm rounded-md"
              bgClass="lg:bg-primary"
              textClass="lg:text-white"
              onClick={() => {
                setOpen(true);
                setEditingUser(null); // 1. Clear any previous edit data
                setOpen(true);
              }}
              isMobile={isMobile}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 md:flex md:items-center gap-3">
            <div className="col-span-1">
              <Select
                label="Users:"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                options={[
                  { label: "All Users", value: null },
                  { label: "Admin", value: "admin" },
                  { label: "Sub Admin", value: "subadmin" },
                  { label: "Trainer", value: "trainer" },
                  { label: "Trainee", value: "trainee" },
                ]}
              />
            </div>
            <div className="col-span-1">
              <Select
                label="Sort by:"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                options={[
                  { label: "None", value: null },
                  { label: "Newest First", value: "create_desc" },
                  { label: "Oldest First", value: "create_asc" },
                  { label: "Username (A - Z)", value: "user_asc" },
                  { label: "Username (Z - A)", value: "user_desc" },
                ]}
              />
            </div>
            <div className="col-span-1 md:col-span-1">
              <Select
                label="Status:"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={[
                  { label: "All", value: "" },
                  { label: "Active", value: "active" },
                  // { label: "Inactive", value: "inactive" },
                  // { label: "Pending", value: "pending" },
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
            total={total}
            loading={loading}
            selectedRows={selectedRows}
            columns={usersManagementColumns}
            data={users}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            renderMobileCard={(row) => (
              <UserCard
                row={row}
                columns={usersManagementColumns}
              />
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
            onSuccess={fetchUsers}
            isEdit={!!editingUser}
            userData={editingUser}
            onClose={() => setOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default UsersManagement;
