window.addEventListener("DOMContentLoaded", () => {
  const normalAlphabet = document.querySelector(".normal-letters");
  const standardLetters = generateNormalAlphabet();
  const length = standardLetters.length;
  const cipherAlphabet = document.querySelector(".cipher-letters");
  const plaintextInput = document.querySelector(".plaintext-word");
  const cipherTextSpan = document.querySelector(".ciphertext-word");
  let cipherSelector = document.querySelector(".cipher-selection");
  const cipherSelection = document.querySelector(".x-cipher-selection");
  let selectedCipher;

  function generateNormalAlphabet() {
    let startIndex = 65;
    const lettersAtoZ = 25;
    const endIndex = startIndex + lettersAtoZ;
    let letters = [];

    for (startIndex; startIndex <= endIndex; startIndex++) {
      letters.push(String.fromCharCode(startIndex));
    }

    return letters;
  }

  function generateCipherOptions() {
    let h = 0;
    let optionTags;
    for (h; h <= length; h++) {
      optionTags = document.createElement("option");
      if (h == 0) {
        optionTags.innerHTML = "Choose a Cipher";
        optionTags.setAttribute("disabled", "true");
        optionTags.setAttribute("selected", "true");
        console.log(optionTags);
      } else {
        optionTags.value = h;
        optionTags.id = `option ${h}`;
        optionTags.innerHTML = `Rot ${h}`;
      }
      cipherSelector.appendChild(optionTags);
    }
  }

  generateCipherOptions();

  function generateCipherAlphabet(number) {
    let i = number;
    let j = 0;
    let cipherLetters = [];
    let normalLetters = generateNormalAlphabet();

    for (i; i < length; i++) {
      cipherLetters.push(normalLetters[i]);
    }

    for (j; j < number; j++) {
      cipherLetters.push(normalLetters[j]);
    }
    return cipherLetters;
  }

  function generateCipherText(text, number) {
    let k;
    let letterIndices = [];
    let cipherText = [];
    let splitWord = text.toUpperCase().split("");
    let splitWordLength = splitWord.length;
    let shiftedLetters = generateCipherAlphabet(number);

    for (k = 0; k < splitWordLength; k++) {
      letterIndices.push(standardLetters.indexOf(splitWord[k]));
      cipherText.push(shiftedLetters[letterIndices[k]]);
    }
    return cipherText.join("");
  }

  plaintextInput.setAttribute("disabled", "true");

  plaintextInput.oninput = () => {
    selectedCipher = cipherSelector.value;
    let selectedCipherToNumber = parseInt(selectedCipher, 10);
    cipherTextSpan.innerHTML = generateCipherText(
      plaintextInput.value,
      selectedCipherToNumber
    );
  };

  cipherSelector.addEventListener("change", () => {
    plaintextInput.removeAttribute("disabled");
    cipherSelection.innerHTML = cipherSelector.value;
    cipherSelection.classList.add("active");
    selectedCipher = cipherSelector.value;
    let selectedCipherToNumber = parseInt(selectedCipher, 10);
    let cipherLetters = generateCipherAlphabet(selectedCipherToNumber);
    cipherAlphabet.innerHTML = cipherLetters.join("");
  });

  normalAlphabet.innerHTML = standardLetters.join("");
  cipherAlphabet.innerHTML = standardLetters.join("");
});
