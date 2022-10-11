import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada16CollectionRef = collection(db, "rodadas16");


class Rodada16DataService {
    addRodadas16 = (newRodada16) => {
        return addDoc(rodada16CollectionRef, newRodada16);
    };

    updateRodada16 = (id, updateRodada16) => {
        const rodada16Doc = doc(db, "rodadas16", id);
        return updateDoc(rodada16Doc, updateRodada16);
    };

    deleteRodada16 = (id) => {
        const rodada16Doc = doc(db, "rodadas16", id);
        return deleteDoc(rodada16Doc);
    };
    
    getAllRodadas16 = () => {
        return getDocs(rodada16CollectionRef);
    };

    getRodada16 = (id) => {
        const rodada16Doc = doc(db, "rodadas16", id);
        return getDoc(rodada16Doc);
    }



}
export default new Rodada16DataService();