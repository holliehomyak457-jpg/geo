// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('bg-transparent');
            navbar.classList.add('bg-white');
            
            // Change text color
            const navLinks = navbar.querySelectorAll('a:not(.mobile-link)');
            navLinks.forEach(link => {
                link.classList.remove('text-white');
                link.classList.add('text-dark');
            });
            
            // Change menu toggle color
            const menuToggle = document.getElementById('menu-toggle');
            menuToggle.classList.remove('text-white');
            menuToggle.classList.add('text-dark');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.add('bg-transparent');
            navbar.classList.remove('bg-white');
            
            // Change text color back
            const navLinks = navbar.querySelectorAll('a:not(.mobile-link)');
            navLinks.forEach(link => {
                link.classList.add('text-white');
                link.classList.remove('text-dark');
            });
            
            // Change menu toggle color back
            const menuToggle = document.getElementById('menu-toggle');
            menuToggle.classList.add('text-white');
            menuToggle.classList.remove('text-dark');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.remove('translate-x-full');
    });
    
    closeMenu.addEventListener('click', function() {
        mobileMenu.classList.add('translate-x-full');
    });
    
    mobileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('translate-x-full');
        });
    });
    
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                // Add delay if specified
                const delay = revealElements[i].getAttribute('data-delay') || 0;
                setTimeout(() => {
                    revealElements[i].classList.add('active');
                }, delay);
            }
        }
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Initial check
    
    // Platform selector
    const platformItems = document.querySelectorAll('.platform-item');
    const platformDetails = document.querySelector('.platform-details');
    
    const platformInfo = {
        'ChatGPT': {
            title: 'ChatGPT优化策略',
            description: 'ChatGPT偏好结构清晰、信息密度高的内容，特别是FAQ格式和分步指南。优化策略应包括：创建详细的产品FAQ页面、提供清晰的使用指南、引用权威数据和研究结果。'
        },
        'Gemini': {
            title: 'Gemini优化策略',
            description: 'Gemini由Google开发，特别擅长理解和处理多模态内容。优化策略应包括：提供高质量的图片和视频内容、确保内容的时效性和准确性、优化Google知识图谱中的企业信息。'
        },
        'DeepSeek': {
            title: 'DeepSeek优化策略',
            description: 'DeepSeek是国内领先的AI平台，对中文内容有更好的理解。优化策略应包括：优化中文关键词和语义表达、在国内高权重平台发布内容、参与行业问答和讨论。'
        },
        '豆包': {
            title: '豆包优化策略',
            description: '豆包是字节跳动开发的AI平台，用户群体年轻且活跃。优化策略应包括：创建生动有趣的内容、使用短视频和图文结合的形式、参与热门话题和挑战。'
        }
    };
    
    platformItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // Remove active class from all items
            platformItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update platform details
            const platformName = this.querySelector('p').textContent;
            const info = platformInfo[platformName];
            
            platformDetails.innerHTML = `
                <h5 class="font-bold mb-2">${info.title}</h5>
                <p class="text-gray-medium">
                    ${info.description}
                </p>
            `;
        });
    });
    
    // Keyword analysis demo
    const keywordInput = document.getElementById('keyword-input');
    const analyzeButton = document.getElementById('analyze-keyword');
    const keywordResults = document.getElementById('keyword-results');
    const keywordDemo = document.getElementById('keyword-demo');
    
    analyzeButton.addEventListener('click', function() {
        const keyword = keywordInput.value.trim();
        
        if (keyword) {
            // Hide demo, show results
            keywordDemo.classList.add('hidden');
            keywordResults.classList.remove('hidden');
        }
    });
    
    keywordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const keyword = keywordInput.value.trim();
            
            if (keyword) {
                // Hide demo, show results
                keywordDemo.classList.add('hidden');
                keywordResults.classList.remove('hidden');
            }
        }
    });
    
    // Animated numbers
    const counterElements = document.querySelectorAll('.counter-value');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const stepTime = 50; // Update every 50ms
        const totalSteps = duration / stepTime;
        const stepValue = target / totalSteps;
        
        let current = 0;
        const timer = setInterval(() => {
            current += stepValue;
            element.textContent = Math.round(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, stepTime);
    }
    
    // Animate counters when they come into view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // FAQ accordion
    const faqButtons = document.querySelectorAll('.bg-white .flex.justify-between');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle content visibility
            content.classList.toggle('hidden');
            
            // Toggle icon direction
            if (content.classList.contains('hidden')) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const company = document.getElementById('company').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !message) {
            alert('请填写必填字段');
            return;
        }
        
        // Simulate form submission
        alert('感谢您的咨询！我们的团队将在24小时内与您联系。');
        contactForm.reset();
    });
    
    // Charts
    // Platform Traffic Chart
    const platformTrafficCtx = document.getElementById('platformTrafficChart').getContext('2d');
    const platformTrafficChart = new Chart(platformTrafficCtx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
            datasets: [
                {
                    label: 'AI平台流量',
                    data: [10, 15, 25, 40, 60, 85, 110],
                    borderColor: '#D4AF37',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: '传统搜索引擎流量',
                    data: [100, 98, 95, 90, 85, 80, 75],
                    borderColor: '#B0C4DE',
                    backgroundColor: 'rgba(176, 196, 222, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#3E4C59'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#9AA5B1'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        color: '#9AA5B1'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
    
    // Keyword Trend Chart
    const keywordTrendCtx = document.getElementById('keywordTrendChart').getContext('2d');
    const keywordTrendChart = new Chart(keywordTrendCtx, {
        type: 'bar',
        data: {
            labels: ['传统关键词', '短尾关键词', '长尾关键词', '问题式关键词', '语义关键词'],
            datasets: [
                {
                    label: '搜索量',
                    data: [65, 75, 90, 85, 95],
                    backgroundColor: '#D4AF37'
                },
                {
                    label: '竞争度',
                    data: [80, 70, 50, 40, 60],
                    backgroundColor: '#B0C4DE'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#3E4C59'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#9AA5B1'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        color: '#9AA5B1'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
    
    // Source Preference Chart
    const sourcePreferenceCtx = document.getElementById('sourcePreferenceChart').getContext('2d');
    const sourcePreferenceChart = new Chart(sourcePreferenceCtx, {
        type: 'radar',
        data: {
            labels: ['品牌官网', '电商平台', '社交媒体', '行业论坛', '新闻媒体', '专业博客'],
            datasets: [
                {
                    label: 'ChatGPT',
                    data: [80, 70, 60, 75, 85, 90],
                    backgroundColor: 'rgba(212, 175, 55, 0.2)',
                    borderColor: '#D4AF37',
                    pointBackgroundColor: '#D4AF37',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#D4AF37'
                },
                {
                    label: 'Gemini',
                    data: [85, 65, 70, 60, 90, 75],
                    backgroundColor: 'rgba(176, 196, 222, 0.2)',
                    borderColor: '#B0C4DE',
                    pointBackgroundColor: '#B0C4DE',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#B0C4DE'
                },
                {
                    label: 'DeepSeek',
                    data: [70, 80, 65, 85, 75, 60],
                    backgroundColor: 'rgba(139, 69, 19, 0.2)',
                    borderColor: '#8B4513',
                    pointBackgroundColor: '#8B4513',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#8B4513'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#3E4C59'
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        color: '#9AA5B1'
                    },
                    ticks: {
                        color: '#9AA5B1',
                        backdropColor: 'transparent'
                    }
                }
            }
        }
    });
});
