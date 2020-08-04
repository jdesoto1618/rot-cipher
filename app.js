document.addEventListener('DOMContentLoaded', () => {
  const normalAlphabet = document.querySelector('.normal-letters');
  const standardLetters = generateNormalAlphabet();
  const length = standardLetters.length;
  const cipherAlphabet = document.querySelector('.cipher-letters');
  // const cipherLetters = generateCipherAlphabet();
  const plaintextInput = document.querySelector('.plaintext-word');
  const cipherTextSpan = document.querySelector('.ciphertext-word');
  let cipherSelector = document.querySelector('.cipher-selection');
  const cipherSelection = document.querySelector('.x-cipher');
  let selectedCipher;

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

  function generateCipherOptions() {
    let h = 0;
    let optionTags;
    for(h; h <= length; h++) {
      optionTags = document.createElement('option');
      optionTags.value = h;
      optionTags.id = `option ${h}`;
      optionTags.innerHTML = h;
      cipherSelector.appendChild(optionTags);
    }
  }

  generateCipherOptions();

  function generateCipherAlphabet(number) {
    let i = number;
    let j = 0;
    let cipherLetters = [];
    let normalLetters = generateNormalAlphabet();

    for(i; i < length; i++) {
      cipherLetters.push(normalLetters[i]);
    }

    for(j; j < number; j++) {
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
    let shiftedLetters = generateCipherAlphabet(26);

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

  cipherSelector.addEventListener('change', () => {
    cipherSelection.innerHTML = cipherSelector.value;
    selectedCipher = cipherSelector.value;
    let selectedCipherToNumber = parseInt(selectedCipher, 10);
    let cipherLetters = generateCipherAlphabet(selectedCipherToNumber);
    cipherAlphabet.innerHTML = cipherLetters.join('');
  });

  normalAlphabet.innerHTML = standardLetters.join('');
  

  console.log(generateCipherText('test me'));
});