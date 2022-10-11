import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada10CollectionRef = collection(db, "rodadas10");


class Rodada10DataService {
    addRodadas10 = (newRodada10) => {
        return addDoc(rodada10CollectionRef, newRodada10);
    };

    updateRodada10 = (id, updateRodada10) => {
        const rodada10Doc = doc(db, "rodadas10", id);
        return updateDoc(rodada10Doc, updateRodada10);
    };

    deleteRodada10 = (id) => {
        const rodada10Doc = doc(db, "rodadas10", id);
        return deleteDoc(rodada10Doc);
    };
    
    getAllRodadas10 = () => {
        return getDocs(rodada10CollectionRef);
    };

    getRodada10 = (id) => {
        const rodada10Doc = doc(db, "rodadas10", id);
        return getDoc(rodada10Doc);
    }



}
export default new Rodada10DataService();