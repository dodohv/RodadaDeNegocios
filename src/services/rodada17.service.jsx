import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada17CollectionRef = collection(db, "rodadas17");


class Rodada17DataService {
    addRodadas17 = (newRodada17) => {
        return addDoc(rodada17CollectionRef, newRodada17);
    };

    updateRodada17 = (id, updateRodada17) => {
        const rodada17Doc = doc(db, "rodadas17", id);
        return updateDoc(rodada17Doc, updateRodada17);
    };

    deleteRodada17 = (id) => {
        const rodada17Doc = doc(db, "rodadas17", id);
        return deleteDoc(rodada17Doc);
    };
    
    getAllRodadas17 = () => {
        return getDocs(rodada17CollectionRef);
    };

    getRodada17 = (id) => {
        const rodada17Doc = doc(db, "rodadas17", id);
        return getDoc(rodada17Doc);
    }



}
export default new Rodada17DataService();