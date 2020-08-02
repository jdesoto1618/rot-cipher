document.addEventListener('DOMContentLoaded', () => {
  const normalAlphabet = document.querySelector('.normal-letters');
  const standardLetters = generateNormalAlphabet();
  const length = standardLetters.length;
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

  function generateCipherAlphabet(number) {
    let i = 5;
    let j = 0;
    let cipherLetters = [];
    let normalLetters = generateNormalAlphabet();

    for(i; i < length; i++) {
      cipherLetters.push(normalLetters[i]);
    }

    for(j; j < 5; j++) {
      cipherLetters.push(normalLetters[j]);
    }
    return cipherLetters;
  }

  function generateCipherText(text) {
    let k;
    let letterIndices = [];
    let cipherText = [];
    let splitWord = text.toUpperCase().split('');
    let splitWordLength = splitWord.length;
    let shiftedLetters = generateCipherAlphabet();

    for(k = 0; k < splitWordLength; k++) {
      letterIndices.push(standardLetters.indexOf(splitWord[k]));
      cipherText.push(shiftedLetters[letterIndices[k]]);
    }

    return cipherText.join('');
  }

  plaintextInput.oninput = () => {
    cipherTextSpan.innerHTML = plaintextInput.value;
    let length = plaintextInput.value.length;
  }

  normalAlphabet.innerHTML = standardLetters.join('');
  cipherAlphabet.innerHTML = cipherLetters.join('');

  console.log(generateCipherText('test me'));
});