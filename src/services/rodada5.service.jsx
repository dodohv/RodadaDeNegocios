import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const rodada5CollectionRef = collection(db, "rodadas5");


class Rodada5DataService {
    addRodadas5 = (newRodada5) => {
        return addDoc(rodada5CollectionRef, newRodada5);
    };

    updateRodada5 = (id, updateRodada5) => {
        const rodada5Doc = doc(db, "rodadas5", id);
        return updateDoc(rodada5Doc, updateRodada5);
    };

    deleteRodada5 = (id) => {
        const rodada5Doc = doc(db, "rodadas5", id);
        return deleteDoc(rodada5Doc);
    };
    
    getAllRodadas5 = () => {
        return getDocs(rodada5CollectionRef);
    };

    getRodada5 = (id) => {
        const rodada5Doc = doc(db, "rodadas5", id);
        return getDoc(rodada5Doc);
    }



}
export default new Rodada5DataService();