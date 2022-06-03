import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

//1. Action 타입
const LOAD_DETAIL = "vocabulary/LOAD_DETAIL"; // 읽어오기
const ADD_DETAIL = "vocabulary/ADD_DETAIL"; // 추가

//2. Action 생성 함수

//[read]
function loadDetail(detail_list) {
  return { type: LOAD_DETAIL, detail_list };
}

//[add]
function addDetail(detailData) {
  console.log("확인!");
  return {
    type: ADD_DETAIL,
    detailData,
  };
}

//3. 미들웨어

//[read]

export const loadDetailFB = () => {
  return async function (dispatch) {
    const voca_data = await getDocs(collection(db, "vocabulary"));
    // console.log("voca: " + voca_data);

    let detail_list = [];

    voca_data.forEach((doc) => {
      //   console.log(doc.data());
      detail_list.push({ id: doc.id, ...doc.data() });
    });
    // console.log(detail_list);

    dispatch(loadDetail(detail_list));
  };
};

//[add]

export const addDetailFB = (detailData) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "vocabulary"), detailData);
    const detail_data = { id: docRef.id, ...detailData };
    dispatch(addDetail(detail_data));
  };
};

//4. reducer 초기값

let initialState = {
  list: [],
};

//5. reducer case

export default function detail_reducer(state = initialState, action) {
  // const {type,payload} = action

  switch (action.type) {
    case LOAD_DETAIL: {
      return { list: action.detail_list };
    }
    case ADD_DETAIL: {
      const newDetailList = [...state.list];
      return {
        ...state,
        list: newDetailList,
      };
    }
    default:
      return state;
  }
}
