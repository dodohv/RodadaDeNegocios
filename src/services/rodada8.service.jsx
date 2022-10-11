import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada8CollectionRef = collection(db, "rodadas8");


class Rodada8DataService {
    addRodadas8 = (newRodada8) => {
        return addDoc(rodada8CollectionRef, newRodada8);
    };

    updateRodada8 = (id, updateRodada8) => {
        const rodada8Doc = doc(db, "rodadas8", id);
        return updateDoc(rodada8Doc, updateRodada8);
    };

    deleteRodada8 = (id) => {
        const rodada8Doc = doc(db, "rodadas8", id);
        return deleteDoc(rodada8Doc);
    };
    
    getAllRodadas8 = () => {
        return getDocs(rodada8CollectionRef);
    };

    getRodada8 = (id) => {
        const rodada8Doc = doc(db, "rodadas8", id);
        return getDoc(rodada8Doc);
    }



}
export default new Rodada8DataService();