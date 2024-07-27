import { useContext, useState, useEffect, useRef } from 'react';
import { ChatsContext } from '../../../Context/ChatsContext';
import { Editor } from '@tinymce/tinymce-react';
import { debounce } from 'lodash';
import styles from './MyEditor.module.css';
import './MyEditor.css';
import axios from 'axios';
import { useCheckList } from '../../../store/store';
import { api } from '../../../config/config'
import { host } from '../../../config/config'

//import html2canvas from 'html2canvas';

const MyEditor = ({ sidebarRef, editorRef }) => {

  const {emoticonDisplay,setEmoticonDisplay} =useCheckList();


  const [content, setContent] = useState('');

  const inputRef = useRef(null);
  const { ws } = useContext(ChatsContext);

  const handleEditorChange = debounce((content) => {
    localStorage.setItem('editorContent', content);
    //setContent(content);
  }, 300);

  const handleUpload = () => {
    inputRef.current.click();
  }
  const handleOnchange = () => {
    const file = inputRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios.post(`http://${host}/chatUpload`, formData).then(response => { //쿼리 파라미터 형식으로 전송된다
      console.log('Post successful:', response.data);
    }).catch(error => {
      console.error('There was an error posting the data!', error);
    });
  }


  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    setContent(savedContent || '');
  }, []);


  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (sidebar) {
      sidebar.style.display = emoticonDisplay ? 'block' : 'none';
    }
  }, [emoticonDisplay]);

  //localStorage.removeItem('editorContent');

  return (
    <div className={styles.container}>
      <Editor
        initialValue={content}
        apiKey={api}
        onEditorChange={(content) => handleEditorChange(content)}
        onInit={(evt, editor) => {
          editorRef.current = editor;

        }}
        init={{
          height: 126,
          menubar: false,
          plugins: 'wordcount anchor  code', //image
          toolbar: 'fileupload emoticon| forecolor backcolor  blocks fontfamily fontsize fontcolor | bold italic underline strikethrough | link image media table mergetags  | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat ',
          language: 'ko_KR',
          statusbar: false,
          // forced_root_block: false,
          file_picker_types: 'file image media',
          file_picker_callback: (callback, value, meta) => { },
          setup: (editor) => {
            editor.on('PastePreProcess ', (e) => {
              // 임시 div 요소에 붙여넣기된 콘텐츠를 삽입
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = e.content;
              // 이미지 태그가 있는지 검사
              const images = tempDiv.getElementsByTagName('img');
              if (images.length > 0) {
                e.preventDefault(); // 이미지가 포함된 붙여넣기를 막음
              } else {
                // 이미지가 없다면 다른 콘텐츠는 허용
                e.content = tempDiv.innerHTML;
              }
            });
            editor.on('PastePostProcess', (e) => {
              // 붙여넣기 후에 처리할 로직을 여기에 추가
              console.log('After Paste:', e.node.innerHTML);
            });
            editor.ui.registry.addButton('fileupload', {
              text: '📁',
              onSetup: (e) => {
              },
              onAction: (e) => {
                handleUpload();
              },
            });
            editor.ui.registry.addButton('emoticon', {
              text: '🍀 ',
              onSetup: (e) => {
              },
              onAction: (e) => {
                setEmoticonDisplay();
              },
            });
            editor.on('keydown', (event) => {
              if (event.key === 'Enter') {
                if (!event.shiftKey) {
                  event.preventDefault(); // 기본 Enter 키 동작을 막음
                  if (editorRef.current.getContent() !== '') {
                    ws.current.send(editorRef.current.getContent());
                  }
                  editorRef.current.setContent('');
                  // alert("메세지보냄");
                  // alert(editorRef.current.getContent());

                }
              }
            });
          }




          //
        }}

      />
      <div className={styles.hidden}>
        <input type="file" className={styles.upload} name='file' ref={inputRef} onChange={handleOnchange} />
      </div>



    </div>);
};

export default MyEditor;