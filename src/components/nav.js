import { useAuth } from "../firebase/auth";
import { useEffect, useState } from "react";
import { Dialog } from "@material-ui/core";
import { addTask, getTasks, deleteTask } from "../firebase/firestore";
import CrossButton from "./crossButton";
import BarChart from "./barChart";



function Nav(props) {
  const { signOut, authUser } = useAuth();
  const [listOpen, setListOpen] = useState(false);
  const [statsOpen,setStatsOpen] = useState(false);
  const [chartData,setChartData] = useState(
    {
    labels: props.tasks.map((task)=> task.taskName),
    datasets:[{
        label: "time spent",
        data: props.tasks.map((task)=> task.time)
    }]
});
 

  
  const handleUpload = async () => {
    try {
      let task = document.querySelector("input");
      if (task.value === "") {
        alert("Please Enter a Valid Name!");
        return;
      }

      for (const element of props.tasks) {
        if (element.taskName === task.value) {
          alert("Task already exists!");
          return;
        }
      }

      await addTask(authUser?.uid, task.value, 0);
      task.value = "";
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async (id, taskName) => {
    try {
      let c = window.confirm(
        'Are you sure you want to delete the task "' +
          taskName +
        '"? All the data related to this task will be deleted.'
      );
      if (!c) return;
      await deleteTask(id);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const unsubscribe = await getTasks(authUser?.uid, props.setTasks);
      return () => unsubscribe();
    }

    if (authUser) {
      fetchData();
    }
  }, [authUser]);

  useEffect(() =>{
    setChartData({
        labels: props.tasks.map((task)=> task.taskName),
        datasets:[{
            label: "time spent",
            data: props.tasks.map((task)=> task.time),
            backgroundColor:[
                "#f54e4e", "blue", "green","yellow", "Orange"
            ]
        }]
    })
  },[props.tasks])
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        backgroundColor: "black",
      }}
    >
      <Dialog fullScreen open={listOpen} onClose={() => setListOpen(false)}>
        <div
          style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            backgroundColor: "black",
            justifyContent: "center",
            position: "fixed",
            overflow: "scroll",
          }}
        >
          <div id="managetasks">
            <h2 style={{ textAlign: "center", color: "#f54e4e" }}>Tasks</h2>
            <CrossButton
              className={"closeButton"}
              click={() => {
                setListOpen(false);
              }}
              style={{
                position: "absolute",
                right: 10,
                top: 10,
                width: "60px",
                cursor: "pointer",
              }}
            />
            <div
              style={{
                display: "flex",
                width: "40vw",
                flexDirection: "column",
              }}
            >
              <h2
                style={{
                  textAlign: "left",
                  marginBottom: "10px",
                  color: "white",
                }}
              >
                Your Tasks
              </h2>
              <div style={{ backgroundColor: "white", height: "5px" }}> </div>
              <h5 style={{ color: "white" }}>Here are all your tasks.</h5>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  height: "100%",
                  padding: "10px",
                }}
              >
                {props.tasks.map((task) => (
                  <div
                    key={task.taskName}
                    style={{
                      display: "flex",
                      border: "2px #443433",
                      borderStyle: "solid",
                      height: "60px",
                      borderRadius: "10px",
                      bottom: "5px",
                    }}
                  >
                    <p style={{ marginLeft: "2.5%", color: "white" }}>
                      {task.taskName}
                    </p>
                    <CrossButton
                      key={task.taskName}
                      click={() => {
                        handleDelete(task.id, task.taskName);
                      }}
                      style={{
                        marginLeft: "auto",
                        width: "60px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <form
              style={{
                backgroundColor: "black",
                display: "flex",
                border: "2px #f54e4e",
                borderStyle: "solid",
                height: "70px",
                borderRadius: "10px",
                position: "sticky",
                bottom: "10px",
              }}
            >
              <input
                type="text"
                placeholder="Add New Task"
                style={{
                  backgroundColor: "transparent",
                  border: 0,
                  height: "80%",
                  marginTop: "0.5%",
                  marginLeft: "0.5%",
                  width: "100%",
                  color: "white",
                }}
              />
              <button
                type="button"
                style={{ width: "60px", cursor: "pointer" }}
                onClick={handleUpload}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </Dialog>

      <Dialog fullScreen open={statsOpen} onClose={() => setStatsOpen(false)}>
        <div
          style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            backgroundColor: "black",
            justifyContent: "center",
            position: "fixed",
            overflow: "scroll",
          }}
        >
          <div id="managetasks">
            <h2 style={{ textAlign: "center", color: "#f54e4e" }}>Stats</h2>
            <CrossButton
              className={"closeButton"}
              click={() => {
                setStatsOpen(false);
              }}
              style={{
                position: "absolute",
                right: 10,
                top: 10,
                width: "60px",
                cursor: "pointer",
              }}
            />
            <div
              style={{
                display: "flex",
                width: "40vw",
                flexDirection: "column",
              }}
            > 
             <div style={{ backgroundColor: "white", height: "5px" }}> </div>
            <h2 style={{ color: "white" }}>Total Productive time: 123</h2>
            <div style ={{display:'flex'}}>
            <h3 style={{ color: "white",padding: 0, margin:0}}>#1</h3>
            <h3 style={{ color: "white",padding: 0, margin:0,paddingLeft: '0.5%'}}>Task 1:</h3>
            <h3 style={{ color: "white",paddingLeft: '3%', margin:0,paddingBottom:'2%'}}>time</h3>
            </div>
            <div style ={{display:'flex'}}>
            <h3 style={{ color: "white",padding: 0, margin:0}}>#2</h3>
            <h3 style={{ color: "white",padding:0, margin:0,paddingLeft: '0.5%'}}>Task 1:</h3>
            <h3 style={{ color: "white",paddingLeft: '3%', margin:0,paddingBottom:'2%'}}>time</h3>
            </div>
            <div style ={{display:'flex'}}>
            <h3 style={{ color: "white",padding: 0, margin:0}}>#1</h3>
            <h3 style={{ color: "white",padding:0, margin:0,paddingLeft: '0.5%'}}>Task 1:</h3>
            <h3 style={{ color: "white",paddingLeft: '3%', margin:0,paddingBottom:'2%'}}>time</h3>
            </div>
            <div style={{ backgroundColor: "white", height: "5px" }}> </div>
              <div style ={{height:'50vh'}}>
              <BarChart data = {chartData}></BarChart>
              </div>
            </div>
           
          </div>
        </div>
      </Dialog>
      <div style={{ height: "50px", width: "50px", marginBottom: "20px" }} onClick = {setStatsOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
        </svg>
      </div>
      <div>
        <select className={"dropdown"}>
          <option
            style={{ color: "white", width: "200px", background: "black" }}
          >
            default
          </option>
          {props.tasks.map((task) => (
            <option
              key={task.id}
              style={{ color: "white", width: "200px", background: "black" }}
            >
              {task.taskName}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          height: "50px",
          width: "50px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
        onClick={() => setListOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
          <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
        </svg>
      </div>
      <div
        style={{
          height: "50px",
          width: "50px",
          position: "absolute",
          right: "0",
          paddingRight: "2%",
          cursor: "pointer",
        }}
        onClick={signOut}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

export default Nav;
