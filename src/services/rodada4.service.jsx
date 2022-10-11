import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada4CollectionRef = collection(db, "rodadas4");


class Rodada4DataService {
    addRodadas4 = (newRodada4) => {
        return addDoc(rodada4CollectionRef, newRodada4);
    };

    updateRodada4 = (id, updateRodada4) => {
        const rodada4Doc = doc(db, "rodadas4", id);
        return updateDoc(rodada4Doc, updateRodada4);
    };

    deleteRodada4 = (id) => {
        const rodada4Doc = doc(db, "rodadas4", id);
        return deleteDoc(rodada4Doc);
    };
    
    getAllRodadas4 = () => {
        return getDocs(rodada4CollectionRef);
    };

    getRodada4 = (id) => {
        const rodada4Doc = doc(db, "rodadas4", id);
        return getDoc(rodada4Doc);
    }



}
export default new Rodada4DataService();