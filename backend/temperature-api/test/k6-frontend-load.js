import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 1000, // 1000 virtual users
    duration: '10s', // Run for 10 second
};

export default function() {
    const res = http.get('http://192.168.0.114:5173');
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}