const handleCategory = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    showAllNews(data.data.news_category)
}
const showAllNews = (news) => {
    // console.log(news)
    const tab_container = document.getElementById('tab_container');
    news.forEach(news => {
        const div = document.createElement('div');
        div.innerHTML = `<a onclick="getTitleId('${news.category_id}')" class="tab">${news.category_name}</a>`;
        tab_container.appendChild(div)
    })

}

// click title and work
const getTitleId = async (id = '08') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const news_info = await res.json();
    showNews(news_info.data);

}
// show all news by default
getTitleId()
// show news after search by id
const showNews = (news) => {
    const news_container = document.getElementById('news_container');
    news_container.textContent = '';
    news.forEach(news => {
        const div = document.createElement('div');
        div.classList = `flex overflow-hidden bg-white rounded-lg shadow-lg`;
        div.innerHTML = `
        <div class="w-1/3 bg-cover bg-landscape">
            <img src="${news.image_url}" alt="picture">
        </div>
        <div class="w-2/3 p-4">
            <h1 class="text-2xl font-bold text-gray-900">
                ${news.title.slice(0,45)}
            </h1>
            <p class="mt-2 text-sm text-gray-600">
                ${news.details.slice(0,250)}
            </p>
            <div class="flex justify-between mt-3 item-center">
                <h1 class="text-xl font-bold text-gray-700">
                    $220
                </h1>
                <button onclick="showDetails('${news._id}')" class="px-3 py-2 text-xs font-bold text-white uppercase bg-gray-800 rounded">
                    Details
                </button>
            </div>
        </div>
        `;
        news_container.appendChild(div)
    })
}

// show details after clicking details buttons
const showDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
    const news_info = await res.json();
    const newsInfo = news_info.data[0];
    console.log(newsInfo)
    const news_details = document.getElementById('news_details');
    // clear the modal container
    news_details.textContent = '';
    // create div element to show your specific news info
    const div = document.createElement('div');
    div.classList = `m-auto overflow-hidden cursor-pointer w-full`;
    div.innerHTML = `
    <a href="#" class="block w-full h-full">
        <img alt="blog photo" src="${newsInfo.image_url}"
            class="object-cover w-full max-h-40" />
        <div class="w-full p-4 bg-white dark:bg-gray-800">
            <p class="font-medium text-indigo-500 text-md">
                ${newsInfo.title}
            </p>
            <p class="font-light text-gray-400 dark:text-gray-300 text-md">
                ${newsInfo.details}
            </p>
            <div class="flex items-center mt-4">
                <a href="#" class="relative block">
                    <img alt="profil" src="${newsInfo.author.img}"
                        class="mx-auto object-cover rounded-full h-10 w-10 " />
                </a>
                <div class="flex flex-col justify-between ml-4 text-sm">
                    <p class="text-gray-800 dark:text-white">
                        ${newsInfo.author?.name}
                    </p>
                    <p class="text-gray-400 dark:text-gray-300">
                        ${newsInfo.author?.published_date}
                    </p>
                </div>
            </div>
        </div>
    </a>
    `;
    // append the div on parent div
    news_details.appendChild(div)


    my_modal_1.showModal()
}

handleCategory()