import { addDocument, getAllDataOrderedByTimestamp, getData } from "./controller/controller.js";
import { db, deleteDoc, doc, setDoc } from "./utils/config.js";
const addTaskBtn = document.getElementById("addTaskBtn");
const formInput = document.getElementById("formInput");
const inputBar = document.getElementById("inputBar");


const listItems = document.getElementById("listItems");
 const renderPosts = (datas)=>{
      //listItems.style.border = "1px solid red"
      listItems.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
       console.log("data", datas);
       listItems.innerHTML = ""
       datas.forEach(data => {
           let text
           text = `
                         <li   class="p-2 ">${data.userText} <div><span id="editbtn" onclick="edtList('${data.id}')"><i class="fa-solid fa-pen-to-square"></i></span><span id="dltbtn" onclick="dltList('${data.id}')"><i class="fa-solid fa-trash"></i></span></div></li>
             `
         listItems.innerHTML += text
       });
       // Delete on single item on page
       const deleteBtn = document.querySelectorAll("#dltbtn");
       deleteBtn.forEach((btn)=> {
        btn.addEventListener("click", function(e){
             console.log("deletedata", e.target.parentElement.parentElement.parentElement.remove());
        })
       })

       // Delete Post from Firebase
       window.dltList = async (id) =>{
        console.log("id", id);
        const deleting = await deleteDoc(doc(db, "todos", id));
        
           
    }
    //Post Edit Btn
    window.edtList = async (id)=>{
     console.log("id", id);
     addTaskBtn.textContent = "Edit";
     addTaskBtn.style.backgroundColor = "green"
    addTaskBtn.removeAttribute("type")
     // Calling Edit function
     editHandler(id, datas)
    }


 }

 // Post Updating
function editHandler(id, datas){
    console.log("editId", id);
    console.log("formInput", formInput);
    console.log("datas", datas);
    // const obj = {
    //     id: id,
    //     ...datas
    // }
    // console.log("obj", obj);
    const findtPost = datas.find((post)=> id == post.id)
    console.log("findtPost", findtPost);
    inputBar.value = findtPost.userText;
    console.log("formInput", formInput);
    addTaskBtn.setAttribute("onclick", `updateBtn('${findtPost.id}')`)
    window.updateBtn =async (uid)=>{
       console.log("uid", uid);
       const updatePost = {
        id: findtPost.id,
        userText: inputBar.value,
        timestamp: findtPost.timestamp
       };
       console.log("updateData", updatePost);
       const checkKrnaHey = await setDoc(doc(db, "todos", uid), updatePost);
       addTaskBtn.style.backgroundColor = "red";
       addTaskBtn.innerText = "Add Task"
       inputBar.value = "";
       addTaskBtn.setAttribute("onclick", "addTaskHandler()");
       window.location.reload()


    }
}
// Get All posts from firebase
const getPosts = async () => {
    const posts = await getAllDataOrderedByTimestamp("todos")
  console.log("===>>> posts", posts);
  if(posts.status){
      // Use Promise.all to await all promises in the loop
    const postsWithDataPromises = posts.data.map(async (post) => {
        const userData = await getData(post.userId, "todos");
  
        // console.log(userData, "===>>userData")
  
        // Add user data to the post
        const postWithUserData = {
          ...post,
          userData: userData ? userData.data : null,
        };
  
        return postWithUserData;
      });
  
      // Wait for all promises to resolve
      const postsWithData = await Promise.all(postsWithDataPromises);
  
      console.log("===>>> posts with data", postsWithData)
      renderPosts(postsWithData)
    }
 else {
    console.log("===>>> posts not found")
  }
    
    
}
getPosts()

// Upload a Post
window.addTaskHandler = async() =>{
  if(!inputBar.value){
    swal("Input should not be blank");
  }else{
    console.log("Chl rha hn");
    const data = {
        userText: inputBar.value
    }

    const addItems = await addDocument(data, "todos");
    

    console.log("addItems", addItems);
    inputBar.value = "";
    getPosts()
  }
   
}

