const posts = [
    { image: 'image1.jpg', username: '@ZENA', link: 'https://photos.app.goo.gl/h7MijSnEGMsGkUXo6' },
    { image: 'image2.jpg', username: '@RESTI INDAH', link: 'https://photos.app.goo.gl/thdGJUGFECR7WtiJ8' },
    { image: 'image3.jpg', username: '@KHAYLA', link: 'https://photos.app.goo.gl/kYWuJgjNQgQKURFp7' },
    { image: 'image4.jpg', username: '@SECILIA', link: 'https://photos.app.goo.gl/F69qZKBoTag215pE7' },
    { image: 'image5.jpg', username: '@ZULAIKADELIA', link: 'https://photos.app.goo.gl/oTbN5ZVFEe3ZCotK6' },
    { image: 'image6.jpg', username: '@AURELIA', link: 'https://photos.app.goo.gl/3cpQVjiK31hYf9CC9' },
    { image: 'image7.jpg', username: '@SONIA', link: 'https://photos.app.goo.gl/NKiTAoiW8FkJYK5s6' },
    { image: 'image8.jpg', username: '@NATALIE', link: 'https://photos.app.goo.gl/5WYrhywQpgaDrqQ18' },
    { image: 'image9.jpg', username: '@RHEVA', link: 'https://photos.app.goo.gl/2roBMr2ZR1yX1JDX9' },
    { image: 'image10.jpg', username: '@GABAGTHA', link: 'https://photos.app.goo.gl/Ad5fszwfhHdtkTdh8' },
    { image: 'image11.jpg', username: '@SHERIN PUTRI', link: 'https://photos.app.goo.gl/iyaZqd6viFmNeug89' },
    { image: 'image12.jpg', username: '@KARISSA INDAH', link: 'https://photos.app.goo.gl/kJ6jyW4XfhL8dChS9' },
    { image: 'image13.jpg', username: '@NANDA', link: 'https://photos.app.goo.gl/TVzwfjyVLxJXzTFY9' },
    { image: 'image14.jpg', username: '@RISSA DAN MONIKA', link: 'https://photos.app.goo.gl/6T9gazFAkmz5vQHj8' }
];

const feed = document.getElementById("feed");
const usernameHeader = document.getElementById("username-link");
const fragment = document.createDocumentFragment();

// Tambahkan post ke dalam feed
posts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    if (index === 0) {
        postElement.classList.add("active");
        usernameHeader.textContent = post.username; // Atur username pertama
        usernameHeader.href = post.link; // Atur link pertama
    }

    postElement.innerHTML = `<img src="${post.image}" alt="Post Image">`;
    fragment.appendChild(postElement);
});

feed.appendChild(fragment);

let currentIndex = 0;
let isScrolling = false;
const postsElements = document.querySelectorAll(".post");

// Fungsi untuk berpindah post
function changePost(next) {
    if (isScrolling) return;
    isScrolling = true;

    const nextIndex = next ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0 || nextIndex >= posts.length) {
        isScrolling = false;
        return;
    }

    postsElements[currentIndex].classList.remove("active");
    postsElements[nextIndex].classList.add("active");

    // Perbarui username dan link di header
    usernameHeader.textContent = posts[nextIndex].username;
    usernameHeader.href = posts[nextIndex].link;

    currentIndex = nextIndex;

    setTimeout(() => {
        isScrolling = false;
    }, 700);
}

// Event listener untuk navigasi scroll (desktop)
document.addEventListener("wheel", (event) => {
    changePost(event.deltaY > 0);
}, { passive: true });

// Event listener untuk navigasi dengan touch (mobile)
let startY = 0;
document.addEventListener("touchstart", (event) => {
    startY = event.touches[0].clientY;
}, { passive: true });

document.addEventListener("touchmove", (event) => {
    let endY = event.touches[0].clientY;
    if (Math.abs(startY - endY) > 50) {
        changePost(startY > endY);
    }
}, { passive: true });