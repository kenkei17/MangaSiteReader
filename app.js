// const axios = require("axios");

// const options = {
//   method: "GET",
//   url: "https://manga-scrapper.p.rapidapi.com/chapters",
//   params: {
//     provider: "cosmic",
//     webtoon: "eleceed",
//     page: "1",
//     limit: "10",
//   },
//   headers: {
//     "X-RapidAPI-Key": "aabd80d9d2msh567f2caacb9b67ap1149b4jsna519db1c8618",
//     "X-RapidAPI-Host": "manga-scrapper.p.rapidapi.com",
//   },
// };

// const fetchData = async () => {
//   try {
//     const response = await axios.request(options);
//     console.log(response.data.contentURL);
//   } catch (error) {
//     console.error(error);
//   }
// };
// fetchData();
const url = "https://manga-scrapper.p.rapidapi.com/chapters";
const params = {
  provider: "cosmic",
  webtoon: "eleceed",
  page: "1",
  limit: "10",
};

const headers = new Headers();
headers.append(
  "X-RapidAPI-Key",
  "aabd80d9d2msh567f2caacb9b67ap1149b4jsna519db1c8618"
);
headers.append("X-RapidAPI-Host", "manga-scrapper.p.rapidapi.com");
let chaptersList = document.getElementById("chaptersList");
const queryString = new URLSearchParams(params).toString();
const fullUrl = `${url}?${queryString}`;
let chapters = [];
fetch(fullUrl, { headers })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Render the response data in the HTML

    let html = ``;
    console.log("DATA FETCHED", data);
    chapters = data;
    console.log("From chapters variable", chapters);

    chapters.forEach((chapter) => {
      html = `<div class="title"><h2>${chapter.fullTitle}</h2></div>`;
      html += `<div><h4>Chapter: ${chapter.chapterNum}</h4></div>`;

      chapter.contentURL.forEach((image) => {
        html += `<img src="${image}" alt="Chapter ${chapter.chapterNum}" />`;
      });
      chaptersList.innerHTML = html;
    });
  })
  .catch((error) => {
    // Handle errors
    console.error(error);
  });
const nextChapterButton = document.getElementById("nextChapterButton");
let currentChapterIndex = 0; // Keep track of the current chapter index

// Function to load the content of the next chapter
const loadNextChapter = () => {
  currentChapterIndex++; // Move to the next chapter
  const currentChapter = chapters[currentChapterIndex]; // Get the current chapter object

  // Update the HTML content with the new chapter

  let html = `
      <div class="title"><h2>${currentChapter.fullTitle}</h2></div>
      <div><h4>Chapter: ${currentChapter.chapterNum}</h4></div>
     
    `;
  currentChapter.contentURL.forEach((image) => {
    html += `<img src="${image}" alt="Chapter ${currentChapter.chapterNum}" />`;
  });
  chaptersList.innerHTML = html;
  chaptersList.innerHTML = html;

  // Update the button text and link
  nextChapterButton.innerHTML = `<a href="${currentChapter.chapterNav.nextURL}" target="_blank">${currentChapter.chapterNav.nextSlug}</a>`;
};

// Attach the click event listener to the button
nextChapterButton.addEventListener("click", loadNextChapter);
