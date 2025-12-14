import PocketBase from 'pocketbase';

const pb = new PocketBase(
    // process.env.POCKETBASE_URL 
    // ||
     "http://192.168.1.14:8090")

export default pb;