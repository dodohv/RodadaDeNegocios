import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada7CollectionRef = collection(db, "rodadas7");


class Rodada7DataService {
    addRodadas7 = (newRodada7) => {
        return addDoc(rodada7CollectionRef, newRodada7);
    };

    updateRodada7 = (id, updateRodada7) => {
        const rodada7Doc = doc(db, "rodadas7", id);
        return updateDoc(rodada7Doc, updateRodada7);
    };

    deleteRodada7 = (id) => {
        const rodada7Doc = doc(db, "rodadas7", id);
        return deleteDoc(rodada7Doc);
    };
    
    getAllRodadas7 = () => {
        return getDocs(rodada7CollectionRef);
    };

    getRodada7 = (id) => {
        const rodada7Doc = doc(db, "rodadas7", id);
        return getDoc(rodada7Doc);
    }



}
export default new Rodada7DataService();