import axios from "axios";
import { useEffect, useState } from "react"

export const DocTree = ()=>{

    const [docType, setDocType] = useState([{}]);
    const [docSub, setDocSub] = useState([{}]);

    useEffect(()=>{
        return(
            axios.get(`http://${host}/`)
        );
    })
}