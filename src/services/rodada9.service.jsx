import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada9CollectionRef = collection(db, "rodadas9");


class Rodada9DataService {
    addRodadas9 = (newRodada9) => {
        return addDoc(rodada9CollectionRef, newRodada9);
    };

    updateRodada9 = (id, updateRodada9) => {
        const rodada9Doc = doc(db, "rodadas9", id);
        return updateDoc(rodada9Doc, updateRodada9);
    };

    deleteRodada9 = (id) => {
        const rodada9Doc = doc(db, "rodadas9", id);
        return deleteDoc(rodada9Doc);
    };
    
    getAllRodadas9 = () => {
        return getDocs(rodada9CollectionRef);
    };

    getRodada9 = (id) => {
        const rodada9Doc = doc(db, "rodadas9", id);
        return getDoc(rodada9Doc);
    }



}
export default new Rodada9DataService();