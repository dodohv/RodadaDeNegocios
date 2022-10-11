import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada6CollectionRef = collection(db, "rodadas6");


class Rodada6DataService {
    addRodadas6 = (newRodada6) => {
        return addDoc(rodada6CollectionRef, newRodada6);
    };

    updateRodada6 = (id, updateRodada6) => {
        const rodada6Doc = doc(db, "rodadas6", id);
        return updateDoc(rodada6Doc, updateRodada6);
    };

    deleteRodada6 = (id) => {
        const rodada6Doc = doc(db, "rodadas6", id);
        return deleteDoc(rodada6Doc);
    };
    
    getAllRodadas6 = () => {
        return getDocs(rodada6CollectionRef);
    };

    getRodada6 = (id) => {
        const rodada6Doc = doc(db, "rodadas6", id);
        return getDoc(rodada6Doc);
    }



}
export default new Rodada6DataService();