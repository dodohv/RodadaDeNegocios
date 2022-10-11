import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada18CollectionRef = collection(db, "rodadas18");


class Rodada18DataService {
    addRodadas18 = (newRodada18) => {
        return addDoc(rodada18CollectionRef, newRodada18);
    };

    updateRodada18 = (id, updateRodada18) => {
        const rodada18Doc = doc(db, "rodadas18", id);
        return updateDoc(rodada18Doc, updateRodada18);
    };

    deleteRodada18 = (id) => {
        const rodada18Doc = doc(db, "rodadas18", id);
        return deleteDoc(rodada18Doc);
    };
    
    getAllRodadas18 = () => {
        return getDocs(rodada18CollectionRef);
    };

    getRodada18 = (id) => {
        const rodada18Doc = doc(db, "rodadas18", id);
        return getDoc(rodada18Doc);
    }



}
export default new Rodada18DataService();