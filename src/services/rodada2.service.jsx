import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada2CollectionRef = collection(db, "rodadas2");


class Rodada2DataService {
    addRodadas2 = (newRodada2) => {
        return addDoc(rodada2CollectionRef, newRodada2);
    };

    updateRodada2 = (id, updateRodada2) => {
        const rodada2Doc = doc(db, "rodadas2", id);
        return updateDoc(rodada2Doc, updateRodada2);
    };

    deleteRodada2 = (id) => {
        const rodada2Doc = doc(db, "rodadas2", id);
        return deleteDoc(rodada2Doc);
    };
    
    getAllRodadas2 = () => {
        return getDocs(rodada2CollectionRef);
    };

    getRodada2 = (id) => {
        const rodada2Doc = doc(db, "rodadas2", id);
        return getDoc(rodada2Doc);
    }



}
export default new Rodada2DataService();