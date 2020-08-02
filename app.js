document.addEventListener('DOMContentLoaded', () => {
  const normalAlphabet = document.querySelector('.normal-letters');
  const standardLetters = generateNormalAlphabet();
  const cipherAlphabet = document.querySelector('.cipher-letters');
  const cipherLetters = generateCipherAlphabet();
  const plaintextInput = document.querySelector('.plaintext-word');
  const cipherTextSpan = document.querySelector('.ciphertext-word');

  function generateNormalAlphabet() {
    let startIndex = 65;
    const lettersAtoZ = 25;
    const endIndex = startIndex + lettersAtoZ;
    let letters = [];
    
    for(startIndex; startIndex <= endIndex; startIndex++) {
      letters.push(String.fromCharCode(startIndex));
    }

    return letters;
  }

  function generateCipherAlphabet() {
    let i = 5;
    let j = 0;
    let cipherLetters = [];
    let normalLetters = generateNormalAlphabet();
    const lettersLength = normalLetters.length;

    for(i; i < lettersLength; i++) {
      cipherLetters.push(normalLetters[i]);
    }

    for(j; j < 5; j++) {
      cipherLetters.push(normalLetters[j]);
    }
    return cipherLetters;
  }

  plaintextInput.oninput = () => {
    cipherTextSpan.innerHTML = plaintextInput.value;
  }

  normalAlphabet.innerHTML = standardLetters.join('');
  cipherAlphabet.innerHTML = cipherLetters.join('');
});