import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc } from "firebase/firestore"; 
import { query, where } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDmZOH1o77pWmKSspm7rT4m_A4qyGXjb-Q",
  authDomain: "paris-garage.firebaseapp.com",
  projectId: "paris-garage",
  storageBucket: "paris-garage.firebasestorage.app",
  messagingSenderId: "336566940918",
  appId: "1:336566940918:web:1d13f9b6a590e17212a8d7",
  measurementId: "G-7CYFMYQFFW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function BarcodeExists(barcode) {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("barcode", "==", barcode));
    const snapshot = await getDocs(q);
    return snapshot.docs.length > 0; 
}


export async function GetItems() {
    const itemsRef = collection(db,"items")
    const snapshot = await getDocs(itemsRef)
    const itemList =snapshot.docs.map(doc =>(
        {
            id:doc.id, ...doc.data()
        }
    ))
    return itemList
}

export async function AddData(newItem){
    const exists = await BarcodeExists(newItem.barcode);
    if (exists) {
        throw new Error("Barcode already exists.");
    }
    const itemsRef = collection(db,"items")
    await addDoc(itemsRef, {
        merk: newItem.merk,
        price: parseFloat(newItem.price),
        updated_date: newItem.updated_date,
        created_date: newItem.created_date,
        name: newItem.name,
        barcode: newItem.barcode
    })
}
export async function DeleteData(itemId) {
    const itemRef = collection(db, "items", itemId);
    await deleteDoc(itemRef);
}
