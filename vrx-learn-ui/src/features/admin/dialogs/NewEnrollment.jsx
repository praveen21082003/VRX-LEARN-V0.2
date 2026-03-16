import React from "react";
import { Input, Select, Button } from "@/components/ui";

function NewEnrollment({ isEdit = false, userData = {}, onClose ,courses = [], Names = [],Status=[]}) {
  const nameOptions = Names.map((name) => ({ label: name, value: name }));
const courseOptions = courses.map((course) => ({ label: course, value: course }));
const statusOptions = Status.map((s) => ({label:s , value:s.toLowerCase()}))
  return (
    <div className="space-y-4">
      <Select
        inputLabel="Name"
        options={nameOptions}
        borderClass="border-input-border"
      />
      <Select
        inputLabel="Course"
        options={courseOptions}
        borderClass="border-input-border"
      />

      {isEdit && (
        <Select
          inputLabel="Status"
          defaultValue={userData?.status?.toLowerCase() || "active"}
          options={statusOptions}
          borderClass="border-input-border"
        />
      )}

      <div className="flex w-full gap-3">
        <Button
          buttonName="Cancel"
          className="px-4 py-2 rounded-lg w-full"
          bgClass=""
          textClass=""
        />
        <Button
          buttonName={isEdit ? "Save Changes" : "Add Enrollment"}
          className="px-4 py-2 rounded-lg w-full"
        />
      </div>
    </div>
  );
}

export default NewEnrollment;
