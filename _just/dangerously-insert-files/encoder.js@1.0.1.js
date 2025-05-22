/*

MIT License

Copyright (c) 2025 JustStudio. <https://juststudio.is-a.dev/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

// Encoder.js v1.0.1

/*

 https://encoder.js.is-a.dev/


 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░███████╗███╗░░██╗░█████╗░░█████╗░██████╗░███████╗██████╗░░░░░░░░░██╗░██████╗░░
░░██╔════╝████╗░██║██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗░░░░░░░░██║██╔════╝░░
░░█████╗░░██╔██╗██║██║░░╚═╝██║░░██║██║░░██║█████╗░░██████╔╝░░░░░░░░██║╚█████╗░░░
░░██╔══╝░░██║╚████║██║░░██╗██║░░██║██║░░██║██╔══╝░░██╔══██╗░░░██╗░░██║░╚═══██╗░░
░░███████╗██║░╚███║╚█████╔╝╚█████╔╝██████╔╝███████╗██║░░██║██╗╚█████╔╝██████╔╝░░
░░╚══════╝╚═╝░░╚══╝░╚════╝░░╚════╝░╚═════╝░╚══════╝╚═╝░░╚═╝╚═╝░╚════╝░╚═════╝░░░
 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

 Made by JustStudio.                               https://juststudio.is-a.dev/

 ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
 ██▄─█─█─█─▄▄█▄─▄█─▄▄█▄─▄█─█─█─▄▀█─█─▄─████
 ███─█─█─█▄▄─██─██▄▄─██─██─█─█─█─█─█─█─████
 █▄▄██▄▄▄█▄▄▄██▄██▄▄▄██▄██▄▄▄█▄▄██▄█▄▄▄█▄▄█

*/

function checkchar(char, chars) {
  return chars.some(ch => ch === char);
}
function getcode(char) {
  const codes = {
    'c': 0, 'C': 0, 'd': 0, 'D': 0, 'I': 0,
    'e': 1, 'f': 1, 'g': 1, 'h': 1, 'i': 1,
    'E': 2, 'F': 2, 'G': 2, 'H': 2, 'j': 2,
    'k': 3, 'n': 3, 'N': 3, 'O': 3, 'o': 3,
  };
  return codes[char] !== undefined ? codes[char] : 4;
}
function character(char, code) {
  const conversionMap = {
    'A': ['c', 'e', 'E', 'k', 'L'],
    'B': ['C', 'f', 'F', 'n', 'l'],
    'a': ['d', 'g', 'G', 'N', 'M'],
    'b': ['D', 'h', 'H', 'O', 'm'],
    'K': ['I', 'i', 'j', 'o', 'W']
  };

  if (code == null || code == undefined) {
    for (const [ogchar, chars] of Object.entries(conversionMap)) {
      if (checkchar(char, chars)) {
        return [ogchar, getcode(char)];
      }
    }
    return ['?', getcode(char)];
  }

  for (const [ogchar, chars] of Object.entries(conversionMap)) {
    if (char === ogchar) {
      return chars[code] || chars[0];
    }
  }
}
const used = /^[a-uA-U\s]+$/;

const compressionMap = { // Map of most used words
  'EN': { // Default language
    ' all': '00', ' All': '01', ' ALL': '02', 'all': '03', 'All': '04', 'ALL': '05',
    ' and': '06', ' And': '07', ' AND': '08', 'and': '09', 'And': '10', 'AND': '11',
    ' that': '12', ' That': '13', ' THAT': '14', 'that': '15', 'That': '16', 'THAT': '17',
    ' have': '18', ' Have': '19', ' HAVE': '20', 'have': '21', 'Have': '22', 'HAVE': '23',
    ' for': '24', ' For': '25', ' FOR': '26', 'for': '27', 'For': '28', 'FOR': '29',
    ' not': '30', ' Not': '31', ' NOT': '32', 'not': '33', 'Not': '34', 'NOT': '35',
    ' with': '36', ' With': '37', ' WITH': '38', 'with': '39', 'With': '40', 'WITH': '41',
    ' be': '42', ' Be': '43', ' BE': '44', ' to': '45', ' To': '46', ' TO': '47',
    ' of': '48', ' Of': '49', ' OF': '50', ' in': '51', ' In': '52', ' IN': '53',
    ' it': '54', ' It': '55', ' IT': '56', ' on': '57', ' On': '58', ' ON': '59',
    ' the': '60', ' The': '61', ' THE': '62', 'the': '63', 'The': '64', 'THE': '65',
    ' this': '66', ' This': '67', ' THIS': '68', 'this': '69', 'This': '70', 'THIS': '71',
    ' from': '72', ' From': '73', ' FROM': '74', 'from': '75', 'From': '76', 'FROM': '77',
    'his': '78', 'His': '79', 'HIS': '80', 'her': '81', 'Her': '82', 'HER': '83',
    'what': '84', 'What': '85', 'WHAT': '86', 'about': '87', 'About': '88', 'ABOUT': '89',
    'which': '90', 'Which': '91', 'WHICH': '92', 'when': '93', 'When': '94', 'WHEN': '95',
    'as': '96', 'AS': '97', 'do': '98', 'DO': '99'
  },
  'RU': { // Translated by @JustDeveloper1 - https://github.com/JustDeveloper1
    ' не': '00', ' Не': '01', ' НЕ': '02', ' она': '03', ' Она': '04', ' ОНА': '05',
    ' он': '06', ' Он': '07', ' ОН': '08', 'она': '09', 'Она': '10', 'ОНА': '11',
    ' на': '12', ' На': '13', ' НА': '14', ' они': '15', ' Они': '16', ' ОНИ': '17',
    ' что': '18', ' Что': '19', ' ЧТО': '20', 'что': '21', 'Что': '22', 'ЧТО': '23',
    ' тот': '24', ' Тот': '25', ' ТОТ': '26', 'тот': '27', 'Тот': '28', 'ТОТ': '29',
    ' быть': '30', ' Быть': '31', ' БЫТЬ': '32', 'быть': '33', 'Быть': '34', 'БЫТЬ': '35',
    ' весь': '36', ' Весь': '37', ' ВЕСЬ': '38', 'весь': '39', 'Весь': '40', 'ВЕСЬ': '41',
    ' это': '42', ' Это': '43', ' ЭТО': '44', ' это': '45', ' Это': '46', ' ЭТО': '47',
    ' как': '48', ' Как': '49', ' КАК': '50', 'как': '51', 'Как': '52', 'КАК': '53',
    ' по': '54', ' По': '55', ' ПО': '56', ' но': '57', ' Но': '58', ' НО': '59',
    ' ты': '60', ' Ты': '61', ' ТЫ': '62', ' из': '63', ' Из': '64', ' ИЗ': '65',
    ' мы': '66', ' Мы': '67', ' МЫ': '68', ' за': '69', ' За': '70', ' ЗА': '71',
    ' вы': '72', ' Вы': '73', ' ВЫ': '74', ' же': '75', ' Же': '76', ' ЖЕ': '77',
    ' от': '78', ' От': '79', ' ОТ': '80', ' бы': '81', ' Бы': '82', ' БЫ': '83',
    'так': '84', 'Так': '85', 'ТАК': '86', 'который': '87', 'Который': '88', 'КОТОРЫЙ': '89',
    'этот': '90', 'Этот': '91', 'ЭТОТ': '92', 'когда': '93', 'Когда': '94', 'КОГДА': '95',
    'только': '96', 'Только': '97', 'ТОЛЬКО': '98', 'же ': '99'
  },
 'FR': { // Translated by @SkyExploreWasTaken - https://github.com/SkyExploreWasTaken
    ' tout': '00', ' Tout': '01', ' TOUT': '02', 'tout': '03', 'Tout': '04', 'TOUT': '05',
    ' et': '06', ' Et': '07', ' ET': '08', 'et': '09', 'Et': '10', 'ET': '11',
    ' que': '12', ' Que': '13', ' QUE': '14', 'que': '15', 'Que': '16', 'QUE': '17',
    ' avoir': '18', ' Avoir': '19', ' AVOIR': '20', 'avoir': '21', 'Avoir': '22', 'AVOIR': '23',
    ' pour': '24', ' Pour': '25', ' POUR': '26', 'pour': '27', 'Pour': '28', 'POUR': '29',
    ' n\'': '30', ' N\'': '31', ' N\'': '32', 'n\'': '33', 'N\'': '34', 'N\'': '35',
    ' avec': '36', ' Avec': '37', ' AVEC': '38', 'avec': '39', 'Avec': '40', 'AVEC': '41',
    ' être': '42', ' Être': '43', ' ÊTRE': '44', ' pour': '45', ' Pour': '46', ' POUR': '47',
    ' pour': '48', ' Pour': '49', ' POUR': '50', ' dans': '51', ' Dans': '52', ' DANS': '53',
    ' il': '54', ' Il': '55', ' IL': '56', ' sur': '57', ' Sur': '58', ' SUR': '59',
    'lequel': '60', 'Lequel': '61', 'LEQUEL': '62', 'le': '63', 'Le': '64', 'LE': '65',
    ' ceci': '66', ' ceci': '67', ' CECI': '68', 'ceci': '69', 'Ceci': '70', 'CECI': '71',
    'à la place de': '72', 'A LA PLACE DE': '73', ' DE': '74', 'de': '75', 'De': '76', 'DE': '77',
    'son': '78', 'Son': '79', 'SON': '80', 'sa': '81', 'Sa': '82', 'SA': '83',
    'que': '84', 'Que': '85', 'QUE': '86', 'à propos': '87', 'A propos': '88', 'A PROPOS': '89',
    ' le': '90', ' Le': '91', ' LE': '92', 'quand': '93', 'Quand': '94', 'QUAND': '95',
    ' de': '96', ' De': '97', 'faire': '98', 'FAIRE': '99'
  },
  'UA': { // Translated by @GarikHappy - https://github.com/GarikHappy
    'так': '00', 'Так': '01', 'ТАК': '02', ' ні': '03', ' Ні': '04', ' НІ': '05',
    'він': '06', 'Він': '07', 'ВІН': '08', 'вона': '09', 'Вона': '10', 'ВОНА': '11',
    'вони': '12', 'Вони': '13', 'ВОНИ': '14', 'дякую': '15', 'Дякую': '16', 'ДЯКУЮ': '17',
    ' як': '18', ' Як': '19', ' ЯК': '20', 'що': '21', 'Що': '22', 'ЩО': '23',
    'від': '24', 'Від': '25', 'ВІД': '26', ' це': '27', ' Це': '28', ' ЦЕ': '29',
    'коли': '30', 'Коли': '31', 'КОЛИ': '32', 'зараз': '33', 'Зараз': '34', 'ЗАРАЗ': '35',
    'хочу': '36', 'Хочу': '37', 'ХОЧУ': '38', 'можливо': '39', 'Можливо': '40', 'МОЖЛИВО': '41',
    ' ти': '42', ' Ти': '43', ' ТИ': '44', ' ми': '45', ' Ми': '46', ' МИ': '47',
    'але': '48', 'Але': '49', 'АЛЕ': '50', 'який': '51', 'Який': '52', 'ЯКИЙ': '53',
    'чому': '54', 'Чому': '55', 'ЧОМУ': '56', 'тільки': '57', 'Тільки': '58', 'ТІЛЬКИ': '59',
    'цей': '60', 'Цей': '61', 'ЦЕЙ': '62', 'друзі': '63', 'Друзі': '64', 'ДРУЗІ': '65',
    'Їжа': '66', 'Їжа': '67', 'ЇЖА': '68', 'навіщо': '69', 'Навіщо': '70', 'НАВІЩО': '71',
    'поки що': '72', 'Поки що': '73', 'ПОКИ ЩО': '74', 'вчора': '75', 'Вчора': '76', 'ВЧОРА': '77',
    'привіт': '78', 'Привіт': '79', 'ПРИВІТ': '80', 'якщо': '81', 'Якщо': '82', 'ЯКЩО': '83',
    'також': '84', 'Також': '85', 'ТАКОЖ': '86', 'існує': '87', 'Існує': '88', 'ІСНУЄ': '89',
    'як справи': '90', 'Як справи': '91', 'ЯК СПРАВИ': '92', 'раніше': '93', 'Раніше': '94', 'РАНІШЕ': '95',
    'зрозуміло': '96', 'Зрозуміло': '97', 'ЗРОЗУМИЛО': '98', 'до побачення': '99'
  },
  'BN': { // Translated by @SubhrajitSain - https://github.com/SubhrajitSain
    'আমি': '00', 'তুমি': '01', 'সে': '02', 'আমরা': '03', 'তারা': '04', 'এটা': '05',
    'কি': '06', 'যে': '07', 'না': '08', 'হ্যাঁ': '09', 'এবং': '10', 'কিন্তু': '11',
    'যদি': '12', 'কারণ': '13', 'অথবা': '14', 'জন্য': '15', 'সাথে': '16', 'থেকে': '17',
    'মধ্যে': '18', 'পর্যন্ত': '19','উপর': '20', 'নিচে': '21', 'কাছে': '22', 'দূরে': '23',
    'বড়': '24', 'ছোট': '25', 'ভালো': '26', 'খারাপ': '27', 'নতুন': '28', 'পুরানো': '29',
    'জল': '30', 'আগুন': '31', 'মাটি': '32', 'বাতাস': '33', 'আকাশ': '34', 'সূর্য': '35',
    'চাঁদ': '36', 'দিন': '37', 'রাত': '38', 'বছর': '39', 'সময়': '40', 'মানুষ': '41',
    'লোক': '42', 'বাড়ি': '43', 'রাস্তা': '44', 'দেশ': '45', 'শহর': '46', 'কাজ': '47',
    'খাবার': '48', 'কাপড়': '49', 'বই': '50', 'লেখা': '51', 'পড়া': '52', 'দেখা': '53',
    'শোনা': '54', 'কথা': '55', 'জানা': '56', 'বোঝা': '57', 'করা': '58', 'যাওয়া': '59',
    'আসা': '60', 'দেওয়া': '61', 'নেওয়া': '62', 'রাখা': '63', 'খোঁজা': '64', 'পাওয়া': '65',
    'হওয়া': '66', 'থাকা': '67', 'চাওয়া': '68', 'পার': '69', 'হতে': '70', 'হয়ে': '71',
    'হয়েছিল': '72', 'করতে': '73', 'বলতে': '74', 'দেখতে': '75', 'শুনতে': '76', 'জানতে': '77',
    'বুঝতে': '78', 'যেতে': '79', 'আসতে': '80', 'দিতে': '81', 'নিতে': '82', 'রাখতে': '83',
    'খুঁজতে': '84', 'পেতে': '85', 'চাই': '86', 'পারি': '87', 'হবে': '88', 'করব': '89',
    'বলব': '90', 'দেখব': '91', 'শুনব': '92', 'জানব': '93', 'বুঝব': '94', 'যাব': '95',
    'আসবে': '96', 'দেব': '97', 'নেব': '98', 'রাখব': '99'
  }
}
const characterMap = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '_', '(', ')', '.', '~'
];
const cc = characterMap.length;

const errorprefix = 'Encoder.js Error: ';
const encddecdpfx = (insertmode) => {return `The text cannot be ${insertmode} for the following reason: `};
const docsurllink = 'https://encoder.js.is-a.dev/en/docs';
const errors = [
  `${errorprefix}The string to be decoded is not correctly encoded.`,
  `${errorprefix}Something went wrong.`,
  (mode_, param, paramtype) => {return `${errorprefix}${encddecdpfx(mode_)}${param} must be a ${paramtype}. ${docsurllink}`},
  (mode_, param) => {return `${errorprefix}${encddecdpfx(mode_)}${param} is required. ${docsurllink}`},
  (mode_, param, info) => {return `${errorprefix}${encddecdpfx(mode_)}${param} cannot be ${info}. ${docsurllink}`}
]
const knownErrors = [
  "InvalidCharacterError: Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.",
  "InvalidCharacterError: Failed to execute 'atob' on 'Window': The string to be decoded contains characters outside of the Latin1 range.",
  "TypeError: txt.replaceAll is not a function. (In 'txt.replaceAll(key, value)', 'txt.replaceAll' is undefined)",
  "TypeError: txt.replaceAll is not a function"
]

function checkNum0(num) {
  let data001 = `${num}`;
  let data002 = 'found';
  let data003 = data001.replaceAll('.', data002).replaceAll(',', data002);
  let data004 = false;
  if (data001 == data003) {
    data004 = true;
  }
  return data004;
}

function checkNum1(num) {
  return [
    checkNum0(num / 2),
    checkNum0(num / 3),
    checkNum0(num / 4),
    checkNum0(num / 5),
    checkNum0(num / 6),
    checkNum0(num / 7),
    checkNum0(num / 8),
    checkNum0(num / 9)
  ];
}

function encode0(str) {
  let checks = checkNum1(str.length);
  let result = [];
  for (let i = 2; i <= 9; i++) {
    if (checks[i - 2]) {
      let partLength = Math.floor(str.length / i);
      let parts = [];
      for (let j = 0; j < i; j++) {
        parts.push(str.slice(j * partLength, (j + 1) * partLength));
      }
      result.push(parts);
    }
  }
  const flatResult = result.flat();
  const duplicates = flatResult.filter((item, index) => flatResult.indexOf(item) !== index);
  const uniqueDuplicates = [...new Set(duplicates)];
  const duplicateIds = {};
  uniqueDuplicates.forEach((duplicate, index) => {
    duplicateIds[duplicate] = index + 1;
  });
  let encodedStr = str;
  uniqueDuplicates.forEach(duplicate => {
    encodedStr = encodedStr.replaceAll(duplicate, `'${duplicateIds[duplicate]}'`);
  });
  let duplicateTable = Object.entries(duplicateIds).map(([key, value]) => `!${value},${key}`).join(' ');
  return { encodedStr, duplicateTable };
}

function decode0(encodedStr, duplicateTable) {
  const duplicateEntries = duplicateTable.split(' ').map(entry => {
    const [id, value] = entry.split(',');
    return { id: id.replace('!', ''), value };
  });
  let decodedStr = encodedStr;
  duplicateEntries.forEach(({ id, value }) => {
    decodedStr = decodedStr.replaceAll(`'${id}'`, value);
  });
  return decodedStr;
}

function encode1(input, useURLSAFEspecialCharacters) {
  input = input || 'Made by JustStudio.';
  let encoded = '';
  let data = 0;
  let dataChar = "A";
  function containsNoNumbers(input) {
    for (let i = 0; i < input.length; i++) {
      if (input.charCodeAt(i) >= 48 && input.charCodeAt(i) <= 57) {
        return false;
      }
    }
    return true;
  }
  try {
    if (btoa(input).length < input.length) {
      data = 1;
      input = btoa(input);
    }
  } catch {}
  try {
    function compressStringRegex(str) {
      return str.replace(
        /(.)\1*/g,
        (match, char) =>
          char + match.length);
    }
    if (compressStringRegex(input).length < input.length && containsNoNumbers(input)) {
      input = compressStringRegex(input);
      if (data == 0) {
        data = 2;
      } else if (data == 1) {
        data = 3;
      }
    }
  } catch {}
  for (let i = 0; i < input.length; i++) {
    let charCode = input.charCodeAt(i).toString();
    while (charCode.length < 5) {
      charCode = '0' + charCode;
    }
    encoded += charCode;
  }
  if (data == 1) {
    dataChar = "a";
  } else if (data == 2) {
    dataChar = "B";
  } else if (data == 3) {
    dataChar = "b";
  }
  encoded = encoded
    .replaceAll('0000', 'b')
    .replaceAll('000', 'A')
    .replaceAll('00', 'a')
    .replaceAll('1111', 'B')
    .replaceAll('111', 'c')
    .replaceAll('11', 'C')
    .replaceAll('a1', 'd')
    .replaceAll('08', 'D')
    .replaceAll('ac', 'E')
    .replaceAll('Dd', 'e')
    .replaceAll('32', 'f')
    .replaceAll('A6', 'F')
    .replaceAll('F9', 'g')
    .replaceAll('01', 'G')
    .replaceAll('A97', 'h')
    .replaceAll('d05', 'i')
    .replaceAll('A74', 'J')
    .replaceAll('Af', 'O')
    .replaceAll('id02', 'p')
    .replaceAll('dGdDaC5dG', 'P')
    .replaceAll('A40', 'Q')
    .replaceAll('A41', 'q')
    .replaceAll('A39', 'R')
    .replaceAll('dDEA99hdD', 'r')
    .replaceAll('d03dDEA98hdD', 'S')
    .replaceAll('aC6d04dGaC0', 's')
    .replaceAll('dGaCA1a', 't')
    .replaceAll('A59', 'T')
    .replaceAll('aC', 'U')
    .replaceAll('Gd', 'u')
    .replaceAll('du', 'v')
    .replaceAll('4d', 'V')
    .replaceAll('VG', 'w')
    .replaceAll('U5', 'W')
    .replaceAll('U6', 'X')
    .replaceAll('OX', 'x')
    .replaceAll('9EU', 'Y')
    .replaceAll('eb', 'y')
    .replaceAll('ve', 'z')
    .replaceAll('DE', 'Z');
  if (useURLSAFEspecialCharacters) {
    encoded = encoded
      .replaceAll('A4', '-')
      .replaceAll('d04', '_');
    let encoded2 = encoded
      .replace(/(.+?)\1+/g, (match, char) => `(${char}.${match.length / char.length})`)
      .replaceAll(')(', '~');
    if (encoded2.length < encoded.length) {
      encoded = encoded2;
    }
  }
  if (useURLSAFEspecialCharacters) {
    encoded = encoded
      .replaceAll('A5', 'I')
      .replaceAll('_-', 'j')
      .replaceAll('4O', 'k')
      .replaceAll('d09', 'lm')
      .replaceAll('A99', 'lM')
      .replaceAll('OiO', 'Lm')
      .replaceAll('iUA', 'LM')
      .replaceAll('db', 'N')
      .replaceAll('UA', 'n')
      .replaceAll('EU', 'o')
  }
  let output = dataChar+encoded;
  return output
    .replaceAll('AU', 'K');
}

function decode1(encoded) {
  encoded = `${encoded
    .replaceAll('K', 'AU')}`;
  let decoded = '';
  let dataChar = encoded.slice(0,1);
  let data = 0;
  let doDecompress = false;
  let doATOB = false;
  if (dataChar == "a") {
    data = 1;
    doATOB = true;
  } else if (dataChar == "B") {
    data = 2;
    doDecompress = true;
  } else if (dataChar == "b") {
    data = 3;
    doDecompress = true;
    doATOB = true;
  }
  encoded = encoded
    .slice(1)
    .replaceAll('~', ')(')
    .replace(/\((.+?)\.(\d+)\)/g, (_, char, count) => char.repeat(count))
    .replaceAll('I', 'A5')
    .replaceAll('j', '_-')
    .replaceAll('k', '4O')
    .replaceAll('lm', 'd09')
    .replaceAll('lM', 'A99')
    .replaceAll('Lm', 'OiO')
    .replaceAll('LM', 'iUA')
    .replaceAll('N', 'db')
    .replaceAll('n', 'UA')
    .replaceAll('o', 'EU')
    .replaceAll('_', 'd04')
    .replaceAll('-', 'A4')
    .replaceAll('Z', 'DE')
    .replaceAll('z', 've')
    .replaceAll('y', 'eb')
    .replaceAll('Y', '9EU')
    .replaceAll('x', 'OX')
    .replaceAll('X', 'U6')
    .replaceAll('W', 'U5')
    .replaceAll('w', 'VG')
    .replaceAll('V', '4d')
    .replaceAll('v', 'du')
    .replaceAll('u', 'Gd')
    .replaceAll('U', 'aC')
    .replaceAll('T', 'A59')
    .replaceAll('t', 'dGaCA1a')
    .replaceAll('s', 'aC6d04dGaC0')
    .replaceAll('S', 'd03dDEA98hdD')
    .replaceAll('r', 'dDEA99hdD')
    .replaceAll('R', 'A39')
    .replaceAll('q', 'A41')
    .replaceAll('Q', 'A40')
    .replaceAll('P', 'dGdDaC5dG')
    .replaceAll('p', 'id02')
    .replaceAll('o', 'aCAC7deD')
    .replaceAll('O', 'Af')
    .replaceAll('n', 'd02hdDaC5dG')
    .replaceAll('J', 'A74')
    .replaceAll('i', 'd05')
    .replaceAll('h', 'A97')
    .replaceAll('G', '01')
    .replaceAll('g', 'F9')
    .replaceAll('F', 'A6')
    .replaceAll('f', '32')
    .replaceAll('e', 'Dd')
    .replaceAll('d', 'a1')
    .replaceAll('D', '08')
    .replaceAll('E', 'ac')
    .replaceAll('a', '00')
    .replaceAll('A', '000')
    .replaceAll('b', '0000')
    .replaceAll('B', '1111')
    .replaceAll('c', '111')
    .replaceAll('C', '11');
  for (let i = 0; i < encoded.length; i += 5) {
    let charCode = encoded.substring(i, i + 5);
    decoded += String.fromCharCode(parseInt(charCode, 10));
  }
  if (doDecompress) {
    function decompress(str) {
      return str.replace(/(\D)(\d+)/g, (_, g1, g2) => g1.repeat(g2));
    }
    decoded = decompress(decoded);
  }
  if (doATOB) {
    decoded = atob(decoded);
  }
  return decoded;
}

function encode2(text_, useURLSAFEspecialCharacters) {
  let preDataENC1 = encode1(text_, useURLSAFEspecialCharacters);
  let { preDataENC2, preDataENC3 } = encode0(preDataENC1);
  let preDataENC4 = `${preDataENC2}:${preDataENC3}`;
  if (preDataENC4.length > preDataENC1.length || !(preDataENC2 && preDataENC3)) {
    preDataENC4 = preDataENC1;
  }
  return preDataENC4;
}

function decode2(text_) {
  let preDataDEC1 = text_.replaceAll(':', 'found');
  if (preDataDEC1 != text_) {
    let preDataDEC2 = text_.split(':');
    let preDataDEC3 = preDataDEC2[0];
    let preDataDEC4 = preDataDEC2[1];
    let preDataDEC5 = decode0(preDataDEC3, preDataDEC4);
    return decode1(preDataDEC5);
  }
  return decode1(preDataDEC1);
}

function regextest(text, lang) {
  const en = [/\d/,/[À-ÿ]/];
  const ru = /^[а-яА-ЯёЁ\s]+$/;
  const fr = /^[a-zA-ZÀ-ÿ\s'-]+$/;
  const ua = /^[а-щА-ЩьюяґєіїЬЮЯҐЄІЇ\s'-]+$/;
  const bn = /[\p{Script=Bengali}]+/gu;
  if (lang == 'RU') {
    return ru.test(text);
  } else if (lang == 'FR') {
    return fr.test(text);
  } else if (lang == 'UA') {
    return ua.test(text);
  } else if (lang == 'BN') {
    return bn.test(text);
  }
  return !en[0].test(text)&&!en[1].test(text);
}
function _compress(text) {
  let txt = text;
  let cID = 0;
  if (regextest(text, 'RU')) {
    cID = 2;
    for (const [key, value] of Object.entries(compressionMap['RU'])) {
      txt = txt.replaceAll(key, value);
    }
  } else if (regextest(text, 'UA')) {
    cID = 4;
    for (const [key, value] of Object.entries(compressionMap['UA'])) {
      txt = txt.replaceAll(key, value);
    }
  } else if (regextest(text)) {
    cID = 1;
    for (const [key, value] of Object.entries(compressionMap['EN'])) {
      txt = txt.replaceAll(key, value);
    }
  } else if (regextest(text, 'FR')) {
    cID = 3;
    for (const [key, value] of Object.entries(compressionMap['FR'])) {
      txt = txt.replaceAll(key, value);
    }
  } else if (regextest(text, 'BN')) {
    cID = 5;
    for (const [key, value] of Object.entries(compressionMap['BN'])) {
      txt = txt.replaceAll(key, value);
    }
  }
  return [txt, cID];
}
function decompress(text, lang) {
  let txt = text;
  if (lang == 'RU') {
    for (const [key, value] of Object.entries(compressionMap['RU'])) {
      txt = txt.replaceAll(value, key);
    }
  } else if (lang == 'FR') {
    for (const [key, value] of Object.entries(compressionMap['FR'])) {
      txt = txt.replaceAll(value, key);
    }
  } else if (lang == 'UA') {
    for (const [key, value] of Object.entries(compressionMap['UA'])) {
      txt = txt.replaceAll(value, key);
    }
  } else if (lang == 'BN') {
    for (const [key, value] of Object.entries(compressionMap['BN'])) {
      txt = txt.replaceAll(value, key);
    }
  } else {
    for (const [key, value] of Object.entries(compressionMap['EN'])) {
      txt = txt.replaceAll(value, key);
    }
  }
  return txt;
}

const base62Chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function intToBase62(num) {
  let result = '';
  while (num > 0) {
    result = base62Chars[num % 62] + result;
    num = Math.floor(num / 62);
  }
  return result || '0';
}
function base62ToInt(base62) {
  let result = 0;
  for (let i = 0; i < base62.length; i++) {
    result = result * 62 + base62Chars.indexOf(base62[i]);
  }
  return result;
}

const max = 36;
function encode3(text) {
  if (text.length < max) {
    return text.split('').map(char => {
      const index = characterMap.indexOf(char);
      return index !== -1 ? characterMap[(index + text.length) % characterMap.length] : char;
    }).join('');
  } else {
    return text;
  }
}
function decode3(encodedText) {
  if (encodedText.length < max) {
    return encodedText.split('').map(char => {
      const index = characterMap.indexOf(char);
      return index !== -1 ? characterMap[(index - encodedText.length + characterMap.length) % characterMap.length] : char;
    }).join('');
  } else {
    return encodedText;
  }
}

function crypt(input, key) {
  let output = '';
  for (let i = 0; i < input.length; i++) {
      output += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return output;
}
function throwNewError(catchedError, id_) {
  if (knownErrors.some((knownError) => {return knownError == catchedError})) {
    throw new Error(`${errors[0]} (${encode(id_, null, true)})`);
  } else {
    throw new Error(`${errors[1]} (${encode(catchedError, null, true)})`);
  }
}

const useShit = false;
function encode4(text, key, compress) {
  let encd;
  let inputText = text;
  if (key && typeof key == 'string' && key != '') {
    inputText = crypt(text, key);
  }
  const encde = () => {
    let datachar;
    const [cpsd, cID] = _compress(inputText);
    encd = encode2(inputText, compress);
    datachar = encd.slice(0,1);
    const enc2 = encode2(cpsd, compress);
    if (compress && enc2.length < encd.length && cID != 0) {
      datachar = enc2.slice(0,1);
      datachar = character(datachar, cID - 1);
      encd = `${datachar}${enc2.slice(1)}`;
    }
  }
  if (useShit && compress && /^\d+$/.test(inputText) && inputText.length < 11) {
    try {
      const base62num = intToBase62(parseInt(inputText));
      if (base62num === base62ToInt(base62num)) {
        encd = `U${base62num}`;
      } else encde();
    } catch {encde()}
  } else encde();
  return encode3(encd);
};
function decode4(text, key) {
  let inputText = decode3(text);
  let datachar = inputText.slice(0,1);
  let decd;
  let encd = inputText.slice(1);
  if (datachar == 'U' && useShit) {
    decd = base62ToInt(encd);
  } else {
    if (!used.test(datachar)) {
      throw new Error(errors[0]);
    }
    let [realdatachar, dataID] = character(datachar, null);
    if (realdatachar == '?') {
      dataID = -1;
      encd = inputText;
    } else {
      encd = `${realdatachar}${encd}`
    }
    try {
      decd = decode2(encd);
    } catch (decodeError) {
      throwNewError(decodeError, 'decode2(encd)');
    }
    if (dataID == 0 || dataID == 1 || dataID == 2 || dataID == 3 || dataID == 4) {
      try {
        let cLang = dataID == 0 ? 'EN' : dataID == 2 ? 'FR' : dataID == 3 ? 'UA' : dataID == 4 ? 'BN' : 'RU';
        decd = decompress(decd, cLang);
      } catch (decompressError) {
        throwNewError(decompressError, 'decompress(decd, cLang)');
      }
    }
  }
  if (decd.length == 0) {
    throw new Error(errors[0]);
  }
  if (key && typeof key == 'string' && key != '') {
    decd = crypt(decd, key);
  }
  return decd;
};

function check(text, key) {
  if (!/^[A-Za-z0-9_().~-]+$/.test(text)) throw new Error(errors[0]);
  if (text.length > 2 && text !== 'V' && (key === undefined || key === null)) throw new Error(errors[0]);
}
function even_or_odd(number) {
  return number % 2 === 0 ? false : true;
}

const numEncode = (text, key) => {
  let num = '';
  for (let i = 0; i < text.length; i++) {
    num += key ? `${(parseInt(text.charAt(i), 10) + key.charCodeAt(i % key.length)) % 10}` : text.charAt(i);
  }
  let number = parseInt(num, 10);
  number = key ? number % parseInt(text, 10) : number;
  if (`${number}`.replaceAll('e','found') !== `${number}`) return false;
  let output_ = false;
  if (number < cc) {
    output_ = 'U' + characterMap[number];
  } else if (number < 4624) {
    number -= cc;
    output_ = 'u' + characterMap[Math.floor(number / cc)] + characterMap[number % cc];
  } else if (number < 314432) {
    number -= 4624;
    output_ = 'Q' + characterMap[Math.floor(number / (cc * cc))] + characterMap[Math.floor((number % (cc * cc)) / cc)] + characterMap[number % cc];
  } else if (number < 21381376) {
    number -= 314432;
    output_ = 'q' + characterMap[Math.floor(number / (cc * cc * cc))] + characterMap[Math.floor((number % (cc * cc * cc)) / (cc * cc))] + characterMap[Math.floor((number % (cc * cc)) / cc)] + characterMap[number % cc];
  } else if (useShit) {
    let result = '';
    while (number >= 0) {
      result = characterMap[number % cc] + result;
      number = Math.floor(number / cc) - 1;
    }
    output_ = result;
  } else {
    return false;
  }
  return encode3(output_);
}
const numDecode = (text, key) => {
  const encoded = decode3(text);
  const prefix = encoded.charAt(0);
  let number = 0;
  let output_;
  if (prefix === 'U') {
    output_ = (characterMap.indexOf(encoded.charAt(1))).toString();
  } else if (prefix === 'u') {
    number += cc;
    number += characterMap.indexOf(encoded.charAt(1)) * cc + characterMap.indexOf(encoded.charAt(2));
    output_ = number.toString();
  } else if (prefix === 'Q') {
    number += 4624;
    number += characterMap.indexOf(encoded.charAt(1)) * (cc * cc) + characterMap.indexOf(encoded.charAt(2)) * cc + characterMap.indexOf(encoded.charAt(3));
    output_ = number.toString();
  } else if (prefix === 'q') {
    number += 314432;
    number += characterMap.indexOf(encoded.charAt(1)) * (cc * cc * cc) + characterMap.indexOf(encoded.charAt(2)) * (cc * cc) + characterMap.indexOf(encoded.charAt(3)) * cc + characterMap.indexOf(encoded.charAt(4));
    output_ = number.toString();
  } else {
    let base = 0;
    for (let i = 0; i < encoded.length; i++) {
      base = base * cc + characterMap.indexOf(encoded.charAt(i));
    }
    output_ = base.toString();
  }
  let num = '';
  for (let i = 0; i < output_.length; i++) {
    num += key ? `${(parseInt(output_.charAt(i), 10) - key.charCodeAt(i % key.length) + 10) % 10}` : output_.charAt(i);
  }
  return num;
}

function encode5 (text, key, compress) {
  if (text === undefined || text === null) throw new Error(errors[3]('encoded', 'Text'));
  if (typeof text !== 'string') throw new Error(errors[2]('encoded', 'Text', 'string'));
  if (key !== undefined && key !== null && typeof key !== 'string') throw new Error(errors[2]('encoded', 'Key', 'string'));
  if (compress !== undefined && compress !== null && typeof compress !== 'boolean') throw new Error(errors[2]('encoded', 'Compress', 'boolean'));
  if (text === '') throw new Error(errors[4]('encoded', 'Text', text));
  const encoded_ = encode4(text, key, compress);
  let output_ = encoded_;
  if (compress) {
    const doubleEncoded = encode4(encoded_, key, compress);
    const numEncoded = numEncode(text);
    const customDecode5 = (text) => {
      try {
        return decode5(text);
      } catch {
        return false;
      }
    }
    if (doubleEncoded.length < encoded_.length) {
      output_ = `J${doubleEncoded}`;
    }
    if (/^[0-9]+$/.test(text) && (key === undefined || key === null || key === '') && customDecode5(numEncoded) === text) {output_ = numEncoded}
  }
  if (even_or_odd(output_.length)) output_ = output_.split('').reverse().join('');
  return output_;
}
function decode5 (text, key) {
  let input_ = text;
  if (even_or_odd(input_.length)) input_ = input_.split('').reverse().join('');
  if (input_ === undefined || input_ === null) throw new Error(errors[3]('decoded', 'Text'));
  if (typeof input_ !== 'string') throw new Error(errors[2]('decoded', 'Text', 'string'));
  if (key !== undefined && key !== null && typeof key !== 'string') throw new Error(errors[2]('decoded', 'Key', 'string'));
  check(input_, key);
  const datachar = input_.slice(0,1);
  const nodatachar = input_.slice(1);
  let output_;
  const numOut = numDecode(text);
  if (datachar == 'J') {
    output_ = decode4(decode4(nodatachar, key), key);
  } else if ((datachar == 'U' || datachar == 'u' || datachar == 'Q' || datachar == 'q') && (numOut.toString().indexOf('e')==-1)) {
    output_ = numOut;
  } else {
    output_ = decode4(input_, key);
  }
  return output_;
}

export const encode = (text, key, compress) => {
  return encode5(text, key, compress);
};
export const decode = (text, key) => {
  return decode5(text, key);
};

