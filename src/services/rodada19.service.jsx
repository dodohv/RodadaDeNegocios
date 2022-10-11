import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada19CollectionRef = collection(db, "rodadas19");


class Rodada19DataService {
    addRodadas19 = (newRodada19) => {
        return addDoc(rodada19CollectionRef, newRodada19);
    };

    updateRodada19 = (id, updateRodada19) => {
        const rodada19Doc = doc(db, "rodadas19", id);
        return updateDoc(rodada19Doc, updateRodada19);
    };

    deleteRodada19 = (id) => {
        const rodada19Doc = doc(db, "rodadas19", id);
        return deleteDoc(rodada19Doc);
    };
    
    getAllRodadas19 = () => {
        return getDocs(rodada19CollectionRef);
    };

    getRodada19 = (id) => {
        const rodada19Doc = doc(db, "rodadas19", id);
        return getDoc(rodada19Doc);
    }



}
export default new Rodada19DataService();