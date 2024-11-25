import axios from "axios";
export function featchBloges(page, limit) {
  let queryString = "";
  if (page && limit) {
    queryString = `page=${page}&limit=${4}`;
  }
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/bloge/all?${queryString}`
      )
      .then((res) => res.data)
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => {
        reject({ error });
      });
  });
}
export function featchBlogesByUser() {
  // let queryString=''
  // if (page && limit) {
  //   queryString = `page=${page}&limit=${4}`;
  // }
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/user/blogs`,
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => res.data)
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => {
        reject({ error });
      });
  });
}
export function featchBlogeById(id) {
  // console.log(id)
  return new Promise(async (resolve, reject) => {
    await axios
      .get(
        "https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/bloge/" +
          id
      )
      .then((res) => {
        resolve({ data: res.data.bloge });
      })
      .catch((error) => {
        reject({ error });
      });
  });
}
export function updateBlogeById(data) {
  console.log(data)
  const token = localStorage.getItem('token')
  return new Promise(async (resolve, reject) => {
    await axios
      .patch(
        "https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/bloge/" +
          data.id,
        data,
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        resolve({ data: res.data.bloge });
      })
      .catch((error) => {
        reject({ error });
      });
  });
}
export function createBloge({ bloge }) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    // console.log(bloge)
    axios
      .post(
        "https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/bloge/create",
        bloge,
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        // console.log(res.data)
        resolve({ data: res.data.bloge });
      })
      .catch((error) => {
        // // console.log(error)
        reject({ error });
      });
  });
}
export function delteBloge(id) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    // console.log(bloge)
    axios
      .delete(
        `https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/bloge/${id}`,
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        // console.log(res.data)
        resolve({ data: res.data.bloge });
      })
      .catch((error) => {
        // // console.log(error)
        reject({ error });
      });
  });
}
