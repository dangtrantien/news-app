'use strict';

// Chọn elements
const inputQuery = document.getElementById('input-query');
const navPageNum = document.getElementById('nav-page-num');
const pageNum = document.getElementById('page-num');
const content = document.getElementById('content');
const newsContainer = document.getElementById('news-container');

const submitBtn = document.getElementById('btn-submit');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');

// Data khởi đầu
const API_KEY = '8d1245a216e94b8c843cf3145caf1ec2';
const CURRENT_USER_KEY = 'currentUser';
const SETTING_KEY = 'settings';

const currentUser = JSON.parse(getFromStorage(CURRENT_USER_KEY));
const settings = JSON.parse(getFromStorage(SETTING_KEY));
const user = parseUser(currentUser[0]);

let resultArr;
let page = 1;
console.log(settings);

// Function hiển thị data trong News page
const renderNews = function (arr, page) {
  newsContainer.innerHTML = '';

  arr[page - 1].map((value) => {
    const html = `
      <div class="card flex-row flex-wrap">
        <div class="card mb-3">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src=${value.urlToImage} class="card-img" alt=${value.title}/>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${value.title}</h5>
                <p class="card-text">${value.description}</p>
                <a href=${value.url} class="btn btn-primary">View</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    newsContainer.insertAdjacentHTML('beforeend', html);
  });
};

// Event Listener
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();

  // Validate xem user có nhập từ khóa hay không
  if (!inputQuery.value) {
    alert('Please fill the blank!');
  } else {
    user
      .searchAPI(inputQuery.value, settings.pageSize, API_KEY)
      .then((result) => {
        resultArr = result;

        renderNews(resultArr, page);

        navPageNum.classList.remove('hide');
        prevBtn.classList.add('hide');
      })
      .catch((err) => alert(`💥💥💥 ${err.message}`));

    // renderNews(dataArr, page);
  }
});

prevBtn.addEventListener('click', function () {
  if (page > 1) {
    page--;

    if (page === 1) {
      prevBtn.classList.add('hide');
      nextBtn.classList.remove('hide');
    } else {
      prevBtn.classList.remove('hide');
      nextBtn.classList.remove('hide');
    }

    pageNum.textContent = page;

    renderNews(resultArr, page);
    // renderNews(dataArr, page);
  }
});

nextBtn.addEventListener('click', function () {
  //   if (page < dataArr.length) {
  if (page < resultArr.length) {
    page++;

    // if (page === dataArr.length) {
    if (page === resultArr.length) {
      prevBtn.classList.remove('hide');
      nextBtn.classList.add('hide');
    } else {
      prevBtn.classList.remove('hide');
      nextBtn.classList.remove('hide');
    }

    pageNum.textContent = page;

    renderNews(resultArr, page);
    // renderNews(dataArr, page);
  }
});
