new Vue({
    el: '#app',
    data: {
        image: 'profile.jpg',
        name: 'Carlos',
        other: '**',
        links: [
            { url: 'https://www.facebook.com/profile.php?id=100000644585418', style: 'background: #4267b2', icon: 'bx bxl-facebook' },
            { url: 'https://www.instagram.com/rex199981/?hl=zh-tw', style: 'background: #f15589', icon: 'bx bxl-instagram-alt' },
            { url: 'https://youtube.com/@carlos88801?si=qghoUwx-knT6ZfUm', style: 'background: #ff0000', icon: 'bx bxl-youtube' },
            { url: 'https://github.com/carlos8881', style: 'background: rgb(0,0,0)', icon: 'bx bxl-github' },
        ],
        message: 'Hello, world!',
        analytics: [
            { icon: 'bx bxs-edit-alt', count: 4 },
            { icon: 'bx bxs-message-dots', count: 0 },
            { icon: 'bx bxs-share', count: 0 },
        ],
        categories: [
            { name: '筆記', link: 'category_note.html' },
            { name: '自傳', link: '#' },
        ],
        tags: [
            { name: 'AI', link: '#' },
            { name: 'GIT', link: '#' },
            { name: '好文連結', link: '#' },
            { name: '筆記', link: '#' },
            { name: '自傳', link: '#' },
        ]
    }
});

    document.addEventListener('DOMContentLoaded', function() {
        // 选择所有评论链接
        const commentLinks = document.querySelectorAll('.article-comment-link');
        // 为每个评论链接添加点击事件监听器
        commentLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // 阻止默认的链接行为
                // 获取当前文章的链接
                const articleUrl = link.closest('.posts').querySelector('.article-header-a').href;
                // 构建并重定向到评论部分
                window.location.href = `${articleUrl}#comments`;
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

            const comment = {
                guestComment: commentText,
                dateTime: dateTime,
                guestName: user.displayName,
                guestAvatar: user.photoURL
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
                loadComments(); // 重新加载留言
            })
            .catch(error => console.error('Error:', error));
        }
    }

    function loadComments() {
        console.log('Loading comments...');
        fetch('https://myblogcomment-5194e71c8b5e.herokuapp.com/comments')
        .then(response => response.json())
        .then(comments => {
            console.log('Received comments:', comments); // 打印接收到的评论数据，确保数据格式正确
            const commentsContent = document.querySelector('.comments-content');
            commentsContent.innerHTML = ''; // 清空现有留言
            comments.forEach(comment => {
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

    // 登录成功后更新UI
    function updateUIForSignIn(user) {
        document.querySelector('.comments-input-username').textContent = user.displayName;
        document.querySelector('.comments-input-form-avatar img').src = user.photoURL;
        const signInOutButton = document.getElementById('signInOutButton');
        signInOutButton.textContent = '登出';
        signInOutButton.onclick = googleSignOut;
    }

    // 登出后更新UI
    function updateUIForSignOut() {
        document.querySelector('.comments-input-username').textContent = 'user';
        document.querySelector('.comments-input-form-avatar img').src = 'images/avatar.jpg';
        const signInOutButton = document.getElementById('signInOutButton');
        signInOutButton.textContent = '登入';
        signInOutButton.onclick = googleSignIn;
    }

    // 使用Google账号登录
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

    // 监听用户的登录状态
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user);
            updateUIForSignIn(user);
        } else {
            updateUIForSignOut();
        }
    });

    // 绑定登录按钮的点击事件
    document.querySelector('.comments-input-form-avatar button').addEventListener('click', googleSignIn);

    // 绑定提交评论按钮的点击事件
    document.getElementById('submitComment').addEventListener('click', function() {
        submitComment(); // 调用发送留言到数据库的函数
    });
    // 初始時嘗試綁定登入按鈕的點擊事件可能不需要，因為onAuthStateChanged將處理UI更新
    // document.querySelector('button').onclick = googleSignIn;

    function createCommentElement(text, date, username, avatar) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');

        const guestAvatarElement = document.createElement('div');
        commentElement.classList.add('guest-avatar');

        const guestInformationAndCommentElement = document.createElement('div');
        commentElement.classList.add('guest-informationAndComment');

        const guestInformationElement = document.createElement('div');
        commentElement.classList.add('guest-information');

        const guestCommentsContentElement = document.createElement('div');
        commentElement.classList.add('guest-comments-content');

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

