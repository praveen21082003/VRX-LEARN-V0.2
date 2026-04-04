import React, { useState, useRef, useEffect } from "react";
import { Input, Button, Icon, TextEditor } from "@/components/ui";
import { useClickOutside } from "@/hooks/useClickOutside";

function NewCourses({ trainers = [], courseTitles = [] }) {
  const [title, setTitle] = useState("");
  const [selectedTrainers, setSelectedTrainers] = useState([]);
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    const payload = {
      title,
      trainers: selectedTrainers,
      description,
    };
    console.log("New Course Payload:", payload);
    // TODO: call your API / parent handler here
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <Input
        label="Title"
        placeholder="Enter course title"
        paddingClass="p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="relative">
        <Input
          icon="ic:twotone-search"
          // border="border-default"
          paddingClass="py-2"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search &&
          <div className="absolute mt-1 w-full h-36 bg-background border border-default shadow-md overflow-y-auto z-20">
            <p>praveen</p>
            <p>praveen</p>
            <p>praveen</p>
            <p>praveen</p>
            <p>praveen</p>
            <p>praveen</p>
            <p>praveen</p>
            <p>praveen</p>
            <p>praveen</p>
            <p>praveen</p>
            <p>praveen</p>
            <p>praveen</p>
            <p>praveen</p>
            <p>praveen</p>
          </div>
        }
      </div>

      {/* Trainers — multi-select with search */}
      {/* <MultiSelectSearch
        label="Trainers"
        options={trainers}
        value={selectedTrainers}
        onChange={setSelectedTrainers}
      /> */}

      {/* Short Description */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Short Description</label>
        <textarea
          rows={7}
          className="w-full p-3 rounded-md  text-sm leading-relaxed resize-none overflow-hidden border  focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          placeholder="The z/OS System Programming course provides an in-depth understanding of IBM mainframe operating systems with a strong focus on system-level concepts, configuration, and administration. This course is designed to help learners understand how enterprise-class mainframe environments operate and how critical business workloads are managed reliably and securely."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
        />
      </div>
      {!isOpen &&
        <div className="flex justify-between" onClick={() => setIsOpen((prev) => !prev)}>
          <label className="text-h5">Add Long Description<span className="text-caption">(optional)</span></label>
          <Icon name="iconamoon:arrow-down-2" />
        </div>
      }
      {isOpen &&
        <div>
          <label className="text-h5">Description</label>
          <TextEditor
            value="Sample Text Files "
            onChange={(value) => handleChange("Long Description", value)}
          />
        </div>
      }


      {/* Actions */}
      <div className="flex w-full gap-3">
        <Button
          buttonName="Cancel"
          className="px-4 py-2 rounded-lg w-full"
          bgClass=""
          textClass=""
        />
        <Button
          buttonName="Add Course"
          className="px-4 py-2 rounded-lg w-full"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default NewCourses;



// function MultiSelectSearch({ label, options = [], value = [], onChange }) {
//   const [search, setSearch] = useState("");
//   const [isOpen, setIsOpen,ref,toggle] = useClickOutside(false);

//   const filteredOptions = options.filter((opt) =>
//     opt.toLowerCase().includes(search.toLowerCase()),
//   );

//   const handleSelect = (opt) => {
//     if (value.includes(opt)) {
//       onChange(value.filter((v) => v !== opt));
//     } else {
//       onChange([...value, opt]);
//     }
//     setSearch("");
//   };

//   const handleRemove = (opt, e) => {
//     e.stopPropagation();
//     onChange(value.filter((v) => v !== opt));
//   };

//   return (
//     <div className="flex flex-col gap-1.5" ref={ref}>
//       {label && <label className="text-sm font-semibold">{label}</label>}

//       {/* Input box */}
//       <div
//         className="flex items-center flex-wrap gap-1.5 min-h-[42px] px-3 py-2 rounded-md cursor-text bg-white border border-black focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
//         onClick={toggle}
//       >
//         {/* Search icon */}
//         <svg
//           className="text-gray-400 shrink-0"
//           width="16"
//           height="16"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//         >
//           <circle cx="11" cy="11" r="8" />
//           <path d="m21 21-4.35-4.35" />
//         </svg>

//         {/* <Icon name="mingcute:pencil-line" /> */}

//         {/* Selected tags */}
//         {value.map((v) => (
//           <span
//             key={v}
//             className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-sm text-gray-700"
//           >
//             {v}
//             <button
//               type="button"
//               className="text-gray-500 hover:text-gray-800 leading-none"
//               onClick={(e) => handleRemove(v, e)}
//             >
//               ×
//             </button>
//           </span>
//         ))}

//         {/* Text input */}
//         <input
//           type="text"
//           className="flex-1 min-w-0 outline-none bg-transparent text-sm "
//           placeholder={value.length === 0 ? "Search by name or email" : ""}
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setIsOpen(true);
//           }}
//           onFocus={() => setIsOpen(true)}
//         />

//         {/* Chevron */}
//         <svg
//           className={`text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
//           width="16"
//           height="16"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//         >
//           <path d="m6 9 6 6 6-6" />
//         </svg>
//       </div>

//       {/* Dropdown */}
//       {isOpen && (
//         <div className="border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto mt-1">
//           {/* <div className="absolute top-0 left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto"> */}
//           {filteredOptions.length === 0 ? (
//             <div className="px-3 py-2 text-sm text-gray-400">
//               No results found
//             </div>
//           ) : (
//             filteredOptions.map((opt) => (
//               <div
//                 key={opt}
//                 className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
//                   value.includes(opt) ? "" : "text-gray-700"
//                 }`}
//                 onMouseDown={(e) => {
//                   e.preventDefault(); // prevent blur before click
//                   handleSelect(opt);
//                 }}
//               >
//                 <input
//                   type="checkbox"
//                   readOnly
//                   checked={value.includes(opt)}
//                   className="accent-primary pointer-events-none"
//                 />
//                 {opt}
//               </div>
//             ))
//           )}
//           {/* </div> */}
//         </div>
//       )}
//     </div>
//   );
// }
