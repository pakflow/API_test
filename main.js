const posts_API = "https://jsonplaceholder.typicode.com/posts";
const users_API = "https://jsonplaceholder.typicode.com/users";

let postList = document.getElementById("post_list");
let paginate = document.getElementById("paginate");
let btnPrev = document.getElementById("prevPage");
let btnNext = document.getElementById("nextPage");
let search = document.getElementById("search");

let page = 1;
const limit = 10;

async function getPosts() {
  // await Promise.all([fetch(`${posts_API}?_page=${page}&_limit=${limit}`), fetch(`${users_API}`)]).then(([postsResponse, usersResponse]) => {
  //   postsResponse.json();
  //   usersResponse.json();
  // }).then(([postsData, usersData]) => {
    // postList.innerHTML = "";
    // postsData.forEach(item => {
      //  postList.innerHTML += `<p>${item.title}</p>`  
    // });
    // usersData.forEach(item => {
      //  postList.innerHTML += `<p>${item.username}</p>`
    // })
  // })
  await fetch(`${posts_API}?_page=${page}&_limit=${limit}`).then((response) =>
    response.json().then((data) => {
      postList.innerHTML = "";
      data.forEach((item) => {
        postList.innerHTML += `<p>${item.title}</p>
        <p>${item.userId}</p>`;
      });
      paginate.innerHTML = `<button onClick="prevPage()" id="prevPage" ${
        page === 1 ? "disabled" : ""
      }>prev</button>
      <span id="numOfPage">${page}</span>
      <button onClick="nextPage()" id="nextPage" ${
        data.length < limit ? "disabled" : ""
      }>next</button>`;
    })
  ).catch(error => console.log(error));
}
getPosts();

// async function getUsers() {
//   await fetch(`${users_API}`).then((response) => response.json().then((data) => {
//     data.forEach((item) => {
//       postList.innerHTML += `<p>${item.username}</p>`;
//     })
//   }))
// };
// getUsers();

function prevPage() {
  page -= 1;
  getPosts();
}

function nextPage() {
  page += 1;
  getPosts();
}
