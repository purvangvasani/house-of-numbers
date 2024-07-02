export const report = (data) => {
    let tableData = {};
    if (data.name) {
        tableData['name'] = data.name;
    }
    if (data.date && data.month && data.year) {
        tableData['dob'] = data.date + '/' + data.month + '/' + data.year;
    }
    tableData['sunSign'] = getSunSign(data.date, data.month);
    tableData.nameNumber = calculateNameNumber(data.name);
    tableData.mulank = calculateBhagyankMulank(data.date, 0, 0);
    tableData.bhagyank = calculateBhagyankMulank(data.date, data.month, data.year);
    tableData.luckyDates = "-";
    tableData.luckyYears = "-";
    tableData.lifeGrid = calculateLifeGrid(tableData.mulank, tableData.bhagyank, data.date, data.month, data.year);
    tableData.traits = addTraits(tableData.sunSign);

    return tableData;
}

const splitNumberIntoDigits = (number) => {
    return number
        .toString()
        .split("")
        .map(Number);
}

const sumTheDigits = (array) => {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== 0) {
            sum += array[i];
        }
    }
    return sum;
}

const calculateBhagyankMulank = (date, month, year) => {
    let sum = 0;
    let output = [];
    if (date) {
        output = splitNumberIntoDigits(date);
        sum += sumTheDigits(output);
    }
    if (month) {
        output = splitNumberIntoDigits(month);
        sum += sumTheDigits(output);
    }
    if (year) {
        output = splitNumberIntoDigits(year);
        sum += sumTheDigits(output);
    }
    output = splitNumberIntoDigits(sum);
    sum = sumTheDigits(output);

    output = splitNumberIntoDigits(sum);
    sum = sumTheDigits(output);
    return sum;
}

const getCharNumber = (char) => {
    if (char === 'A' || char === 'a' || char === 'I'
        || char === 'i' || char === 'J' || char === 'j'
        || char === 'Q' || char === 'q' || char === 'y'
        || char === 'y'
    ) {
        return 1;
    } else if (char === 'B' || char === 'b' || char === 'K'
        || char === 'k' || char === 'R' || char === 'r'
    ) {
        return 2;
    } else if (char === 'C' || char === 'c' || char === 'G'
        || char === 'g' || char === 'L' || char === 'l'
        || char === 'S' || char === 's'
    ) {
        return 3;
    } else if (char === 'D' || char === 'd' || char === 'M'
        || char === 'm' || char === 'T' || char === 't'
    ) {
        return 4;
    } else if (char === 'E' || char === 'e' || char === 'H'
        || char === 'h' || char === 'N' || char === 'n'
        || char === 'X' || char === 'x'
    ) {
        return 5;
    } else if (char === 'U' || char === 'u' || char === 'V'
        || char === 'v' || char === 'W' || char === 'w'
    ) {
        return 6;
    } else if (char === 'O' || char === 'o' || char === 'Z'
        || char === 'z'
    ) {
        return 7;
    } else if (char === 'F' || char === 'f' || char === 'P'
        || char === 'p'
    ) {
        return 8;
    } else {
        return 0;
    }
}

const calculateNameNumber = (name) => {
    let sum = 0;
    name = name.split(' ');
    for (let i = 0; i < name.length; i++) {
        let word = name[i];
        for (let j = 0; j < word.length; j++) {
            sum += getCharNumber(word[j]);
        }
    }
    const digits = splitNumberIntoDigits(sum);
    sum = sumTheDigits(digits);
    return sum;
}

const getSunSign = (date, month) => {
    if ((month === 3 && date >= 20) || (month === 4 && date <= 18)) {
        return 'Aries';
    } else if ((month === 4 && date >= 19) || (month === 5 && date <= 20)) {
        return 'Taurus';
    } else if ((month === 5 && date >= 21) || (month === 6 && date <= 20)) {
        return 'Gemini';
    } else if ((month === 6 && date >= 21) || (month === 7 && date <= 22)) {
        return 'Cancer';
    } else if ((month === 7 && date >= 23) || (month === 8 && date <= 22)) {
        return 'Leo';
    } else if ((month === 8 && date >= 23) || (month === 9 && date <= 22)) {
        return 'Virgo';
    } else if ((month === 9 && date >= 23) || (month === 10 && date <= 22)) {
        return 'Libra';
    } else if ((month === 10 && date >= 23) || (month === 11 && date <= 21)) {
        return 'Scorpio';
    } else if ((month === 11 && date >= 22) || (month === 12 && date <= 21)) {
        return 'Sagittarius';
    } else if ((month === 12 && date >= 22) || (month === 1 && date <= 19)) {
        return 'Capricorn';
    } else if ((month === 1 && date >= 20) || (month === 2 && date <= 18)) {
        return 'Aquarius';
    } else if ((month === 2 && date >= 19) || (month === 3 && date <= 19)) {
        return 'Pisces';
    }
}

const calculateLifeGrid = (m, b, d, mo, y) => {
    const pushToGrid = (arr, grid) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 4) {
                grid[0] += arr[i];
            }
            if (arr[i] === 9) {
                grid[1] += arr[i];
            }
            if (arr[i] === 2) {
                grid[2] += arr[i];
            }
            if (arr[i] === 3) {
                grid[3] += arr[i];
            }
            if (arr[i] === 5) {
                grid[4] += arr[i];
            }
            if (arr[i] === 7) {
                grid[5] += arr[i];
            }
            if (arr[i] === 8) {
                grid[6] += arr[i];
            }
            if (arr[i] === 1) {
                grid[7] += arr[i];
            }
            if (arr[i] === 6) {
                grid[8] += arr[i];
            }
        }

        return grid;
    }

    let lifeGrid = ["", "", "", "", "", "", "", "", ""];
    m = splitNumberIntoDigits(m);
    if (m.length) {
        lifeGrid = pushToGrid(m, lifeGrid);
    }

    b = splitNumberIntoDigits(b);
    if (b.length) {
        lifeGrid = pushToGrid(b, lifeGrid);
    }

    d = splitNumberIntoDigits(d);
    if (d.length) {
        lifeGrid = pushToGrid(d, lifeGrid);
    }

    mo = splitNumberIntoDigits(mo);
    if (mo.length) {
        lifeGrid = pushToGrid(mo, lifeGrid);
    }

    y = splitNumberIntoDigits(y);
    if (y.length) {
        lifeGrid = pushToGrid(y, lifeGrid);
    }

    return lifeGrid

}

const addTraits = (sign) => {
    let obj = {};
    switch (sign) {
      case "Aries":
        obj['element'] = 'Fire';
        obj['meaning'] = 'Aries is the first sign of the zodiac, symbolizing new beginnings and action. They are pioneers, always ready to take on new challenges.';
        obj['traits'] = ['Energetic and enthusiastic', 'Bold and adventurous', 'Competitive and ambitious', 'Impulsive and sometimes impatient', 'Natural leaders'];
        break;
      case "Taurus":
        obj['element'] = 'Earth';
        obj['meaning'] = 'Taurus is associated with stability and practicality. They value security and enjoy the pleasures of life, such as good food and comfort.';
        obj['traits'] = ['Practical and reliable', 'Patient and persistent', 'Sensual and appreciates comfort', 'Sometimes stubborn and possessive', 'Loyal and grounded'];
        break;
      case "Gemini":
        obj['element'] = 'Air';
        obj['meaning'] = 'Gemini represents duality and adaptability. They are known for their ability to see both sides of an issue and for their love of learning and communication.';
        obj['traits'] = ['Curious and adaptable', 'Sociable and communicative', 'Intelligent and quick-witted', 'Inconsistent and indecisive at times', 'Versatile and lively'];
        break;
      case "Cancer":
        obj['element'] = 'Water';
        obj['meaning'] = 'Cancer is associated with home and family. They are deeply intuitive and emotional, often guided by their strong instincts and love for their loved ones.';
        obj['traits'] = ['Emotional and intuitive', 'Nurturing and protective', 'Loyal and empathetic', 'Can be moody and sensitive', 'Home-loving and family-oriented'];
        break;
      case "Leo":
        obj['element'] = 'Fire';
        obj['meaning'] = 'Leo symbolizes strength, courage, and leadership. They have a strong desire to be in the spotlight and are known for their generosity and big hearts.';
        obj['traits'] = ['Confident and charismatic', 'Generous and warm-hearted', 'Creative and enthusiastic', 'Sometimes arrogant and stubborn', 'Natural leaders and performers'];
        break;
      case "Virgo":
        obj['element'] = 'Earth';
        obj['meaning'] = 'Virgo is associated with practicality and precision. They are meticulous and hardworking, often striving for perfection in everything they do.';
        obj['traits'] = ['Analytical and detail-oriented', 'Practical and diligent', 'Modest and humble', 'Can be overly critical and perfectionistic', 'Reliable and hardworking'];
        break;
      case "Libra":
        obj['element'] = 'Air';
        obj['meaning'] = 'Libra represents balance, fairness, and harmony. They seek to create peace and beauty in their lives and are known for their sociability and charm.';
        obj['traits'] = ['Diplomatic and charming', 'Fair-minded and social', 'Cooperative and balanced', 'Can be indecisive and avoid confrontations', 'Appreciates beauty and harmony'];
        break;
      case "Scorpio":
        obj['element'] = 'Water';
        obj['meaning'] = 'Scorpio symbolizes transformation and intensity. They are known for their depth of emotion and their ability to regenerate and rise from the ashes.';
        obj['traits'] = ['Intense and passionate', 'Resourceful and determined', 'Mysterious and magnetic', 'Can be secretive and jealous', 'Loyal and courageous'];
        break;
      case "Sagittarius":
        obj['element'] = 'Fire';
        obj['meaning'] = 'Sagittarius represents exploration and wisdom. They are seekers of truth and knowledge, always ready for new adventures and experiences.';
        obj['traits'] = ['Optimistic and adventurous', 'Honest and straightforward', 'Intellectual and philosophical', 'Can be reckless and tactless', 'Loves freedom and exploration'];
        break;
      case "Capricorn":
        obj['element'] = 'Earth';
        obj['meaning'] = 'Capricorn symbolizes structure, discipline, and ambition. They are known for their determination and ability to achieve their goals through hard work and perseverance.';
        obj['traits'] = ['Ambitious and disciplined', 'Practical and prudent', 'Responsible and reliable', 'Can be pessimistic and stubborn', 'Hardworking and determined'];
        break;
      case "Aquarius":
        obj['element'] = 'Air';
        obj['meaning'] = 'Aquarius represents innovation and humanitarianism. They are visionaries who seek to improve the world through their progressive and unconventional ideas.';
        obj['traits'] = ['Innovative and independent', 'Humanitarian and idealistic', 'Intellectual and open-minded', 'Can be unpredictable and detached', 'Progressive and unconventional'];
        break;
      case "Pisces":
        obj['element'] = 'Water';
        obj['meaning'] = 'Pisces symbolizes empathy, intuition, and spirituality. They are deeply connected to their emotions and the emotions of others, often displaying a great sense of compassion and understanding.';
        obj['traits'] = ['Compassionate and empathetic', 'Artistic and imaginative', 'Intuitive and gentle', 'Can be escapist and overly trusting', 'Spiritual and idealistic'];
        break;
    }
    return obj
  }