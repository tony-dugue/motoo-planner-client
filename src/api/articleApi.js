import axios from "axios";

const rootUrl = "http://localhost:8000/api";
const articleUrl = rootUrl + "/articles";

export const findAllArticles = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(articleUrl)
            resolve(res.data["hydra:member"])
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const findSingleArticle = (urlPath) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(rootUrl + urlPath)
            resolve(res.data)
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

