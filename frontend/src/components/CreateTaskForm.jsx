import { useState } from "react";
import api from "../services/api";

function CreateTaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const CURRENT_USER_ID = 1;
  const [submitting, setSubmitting] = useState(false);

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("created_by", CURRENT_USER_ID);
    formData.append("assigned_to", CURRENT_USER_ID);
    formData.append("due_date", dueDate);

    if (file) {
      formData.append("file", file);
    }

    await api.post("tasks/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      <div>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-lg px-4 py-2 bg-white/90 text-black
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="w-full rounded-lg px-4 py-2 bg-white/90 text-black
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="w-full rounded-lg px-4 py-2 bg-white/90 text-black
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-white
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:bg-white file:text-indigo-700
                     hover:file:bg-gray-100 cursor-pointer"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-white text-indigo-700
                   font-semibold text-lg hover:bg-gray-100 transition shadow-md"
      >
        Create Task
      </button>

    </form>
  );
}

export default CreateTaskForm;










// import { useState } from "react";
// import api from "../services/api";

// function CreateTaskForm({ onTaskCreated }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [dueDate, setDueDate] = useState("");

//   const CURRENT_USER_ID = 1;
//   const [submitting, setSubmitting] = useState(false);

//   const [file, setFile] = useState(null);


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("created_by", CURRENT_USER_ID);
//     formData.append("assigned_to", CURRENT_USER_ID);
//     formData.append("due_date", dueDate);

//     if (file) {
//       formData.append("file", file);
//     }

//     await api.post("tasks/", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Create Task</h3>

//       <div>
//         <input
//           type="text"
//           placeholder="Task Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <textarea
//           placeholder="Task Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <input
//           type="datetime-local"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//       </div>


//       <button type="submit">Create Task</button>
//     </form>
//   );
// }

// export default CreateTaskForm;
















// import { useState } from "react";
// import api from "../services/api";

// function CreateTaskForm({ onTaskCreated }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [dueDate, setDueDate] = useState("");

//   const CURRENT_USER_ID = 1;
//   const [submitting, setSubmitting] = useState(false);

//   const [file, setFile] = useState(null);


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//   //   const payload = {
//   //     title: title,
//   //     description: description,
//   //     created_by: CURRENT_USER_ID,     // TEMP (logged-in user)
//   //     assigned_to: CURRENT_USER_ID,    // TEMP (self-approval)
//   //     due_date: dueDate,
//   //   };

//   //   try {
//   //     setSubmitting(true);
//   //     await api.post("tasks/", payload);
//   //     setSubmitting(false);


//   //     // await api.post("tasks/", payload);
//   //     // alert("Task created successfully");

//   //     // Clear form
//   //     setTitle("");
//   //     setDescription("");
//   //     setDueDate("");

//   //     // Refresh task list
//   //     onTaskCreated();
//   //   } catch (error) {
//   //     console.error(error);
//   //     alert("Failed to create task");

//   //   }
//   // };


//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("created_by", CURRENT_USER_ID);
//     formData.append("assigned_to", CURRENT_USER_ID);
//     formData.append("due_date", dueDate);

//     if (file) {
//       formData.append("file", file);
//     }

//     await api.post("tasks/", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Create Task</h3>

//       <div>
//         <input
//           type="text"
//           placeholder="Task Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <textarea
//           placeholder="Task Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <input
//           type="datetime-local"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//       </div>


//       <button type="submit">Create Task</button>
//     </form>
//   );
// }

// export default CreateTaskForm;
