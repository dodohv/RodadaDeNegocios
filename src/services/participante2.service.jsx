import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const participante2CollectionRef = collection(db, "participantes");


class Participante2DataService {
    addParticipante2 = (newParticipante2) => {
        return addDoc(participante2CollectionRef, newParticipante2);
    };

    updateParticipante2 = (id, updateParticipante2) => {
        const participante2Doc = doc(db, "participante", id);
        return updateDoc(participante2Doc, updateParticipante2);
    };

    deleteParticipante2 = (id) => {
        const participante2Doc = doc(db, "participante", id);
        return deleteDoc(participante2Doc);
    };
    
    getAllParticipantes2 = () => {
        return getDocs(participante2CollectionRef);
    };

    getParticipante2 = (id) => {
        const participante2Doc = doc(db, "participante", id);
        return getDoc(participanteDoc);
    }



}
export default new Participante2DataService();