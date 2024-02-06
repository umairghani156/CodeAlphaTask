import {app, auth, addDoc, collection,setDoc, db, getDoc, doc, serverTimestamp, query, getDocs, orderBy } from "../utils/config.js";



const getAllDataOrderedByTimestamp = async (collectionName) => {
    try {
        // Creating a query to order the data by timestamp
        const q = query(collection(db, collectionName), orderBy('timestamp'));
        const posts =[];
        // Getting data from db ordered by timestamp
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const data = querySnapshot.docs.map(doc => {
                console.log(doc)
                const singlePost = doc.data();
                posts.push({...singlePost, id:doc.id,})
            });
            return {
                status: true,
                message: "Data found",
                data: posts,
            };
        } else {
            return {
                status: false,
                message: "No documents found!",
            };
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        };
    }
};



const addDocument = async (data, collectionName)=>{
    try{
        const datas= {
            ...data,
            timestamp: serverTimestamp(),
        };
      console.log("chl tu rha hn");
      //adding data in db and calling firebase db function
      const addData = await addDoc(collection(db, collectionName), datas);
            return {
        status: true,
        message: "Data added successfully",
        data: addData,
        userId: addData.id
    }
      
    }
    catch(error){
       console.log("Error!", error);
    }
};

const getData = async (id, collectionName) => {
    try {
        //getting data from db and calling firebase db function
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {
                status: true,
                message: "Data found",
                data: docSnap.data()
            }
        } else {
            return {
                status: false,
                message: "No such document!",
            }
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}


export {addDocument, getData, getAllDataOrderedByTimestamp}