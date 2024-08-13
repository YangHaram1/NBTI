import Swal from 'sweetalert2'
import './SweetAlert.css'

function SweetAlert(icon, title, text, myfunction) { //여기서 icon 은 success/error/warning/info/question
    //title은 제목 입력하고 text 하고싶은말 입력
    //myfunction은 확인눌렀을떄 실행할 함수 예를 들어 axios 같은걸 함수안에 넣고 그 함수를 넣으면됌
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        customClass: {
            popup: 'custom-swal-popup',  // 커스텀 클래스 이름 지정
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // 확인 버튼을 클릭한 경우
            Swal.fire({
                icon: 'success',
                title:  'comfirm!',
            }
            ).then((result) => {
                if (result.isConfirmed) {
                    myfunction();
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // 취소 버튼을 클릭한 경우
            Swal.fire({
                icon:'error',
                title:  'Cancelled'
            }
              
            ).then((result) => {
                    //취소후 로직 
            });

        }
    });

}

export default SweetAlert;

