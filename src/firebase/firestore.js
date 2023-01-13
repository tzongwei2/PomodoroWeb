import { db } from "./firebase";
import { addDoc, collection, query, getDocs, where, deleteDoc, doc, setDoc, onSnapshot } from 'firebase/firestore';

const TASKS_LIST = 'tasks'

export async function addTask(uuid, taskName, time) {
    addDoc(collection(db, TASKS_LIST), { uuid, taskName, time })
}

export async function getTasks(uid, setTasks) {
    const tasks = query(collection(db, TASKS_LIST), where("uuid", "==", uid));

    const unsubscribe = onSnapshot(tasks, async (snapshot) => {
        let allTasks = [];

        snapshot.forEach((doc) => {
            const task = doc.data();
            allTasks.push({
                ...task,
                id: doc.id
            })
        })
        setTasks(allTasks);

    });
    return unsubscribe;

}
export async function deleteTask(id) {
    deleteDoc(doc(db, TASKS_LIST, id));
}

export async function updateTask({ id, time, uuid, taskName }) {

    setDoc(doc(db, TASKS_LIST, id), { uuid, time, taskName })
}