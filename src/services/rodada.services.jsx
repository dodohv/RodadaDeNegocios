import {db} from "../firebase-config";

import {collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const negocioCollectionRef = collection(db, "negocios");

class NegocioDataService {
    addNegocios = (newNegocio) => {
        return addDoc(negocioCollectionRef, newNegocio);
    };

    updateNegocio = (id, updateNegocio) => {
        const negocioDoc = doc(db, "negocios", id);
        return updateDoc(negocioDoc, updateNegocio);
    };

    deleteBook = (id) => {
        const negocioDoc = doc(db, "negocios", id);
        return deleteDoc(negocioDoc);
    };

    getAllNegocios = () => {
        return getDocs(negocioCollectionRef);
    };

    getNegocio = (id) => {
        const negocioDoc = doc(db, "negocios", id);
        return getDoc(negocioDoc);
    }


}
export default new NegocioDataService();