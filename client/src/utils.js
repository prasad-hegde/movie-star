export const fromAlphNum = (s) => {
    const myArray = s.split(/([0-9]+)/);
    return [myArray[0], myArray[1]];
}