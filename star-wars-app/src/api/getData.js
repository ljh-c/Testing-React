import axios from "axios";
export const getData = async url => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const insaneFunction = () => {
  console.log('sanity test');
};