import axios from "axios";

const rootUrl = "http://localhost:8000/api";
const articleUrl = rootUrl + "/articles";

/* récupération de tous les articles */
export const findAllArticles = () => {

    const config = { headers: {"Content-Type": "multipart/form-data"} };

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(articleUrl, config)
            resolve(res.data["hydra:member"])
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

/* récupération d'un article */
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

