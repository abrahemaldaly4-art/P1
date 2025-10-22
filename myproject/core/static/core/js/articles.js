// تأثيرات خاصة بصفحة المقالات
document.addEventListener('DOMContentLoaded', function() {
    // تأثير التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // تأثير الظهور للبطاقات
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    }, observerOptions);
    
    // تطبيق التأثير على المقالات
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
    
    // وظيفة البحث في المقالات
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const articles = document.querySelectorAll('.article-card');
        
        articles.forEach(article => {
            const title = article.querySelector('.article-title').textContent.toLowerCase();
            const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();
            const category = article.querySelector('.article-category').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
                article.style.display = 'flex';
            } else {
                article.style.display = 'none';
            }
        });
    }
    
    searchInput.addEventListener('input', performSearch);
    searchBtn.addEventListener('click', performSearch);
    
    // وظيفة التصفية حسب التصنيف
    const categoryFilter = document.getElementById('categoryFilter');
    
    categoryFilter.addEventListener('change', function() {
        const selectedCategory = this.value;
        const articles = document.querySelectorAll('.article-card');
        
        articles.forEach(article => {
            const articleCategory = article.getAttribute('data-category');
            
            if (selectedCategory === '' || articleCategory === selectedCategory) {
                article.style.display = 'flex';
            } else {
                article.style.display = 'none';
            }
        });
    });
    
    // وظيفة الترتيب
    const sortFilter = document.getElementById('sortFilter');
    
    sortFilter.addEventListener('change', function() {
        const sortBy = this.value;
        const articlesGrid = document.getElementById('articlesGrid');
        const articles = Array.from(document.querySelectorAll('.article-card'));
        
        articles.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            const viewsA = parseInt(a.querySelector('.views-count').textContent) || 0;
            const viewsB = parseInt(b.querySelector('.views-count').textContent) || 0;
            
            switch(sortBy) {
                case 'newest':
                    return dateB - dateA;
                case 'oldest':
                    return dateA - dateB;
                case 'popular':
                    return viewsB - viewsA;
                default:
                    return 0;
            }
        });
        
        // إعادة ترتيب المقالات في الشبكة
        articles.forEach(article => {
            articlesGrid.appendChild(article);
        });
    });
    
    // وظيفة تحميل المزيد من المقالات
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentPage = 1;
    
    loadMoreBtn.addEventListener('click', function() {
        // محاكاة تحميل المزيد من المقالات
        simulateLoadMoreArticles();
    });
    
    function simulateLoadMoreArticles() {
        const button = loadMoreBtn;
        const originalText = button.textContent;
        
        // إظهار حالة التحميل
        button.textContent = 'جاري التحميل...';
        button.disabled = true;
        
        // محاكاة تأخير الشبكة
        setTimeout(() => {
            // هنا يمكن إضافة المقالات الجديدة
            // في التطبيق الحقيقي، سيتم جلب البيانات من الخادم
            
            // إعادة تعيين الزر
            button.textContent = originalText;
            button.disabled = false;
            
            // إظهار رسالة (في التطبيق الحقيقي، سيتم إضافة المقالات الجديدة)
            alert('سيتم إضافة وظيفة تحميل المقالات من الخادم في النسخة النهائية');
            
        }, 1500);
    }
    
    // تأثيرات إضافية للمقالات
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
    
    // إضافة تأثير للبحث عند الضغط على Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});