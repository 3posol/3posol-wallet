import Immutable from 'immutable';
import { Wei, TokenUnits } from 'lib/types';
import { toNumber } from 'lib/convert';

const initial = Immutable.fromJS({
    addressBook: [],
    loading: false,
});

const initialAddr = Immutable.Map({
    name: null,
    id: null,
    description: null,
    balance: null,
    txcount: null,
});

function addAddress(state, id) {
    return state.update('addressBook', (addresses) =>
        addresses.push(initialAddr.set('id', id))
    );
}

function updateAddress(state, id, f) {
    return state.update('addressBook', (addresses) => {
        const pos = addresses.findKey((addr) => addr.get('id') === id);
        if (pos >= 0) {
            return addresses.update(pos, f);
        }
        return addresses;
    });
}

function onLoading(state, action) {
    switch (action.type) {
        case 'ADDRESS/LOADING':
            return state
                .set('loading', true);
        default:
            return state;
    }
}

function onSetAddressBook(state, action) {
    switch (action.type) {
        case 'ADDRESS/SET_BOOK':
            return state
                .set('addressBook',
                    Immutable.fromJS(action.addressBook || [])
                )
                .set('loading', false);
        default:
            return state;
    }
}

function onSetBalance(state, action) {
    if (action.type === 'ADDRESS/SET_BALANCE') {
        return updateAddress(state, action.addressId, (addr) =>
            addr.set('balance', new Wei(action.value))
        );
    }
    return state;
}

function onSetTxCount(state, action) {
    if (action.type === 'ADDRESS/SET_TXCOUNT') {
        return updateAddress(state, action.addressId, (addr) =>
            addr.set('txcount', toNumber(action.value))
        );
    }
    return state;
}

function onAddAddress(state, action) {
    if (action.type === 'ADDRESS/ADD_ADDRESS') {
        return addAddress(state, action.addressId);
    }
    return state;
}

export default function addresssReducers(state, action) {
    state = state || initial;
    state = onLoading(state, action);
    state = onSetAddressBook(state, action);
    state = onAddAddress(state, action);
    state = onSetBalance(state, action);
    state = onSetTxCount(state, action);
    return state;
}
