import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodadaBoaCollectionRef = collection(db, "rodadasBoa");


class RodadaBoaDataService {
    addRodadasBoa = (newRodadaBoa) => {
        return addDoc(rodadaBoaCollectionRef, newRodadaBoa);
    };

    updateRodadaBoa = (id, updateRodadaBoa) => {
        const rodadaBoaDoc = doc(db, "rodadasBoa", id);
        return updateDoc(rodadaBoaDoc, updateRodadaBoa);
    };

    deleteRodadaBoa = (id) => {
        const rodadaBoaDoc = doc(db, "rodadasBoa", id);
        return deleteDoc(rodadaBoaDoc);
    };
    
    getAllRodadasBoa = () => {
        return getDocs(rodadaBoaCollectionRef);
    };

    getRodadaBoa = (id) => {
        const rodadaBoaDoc = doc(db, "rodadasBoa", id);
        return getDoc(rodadaBoaDoc);
    }



}
export default new RodadaBoaDataService();