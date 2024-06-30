export const report = (data) => {
    let tableData = {};
    debugger
    if (data.name) {
        tableData['name'] = data.name;
        // tableData['name'] = createObjAndPushToArray("Name", data.name);
    }
    if (data.date && data.month && data.year) {
        tableData['dob'] = data.date + '/' + data.month + '/' + data.year;
    }
    tableData['sunSign'] = getSunSign(data.date, data.month);
    tableData.nameNumber = calculateNameNumber(data.name);
    tableData.mulank = calculateBhagyankMulank(data.date);
    tableData.bhagyank = calculateBhagyankMulank(data.date, data.month, data.year);
    tableData.luckyDates = "-";
    tableData.luckyYears = "-";

    return tableData;
}

const createObjAndPushToArray = (key, label) => {
    let obj = {};
    obj.a = key;
    obj.b = label;
    return obj;
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
        sum += array[i];
    }
    return sum;
}

const calculateBhagyankMulank = (date = 0, month = 0, year = 0) => {
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
            console.log(word[j])
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
    } else if((month === 4 && date >= 19) || (month === 5 && date <= 20)) {
        return 'Taurus';
    } else if((month === 5 && date >= 21) || (month === 6 && date <= 20)) {
        return 'Gemini';
    } else if((month === 6 && date >= 21) || (month === 7 && date <= 22)) {
        return 'Cancer';
    } else if((month === 7 && date >= 23) || (month === 8 && date <= 22)) {
        return 'Leo';
    } else if((month === 8 && date >= 23) || (month === 9 && date <= 22)) {
        return 'Virgo';
    } else if((month === 9 && date >= 23) || (month === 10 && date <= 22)) {
        return 'Libra';
    } else if((month === 10 && date >= 23) || (month === 11 && date <= 21)) {
        return 'Scorpio';
    } else if((month === 11 && date >= 22) || (month === 12 && date <= 21)) {
        return 'Sagittarius';
    } else if((month === 12 && date >= 22) || (month === 1 && date <= 19)) {
        return 'Capricorn';
    } else if((month === 1 && date >= 20) || (month === 2 && date <= 18)) {
        return 'Aquarius';
    } else if((month === 2 && date >= 19) || (month === 3 && date <= 19)) {
        return 'Pisces';
    }  
}