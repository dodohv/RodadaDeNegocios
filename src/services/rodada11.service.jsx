import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada11CollectionRef = collection(db, "rodadas11");


class Rodada11DataService {
    addRodadas11 = (newRodada11) => {
        return addDoc(rodada11CollectionRef, newRodada11);
    };

    updateRodada11 = (id, updateRodada11) => {
        const rodada11Doc = doc(db, "rodadas11", id);
        return updateDoc(rodada11Doc, updateRodada11);
    };

    deleteRodada11 = (id) => {
        const rodada11Doc = doc(db, "rodadas11", id);
        return deleteDoc(rodada11Doc);
    };
    
    getAllRodadas11 = () => {
        return getDocs(rodada11CollectionRef);
    };

    getRodada11 = (id) => {
        const rodada11Doc = doc(db, "rodadas11", id);
        return getDoc(rodada11Doc);
    }



}
export default new Rodada11DataService();