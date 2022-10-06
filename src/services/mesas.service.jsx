import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const mesaCollectionRef = collection(db, "mesas");


class MesaDataService {
    addMesa = (newMesa) => {
        return addDoc(mesa2CollectionRef, newMesa);
    };

    updateMesa = (id, updateMesa) => {
        const mesaDoc = doc(db, "mesas", id);
        return updateDoc(mesaDoc, updateMesa);
    };

    deleteMesa = (id) => {
        const mesaDoc = doc(db, "mesas", id);
        return deleteDoc(mesaDoc);
    };
    
    getAllMesas = () => {
        return getDocs(mesaCollectionRef);
    };

    getMesa = (id) => {
        const mesaDoc = doc(db, "mesas", id);
        return getDoc(mesaDoc);
    }



}
export default new MesaDataService();