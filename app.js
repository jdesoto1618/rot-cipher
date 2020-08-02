document.addEventListener('DOMContentLoaded', () => {
  const normalAlphabet = document.querySelector('.normal-letters');
  const standardLetters = generateNormalAlphabet();
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

  normalAlphabet.innerHTML = standardLetters.join('');
});