document.addEventListener('DOMContentLoaded', () => {
    const bookButton = document.getElementById('book-appointment');
    const classroomModal = document.getElementById('classroom-modal');
    const closeButton = document.getElementById('close-classroom');
    const toggleMic = document.getElementById('toggle-mic');
    const toggleCamera = document.getElementById('toggle-camera');
    const toggleChat = document.getElementById('toggle-chat');
    const chatPanel = document.getElementById('chat-panel');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendChat = document.getElementById('send-chat');
    const chatMessages = document.getElementById('chat-messages');
    const leaveClass = document.getElementById('leave-class');
    const classroomVideo = document.getElementById('classroom-video');
    const testButton = document.getElementById('test-ielts');
    const testModal = document.getElementById('test-modal');
    const closeTest = document.getElementById('close-test');
    const testForm = document.getElementById('test-form');
    const finishTest = document.getElementById('finish-test');
    const testResult = document.getElementById('test-result');
    const scoreDisplay = document.getElementById('score');
    const commentDisplay = document.getElementById('comment');

    let isMicOn = false;
    let isCameraOn = false;

    bookButton.addEventListener('click', () => {
        classroomModal.classList.remove('hidden');
        classroomVideo.play();
    });

    const closeClassroom = () => {
        classroomModal.classList.add('hidden');
        classroomVideo.pause();
    };

    closeButton.addEventListener('click', closeClassroom);
    leaveClass.addEventListener('click', closeClassroom);

    toggleMic.addEventListener('click', () => {
        isMicOn = !isMicOn;
        toggleMic.innerHTML = `
            <i class="fas fa-microphone${isMicOn ? '' : '-slash'}"></i>
            <span>${isMicOn ? 'Bật âm' : 'Tắt âm'}</span>
        `;
    });

    toggleCamera.addEventListener('click', () => {
        isCameraOn = !isCameraOn;
        toggleCamera.innerHTML = `
            <i class="fas fa-video${isCameraOn ? '' : '-slash'}"></i>
            <span>${isCameraOn ? 'Bật camera' : 'Tắt camera'}</span>
        `;
    });

    toggleChat.addEventListener('click', () => {
        chatPanel.classList.toggle('hidden');
    });

    closeChat.addEventListener('click', () => {
        chatPanel.classList.add('hidden');
    });

    const addMessage = (message, isUser) => {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.className = isUser ? 'user-message' : 'other-message';
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    sendChat.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            setTimeout(() => {
                addMessage('Shut up!', false);
            }, 1000);
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChat.click();
        }
    });

    testButton.addEventListener('click', () => {
        testModal.classList.remove('hidden');
        testResult.classList.add('hidden');
        testForm.classList.remove('hidden');
        testForm.reset();
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, testForm]);
    });

    closeTest.addEventListener('click', () => {
        testModal.classList.add('hidden');
    });

    testForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let score = 0;
        const questions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];
        questions.forEach((q) => {
            const selected = document.querySelector(`input[name="${q}"]:checked`);
            if (selected) {
                score += parseInt(selected.value);
            }
        });

        let comment = '';
        if (score === 10) {
            comment = 'Quá đẹp trai và thông minh';
        } else if (score === 8) {
            comment = '<strong>You are stupid</strong>';
        } else if (score < 5) {
            comment = '<strong>DogShit</strong>';
        } else {
            comment = 'Cố gắng hơn nhé!';
        }

        scoreDisplay.textContent = `Điểm: ${score}/10`;
        commentDisplay.innerHTML = comment;
        testForm.classList.add('hidden');
        testResult.classList.remove('hidden');
    });

    classroomModal.addEventListener('click', (e) => {
        if (e.target === classroomModal) {
            closeClassroom();
        }
    });

    testModal.addEventListener('click', (e) => {
        if (e.target === testModal) {
            testModal.classList.add('hidden');
        }
    });
});