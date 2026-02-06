// function addTask(){
//     let newTask = document.createElement('li')
//     let taskList = document.getElementById('taskList')
//     taskList.appendChild(newTask)
//     newTask.textContent = document.getElementById('inputTask').value
//     document.getElementById('inputTask').value = ""
//     deleteTask(newTask)
// }

// function deleteTask(newTask){
//       let deleteBtn = document.createElement('button')
//       deleteBtn.textContent = "Delete"
//       newTask.appendChild(deleteBtn)
//       deleteBtn.onclick = function(){
//         newTask.remove()
//       }
// }


// 🔥 Firebase Configuration
var firebaseConfig = {
  apiKey: "AIzaSyCshpUrj3divMD7SzxXdrDv1sw3KtoCBSA",
  authDomain: "to-do-app-2eb08.firebaseapp.com",
  databaseURL: "https://to-do-app-2eb08-default-rtdb.firebaseio.com",
  projectId: "to-do-app-2eb08",
  storageBucket: "to-do-app-2eb08.firebasestorage.app",
  messagingSenderId: "770996516760",
  appId: "1:770996516760:web:4203fb9c158e71dc505ded"
};

// 🔥 Initialize Firebase
firebase.initializeApp(firebaseConfig);

// 🔥 Database reference
var database = firebase.database();

// 🔥 HTML elements
var taskList = document.getElementById("taskList");
var inputTask = document.getElementById("inputTask");


// ➕ ADD TASK
function addTask() {
  var taskValue = inputTask.value;

  if (taskValue === "") {
    alert("Please write a task!");
    return;
  }

  var taskRef = database.ref("tasks").push();
  taskRef.set({
    task: taskValue
  });

  inputTask.value = "";
}


// 📥 SHOW TASKS FROM FIREBASE
database.ref("tasks").on("child_added", function (data) {
  var li = document.createElement("li");
  li.textContent = data.val().task;
  li.setAttribute("id", data.key);

  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.onclick = function () {
    database.ref("tasks").child(data.key).remove();
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
});


// ❌ REMOVE TASK FROM UI WHEN DELETED
database.ref("tasks").on("child_removed", function (data) {
  var deletedItem = document.getElementById(data.key);
  if (deletedItem) {
    deletedItem.remove();
  }
});
