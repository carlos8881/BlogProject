new Vue({
    el: '#app',
    data: {
        image: 'profile.jpg',
        name: 'Carlos',
        other: '**',
        links: [
            { url: 'https://www.facebook.com/profile.php?id=100000644585418', style: 'background: #4267b2', icon: 'bx bxl-facebook' },
            { url: '#', style: 'background: #1da1f2', icon: 'bx bxl-twitter' },
            { url: 'https://www.instagram.com/rex199981/?hl=zh-tw', style: 'background: #f15589', icon: 'bx bxl-instagram-alt' },
            { url: 'https://youtube.com/@carlos88801?si=qghoUwx-knT6ZfUm', style: 'background: #ff0000', icon: 'bx bxl-youtube' },
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





document.addEventListener('DOMContentLoaded', function() {
    loadComments(); // 页面加载时获取留言

    // 取消按钮功能
    const cancelButton = document.querySelector('.comments-cancel-button');
    cancelButton.addEventListener('click', function(event) {
        event.preventDefault(); // 防止表单提交
        document.getElementById('comment').value = ''; // 清空输入区内容
    });

    // 送出按钮功能
    const submitButton = document.querySelector('.comments-submit-button');
    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        const commentInput = document.getElementById('comment');
        const commentText = commentInput.value.trim();

        if (commentText) {
            submitComment({ text: commentText, date: new Date().toLocaleDateString() });
        }
    });
});

function submitComment() {
    const commentInput = document.getElementById('comment');
    const commentText = commentInput.value;
    const user = firebase.auth().currentUser;
    if (commentText && user) {
        const comment = {
            text: commentText,
            date: new Date().toISOString(),
            username: user.displayName,
            avatar: user.photoURL
        };
        fetch('http://localhost:3000/comments', {
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
    fetch('http://localhost:3000/comments')
    .then(response => response.json())
    .then(comments => {
        const commentsContent = document.querySelector('.comments-content');
        commentsContent.innerHTML = ''; // 清空现有留言
        comments.forEach(comment => {
            createCommentElement(comment.text, comment.date, comment.username, comment.avatar);
        });
    })
    .catch(error => console.error('Error:', error));
}


var firebaseConfig = {
    apiKey: "AIzaSyApCGitlToCu3oi_Owoi2cUqjpH1BPIEfY",
    authDomain: "carlosblogcomment.firebaseapp.com",
    projectId: "carlosblogcomment",
    storageBucket: "carlosblogcomment.appspot.com",
    messagingSenderId: "445901511837",
    appId: "1:445901511837:web:c8eb760e3219f6e2dbc874",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// 監聽用戶的登入狀態
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // 用戶已登入，可以獲取用戶信息
    console.log(user);
    updateUIForSignIn(user); // 更新UI為登入狀態
  } else {
    // 用戶未登入
    updateUIForSignOut(); // 更新UI為登出狀態
  }
});

function googleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // 登入成功後的處理
      console.log(result.user);
      // 更新UI，例如顯示用戶名稱和頭像
    }).catch(function(error) {
      // 處理錯誤
      console.error(error);
    });
}

// 綁定登入按鈕的點擊事件
document.querySelector('.comments-input-form-avatar button').addEventListener('click', googleSignIn);

function googleSignOut() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    updateUIForSignOut();
  }).catch((error) => {
    // An error happened.
    console.log(error.message);
  });
}

function updateUIForSignIn(user) {
    document.querySelector('.comments-input-username').textContent = user.displayName;
    document.querySelector('.comments-input-form-avatar img').src = user.photoURL;
    const signInOutButton = document.getElementById('signInOutButton'); // 假設按鈕有一個 ID 為 'signInOutButton'
    signInOutButton.textContent = '登出';
    signInOutButton.onclick = googleSignOut;
  }
  
  function updateUIForSignOut() {
    document.querySelector('.comments-input-username').textContent = 'user';
    document.querySelector('.comments-input-form-avatar img').src = 'images/avatar.jpg';
    const signInOutButton = document.getElementById('signInOutButton'); // 使用相同的 ID 選擇器
    signInOutButton.textContent = '登入';
    signInOutButton.onclick = googleSignIn;
  }

// 初始時嘗試綁定登入按鈕的點擊事件可能不需要，因為onAuthStateChanged將處理UI更新
// document.querySelector('button').onclick = googleSignIn;

function createCommentElement(text, date, username, avatar) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    const avatarElement = document.createElement('img');
    avatarElement.src = avatar;
    avatarElement.alt = 'User Avatar';
    avatarElement.classList.add('comment-avatar');

    const usernameElement = document.createElement('h5');
    usernameElement.textContent = username;
    usernameElement.classList.add('comment-username');

    const dateElement = document.createElement('span');
    dateElement.textContent = date;
    dateElement.classList.add('comment-date');

    const textElement = document.createElement('p');
    textElement.textContent = text;
    textElement.classList.add('comment-text');

    commentElement.appendChild(avatarElement);
    commentElement.appendChild(usernameElement);
    commentElement.appendChild(dateElement);
    commentElement.appendChild(textElement);

    const commentsContainer = document.querySelector('.comments-content');
    commentsContainer.appendChild(commentElement);
}