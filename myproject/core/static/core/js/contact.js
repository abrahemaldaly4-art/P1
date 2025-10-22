// تأثيرات خاصة بصفحة اتصل بنا
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
            }
        });
    }, observerOptions);
    
    // تطبيق التأثير على العناصر
    const animatedElements = document.querySelectorAll('.contact-card, .form-container, .faq-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // تفعيل الأسئلة الشائعة
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // إغلاق جميع العناصر الأخرى
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // تبديل العنصر الحالي
            item.classList.toggle('active');
        });
    });
    
    // معالجة نموذج الاتصال
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // محاكاة إرسال النموذج (يمكن استبدالها بـ AJAX)
            simulateFormSubmission(formData);
        });
    }
    
    // محاكاة إرسال النموذج
    function simulateFormSubmission(formData) {
        // إظهار رسالة تحميل
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'جاري الإرسال...';
        submitButton.disabled = true;
        
        // محاكاة تأخير الشبكة
        setTimeout(() => {
            // إظهار رسالة نجاح
            alert('شكراً لك! تم استلام رسالتك بنجاح. سنقوم بالرد عليك في أقرب وقت ممكن.');
            
            // إعادة تعيين النموذج
            contactForm.reset();
            
            // استعادة حالة الزر
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // إضافة تأثير نجاح
            submitButton.style.backgroundColor = '#28a745';
            setTimeout(() => {
                submitButton.style.backgroundColor = '';
            }, 2000);
            
        }, 2000);
    }
    
    // تأثيرات إضافية للبطاقات
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
});