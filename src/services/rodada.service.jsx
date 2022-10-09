import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodadaCollectionRef = collection(db, "rodadas");


class RodadaDataService {
    addRodadas = (newRodada) => {
        return addDoc(rodadaCollectionRef, newRodada);
    };

    updateRodada = (id, updateRodada) => {
        const rodadaDoc = doc(db, "rodadas", id);
        return updateDoc(rodadaDoc, updateRodada);
    };

    deleteRodada = (id) => {
        const rodadaDoc = doc(db, "rodadas", id);
        return deleteDoc(rodadaDoc);
    };
    
    getAllRodadas = () => {
        return getDocs(rodadaCollectionRef);
    };

    getRodada = (id) => {
        const rodadaDoc = doc(db, "rodadas", id);
        return getDoc(rodadaDoc);
    }



}
export default new RodadaDataService();