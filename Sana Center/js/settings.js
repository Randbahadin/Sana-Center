// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYBuPWEXzFICd78bmjjUbFrfV_YW7lFTo",
    authDomain: "sana-center-78315.firebaseapp.com",
    projectId: "sana-center-78315",
    storageBucket: "sana-center-78315.firebasestorage.app",
    messagingSenderId: "534863955987",
    appId: "1:534863955987:web:b9dbcd5e30199dcda357e6",
    measurementId: "G-EX1NXDE2PM"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// reCAPTCHA Setup
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('settingsForm', {
    size: 'normal',
    callback: (response) => {
        console.log('reCAPTCHA solved, allow form submission.');
    },
    'expired-callback': () => {
        alert('reCAPTCHA expired. Please solve it again.');
    }
});

// Handle Form Submission
document.getElementById('settingsForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const language = document.getElementById('language').value;
    const notifications = document.getElementById('notifications').checked;
    const recaptchaResponse = grecaptcha.getResponse();

    if (!recaptchaResponse) {
        alert('تکایە reCAPTCHA چارەسەر بکە.');
        return;
    }

    try {
        // Sign up with email and password
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Send email verification
        await user.sendEmailVerification();
        alert('ئیمەیڵی پشتڕاستکردنەوە نێردرا. تکایە پشتڕاستی بکەوە.');

        // Send phone number verification
        const appVerifier = window.recaptchaVerifier;
        const confirmationResult = await auth.signInWithPhoneNumber(phone, appVerifier);

        // Show verification modal
        document.getElementById('verificationModal').style.display = 'block';

        // Handle verification code submission
        document.getElementById('verifyCodeButton').addEventListener('click', async () => {
            const verificationCode = document.getElementById('verificationCode').value;

            try {
                const result = await confirmationResult.confirm(verificationCode);
                alert('ژمارەی مۆبایل پشتڕاستکرایەوە!');
                document.getElementById('verificationModal').style.display = 'none';
            } catch (error) {
                console.error('Error verifying code:', error);
                alert('کۆدی پشتڕاستکردنەوە هەڵەیە. تکایە دووبارە هەوڵبدەرەوە.');
            }
        });

        // Save user settings (you can save to Firestore or Realtime Database)
        console.log('Settings saved:', { name, email, password, phone, language, notifications });
    } catch (error) {
        console.error('Error:', error);
        alert(`هەڵە: ${error.message}`);
    }
});