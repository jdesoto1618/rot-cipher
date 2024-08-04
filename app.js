window.addEventListener("DOMContentLoaded", () => {
  const letterContainers = document.querySelectorAll('.letters-container');
  const standardLetters = generateNormalAlphabet();
  const letterStrings = standardLetters.map(span => span.innerText);
  const ciphertextContainer = document.querySelector(".ciphertext-container");
  const cipherAlphabetContainer = document.querySelector('.cipher-letters-container');
  const cipheredAlphabet = document.querySelector('.ciphered-alphabet');
  const plaintextInput = document.querySelector(".plaintext-word");
  const cipherTextSpan = document.querySelector(".ciphertext-word");
  let cipherSelector = document.querySelector(".cipher-selection");
  const cipherSelection = document.querySelector('.cipher-selection-value');
  let selectedCipher;

  function generateCipherOptions() {
    let h = 0;
    let optionTags;
    for (h; h <= standardLetters.length; h++) {
      optionTags = document.createElement("option");
      if (h == 0) {
        optionTags.innerHTML = "Choose a Cipher";
        optionTags.setAttribute("disabled", "true");
        optionTags.setAttribute("selected", "true");
      } else {
        optionTags.value = h;
        optionTags.id = `option ${h}`;
        optionTags.innerHTML = `Rot ${h}`;
      }
      cipherSelector.append(optionTags);
    }
  }

  generateCipherOptions();

  function generateNormalAlphabet() {
    let startIndex = 65;
    const lettersAtoZ = 25;
    const endIndex = startIndex + lettersAtoZ;
    let letters = [];

    for (startIndex; startIndex <= endIndex; startIndex++) {
      const letterSpan = document.createElement('span');
      letterSpan.innerText = String.fromCharCode(startIndex);
      letters.push(letterSpan);
    }

    return letters;
  }

  function generateCipherAlphabet(number) {
    let i = number;
    let j = 0;
    let cipherLetters = [];
    let normalLetters = generateNormalAlphabet();

    for (i; i < standardLetters.length; i++) {
      cipherLetters.push(normalLetters[i]);
    }

    for (j; j < number; j++) {
      cipherLetters.push(normalLetters[j]);
    }

    return cipherLetters;
  }

  function generateCipherText(text, number) {
    let letterIndices = [];
    let cipherText = [];
    let splitWord = text.toUpperCase().split("");
    let splitWordLength = splitWord.length;
    let shiftedLetters = generateCipherAlphabet(number);
    const shiftedLetterStrings = shiftedLetters.map(span => span.innerHTML);

    for (let k = 0; k < splitWordLength; k++) {
      letterIndices.push(letterStrings.indexOf(splitWord[k]));
      cipherText.push(shiftedLetterStrings[letterIndices[k]]);
    }

    return cipherText.join('');
  }

  plaintextInput.setAttribute("disabled", "true");

  plaintextInput.oninput = () => {
    selectedCipher = parseInt(cipherSelector.value, 10);
    cipherTextSpan.innerHTML = generateCipherText(
      plaintextInput.value,
      selectedCipher
    );
    cipherTextSpan.classList.add("encoded");
  };

  cipherSelector.addEventListener("change", () => {
    plaintextInput.removeAttribute("disabled");
    cipherSelection.innerHTML = cipherSelector.value;
    cipheredAlphabet.innerHTML = `${cipherSelector.value}-`;
    cipherSelection.classList.add("active");
    selectedCipher = cipherSelector.value;
    let selectedCipherToNumber = parseInt(selectedCipher, 10);
    let cipherLetters = generateCipherAlphabet(selectedCipherToNumber);
    cipherAlphabetContainer.innerHTML = '';
    cipherLetters.forEach(cipherLetter => {
      cipherAlphabetContainer.append(cipherLetter);
    });
    ciphertextContainer.classList.add("shown");
  });

  letterContainers.forEach(container => {
    standardLetters.forEach(letterSpan => {
      container.append(letterSpan.cloneNode(true));
    });
  });
});
