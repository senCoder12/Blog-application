export const excerpt = (str) => {
    if(str.length > 45) {
        str= str.substring(0, 45)+"...";
    }
    return str;
}