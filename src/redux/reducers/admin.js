import {
    GET_QR_CODE,
    GET_TICKET,
    PAST_TICKETS_LIST,
    SET_GATE_PASS_VISIBILITY,
    CHECK_IN,
    CHECK_OUT,
    CHECK_IN_OUT_DATA_FETCHED,
    DELETE_VISITOR
} from "../actions/actionTypes";

const initialState = {
    visitorData: [],
    visitorList: [],
    savedData: {},
    showGatePass: false,
    checkInData: null,
    checkOutData: null,
};

export const admin = (state = initialState, action) => {
    switch (action.type) {
        case GET_QR_CODE:
            return {
                ...state,
                visitorData: action.payload,
            };
        case PAST_TICKETS_LIST:
            return {
                ...state,
                visitorList: action.payload,
            };
        case GET_TICKET:
            return {
                ...state,
                savedData: action.payload,
            };
        case CHECK_IN:
            return {
                ...state,
                checkInData: action.payload,
            };
        case CHECK_OUT:
            return {
                ...state,
                checkOutData: action.payload,
            };
        case CHECK_IN_OUT_DATA_FETCHED:
            return {
                ...state,
                checkInData: action.payload.checkInData,
                checkOutData: action.payload.checkOutData
            };
        case DELETE_VISITOR:
            return {
                ...state,
                visitorList: state.visitorList.filter(visitor => visitor.id !== action.payload),
            };
        default:
            return state;
    }
}
