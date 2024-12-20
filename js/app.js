new Vue({
    el: '#profileApp',
    data: {
        image: 'profile.jpg',
        name: 'Carlos',
        other: 'Hello, world!',
        links: [
            { url: 'https://www.facebook.com/profile.php?id=100000644585418', style: 'background: #4267b2', icon: 'bx bxl-facebook' },
            { url: 'https://www.instagram.com/rex199981/?hl=zh-tw', style: 'background: #f15589', icon: 'bx bxl-instagram-alt' },
            { url: 'https://youtube.com/@carlos88801?si=qghoUwx-knT6ZfUm', style: 'background: #ff0000', icon: 'bx bxl-youtube' },
            { url: 'https://github.com/carlos8881', style: 'background: rgb(0,0,0)', icon: 'bx bxl-github' },
        ],
        message: 'Hello, world!',
        analytics: [
            { icon: 'bx bxs-edit-alt', count: 6 },
            { icon: 'bx bxs-message-dots', count: '' },
        ],
    },
    methods: {
        fetchComments: function() {
            // 從資料庫取得留言的函數
            fetch('https://myblogcomment-5194e71c8b5e.herokuapp.com/comments')
                .then(response => response.json())
                .then(comments => {
                    // 假設留言數量對應於 analytics 數組中的第二個項目
                    this.analytics[1].count = comments.length; // 更新留言數量
                    // 處理取得的留言數據...
                })
                .catch(error => console.error('Error:', error));
        }
    },
    mounted: function() {
        this.fetchComments();
    }
});

new Vue({
    el: '#siderApp',
    data: {
        categories: [
            { name: '筆記', link: 'list.html?category=筆記' },
            { name: '自傳', link: 'list.html?category=自傳' },
            { name: '好文連結', link: 'list.html?category=好文連結' },
        ],
        tags: [
            { name: 'AI', link: 'list.html?tag=AI' },
            { name: 'GIT', link: 'list.html?tag=Git' },
            { name: 'Devops', link: 'list.html?tag=Devops' },
        ]
    }
});

new Vue({
    el: '#commentCount',
    data: {
        commentCount: 0, // 初始留言數量設為0
    },
    methods: {
        fetchComments: function() {
            // 獲取當前頁面的 URL
            const currentPageUrl = window.location.pathname;
            // 添加查詢參數到請求 URL
            console.log('Current Page URL:', currentPageUrl);
            const requestUrl = `https://myblogcomment-5194e71c8b5e.herokuapp.com/comments?pageId=${currentPageUrl}`;
            console.log('Request URL:', requestUrl);
            fetch(requestUrl)
            .then(response => response.json())
            .then(comments => {
                // 假設每條留言都有一個 pageId 屬性，並且後端返回的是所有留言的數組
                const filteredComments = comments.filter(comment => comment.pageId === currentPageUrl);
                this.commentCount = filteredComments.length; // 更新留言數量為篩選後的結果
                // 處理取得的留言數據...
            })
            .catch(error => console.error('Error:', error));
        }
    },
    mounted: function() {
        this.fetchComments(); // 組件掛載後立即取得留言
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const toCommentButton = document.getElementById('to-prev-next');
    if (toCommentButton) {
        toCommentButton.addEventListener('click', function(event) {
            event.preventDefault(); // 阻止按鈕的默認行為
            // 找到目標元素
            const targetElement = document.getElementById('prev-next');
            if (targetElement) {
                // 平滑滾動到目標元素
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // 使用 history.pushState() 來改變歷史狀態而不改變網址
                history.pushState(null, "", window.location.pathname);
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 檢查localStorage中的標誌
    const scrollToComments = localStorage.getItem('scrollToComments');
    if (scrollToComments === 'true') {
        // 滾動到評論部分
        const commentsSection = document.querySelector('#comments');
        if (commentsSection) {
            commentsSection.scrollIntoView({ behavior: 'smooth' });
        }
        // 清除標誌
        localStorage.removeItem('scrollToComments');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 選擇所有評論連結
    const commentLinks = document.querySelectorAll('.article-comment-link');
    // 為每個評論連結添加點擊事件監聽器
    commentLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // 阻止默認的連結行為
            // 獲取當前文章的連結
            const articleUrl = link.closest('.posts').querySelector('.article-header-a').href;
            // 在localStorage中設置標誌
            localStorage.setItem('scrollToComments', 'true');
            // 重定向到文章頁
            window.location.href = articleUrl;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const emojiButton = document.querySelector('.emoji-button');
    const emojiPickerContainer = document.getElementById('emoji-picker-container');
    const commentInput = document.getElementById('comment');

    function toggleEmojiPicker() {
        const isVisible = emojiPickerContainer.style.display === 'block';
        emojiPickerContainer.style.display = isVisible ? 'none' : 'block';

        // 設置表情選取器的位置
        if (!isVisible) {
            const rect = emojiButton.getBoundingClientRect();
            emojiPickerContainer.style.left = `${rect.left}px`;
            emojiPickerContainer.style.top = `${rect.bottom}px`;
        }
    }

    emojiButton.addEventListener('click', function(event) {
        event.stopPropagation(); // 防止事件冒泡到 document
        toggleEmojiPicker();
    });

    document.addEventListener('click', function(event) {
        // 檢查點擊事件是否發生在表情選取器或其子元素上
        if (!emojiPickerContainer.contains(event.target)) {
            emojiPickerContainer.style.display = 'none';
        }
    });

    // 防止表單提交
    document.querySelector('.comments-input-form').addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止表單提交
        // 可以在這裡添加留言到留言列表的代碼
    });

    // 添加表情到輸入框
    emojiPickerContainer.querySelector('emoji-picker').addEventListener('emoji-click', function(event) {
        commentInput.value += event.detail.emoji.unicode;
        // 不隱藏選取器，允許連續選取
    });
});

function submitComment() {
    const commentInput = document.getElementById('comment');
    const commentText = commentInput.value;
    const user = firebase.auth().currentUser; 
    if (commentText && user) {
        const dateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const pageId = window.location.pathname;
        console.log('pageId',pageId);
        const comment = {
            guestComment: commentText,
            dateTime: dateTime,
            guestName: user.displayName,
            guestAvatar: user.photoURL,
            pageId: pageId
        };
        fetch('https://myblogcomment-5194e71c8b5e.herokuapp.com/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        })
        .then(() => {
            commentInput.value = '';
            loadComments(); // 重新加載留言
        })
        .catch(error => console.error('Error:', error));
    }
}

function loadComments() {
    console.log('Loading comments...');
    fetch('https://myblogcomment-5194e71c8b5e.herokuapp.com/comments')
    .then(response => response.json())
    .then(comments => {
        console.log('Received comments:', comments); // 打印接收到的評論數據，確保數據格式正確
        const currentPageId = window.location.pathname; // 獲取當前頁面的 URL 路徑
        const commentsContent = document.querySelector('.comments-content');
        commentsContent.innerHTML = ''; // 清空現有留言
        // 過濾出 pageId 與當前頁面 URL 匹配的評論
        const filteredComments = comments.filter(comment => comment.pageId === currentPageId);
        filteredComments.forEach(comment => {
            createCommentElement(comment.guestComment, comment.dateTime, comment.guestName, comment.guestAvatar);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyApCGitlToCu3oi_Owoi2cUqjpH1BPIEfY",
    authDomain: "carlosblogcomment.firebaseapp.com",
    projectId: "carlosblogcomment",
    storageBucket: "carlosblogcomment.appspot.com",
    messagingSenderId: "445901511837",
    appId: "1:445901511837:web:c8eb760e3219f6e2dbc874",
};
firebase.initializeApp(firebaseConfig);

// 登錄成功後更新UI
function updateUIForSignIn(user) {
    document.querySelector('.comments-input-username').textContent = user.displayName;
    document.querySelector('.comments-input-form-avatar img').src = user.photoURL;
    const signInOutButton = document.getElementById('signInOutButton');
    signInOutButton.textContent = '登出';
    signInOutButton.onclick = googleSignOut;
}

// 登出後更新UI
function updateUIForSignOut() {
    document.querySelector('.comments-input-username').textContent = 'user';
    document.querySelector('.comments-input-form-avatar img').src = 'images/avatar.jpg';
    const signInOutButton = document.getElementById('signInOutButton');
    signInOutButton.textContent = '登入';
    signInOutButton.onclick = googleSignIn;
}

// 使用Google賬號登錄
function googleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log(result.user);
        updateUIForSignIn(result.user);
    }).catch(function(error) {
        console.error(error);
    });
}

// 登出
function googleSignOut() {
    firebase.auth().signOut().then(() => {
        updateUIForSignOut();
    }).catch((error) => {
        console.log(error.message);
    });
}

// 監聽用戶的登錄狀態
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
        updateUIForSignIn(user);
    } else {
        updateUIForSignOut();
    }
});

// 綁定登錄按鈕的點擊事件
document.querySelector('.comments-input-form-avatar button').addEventListener('click', googleSignIn);

// 綁定提交評論按鈕的點擊事件
document.getElementById('submitComment').addEventListener('click', function() {
    submitComment(); // 調用發送留言到數據庫的函數
});
// 初始時嘗試綁定登錄按鈕的點擊事件可能不需要，因為onAuthStateChanged將處理UI更新

function createCommentElement(text, date, username, avatar) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    const guestAvatarElement = document.createElement('div');
    guestAvatarElement.classList.add('guest-avatar');

    const guestInformationAndCommentElement = document.createElement('div');
    guestInformationAndCommentElement.classList.add('guest-informationAndComment');

    const guestInformationElement = document.createElement('div');
    guestInformationElement.classList.add('guest-information');

    const guestCommentsContentElement = document.createElement('div');
    guestCommentsContentElement.classList.add('guest-comments-content');

    const avatarElement = document.createElement('img');
    avatarElement.src = avatar;
    avatarElement.alt = 'User Avatar';
    avatarElement.classList.add('guest-avatar');

    const usernameElement = document.createElement('span');
    usernameElement.textContent = username;
    usernameElement.classList.add('guest-name');

    const dateElement = document.createElement('span');
    dateElement.textContent = date;
    dateElement.classList.add('guest-date');

    const textElement = document.createElement('p');
    textElement.textContent = text;
    textElement.classList.add('guest-comments-content');

    commentElement.appendChild(avatarElement);
    commentElement.appendChild(guestInformationAndCommentElement);
    guestInformationAndCommentElement.appendChild(guestInformationElement);
    guestInformationAndCommentElement.appendChild(textElement);
    guestInformationElement.appendChild(usernameElement);
    guestInformationElement.appendChild(dateElement);

    const commentsContainer = document.querySelector('.comments-content');
    commentsContainer.appendChild(commentElement);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Document is fully loaded and parsed, but not necessarily all subresources');
    loadComments(); // 在頁面加載完成時加載留言
});

// 假設你的分享按鈕有一個ID為'copybutton-article'
document.getElementById('copybutton-article').addEventListener('click', function() {
    event.preventDefault();
    // 複製當前頁面網址
    navigator.clipboard.writeText(window.location.href).then(() => {
        // 顯示"已複製"的提示框
        const copiedAlert = document.createElement('div');
        copiedAlert.textContent = '已複製';
        copiedAlert.className = 'copied-alert';
        document.body.appendChild(copiedAlert);

        // 1秒後消失
        setTimeout(() => {
            document.body.removeChild(copiedAlert);
        }, 1000);
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var searchForm = document.querySelector('.search-container');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            var searchBox = document.querySelector('.search-box');
            var siteQuery = "site:https://carlos8881.github.io/BlogProject/";
            if (!searchBox.value.startsWith(siteQuery)) {
                searchBox.value = siteQuery + searchBox.value;
            }
        });
    }
});