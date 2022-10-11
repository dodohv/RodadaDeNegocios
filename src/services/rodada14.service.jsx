import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada14CollectionRef = collection(db, "rodadas14");


class Rodada14DataService {
    addRodadas14 = (newRodada14) => {
        return addDoc(rodada14CollectionRef, newRodada14);
    };

    updateRodada14 = (id, updateRodada14) => {
        const rodada14Doc = doc(db, "rodadas14", id);
        return updateDoc(rodada14Doc, updateRodada14);
    };

    deleteRodada14 = (id) => {
        const rodada14Doc = doc(db, "rodadas14", id);
        return deleteDoc(rodada14Doc);
    };
    
    getAllRodadas14 = () => {
        return getDocs(rodada14CollectionRef);
    };

    getRodada14 = (id) => {
        const rodada14Doc = doc(db, "rodadas14", id);
        return getDoc(rodada14Doc);
    }



}
export default new Rodada14DataService();