
let reportEle = null
let tasksSection = null
let resetResult = null
let editID = ""
//get tasks
const getTasks = async () => {

    tasksSection.style.display = "none"
    tasksSection.innerHTML = ""

    let response = await fetch("/api/v1/tasks")
    response = await response.json()

    _tasks = response.result

    //     <section id="tasks">
    //     <!-- <section class="task" id="task1">
    //         <img src="./images/cross.png"  id="cross1" alt="Cross">
    //         <img src="./images/tick.png" alt="Tick" id="tick1" class="tick">
    //         <p id="task-name">Paint House...</p>
    //         <img id="edit1" src="./images/edit.jpg" alt="Edit" >
    //         <img id="delete1" src="./images/delete.jpg" alt="Delete" >
    //     </section> -->
    // </section>
    let i = 1
    for (let _task of _tasks) {
        const taskSection = document.createElement("section")
        taskSection.setAttribute("id", `task${i}`)
        taskSection.classList.add("task")
        const crossImg = document.createElement("img")
        crossImg.setAttribute("id", `cross${_task._id}`)
        crossImg.setAttribute("src", "./images/cross.png")
        crossImg.addEventListener("click",(event) => { editCompletion(event.target.id) })
        taskSection.appendChild(crossImg)
        const tickImg = document.createElement("img")
        tickImg.setAttribute("id", `tick${_task._id}`)
        tickImg.setAttribute("src", "./images/tick.png")



        const p = document.createElement("p")
        p.setAttribute("id", `task-name${_task._id}`)
        p.innerText = _task.name
        p.classList.add("task-name")
        if (_task.completed) {
            crossImg.style.display = "none"
            p.style.textDecoration = "line-through"
        }

        else
            tickImg.style.display = "none"
        const editImg = document.createElement("img")
        editImg.setAttribute("id", `edit${_task._id}`)
        editImg.setAttribute("src", "./images/edit.jpg")
        editImg.addEventListener("click", (event) => editRender(event.target.id))

        const deleteImg = document.createElement("img")
        deleteImg.setAttribute("id", `delete${_task._id}`)
        deleteImg.setAttribute("src", "./images/delete.jpg")
        deleteImg.addEventListener("click", (event) => deleteClicked(event.target.id))



        taskSection.appendChild(crossImg)
        taskSection.appendChild(tickImg)
        taskSection.appendChild(p)
        taskSection.appendChild(editImg)
        taskSection.appendChild(deleteImg)
        tasksSection.appendChild(taskSection)
    }
    tasksSection.style.display = "block"
    document.getElementById("main-wrapper").style.display = "block"

}
//delete task
const deleteTask = async (id) => {
    let params = RequestInit = {
        method: "DELETE"

    }

    await fetch(`api/v1/tasks/${id}`, params)
    getTasks()

    setTimeout(removeReport, 2000)

}
//delete clicked
const deleteClicked = (id) => {
    id = id.replace("delete", "")
    // const 
    deleteTask(id)

}
// remove report for task name
const removeReport = () => {
    reportEle.style.display = "none"
}
const removeResetResult = () => {
    resetResult.style.display = "none"
}
const editCompletion = async (id) => {
   
    id=id.replace("cross","")
    let params=RequestInit={
        method:"PATCH",body:JSON.stringify(
            {
                name:document.getElementById("task-name"+id).innerText,
                completed:true
            }
        ),headers:{
            "Content-type":"application/json"
    }
    }   
  
        await fetch(`/api/v1/tasks/${id}`,params)
       document.getElementById("tick" + id).style.display ="block"
        document.getElementById("cross" + id).style.display = "none"
        document.getElementById("task-name" + id).style.textDecoration = "line-through"
}
// add task
const addTask = async () => {


    const taskName = document.getElementById("input-task").value
    if (!taskName) {
        reportEle.innerText = "Task Name should not be empty"
        reportEle.style.display = "block"
        reportEle.style.color = "var(--failure)"
        setTimeout(removeReport, 2000)

        return
    }

    if (taskName.length > 50) {
        reportEle.innerText = "At max Task Name should be 50 characters long"
        reportEle.style.display = "block"
        reportEle.style.color = "var(--failure)"
        setTimeout(removeReport, 2000)

        return
    }
    let params = RequestInit = {
        method: "POST", body: JSON.stringify(
            {
                name: taskName
            }
        ), headers: {
            "Content-type": "application/json"
        }
    }
    await fetch("/api/v1/tasks", params)
    reportEle.style.color = "var(--success)"
    reportEle.innerText=`Success- Added ${taskName}`
    reportEle.style.display = "block"
    document.getElementById("input-task").value = ""
    setTimeout(removeReport, 2000)
    getTasks()
    // _tasks=await tasks.json()
   
}
//back to tasks button
const backToTasks = () => {
    document.getElementById("edit-task-wrapper").style.display = "none"
    getTasks()
}
//edit button function
const editRender = (id) => {
    id = id.replace("edit", "")

    document.getElementById("edit-task-name").innerText =
        document.getElementById("task-name" + id).innerText
    document.getElementById("main-wrapper").style.display = "none"
    document.getElementById("edit-task-wrapper").style.display = "block"
    editID = id
}
// edit button handling
const editButtonClicked = async () => {


    const taskName = document.getElementById("name-input").value

    if (!taskName) {
        resetResult.innerText = "Task Name should not be empty"
        resetResult.style.color = "var(--failure)"
        resetResult.style.display = "block"
        setTimeout(removeResetResult, 2000)

        return
    }
    if (taskName.length > 50) {
        resetResult.innerText = "At max Task Name should be 50 characters long"
        resetResult.style.display = "block"
        resetResult.style.color = "var(--failure)"

        setTimeout(removeResetResult, 2000)

        return
    }
    const checked = document.getElementById("check").checked

    let params = RequestInit = {
        method: "PATCH", body: JSON.stringify(
            {
                name: taskName,
                completed: checked
            }
        ), headers: {
            "Content-type": "application/json"
        }
    }
    const prevTaskNmae = document.getElementById("task-name" + editID).innerText
    const prevChecked = document.getElementById("cross" + editID).style.display === "none"
    if (taskName === prevTaskNmae && prevChecked === checked) {
        resetResult.innerText = "Details are same as previous task. Please change some to edit."
        resetResult.style.display = "block"
        resetResult.style.color = "var(--failure)"

        setTimeout(removeResetResult, 2000)

        return
    }
   
    await fetch(`/api/v1/tasks/${editID}`, params)
    let prevStatus = ""
    prevChecked === false ? prevStatus = "Not Completed" : prevStatus = "Completed"
    let currStatus = ""
    checked === false ? currStatus = "Not Completed" : currStatus = "Completed"
    
    
    resetResult.innerText = `Successfully Edited - from ${prevTaskNmae} , ${prevStatus} to ${taskName} , ${currStatus}`
    let crossImg = document.getElementById("cross" + editID)
    let tickImg = document.getElementById("tick" + editID)
    if (checked) {
        crossImg.style.display = "none"

    }

    else
        crossImg.style.display = "block"
    resetResult.style.color = "var(--success)"
    resetResult.style.display = "block"
    document.getElementById("edit-task-name").innerText =
        taskName
    document.getElementById("check").checked =
        false

    document.getElementById("name-input").value = ""
    setTimeout(removeResetResult, 2000)



}

function start() {
    getTasks()

    //add event listener to add
    document.getElementById("task-add-button").addEventListener("click", () => {
        addTask()
    })
    document.getElementById("back-button").addEventListener("click", () => {
        backToTasks()
    })
    document.getElementById("edit-button").addEventListener("click", () => {
        editButtonClicked()
    })

}


document.addEventListener("DOMContentLoaded", () => {
    reportEle = document.getElementById("report")
    tasksSection = document.getElementById("tasks")
    resetResult = document.getElementById("reset-result")
    start()
})

