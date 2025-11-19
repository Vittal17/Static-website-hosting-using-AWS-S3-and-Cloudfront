function showMessage() {
    const messageElement = document.getElementById('message');
    const messages = [
        '🎉 Your website is live on AWS!',
        '⚡ CloudFront is delivering this at lightning speed!',
        '🌍 Your content is cached globally!',
        '💰 This costs less than a cup of coffee per month!',
        '🔒 Secured with HTTPS encryption!'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageElement.textContent = randomMessage;
    messageElement.classList.remove('hidden');
    
    // Hide message after 3 seconds
    setTimeout(() => {
        messageElement.classList.add('hidden');
    }, 3000);
}

// Add a simple animation on page load
window.addEventListener('load', () => {
    document.querySelector('.container').style.opacity = '0';
    document.querySelector('.container').style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.querySelector('.container').style.transition = 'all 0.6s ease';
        document.querySelector('.container').style.opacity = '1';
        document.querySelector('.container').style.transform = 'translateY(0)';
    }, 100);
});