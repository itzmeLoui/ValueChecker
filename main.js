document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const checkButton = document.getElementById('checkButton');
    const resultContainer = document.getElementById('resultContainer');
    const resultMessage = document.getElementById('resultMessage');

    // Add focus to input on page load
    amountInput.focus();

    // Allow Enter key to trigger checking
    amountInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkTransaction();
        }
    });

    // Add click event to button
    checkButton.addEventListener('click', checkTransaction);

    // Main function to check transactions
    function checkTransaction() {
        // Remove any existing classes from result
        resultMessage.className = 'result-message';
        resultMessage.innerHTML = '';

        // Get the input value
        const amount = parseFloat(amountInput.value);

        // Clear any previous result animation
        resultMessage.classList.remove('show');
        
        // Wait a tiny bit for animation to reset
        setTimeout(() => {
            // Validate input
            if (isNaN(amount)) {
                showResult('danger', '<i class="fas fa-exclamation-triangle"></i> Invalid input. Please enter a number.');
                amountInput.focus();
                return;
            }

            const threshold = 1000;

            // Check amount against rules
            if (amount > threshold) {
                showResult('warning', '<i class="fas fa-exclamation-circle"></i> Transaction amount is above the threshold. Potential review needed.');
            } else if (amount < 0) {
                showResult('danger', '<i class="fas fa-times-circle"></i> Invalid transaction amount. Amount cannot be negative.');
            } else {
                showResult('success', '<i class="fas fa-check-circle"></i> Transaction amount is within acceptable limits.');
            }
        }, 50);

        // Add pulse animation to the card
        const card = document.querySelector('.transaction-card');
        card.classList.add('pulse');
        setTimeout(() => {
            card.classList.remove('pulse');
        }, 1500);
    }

    // Helper function to show the result with appropriate styling
    function showResult(type, message) {
        resultMessage.classList.add(`result-${type}`);
        resultMessage.innerHTML = message;
        resultMessage.classList.add('show');
    }

    // Initialize floating labels (Bootstrap 5)
    const floatingInputs = document.querySelectorAll('.form-floating input');
    floatingInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (input.value) {
                input.classList.add('not-empty');
            } else {
                input.classList.remove('not-empty');
            }
        });
    });
});
