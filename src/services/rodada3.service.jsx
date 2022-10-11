import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada3CollectionRef = collection(db, "rodadas3");


class Rodada3DataService {
    addRodadas3 = (newRodada3) => {
        return addDoc(rodada3CollectionRef, newRodada3);
    };

    updateRodada3 = (id, updateRodada3) => {
        const rodada3Doc = doc(db, "rodadas3", id);
        return updateDoc(rodada3Doc, updateRodada3);
    };

    deleteRodada3 = (id) => {
        const rodada3Doc = doc(db, "rodadas3", id);
        return deleteDoc(rodada3Doc);
    };
    
    getAllRodadas3 = () => {
        return getDocs(rodada3CollectionRef);
    };

    getRodada3 = (id) => {
        const rodada3Doc = doc(db, "rodadas3", id);
        return getDoc(rodada3Doc);
    }



}
export default new Rodada3DataService();