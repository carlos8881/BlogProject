new Vue({
    el: '#app',
    data: {
        image: 'profile.jpg',
        name: 'Carlos',
        other: '**',
        links: [
            { url: '#', style: 'background: #4267b2', icon: 'bx bxl-facebook' },
            { url: '#', style: 'background: #1da1f2', icon: 'bx bxl-twitter' },
            { url: '#', style: 'background: #f15589', icon: 'bx bxl-instagram-alt' },
            { url: '#', style: 'background: #ff0000', icon: 'bx bxl-youtube' },
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