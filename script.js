// Data Storage
let promptHistory = JSON.parse(localStorage.getItem('promptHistory')) || [];
let userStats = JSON.parse(localStorage.getItem('userStats')) || {
    totalPrompts: 0,
    totalScore: 0,
    savedPrompts: 0
};

// Ready-Made Prompts Data
const readyMadePrompts = [
    {
        category: 'content',
        title: 'SEO Blog Post Writer',
        description: 'Complete blog post with SEO optimization',
        prompt: 'Write a comprehensive, SEO-optimized blog post about [TOPIC]. Include: 1) Catchy title with target keyword, 2) Meta description (150-160 characters), 3) Introduction with hook (100 words), 4) 5-7 H2 sections with detailed content, 5) Bullet points and numbered lists, 6) Internal linking suggestions, 7) FAQ section, 8) Conclusion with CTA. Tone: informative and engaging. Word count: 1500-2000 words. Target keyword density: 1-2%.',
        uses: 1250
    },
    {
        category: 'content',
        title: 'YouTube Video Script',
        description: 'Engaging video script with timestamps',
        prompt: 'Create a detailed YouTube video script for [TOPIC]. Structure: 1) Hook (0:00-0:10) - Grab attention immediately, 2) Introduction (0:10-0:30) - Introduce yourself and topic, 3) Main Content (0:30-8:00) - Break into 3-4 key points with examples, 4) Engagement reminder (8:00-8:15) - Ask for likes/comments, 5) Conclusion (8:15-9:00) - Summarize and CTA. Include: camera directions, B-roll suggestions, on-screen text ideas. Target length: 10 minutes. Tone: energetic and conversational.',
        uses: 980
    },
    {
        category: 'creative',
        title: 'AI Image Generation Pro',
        description: 'Detailed prompts for stunning AI art',
        prompt: 'Generate a highly detailed image: Subject: [MAIN SUBJECT], Setting: [ENVIRONMENT/BACKGROUND], Style: [photorealistic/oil painting/digital art/anime/watercolor], Lighting: [golden hour/dramatic/soft/neon/natural], Camera: [wide angle/portrait/macro/aerial view], Mood: [serene/energetic/mysterious/joyful], Colors: [vibrant/muted/monochrome/pastel], Details: [specific elements to include], Quality: 8k resolution, ultra-detailed, professional photography, award-winning, trending on artstation.',
        uses: 2100
    },
    {
        category: 'creative',
        title: 'Story Writer Assistant',
        description: 'Creative fiction and storytelling',
        prompt: 'Write a compelling [SHORT STORY/NOVEL CHAPTER] with these elements: Genre: [mystery/romance/sci-fi/fantasy/thriller], Setting: [time period and location], Main character: [name, age, key traits, motivation], Conflict: [central problem or challenge], Tone: [dark/humorous/inspirational/suspenseful], Length: [word count], Include: vivid descriptions, realistic dialogue, character development, plot twist, emotional depth. Writing style: [similar to specific author or style]. End with a hook for the next chapter.',
        uses: 1450
    },
    {
        category: 'coding',
        title: 'Full-Stack Code Generator',
        description: 'Production-ready code with best practices',
        prompt: 'Write production-ready [LANGUAGE] code for [FUNCTIONALITY]. Requirements: 1) Follow [FRAMEWORK] best practices and design patterns, 2) Include comprehensive error handling and input validation, 3) Add detailed comments explaining logic and decisions, 4) Implement proper security measures, 5) Optimize for performance and scalability, 6) Write unit tests with edge cases, 7) Include usage examples and documentation. Code style: [style guide]. Additional: type hints, logging, and configuration management.',
        uses: 1680
    },
    {
        category: 'coding',
        title: 'Bug Fix & Debug Assistant',
        description: 'Identify and fix code issues',
        prompt: 'Analyze this code and fix all bugs: [PASTE CODE]. Please: 1) Identify all errors, warnings, and potential issues, 2) Explain what each bug does and why it occurs, 3) Provide corrected code with fixes highlighted, 4) Suggest performance improvements, 5) Add error handling where missing, 6) Recommend best practices, 7) Include test cases to prevent regression. Language: [LANGUAGE]. Framework: [FRAMEWORK]. Focus on: security, performance, maintainability.',
        uses: 1320
    },
    {
        category: 'coding',
        title: 'API Documentation Writer',
        description: 'Complete API docs with examples',
        prompt: 'Create comprehensive API documentation for [API NAME]. Include: 1) Overview and purpose, 2) Authentication methods, 3) Base URL and endpoints, 4) Request/response examples for each endpoint, 5) Parameters (required/optional) with data types, 6) Status codes and error messages, 7) Rate limiting info, 8) Code examples in [LANGUAGES], 9) Common use cases, 10) Troubleshooting guide. Format: clear, developer-friendly, with syntax highlighting.',
        uses: 890
    },
    {
        category: 'business',
        title: 'Marketing Campaign Creator',
        description: 'Complete marketing strategy and copy',
        prompt: 'Create a comprehensive marketing campaign for [PRODUCT/SERVICE]. Include: 1) Target audience analysis (demographics, pain points, desires), 2) Unique value proposition, 3) Campaign theme and messaging, 4) Multi-channel strategy (social media, email, ads, content), 5) 10 headline variations, 6) 5 ad copy versions (short and long), 7) Email sequence (3 emails), 8) Social media posts (10 posts), 9) Call-to-action options, 10) Success metrics. Tone: [persuasive/friendly/professional]. Budget: [RANGE].',
        uses: 1540
    },
    {
        category: 'business',
        title: 'Business Plan Generator',
        description: 'Detailed business plan sections',
        prompt: 'Create a detailed business plan for [BUSINESS IDEA]. Structure: 1) Executive Summary (compelling overview), 2) Company Description (mission, vision, values), 3) Market Analysis (industry trends, target market, size), 4) Competitive Analysis (competitors, differentiation), 5) Organization Structure (team, roles), 6) Products/Services (detailed descriptions, pricing), 7) Marketing Strategy (channels, tactics, budget), 8) Financial Projections (3-year forecast, break-even), 9) Funding Requirements, 10) Risk Analysis. Format: professional, investor-ready.',
        uses: 1120
    },
    {
        category: 'business',
        title: 'Email Sales Sequence',
        description: 'High-converting email series',
        prompt: 'Write a 5-email sales sequence for [PRODUCT/SERVICE]. Email 1 (Introduction): Build rapport, identify pain point. Email 2 (Education): Provide value, establish authority. Email 3 (Social Proof): Share testimonials, case studies. Email 4 (Offer): Present solution with benefits, limited-time offer. Email 5 (Last Chance): Create urgency, final CTA. Each email: compelling subject line (3 options), personalized greeting, conversational tone, clear CTA, P.S. section. Target: [AUDIENCE]. Goal: [CONVERSION GOAL].',
        uses: 1380
    },
    {
        category: 'business',
        title: 'Product Description Pro',
        description: 'Persuasive product descriptions',
        prompt: 'Write a compelling product description for [PRODUCT]. Include: 1) Attention-grabbing headline, 2) Opening hook (emotional connection), 3) Key features (3-5 bullet points), 4) Benefits (how it solves problems), 5) Unique selling points, 6) Social proof (testimonials/ratings), 7) Technical specifications, 8) Use cases/scenarios, 9) Guarantee/warranty info, 10) Strong CTA. Tone: [luxury/casual/technical/friendly]. Target audience: [DEMOGRAPHIC]. Length: [SHORT/MEDIUM/LONG]. SEO keywords: [KEYWORDS].',
        uses: 1650
    },
    {
        category: 'education',
        title: 'Lesson Plan Creator',
        description: 'Complete educational lesson plans',
        prompt: 'Create a comprehensive lesson plan for [SUBJECT/TOPIC]. Grade level: [LEVEL]. Duration: [TIME]. Structure: 1) Learning objectives (specific, measurable), 2) Materials needed, 3) Introduction/Hook (5-10 min), 4) Direct instruction (15-20 min), 5) Guided practice (10-15 min), 6) Independent practice (15-20 min), 7) Assessment methods, 8) Differentiation strategies, 9) Homework assignment, 10) Reflection questions. Include: engagement activities, visual aids, real-world connections, accommodation for diverse learners.',
        uses: 760
    },
    {
        category: 'education',
        title: 'Study Guide Generator',
        description: 'Comprehensive study materials',
        prompt: 'Create a detailed study guide for [SUBJECT/TOPIC]. Include: 1) Key concepts summary (bullet points), 2) Important definitions and terms, 3) Formulas/equations (if applicable), 4) Step-by-step examples, 5) Practice questions (multiple choice, short answer, essay), 6) Answer key with explanations, 7) Memory techniques/mnemonics, 8) Common mistakes to avoid, 9) Additional resources, 10) Self-assessment checklist. Format: student-friendly, visually organized. Difficulty: [LEVEL].',
        uses: 920
    },
    {
        category: 'creative',
        title: 'Social Media Content Calendar',
        description: '30-day content plan with posts',
        prompt: 'Create a 30-day social media content calendar for [BRAND/NICHE]. Platform: [Instagram/TikTok/LinkedIn/Twitter]. Include: 1) Content themes for each week, 2) Daily post ideas with captions, 3) Hashtag strategy (trending + branded), 4) Posting times (optimal engagement), 5) Content mix (educational/entertaining/promotional), 6) Visual content suggestions, 7) Story ideas, 8) Engagement tactics, 9) Call-to-actions, 10) Performance metrics to track. Tone: [BRAND VOICE]. Goal: [OBJECTIVE].',
        uses: 1480
    },
    {
        category: 'content',
        title: 'Podcast Episode Script',
        description: 'Structured podcast content',
        prompt: 'Write a podcast episode script for [TOPIC]. Duration: [LENGTH]. Structure: 1) Intro music note + hook (30 sec), 2) Welcome and episode overview (1 min), 3) Sponsor message (if applicable, 30 sec), 4) Main content (3-4 segments with transitions), 5) Guest interview questions (if applicable), 6) Key takeaways summary, 7) Listener engagement (question/poll), 8) Outro with CTA and next episode teaser. Include: speaking notes, timing markers, sound effect cues, emphasis points. Tone: [conversational/professional/humorous].',
        uses: 680
    },
    {
        category: 'business',
        title: 'Press Release Writer',
        description: 'Professional press releases',
        prompt: 'Write a professional press release for [ANNOUNCEMENT/EVENT]. Format: 1) Compelling headline (under 10 words), 2) Subheadline (additional context), 3) Dateline (city, date), 4) Lead paragraph (who, what, when, where, why), 5) Body (2-3 paragraphs with details, quotes), 6) Boilerplate (company background), 7) Contact information, 8) ### (end marker). Include: newsworthy angle, executive quote, relevant statistics, call-to-action. Tone: professional, objective, newsworthy. Length: 400-600 words. SEO optimized.',
        uses: 540
    }
];

// Template Data
const templates = [
    {
        icon: 'fa-youtube',
        title: 'YouTube Script',
        description: 'Create engaging video scripts',
        difficulty: 'Easy',
        prompt: 'Write a detailed YouTube video script about [TOPIC]. Include an attention-grabbing hook in the first 10 seconds, main content sections with timestamps, engaging storytelling elements, and a strong call-to-action at the end. Target audience: [AUDIENCE]. Video length: [DURATION] minutes.'
    },
    {
        icon: 'fa-image',
        title: 'Image Generation',
        description: 'Perfect prompts for AI art',
        difficulty: 'Medium',
        prompt: 'Create a highly detailed image of [SUBJECT]. Style: [STYLE] (e.g., photorealistic, oil painting, digital art). Lighting: [LIGHTING] (e.g., golden hour, dramatic, soft). Composition: [COMPOSITION]. Include: [SPECIFIC DETAILS]. Quality: 8k, ultra-detailed, professional photography.'
    },
    {
        icon: 'fa-blog',
        title: 'Blog Writing',
        description: 'SEO-optimized blog posts',
        difficulty: 'Easy',
        prompt: 'Write a comprehensive blog post about [TOPIC]. Target keyword: [KEYWORD]. Include: 1) Engaging introduction with a hook, 2) 5-7 main sections with H2 headings, 3) Practical examples and actionable tips, 4) SEO-optimized meta description, 5) Conclusion with CTA. Tone: [TONE]. Word count: [COUNT] words.'
    },
    {
        icon: 'fa-code',
        title: 'Code Generation',
        description: 'Clean, documented code',
        difficulty: 'Medium',
        prompt: 'Write [LANGUAGE] code to [TASK]. Requirements: 1) Follow best practices and design patterns, 2) Include comprehensive error handling, 3) Add detailed comments explaining logic, 4) Write unit tests, 5) Optimize for performance. Code style: [STYLE]. Include example usage.'
    },
    {
        icon: 'fa-bullhorn',
        title: 'Marketing Copy',
        description: 'Persuasive ad copy',
        difficulty: 'Hard',
        prompt: 'Create compelling marketing copy for [PRODUCT/SERVICE]. Target audience: [AUDIENCE]. Pain points: [PROBLEMS]. Unique value proposition: [UVP]. Include: 1) Attention-grabbing headline, 2) Emotional hook, 3) Benefits (not features), 4) Social proof elements, 5) Urgency trigger, 6) Clear CTA. Tone: [TONE].'
    },
    {
        icon: 'fa-envelope',
        title: 'Email Campaign',
        description: 'High-converting emails',
        difficulty: 'Medium',
        prompt: 'Write a professional email campaign for [PURPOSE]. Subject line: Create 3 A/B test options. Email body: 1) Personalized greeting, 2) Clear value proposition in first paragraph, 3) 3-4 benefit-focused bullet points, 4) Social proof or testimonial, 5) Single clear CTA button. Tone: [TONE]. Length: [LENGTH].'
    }
];

// Learning Content
const learningContent = [
    {
        title: 'Be Specific and Clear',
        bad: 'Write something about dogs.',
        good: 'Write a 500-word informative article about Golden Retriever training techniques for puppies aged 8-12 weeks, including positive reinforcement methods and common mistakes to avoid.',
        tip: 'Always specify what you want, how much detail, the format, and the target audience.'
    },
    {
        title: 'Provide Context',
        bad: 'Make it better.',
        good: 'Improve this product description for a luxury watch brand targeting professionals aged 30-50. Make it more sophisticated, emphasize craftsmanship and heritage, and include emotional appeal.',
        tip: 'Give background information, target audience, tone, and specific improvement areas.'
    },
    {
        title: 'Use Examples',
        bad: 'Write a creative story.',
        good: 'Write a mystery short story similar to Agatha Christie\'s style, set in a 1920s English manor, featuring a detective solving a locked-room murder. Include red herrings and a surprising twist ending.',
        tip: 'Reference examples, styles, or formats to guide the AI toward your desired output.'
    },
    {
        title: 'Structure Your Request',
        bad: 'Help me with my business plan.',
        good: 'Create a business plan outline with these sections: 1) Executive Summary, 2) Market Analysis, 3) Competitive Landscape, 4) Marketing Strategy, 5) Financial Projections. For each section, provide 3-4 key points to address.',
        tip: 'Break complex requests into numbered steps or sections for better results.'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeAnalyzer();
    initializeReadyMadePrompts();
    initializeTemplates();
    initializeLearning();
    initializeDashboard();
    initializeChat();
    initializeOptimizationAssistant();
    updateStats();
});

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Scroll to section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Analyzer
function initializeAnalyzer() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const promptInput = document.getElementById('promptInput');
    const resultsSection = document.getElementById('resultsSection');
    
    analyzeBtn.addEventListener('click', () => {
        const prompt = promptInput.value.trim();
        
        if (!prompt) {
            alert('Please enter a prompt to analyze!');
            return;
        }
        
        analyzePrompt(prompt);
        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    
    // Copy button
    document.getElementById('copyBtn').addEventListener('click', () => {
        const improvedText = document.getElementById('improvedPrompt').textContent;
        navigator.clipboard.writeText(improvedText);
        
        const btn = document.getElementById('copyBtn');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
        }, 2000);
    });
    
    // Save button
    document.getElementById('saveBtn').addEventListener('click', () => {
        savePromptToHistory();
    });
    
    // Share button
    document.getElementById('shareBtn').addEventListener('click', () => {
        alert('Share functionality: Copy link to clipboard or share to social media (prototype feature)');
    });
}

// Analyze Prompt (Simulated AI Analysis)
function analyzePrompt(prompt) {
    const analysis = simulateAnalysis(prompt);
    
    // Animate scores
    animateScore('overallScore', analysis.scores.overall);
    animateScore('clarityScore', analysis.scores.clarity);
    animateScore('creativityScore', analysis.scores.creativity);
    animateScore('aiScore', analysis.scores.aiCompatibility);
    
    // Display issues
    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = analysis.issues.map(issue => 
        `<li><i class="fas fa-times-circle" style="color: var(--danger); margin-right: 0.5rem;"></i>${issue}</li>`
    ).join('');
    
    // Display suggestions
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = analysis.suggestions.map(suggestion => 
        `<li><i class="fas fa-lightbulb" style="color: var(--gold); margin-right: 0.5rem;"></i>${suggestion}</li>`
    ).join('');
    
    // Display improved prompt
    document.getElementById('improvedPrompt').textContent = analysis.improvedPrompt;
    
    // Update stats
    userStats.totalPrompts++;
    userStats.totalScore += analysis.scores.overall;
    localStorage.setItem('userStats', JSON.stringify(userStats));
    updateStats();
}

// Simulate AI Analysis
function simulateAnalysis(prompt) {
    const wordCount = prompt.split(/\s+/).length;
    const hasQuestionMark = prompt.includes('?');
    const hasSpecifics = /\[.*?\]|specific|detailed|exactly|precisely/i.test(prompt);
    const hasContext = /context|background|audience|purpose|goal/i.test(prompt);
    const hasStructure = /\d+\)|step|section|part|include/i.test(prompt);
    
    let issues = [];
    let suggestions = [];
    let scores = {
        overall: 5,
        clarity: 5,
        creativity: 5,
        aiCompatibility: 5
    };
    
    // Analyze length
    if (wordCount < 10) {
        issues.push('Prompt is too short and lacks detail');
        suggestions.push('Expand your prompt with more specific requirements and context');
        scores.overall -= 2;
        scores.clarity -= 2;
    } else if (wordCount > 15) {
        scores.overall += 1;
        scores.clarity += 1;
    }
    
    // Analyze specificity
    if (!hasSpecifics) {
        issues.push('Lacks specific details or parameters');
        suggestions.push('Add specific details like format, length, style, or target audience');
        scores.clarity -= 1;
        scores.aiCompatibility -= 1;
    } else {
        scores.overall += 2;
        scores.aiCompatibility += 2;
    }
    
    // Analyze context
    if (!hasContext) {
        issues.push('Missing context or background information');
        suggestions.push('Provide context about the purpose, audience, or desired outcome');
        scores.clarity -= 1;
    } else {
        scores.overall += 1;
        scores.clarity += 2;
    }
    
    // Analyze structure
    if (!hasStructure) {
        issues.push('No clear structure or organization');
        suggestions.push('Break down your request into numbered steps or sections');
        scores.aiCompatibility -= 1;
    } else {
        scores.overall += 2;
        scores.aiCompatibility += 2;
    }
    
    // Check for vague language
    if (/something|anything|stuff|things|good|nice|better/i.test(prompt)) {
        issues.push('Contains vague or ambiguous language');
        suggestions.push('Replace vague words with specific, descriptive terms');
        scores.clarity -= 1;
    }
    
    // Creativity bonus
    if (wordCount > 20 && hasSpecifics && hasContext) {
        scores.creativity += 2;
    }
    
    // Cap scores at 10
    Object.keys(scores).forEach(key => {
        scores[key] = Math.min(10, Math.max(1, scores[key]));
    });
    
    // Generate improved prompt
    const improvedPrompt = generateImprovedPrompt(prompt, issues);
    
    // Add default suggestions if none
    if (suggestions.length === 0) {
        suggestions.push('Your prompt is well-structured!');
        suggestions.push('Consider adding examples for even better results');
    }
    
    if (issues.length === 0) {
        issues.push('No major issues found - great job!');
    }
    
    return {
        scores,
        issues,
        suggestions,
        improvedPrompt,
        originalPrompt: prompt
    };
}

// Generate Improved Prompt
function generateImprovedPrompt(original, issues) {
    let improved = original;
    
    // Add structure if missing
    if (issues.some(i => i.includes('structure'))) {
        improved = `Create a detailed response about: ${original}\n\nPlease include:\n1. Introduction with key context\n2. Main content with specific examples\n3. Practical applications or use cases\n4. Summary with key takeaways\n\nFormat: Professional and well-organized\nLength: Comprehensive but concise`;
    }
    
    // Add specifics if missing
    if (issues.some(i => i.includes('specific'))) {
        improved += `\n\nAdditional requirements:\n- Provide specific examples and details\n- Target audience: [Specify your audience]\n- Desired tone: [Professional/Casual/Technical]\n- Expected length: [Specify word count or format]`;
    }
    
    // Add context if missing
    if (issues.some(i => i.includes('context'))) {
        improved = `Context: [Provide background information about your needs]\n\n${improved}\n\nPurpose: [Explain what you'll use this for]\nGoal: [Describe your desired outcome]`;
    }
    
    // If prompt is already good, enhance it
    if (issues.length === 1 && issues[0].includes('No major issues')) {
        improved = `${original}\n\nAdditional enhancement: Please ensure the response is well-structured, includes relevant examples, and follows best practices for clarity and engagement.`;
    }
    
    return improved;
}

// Animate Score
function animateScore(elementId, targetScore) {
    const element = document.getElementById(elementId);
    let currentScore = 0;
    const increment = targetScore / 30;
    
    const interval = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(interval);
        }
        element.textContent = Math.round(currentScore);
        
        // Color based on score
        if (currentScore >= 8) {
            element.style.color = 'var(--success)';
        } else if (currentScore >= 6) {
            element.style.color = 'var(--gold)';
        } else if (currentScore >= 4) {
            element.style.color = 'var(--warning)';
        } else {
            element.style.color = 'var(--danger)';
        }
    }, 20);
}

// Ready-Made Prompts
function initializeReadyMadePrompts() {
    const readymadeGrid = document.getElementById('readymadeGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Display all prompts initially
    displayReadyMadePrompts('all');
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            displayReadyMadePrompts(category);
        });
    });
}

function displayReadyMadePrompts(category) {
    const readymadeGrid = document.getElementById('readymadeGrid');
    const filteredPrompts = category === 'all' 
        ? readyMadePrompts 
        : readyMadePrompts.filter(p => p.category === category);
    
    readymadeGrid.innerHTML = filteredPrompts.map(prompt => `
        <div class="readymade-card">
            <div class="readymade-header">
                <h3>${prompt.title}</h3>
                <span class="category-badge ${prompt.category}">${prompt.category}</span>
            </div>
            <p class="readymade-description">${prompt.description}</p>
            <div class="readymade-prompt">${prompt.prompt}</div>
            <div class="readymade-footer">
                <span class="uses-count"><i class="fas fa-users"></i> ${prompt.uses.toLocaleString()} uses</span>
                <div class="readymade-actions">
                    <button class="btn-use" onclick="useReadyMadePrompt('${prompt.title.replace(/'/g, "\\'")}')">
                        <i class="fas fa-play"></i> Use
                    </button>
                    <button class="btn-copy-prompt" onclick="copyReadyMadePrompt('${prompt.title.replace(/'/g, "\\'")}')">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function useReadyMadePrompt(title) {
    const prompt = readyMadePrompts.find(p => p.title === title);
    if (prompt) {
        document.getElementById('promptInput').value = prompt.prompt;
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
        
        // Update active nav
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelector('a[href="#home"]').classList.add('active');
        
        // Show notification
        showNotification('Prompt loaded! Click "Analyze Prompt" to get started.');
    }
}

function copyReadyMadePrompt(title) {
    const prompt = readyMadePrompts.find(p => p.title === title);
    if (prompt) {
        navigator.clipboard.writeText(prompt.prompt);
        showNotification('Prompt copied to clipboard!');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smart Optimization Assistant
function initializeOptimizationAssistant() {
    const optBtns = document.querySelectorAll('.opt-btn');
    
    optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');
            const originalPrompt = document.getElementById('promptInput').value.trim();
            
            if (!originalPrompt) {
                alert('Please enter a prompt first!');
                return;
            }
            
            generateOptimizedVersions(originalPrompt, type);
        });
    });
}

function generateOptimizedVersions(prompt, type) {
    const optimizedVersions = document.getElementById('optimizedVersions');
    let optimized = '';
    
    switch(type) {
        case 'detailed':
            optimized = makeMoreDetailed(prompt);
            break;
        case 'creative':
            optimized = makeMoreCreative(prompt);
            break;
        case 'ai':
            optimized = optimizeForAI(prompt);
            break;
        case 'professional':
            optimized = makeProfessional(prompt);
            break;
    }
    
    optimizedVersions.innerHTML = `
        <div class="optimized-card">
            <div class="optimized-header">
                <h4><i class="fas fa-sparkles"></i> ${type.charAt(0).toUpperCase() + type.slice(1)} Version</h4>
                <button class="btn-copy-opt" onclick="copyOptimizedVersion('${type}')">
                    <i class="fas fa-copy"></i> Copy
                </button>
            </div>
            <div class="optimized-text" id="optimized-${type}">${optimized}</div>
            <button class="btn-use-opt" onclick="useOptimizedVersion('${type}')">
                <i class="fas fa-check"></i> Use This Version
            </button>
        </div>
    `;
    
    optimizedVersions.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function makeMoreDetailed(prompt) {
    return `${prompt}\n\nAdditional Details:\n• Provide comprehensive explanations with examples\n• Include step-by-step instructions where applicable\n• Add relevant statistics, data, or research findings\n• Specify format requirements (length, structure, style)\n• Include context about target audience and purpose\n• Add quality criteria and success metrics\n• Mention any constraints or limitations to consider\n• Request multiple perspectives or approaches\n• Include references or sources if needed\n• Specify desired level of technical depth`;
}

function makeMoreCreative(prompt) {
    return `Transform this into a creative masterpiece: ${prompt}\n\nCreative Requirements:\n• Use vivid, imaginative language and metaphors\n• Think outside the box with unique angles and perspectives\n• Include storytelling elements and emotional appeal\n• Add unexpected twists or innovative approaches\n• Use sensory details (visual, auditory, tactile)\n• Incorporate humor, wit, or clever wordplay where appropriate\n• Challenge conventional thinking\n• Make it memorable and engaging\n• Use creative formatting or presentation\n• Surprise and delight the audience`;
}

function optimizeForAI(prompt) {
    return `[OPTIMIZED FOR AI PROCESSING]\n\nTask: ${prompt}\n\nStructured Requirements:\n1. Primary Objective: [Clearly state the main goal]\n2. Output Format: [Specify exact format needed]\n3. Tone & Style: [Define voice and approach]\n4. Key Elements to Include:\n   - [Element 1]\n   - [Element 2]\n   - [Element 3]\n5. Constraints:\n   - Length: [Specify word/character count]\n   - Complexity: [Beginner/Intermediate/Advanced]\n   - Audience: [Define target audience]\n6. Quality Criteria:\n   - Accuracy and factual correctness\n   - Clarity and readability\n   - Completeness and thoroughness\n7. Additional Context: [Any background information]\n8. Examples: [Provide reference examples if available]`;
}

function makeProfessional(prompt) {
    return `Professional Request: ${prompt}\n\nProfessional Standards:\n• Maintain formal, business-appropriate tone\n• Use industry-standard terminology and best practices\n• Ensure accuracy, precision, and attention to detail\n• Follow established conventions and guidelines\n• Include proper structure with clear sections\n• Cite sources and provide evidence-based information\n• Consider legal, ethical, and compliance aspects\n• Optimize for clarity and professional presentation\n• Include executive summary or key takeaways\n• Ensure content is suitable for stakeholder review\n• Add professional formatting and organization\n• Include actionable recommendations or next steps`;
}

function copyOptimizedVersion(type) {
    const text = document.getElementById(`optimized-${type}`).textContent;
    navigator.clipboard.writeText(text);
    showNotification('Optimized prompt copied!');
}

function useOptimizedVersion(type) {
    const text = document.getElementById(`optimized-${type}`).textContent;
    document.getElementById('promptInput').value = text;
    document.getElementById('optimizedVersions').innerHTML = '';
    showNotification('Optimized prompt loaded! Click "Analyze Prompt" to see the results.');
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
}

// Templates
function initializeTemplates() {
    const templatesGrid = document.getElementById('templatesGrid');
    
    templatesGrid.innerHTML = templates.map(template => `
        <div class="template-card" onclick="useTemplate('${template.title}')">
            <div class="template-icon">
                <i class="fas ${template.icon}"></i>
            </div>
            <h3>${template.title}</h3>
            <p>${template.description}</p>
            <span class="template-badge">${template.difficulty}</span>
        </div>
    `).join('');
}

function useTemplate(title) {
    const template = templates.find(t => t.title === title);
    if (template) {
        document.getElementById('promptInput').value = template.prompt;
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
        
        // Update active nav
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelector('a[href="#home"]').classList.add('active');
    }
}

// Learning
function initializeLearning() {
    const learnGrid = document.getElementById('learnGrid');
    
    learnGrid.innerHTML = learningContent.map(content => `
        <div class="learn-card">
            <h3><i class="fas fa-graduation-cap"></i> ${content.title}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">${content.tip}</p>
            <div class="example-comparison">
                <div class="example-box bad-example">
                    <div class="example-label">
                        <i class="fas fa-times"></i> Bad Example
                    </div>
                    <p style="color: var(--text-secondary);">${content.bad}</p>
                </div>
                <div class="example-box good-example">
                    <div class="example-label">
                        <i class="fas fa-check"></i> Good Example
                    </div>
                    <p style="color: var(--text-secondary);">${content.good}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Dashboard
function initializeDashboard() {
    loadPromptHistory();
}

function updateStats() {
    document.getElementById('totalPrompts').textContent = userStats.totalPrompts;
    document.getElementById('savedPrompts').textContent = userStats.savedPrompts;
    
    const avgScore = userStats.totalPrompts > 0 
        ? (userStats.totalScore / userStats.totalPrompts).toFixed(1)
        : 0;
    document.getElementById('avgScore').textContent = avgScore;
}

function savePromptToHistory() {
    const originalPrompt = document.getElementById('promptInput').value;
    const improvedPrompt = document.getElementById('improvedPrompt').textContent;
    const overallScore = parseInt(document.getElementById('overallScore').textContent);
    
    const historyItem = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        originalPrompt,
        improvedPrompt,
        score: overallScore
    };
    
    promptHistory.unshift(historyItem);
    if (promptHistory.length > 10) promptHistory.pop(); // Keep last 10
    
    localStorage.setItem('promptHistory', JSON.stringify(promptHistory));
    userStats.savedPrompts++;
    localStorage.setItem('userStats', JSON.stringify(userStats));
    
    loadPromptHistory();
    updateStats();
    
    alert('Prompt saved to your dashboard!');
}

function loadPromptHistory() {
    const historyContainer = document.getElementById('promptHistory');
    
    if (promptHistory.length === 0) {
        historyContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; color: var(--gold);"></i>
                <p>No saved prompts yet. Analyze and save your first prompt!</p>
            </div>
        `;
        return;
    }
    
    historyContainer.innerHTML = promptHistory.map(item => `
        <div class="history-item">
            <div class="history-header">
                <span class="history-date"><i class="fas fa-calendar"></i> ${item.date}</span>
                <span class="history-score">Score: ${item.score}/10</span>
            </div>
            <div class="history-content">
                <strong style="color: var(--gold);">Original:</strong> ${item.originalPrompt.substring(0, 100)}${item.originalPrompt.length > 100 ? '...' : ''}
            </div>
            <div class="history-content">
                <strong style="color: var(--success);">Improved:</strong> ${item.improvedPrompt.substring(0, 100)}${item.improvedPrompt.length > 100 ? '...' : ''}
            </div>
        </div>
    `).join('');
}

// Chat Assistant
function initializeChat() {
    const chatAssistant = document.getElementById('chatAssistant');
    const openChatBtn = document.getElementById('openChat');
    const toggleChatBtn = document.getElementById('toggleChat');
    const sendChatBtn = document.getElementById('sendChat');
    const chatInput = document.getElementById('chatInput');
    
    openChatBtn.addEventListener('click', () => {
        chatAssistant.classList.add('active');
        openChatBtn.classList.add('hidden');
        
        // Welcome message
        if (document.getElementById('chatMessages').children.length === 0) {
            addChatMessage('assistant', 'Hi! I\'m your AI assistant. Ask me anything about writing better prompts!');
        }
    });
    
    toggleChatBtn.addEventListener('click', () => {
        chatAssistant.classList.remove('active');
        openChatBtn.classList.remove('hidden');
    });
    
    sendChatBtn.addEventListener('click', () => sendChatMessage());
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    addChatMessage('user', message);
    chatInput.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const response = generateChatResponse(message);
        addChatMessage('assistant', response);
    }, 1000);
}

function addChatMessage(sender, text) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateChatResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('how') && lowerMessage.includes('prompt')) {
        return 'Great question! A good prompt should be: 1) Specific and detailed, 2) Include context and purpose, 3) Have clear structure, 4) Specify format and length. Try using our templates for examples!';
    } else if (lowerMessage.includes('score') || lowerMessage.includes('improve')) {
        return 'To improve your prompt score: Add specific details, provide context about your goal, structure your request with numbered points, and avoid vague language. Want me to analyze a prompt for you?';
    } else if (lowerMessage.includes('template')) {
        return 'We have templates for YouTube scripts, blog writing, image generation, coding, marketing, and email campaigns. Check out the Templates section to explore them!';
    } else if (lowerMessage.includes('example')) {
        return 'Here\'s a quick example:\n\nBad: "Write about dogs"\nGood: "Write a 500-word article about Golden Retriever training for puppies, including positive reinforcement techniques and common mistakes to avoid."\n\nSee the difference? Specificity is key!';
    } else {
        return 'I can help you with prompt writing tips, explain scoring criteria, suggest templates, or answer questions about prompt engineering. What would you like to know?';
    }
}
