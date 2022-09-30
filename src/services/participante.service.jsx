import {db} from "../firebase-config";

import {collection, query, where, collectionGroup, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



const participanteCollectionRef = collection(db, "participantes");


class ParticipanteDataService {
    addParticipante = (newParticipante) => {
        return addDoc(participanteCollectionRef, newParticipante);
    };

    updateParticipante = (id, updateParticipante) => {
        const participanteDoc = doc(db, "participante", id);
        return updateDoc(participanteDoc, updateParticipante);
    };

    deleteParticipante = (id) => {
        const participanteDoc = doc(db, "participante", id);
        return deleteDoc(participanteDoc);
    };
    
    getAllParticipantes = () => {
        return getDocs(participanteCollectionRef);
    };

    getParticipante = (id) => {
        const participanteDoc = doc(db, "participante", id);
        return getDoc(participanteDoc);
    }

}
export default new ParticipanteDataService();