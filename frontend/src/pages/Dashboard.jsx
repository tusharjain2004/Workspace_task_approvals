import { useEffect, useState } from "react";
import api from "../services/api";
import CreateTaskForm from "../components/CreateTaskForm";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = () => {
    setLoading(true);
    api
      .get("tasks/")
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const approveTask = async (taskId) => {
    try {
      await api.patch(`tasks/${taskId}/approve/`);
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to approve task");
    }
  };

  const rejectTask = async (taskId) => {
    try {
      await api.patch(`tasks/${taskId}/reject/`);
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to reject task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-white text-center">
          Dashboard
        </h1>

        {/* Create Task Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Create Task
          </h2>

          <CreateTaskForm onTaskCreated={fetchTasks} />
        </div>

        {/* Task List Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Tasks
          </h2>

          {loading ? (
            <p className="text-white/80">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-white/80">No tasks available</p>
          ) : (
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-white/20 rounded-xl p-4 flex items-center justify-between text-white"
                >
                  {/* Task Info */}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {task.title}
                    </h3>

                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium
                        ${
                          task.status === "PENDING"
                            ? "bg-yellow-400 text-black"
                            : task.status === "APPROVED"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  {task.status === "PENDING" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => approveTask(task.id)}
                        className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectTask(task.id)}
                        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;











// import { useEffect, useState } from "react";
// import api from "../services/api";
// import CreateTaskForm from "../components/CreateTaskForm";

// function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTasks = () => {
//     setLoading(true);
//     api.get("tasks/")
//       .then((res) => {
//         setTasks(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   };


//   const approveTask = async (taskId) => {
//   try {
//     await api.patch(`tasks/${taskId}/approve/`);
//     fetchTasks(); // refresh list
//   } catch (error) {
//     console.error(error);
//     alert("Failed to approve task");
//   }
// };

// const rejectTask = async (taskId) => {
//   try {
//     await api.patch(`tasks/${taskId}/reject/`);
//     fetchTasks(); // refresh list
//   } catch (error) {
//     console.error(error);
//     alert("Failed to reject task");
//   }
// };


//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
    
//     <div>
//       <h1>Dashboard</h1>

//       {/* Create Task Form */}
//       <CreateTaskForm onTaskCreated={fetchTasks} />

//       <hr />

//       {/* Task List */}
//       {loading ? (
//         <p>Loading tasks...</p>
//       ) : tasks.length === 0 ? (
//         <p>No tasks available</p>
//       ) : (
//         <ul>
//   {tasks.map((task) => (
//     <li key={task.id} style={{ marginBottom: "10px" }}>
//       <strong>{task.title}</strong> — {task.status}

//       {task.status === "PENDING" && (
//         <>
//           <button
//             onClick={() => approveTask(task.id)}
//             style={{ marginLeft: "10px" }}
//           >
//             Approve
//           </button>

//           <button
//             onClick={() => rejectTask(task.id)}
//             style={{ marginLeft: "5px" }}
//           >
//             Reject
//           </button>
//         </>
//       )}
//     </li>
//   ))}
// </ul>

//       )}
//     </div>
//   );
// }

// export default Dashboard;


