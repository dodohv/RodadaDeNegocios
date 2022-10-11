import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada12CollectionRef = collection(db, "rodadas12");


class Rodada12DataService {
    addRodadas12 = (newRodada12) => {
        return addDoc(rodada12CollectionRef, newRodada12);
    };

    updateRodada12 = (id, updateRodada12) => {
        const rodada12Doc = doc(db, "rodadas12", id);
        return updateDoc(rodada12Doc, updateRodada12);
    };

    deleteRodada12 = (id) => {
        const rodada12Doc = doc(db, "rodadas12", id);
        return deleteDoc(rodada12Doc);
    };
    
    getAllRodadas12 = () => {
        return getDocs(rodada12CollectionRef);
    };

    getRodada12 = (id) => {
        const rodada12Doc = doc(db, "rodadas12", id);
        return getDoc(rodada12Doc);
    }



}
export default new Rodada12DataService();