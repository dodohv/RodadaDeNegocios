import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada20CollectionRef = collection(db, "rodadas20");


class Rodada20DataService {
    addRodadas20 = (newRodada20) => {
        return addDoc(rodada20CollectionRef, newRodada20);
    };

    updateRodada20 = (id, updateRodada20) => {
        const rodada20Doc = doc(db, "rodadas20", id);
        return updateDoc(rodada20Doc, updateRodada20);
    };

    deleteRodada20 = (id) => {
        const rodada20Doc = doc(db, "rodadas20", id);
        return deleteDoc(rodada20Doc);
    };
    
    getAllRodadas20 = () => {
        return getDocs(rodada20CollectionRef);
    };

    getRodada20 = (id) => {
        const rodada20Doc = doc(db, "rodadas20", id);
        return getDoc(rodada20Doc);
    }



}
export default new Rodada20DataService();