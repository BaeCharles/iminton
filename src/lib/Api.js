import axios from 'axios';

const api = axios.create({
    baseURL: 'http://young24y.dothome.co.kr/php/',
});

export function procAttend(params) {
    return api.post('proc_ok.php', params);
}

export function procLogin(params) {
    return api.post('login_ok.php', params);
}

export function procJoin(params) {
    return api.post('join_ok.php', params);
}

export function chkNickname(params) {
    return api.post('nick_chk.php', params);
}

export function procUpload(params) {
    return api.post('upload_ok.php', params);
}

export function getAttendList(params) {
    return api.get('attend_list.php', {params});
}

export function getMemberList(params) {
    return api.get('member_list.php', {params});
}

export function getUser(params) {
    return api.get('user.php', {params});
}