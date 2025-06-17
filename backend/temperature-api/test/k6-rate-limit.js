import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 150, // 150 virtual users
    duration: '1s', // Run for 1 second
};

export default function() {
    const res = http.get('http://localhost:5000/temperature');
    check(res, {
        'status is 200 or 429': (r) => r.status === 200 || r.status === 429,
    });
}