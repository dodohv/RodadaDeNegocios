import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const minutoCollectionRef = collection(db, "minutos");


class MinutoDataService {
    addMinutos = (newMinuto) => {
        return addDoc(minutoCollectionRef, newMinuto);
    };

    updateMinuto = (id, updateMinuto) => {
        const minutoDoc = doc(db, "minutos", id);
        return updateDoc(minutoDoc, updateMinuto);
    };

    deleteMinuto = (id) => {
        const minutoDoc = doc(db, "minutos", id);
        return deleteDoc(minutoDoc);
    };
    
    getAllMinutos = () => {
        return getDocs(minutoCollectionRef);
    };

    getMinuto = (id) => {
        const minutoDoc = doc(db, "minutos", id);
        return getDoc(minutoDoc);
    }



}
export default new MinutoDataService();