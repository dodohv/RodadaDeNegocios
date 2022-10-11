import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada15CollectionRef = collection(db, "rodadas15");


class Rodada15DataService {
    addRodadas15 = (newRodada15) => {
        return addDoc(rodada15CollectionRef, newRodada15);
    };

    updateRodada15 = (id, updateRodada15) => {
        const rodada15Doc = doc(db, "rodadas15", id);
        return updateDoc(rodada15Doc, updateRodada15);
    };

    deleteRodada15 = (id) => {
        const rodada15Doc = doc(db, "rodadas15", id);
        return deleteDoc(rodada15Doc);
    };
    
    getAllRodadas15 = () => {
        return getDocs(rodada15CollectionRef);
    };

    getRodada15 = (id) => {
        const rodada15Doc = doc(db, "rodadas15", id);
        return getDoc(rodada15Doc);
    }



}
export default new Rodada15DataService();