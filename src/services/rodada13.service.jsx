import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada13CollectionRef = collection(db, "rodadas13");


class Rodada13DataService {
    addRodadas13 = (newRodada13) => {
        return addDoc(rodada13CollectionRef, newRodada13);
    };

    updateRodada13 = (id, updateRodada13) => {
        const rodada13Doc = doc(db, "rodadas13", id);
        return updateDoc(rodada13Doc, updateRodada13);
    };

    deleteRodada13 = (id) => {
        const rodada13Doc = doc(db, "rodadas13", id);
        return deleteDoc(rodada13Doc);
    };
    
    getAllRodadas13 = () => {
        return getDocs(rodada13CollectionRef);
    };

    getRodada13 = (id) => {
        const rodada13Doc = doc(db, "rodadas13", id);
        return getDoc(rodada13Doc);
    }



}
export default new Rodada13DataService();