import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadPhoto = async (file, path = 'engineers') => {
    if (!file) return null;

    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `${path}/${fileName}`);

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
};
