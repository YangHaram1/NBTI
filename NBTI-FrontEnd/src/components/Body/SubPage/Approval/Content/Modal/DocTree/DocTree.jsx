import axios from "axios";
import { useEffect, useState } from "react"
import { TreeNode } from "../TreeNode/TreeNode";
import { host } from "../../../../../../../config/config";


const DocTree = () => {
    const [docType, setDocType] = useState([]);
    const [docSub, setDocSub] = useState([]);
  
    useEffect(() => {
      axios.get(`${host}/docsub`)
        .then((sub) => {
          setDocSub(sub.data);
          return axios.get(`${host}/doctype`);
        })
        .then((type) => {
          setDocType(type.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
    const buildTree = () => {
      const typeMap = new Map();
  
      docType.forEach((type) => {
        typeMap.set(type.doc_form_seq, {
          id: type.doc_form_seq,
          name: type.doc_form_name,
          children: []
        });
      });
  
      docSub.forEach((sub) => {
        if (typeMap.has(sub.doc_form_seq)) {
          typeMap.get(sub.doc_form_seq).children.push({
            id: sub.doc_sub_seq,
            name: sub.doc_sub_name,
            period: sub.preservation_period
          });
        }
      });
  
      return Array.from(typeMap.values());
    };
  
    const tree = buildTree();
  
    return (
        <ul>
          {tree.map((node) => (
            <TreeNode key={node.id} node={node} />
          ))}
        </ul>
    );
  };

  export default DocTree;
